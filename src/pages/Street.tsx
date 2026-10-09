import { useState } from 'react'
import { PageHeader, SpeakButton, TipBox } from '../components/ui'
import { streetCategories } from '../content/street'
import { useSettings } from '../store/settings'

export function Street() {
  const { t, tx } = useSettings()
  const [active, setActive] = useState(streetCategories[0].id)
  const cat = streetCategories.find((c) => c.id === active)!

  return (
    <div className="rise">
      <PageHeader title={t('lessons.street')} back="/lessons" />
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
        {streetCategories.map((c) => (
          <button key={c.id} className="chip min-h-10 shrink-0" aria-pressed={c.id === active} onClick={() => setActive(c.id)}>
            {c.emoji} {tx(c.title)}
          </button>
        ))}
      </div>

      <div className="my-4">
        <TipBox>{tx(cat.intro)}</TipBox>
      </div>

      {cat.items && (
        <ul className="space-y-2">
          {cat.items.map((i) => (
            <li key={i.en} className="card flex items-center gap-3">
              <div className="flex-1">
                <p className="en text-lg">{i.en}</p>
                <p className="text-sm text-muted">{i.tr}</p>
                {i.example && <p className="mt-1 italic">“{i.example}”</p>}
              </div>
              <SpeakButton text={i.example ?? i.en} size="sm" />
            </li>
          ))}
        </ul>
      )}

      {cat.dialogue && (
        <div className="space-y-2">
          {cat.dialogue.map((d, i) => (
            <div key={i} className={`flex items-center gap-2 ${d.who === 'B' ? 'flex-row-reverse' : ''}`}>
              <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 ${d.who === 'A' ? 'rounded-bl-sm bg-surface-2' : 'rounded-br-sm bg-primary-soft text-primary'}`}>{d.line}</div>
              <SpeakButton text={d.line} size="sm" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
