import { useState } from 'react'
import { Icon } from '../components/Icon'
import { MascotBubble, PageHeader, SpeakButton } from '../components/ui'
import { selfTalkTactics } from '../content/tactics'
import type { MascotAnim } from '../mascot/registry'
import { useSettings } from '../store/settings'

const POSES: MascotAnim[] = ['explain', 'think', 'idle', 'celebrate', 'surprise']

export function Tactics() {
  const { l, tx } = useSettings()
  const [open, setOpen] = useState(0)
  return (
    <div className="rise">
      <PageHeader back="/practice" backLabel={l('Konuşma stüdyosu', 'Speaking studio')} title={l('Kendi kendine konuşma taktikleri', 'Self-talk tactics')} subtitle={l('Partner olmadan da konuşma pratiği yapmanın yolları.', 'Ways to practise speaking without a partner.')} />
      <div className="space-y-3">
        {selfTalkTactics.map((tactic, i) => {
          const isOpen = open === i
          return (
            <section key={i} className="card p-0 sm:p-0">
              <button className="flex w-full items-center gap-3 p-4 text-left sm:p-5" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">{i + 1}</span>
                <span className="font-display flex-1 text-[17px] font-bold">{tx(tactic.title)}</span>
                <Icon name="expand_more" className={`text-text-2 transition ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="flex items-start gap-4 border-t border-line p-4 sm:p-5">
                  <MascotBubble anim={POSES[i % POSES.length]} size={60} className="bg-primary-soft" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] leading-relaxed text-text-2">{tx(tactic.body)}</p>
                    {tactic.example && (
                      <p className="mt-3 flex items-start gap-2 rounded-2xl bg-surface-2 p-3 italic">
                        <span className="flex-1">“{tactic.example}”</span>
                        <SpeakButton text={tactic.example} size="sm" />
                      </p>
                    )}
                  </div>
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
