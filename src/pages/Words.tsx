import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { EmptyState, LevelBadge, PageHeader, SpeakButton } from '../components/ui'
import { WordForm } from '../components/WordForm'
import { isDue, isLearned } from '../lib/srs'
import { LEVELS, useSettings, type Level } from '../store/settings'
import { useWords } from '../store/words'

type Status = 'all' | 'learning' | 'learned' | 'due'

export function Words() {
  const { t } = useSettings()
  const { words } = useWords()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<Status>('all')
  const [level, setLevel] = useState<Level | null>(null)
  const adding = params.get('add') === '1'

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return words.filter((w) => {
      if (q && !w.word.toLowerCase().includes(q) && !w.tr.toLowerCase().includes(q)) return false
      if (level && w.level !== level) return false
      if (status === 'learned') return isLearned(w.srs)
      if (status === 'learning') return !isLearned(w.srs)
      if (status === 'due') return isDue(w.srs)
      return true
    })
  }, [words, query, status, level])

  const statuses: { id: Status; label: string }[] = [
    { id: 'all', label: t('words.all') },
    { id: 'due', label: t('words.due') },
    { id: 'learning', label: t('words.learning') },
    { id: 'learned', label: t('words.learned') },
  ]

  return (
    <div className="rise">
      <PageHeader
        title={t('words.title')}
        action={
          words.length > 0 && (
            <Link to="/study" className="btn btn-soft min-h-10 px-4">
              {t('words.study')}
            </Link>
          )
        }
      />

      {words.length === 0 ? (
        <EmptyState anim="sleep" text={t('words.empty')}>
          <button className="btn btn-primary" onClick={() => setParams({ add: '1' })}>
            + {t('words.add')}
          </button>
        </EmptyState>
      ) : (
        <>
          <input className="input" type="search" placeholder={t('words.search')} value={query} onChange={(e) => setQuery(e.target.value)} />
          <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
            {statuses.map((s) => (
              <button key={s.id} className="chip shrink-0" aria-pressed={status === s.id} onClick={() => setStatus(s.id)}>
                {s.label}
              </button>
            ))}
            <span className="mx-1 w-px shrink-0 bg-line" />
            {LEVELS.map((l) => (
              <button key={l} className="chip shrink-0" aria-pressed={level === l} onClick={() => setLevel(level === l ? null : l)}>
                {l}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="py-10 text-center text-muted">{t('words.noMatch')}</p>
          ) : (
            <ul className="mt-3 divide-y divide-line overflow-hidden rounded-[20px] border border-line bg-surface md:grid md:grid-cols-2 md:divide-y-0 md:gap-px md:bg-line">
              {filtered.map((w) => (
                <li key={w.id} className="bg-surface">
                  <Link to={`/words/${w.id}`} className="flex min-h-16 items-center gap-3 px-4 py-2 active:bg-surface-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="en truncate text-lg">{w.word}</span>
                        <LevelBadge level={w.level} />
                        {isLearned(w.srs) && <span aria-label={t('words.learned')}>✅</span>}
                      </div>
                      <div className="truncate text-sm text-muted">
                        {w.ipa && <span className="mr-2">{w.ipa}</span>}
                        {w.tr}
                      </div>
                    </div>
                    <SpeakButton text={w.word} size="sm" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <button
        className="btn btn-primary fixed bottom-[calc(76px+env(safe-area-inset-bottom))] right-4 z-10 h-14 w-14 rounded-full p-0 text-3xl shadow-lg md:bottom-8 md:right-8"
        onClick={() => setParams({ add: '1' })}
        aria-label={t('words.add')}
      >
        +
      </button>

      {adding && <WordForm onClose={() => setParams({})} />}
    </div>
  )
}
