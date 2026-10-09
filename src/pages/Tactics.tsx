import { PageHeader, SpeakButton, TipBox } from '../components/ui'
import { selfTalkTactics } from '../content/tactics'
import { useSettings } from '../store/settings'

export function Tactics() {
  const { t, tx } = useSettings()
  return (
    <div className="rise">
      <PageHeader title={t('practice.tactics')} back="/practice" />
      <div className="space-y-2">
        {selfTalkTactics.map((tactic, i) => (
          <details key={i} className="card group" open={i === 0}>
            <summary className="flex min-h-10 cursor-pointer list-none items-center gap-3 font-bold">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm text-primary">{i + 1}</span>
              <span className="flex-1">{tx(tactic.title)}</span>
              <span className="text-muted transition group-open:rotate-180">⌄</span>
            </summary>
            <div className="mt-3">
              <TipBox anim={(['explain', 'think', 'idle', 'celebrate', 'surprise'] as const)[i % 5]}>{tx(tactic.body)}</TipBox>
              {tactic.example && (
                <p className="en mt-3 flex items-center gap-2 italic">
                  <span className="flex-1">“{tactic.example}”</span>
                  <SpeakButton text={tactic.example} size="sm" />
                </p>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
