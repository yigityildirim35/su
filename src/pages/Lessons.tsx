import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui'
import { lessons } from '../content/lessons'
import { LEVELS, useSettings, type Level } from '../store/settings'

export function Lessons() {
  const { t, tx, settings } = useSettings()
  const [level, setLevel] = useState<Level>(settings.level)
  const list = lessons.filter((l) => l.level === level && l.id !== 'tenses-overview')

  return (
    <div className="rise">
      <PageHeader title={t('lessons.title')} />

      <Link to="/lessons/tenses-overview" className="card mb-3 flex items-center gap-3 bg-primary-soft">
        <span className="text-3xl">🕰️</span>
        <div className="flex-1">
          <p className="font-bold text-primary">{t('lessons.tenses')}</p>
          <p className="text-sm text-muted">{t('lessons.tensesSub')}</p>
        </div>
        <span className="text-primary">→</span>
      </Link>

      <Link to="/street" className="card mb-4 flex items-center gap-3 bg-accent-soft">
        <span className="text-3xl">🗣️</span>
        <div className="flex-1">
          <p className="font-bold">{t('lessons.street')}</p>
          <p className="text-sm text-muted">{t('lessons.streetSub')}</p>
        </div>
        <span className="text-muted">→</span>
      </Link>

      <div className="mb-4 grid grid-cols-4 gap-1 rounded-2xl bg-surface-2 p-1">
        {LEVELS.map((l) => (
          <button key={l} className={`min-h-10 rounded-xl font-bold transition ${level === l ? 'bg-surface text-primary shadow-sm' : 'text-muted'}`} onClick={() => setLevel(l)}>
            {l}
          </button>
        ))}
      </div>

      <ul className="grid gap-2 md:grid-cols-2">
        {list.map((lesson) => {
          const ready = !!lesson.sections
          const body = (
            <>
              <div className="min-w-0 flex-1">
                <p className="font-bold">{lesson.title}</p>
                <p className="truncate text-sm text-muted">{tx(lesson.subtitle)}</p>
              </div>
              {ready ? <span className="text-primary">→</span> : <span className="chip text-xs text-muted">{t('lessons.soon')}</span>}
            </>
          )
          return (
            <li key={lesson.id}>
              {ready ? (
                <Link to={`/lessons/${lesson.id}`} className="card flex min-h-16 items-center gap-3 active:scale-[0.99]">
                  {body}
                </Link>
              ) : (
                <div className="card flex min-h-16 items-center gap-3 opacity-60">{body}</div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
