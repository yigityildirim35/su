import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EmptyState, LevelBadge, PageHeader, SectionTitle, SpeakButton } from '../components/ui'
import { WordForm } from '../components/WordForm'
import { useSettings } from '../store/settings'
import { useWords } from '../store/words'

export function WordDetail() {
  const { id } = useParams()
  const { t, settings, update } = useSettings()
  const { words, remove } = useWords()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const word = words.find((w) => w.id === id)

  if (!word) return <EmptyState anim="surprise" text={t('word.notFound')} />

  return (
    <div className="rise">
      <PageHeader title="" back="/words" />

      <div className="card text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-muted">
          {word.pos && <span className="italic">{word.pos}</span>}
          <LevelBadge level={word.level} />
        </div>
        <h1 className="en mt-1 break-words text-4xl font-extrabold">{word.word}</h1>
        {word.ipa && <p className="mt-1 text-lg text-muted">{word.ipa}</p>}
        <div className="mt-3 flex items-center justify-center gap-3">
          <SpeakButton text={word.word} size="lg" />
          {word.audio && (
            <button className="chip min-h-10" onClick={() => new Audio(word.audio).play().catch(() => undefined)}>
              🎧 audio
            </button>
          )}
          <button className="chip min-h-10" onClick={() => update({ accent: settings.accent === 'en-US' ? 'en-GB' : 'en-US' })}>
            {settings.accent === 'en-US' ? '🇺🇸 US' : '🇬🇧 UK'}
          </button>
        </div>
        <p className="mt-4 text-2xl font-bold">{word.tr}</p>
      </div>

      {word.definition && (
        <>
          <SectionTitle>{t('word.definition')}</SectionTitle>
          <p className="card">{word.definition}</p>
        </>
      )}

      {word.examples.length > 0 && (
        <>
          <SectionTitle>{t('word.examples')}</SectionTitle>
          <ul className="space-y-2">
            {word.examples.map((ex) => (
              <li key={ex} className="card flex items-center gap-3">
                <span className="flex-1">{ex}</span>
                <SpeakButton text={ex} size="sm" />
              </li>
            ))}
          </ul>
        </>
      )}

      {word.media && (
        <>
          <SectionTitle>🎬 {t('word.seenIn')}</SectionTitle>
          <div className="card flex items-center gap-3 bg-accent-soft">
            <div className="flex-1">
              <p className="en text-lg">“{word.media.line}”</p>
              <p className="text-sm text-muted">
                {word.media.title}
                {word.media.source && ` · ${word.media.source}`}
              </p>
            </div>
            <SpeakButton text={word.media.line} size="sm" />
          </div>
        </>
      )}

      {word.synonyms.length > 0 && (
        <>
          <SectionTitle>{t('word.synonyms')}</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {word.synonyms.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </>
      )}

      <div className="mt-8 flex gap-3">
        <button className="btn btn-soft flex-1" onClick={() => setEditing(true)}>
          ✏️ {t('word.edit')}
        </button>
        <button
          className="btn flex-1 bg-danger-soft text-danger"
          onClick={() => {
            if (window.confirm(t('word.deleteConfirm'))) {
              remove(word.id)
              navigate('/words')
            }
          }}
        >
          🗑️ {t('word.delete')}
        </button>
      </div>

      {editing && <WordForm editing={word} onClose={() => setEditing(false)} />}
    </div>
  )
}
