import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Mascot } from '../mascot/Mascot'
import type { MascotAnim } from '../mascot/registry'
import { speak } from '../lib/speech'
import { useSettings } from '../store/settings'

export function SpeakButton({ text, size = 'md', label }: { text: string; size?: 'sm' | 'md' | 'lg'; label?: string }) {
  const { settings, t } = useSettings()
  const dim = size === 'lg' ? 'h-14 w-14 text-2xl' : size === 'sm' ? 'h-9 w-9 text-base' : 'h-11 w-11 text-xl'
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        speak(text, settings.accent)
      }}
      aria-label={label ?? `${t('common.listen')}: ${text}`}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition active:scale-90 ${dim}`}
    >
      🔊
    </button>
  )
}

/** The mascot "explaining" a tip next to a speech bubble. */
export function TipBox({ children, anim = 'explain' }: { children: ReactNode; anim?: MascotAnim }) {
  return (
    <div className="flex items-end gap-2">
      <Mascot anim={anim} size={104} className="-mb-1 shrink-0" />
      <div className="relative flex-1 rounded-2xl rounded-bl-sm border border-line bg-accent-soft p-3 text-[15px] leading-relaxed">
        {children}
      </div>
    </div>
  )
}

export function PageHeader({ title, back, action }: { title: string; back?: string; action?: ReactNode }) {
  const { t } = useSettings()
  return (
    <div className="mb-4 flex items-center gap-2">
      {back && (
        <Link to={back} aria-label={t('common.back')} className="-ml-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-xl text-muted active:bg-surface-2">
          ←
        </Link>
      )}
      <h1 className="flex-1 text-2xl font-extrabold tracking-tight">{title}</h1>
      {action}
    </div>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-2 mt-6 text-sm font-bold uppercase tracking-wide text-muted">{children}</h2>
}

export function EmptyState({ anim, text, children }: { anim: MascotAnim; text: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <Mascot anim={anim} size={140} />
      <p className="max-w-xs text-muted">{text}</p>
      {children}
    </div>
  )
}

export function LevelBadge({ level }: { level?: string }) {
  if (!level) return null
  return <span className="rounded-md bg-primary-soft px-1.5 py-0.5 text-xs font-bold text-primary">{level}</span>
}
