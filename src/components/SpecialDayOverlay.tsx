import { useState } from 'react'
import { dayKey } from '../lib/date'
import { load, save } from '../lib/storage'
import { Mascot } from '../mascot/Mascot'
import { useSettings } from '../store/settings'
import { useSpecialDay } from './SpecialDayContext'

const SEEN_KEY = 'su.specialSeen'
const COLORS = ['#ec7fb0', '#ffd166', '#7c6fd0', '#4fa874', '#f08f74', '#5bc0eb']

function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 36 }, (_, i) => (
        <span
          key={i}
          className="absolute top-0 block h-3 w-2 rounded-sm"
          style={{
            left: `${(i * 37) % 100}%`,
            background: COLORS[i % COLORS.length],
            animation: `confetti-fall ${3 + (i % 5) * 0.6}s linear ${(i % 9) * 0.3}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

/** Full-screen surprise shown once on the birthday (other special days only tint the UI). */
export function SpecialDayOverlay() {
  const day = useSpecialDay()
  const { tx, t } = useSettings()
  const key = `${day?.id}-${dayKey()}`
  const [open, setOpen] = useState(() => day?.id === 'birthday' && load<string>(SEEN_KEY, '') !== key)

  if (!day || !open) return null

  const close = () => {
    save(SEEN_KEY, key)
    setOpen(false)
  }

  return (
    <div data-special-overlay className="fixed inset-0 z-50 flex items-center justify-center bg-bg/95 p-6 backdrop-blur" role="dialog" aria-modal="true" aria-label={tx(day.title)}>
      <Confetti />
      <div className="rise relative flex max-w-sm flex-col items-center text-center">
        <Mascot anim="celebrate" size={200} />
        <div className="mt-2 text-6xl" aria-hidden>
          {day.emoji}
        </div>
        <h1 className="mt-3 text-[34px] font-bold text-accent-2">{day.title.en}</h1>
        <p className="mt-1 text-lg font-bold">{day.title.tr}</p>
        <p className="mt-3 text-muted">{tx(day.message)}</p>
        <button className="btn btn-primary mt-6 w-full" onClick={close}>
          🎉 {t('common.close')}
        </button>
      </div>
    </div>
  )
}
