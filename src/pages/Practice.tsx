import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, SectionTitle, SpeakButton } from '../components/ui'
import { speakingTopics } from '../content/speaking'
import { dayNumber } from '../lib/date'
import { canRecord, useRecorder } from '../lib/recorder'
import { Mascot } from '../mascot/Mascot'
import { useSettings } from '../store/settings'

const DURATIONS = [1, 3, 5]

function format(sec: number) {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
}

export function Practice() {
  const { t, settings } = useSettings()
  const topics = speakingTopics[settings.level]
  const [offset, setOffset] = useState(0)
  const topic = topics[(dayNumber() + offset) % topics.length]

  const [minutes, setMinutes] = useState(1)
  const [left, setLeft] = useState<number | null>(null)
  const { recording, url, error, start, stop } = useRecorder()

  // Countdown runs with the recording and stops it when time is up.
  useEffect(() => {
    if (left === null || left <= 0) return
    const id = window.setTimeout(() => setLeft((s) => (s === null ? null : s - 1)), 1000)
    return () => window.clearTimeout(id)
  }, [left])

  useEffect(() => {
    if (left === 0 && recording) stop()
  }, [left, recording, stop])

  const toggle = async () => {
    if (recording) {
      stop()
      setLeft(null)
    } else {
      await start()
      setLeft(minutes * 60)
    }
  }

  return (
    <div className="rise">
      <PageHeader title={t('practice.title')} />

      <section className="card">
        <div className="flex items-start gap-3">
          <Mascot anim="talk" size={80} className="shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-bold uppercase tracking-wide text-muted">
              {t('practice.topic')} · {settings.level}
            </p>
            <p className="en mt-1 text-2xl">{topic.topic}</p>
            <p className="text-muted">{topic.tr}</p>
          </div>
        </div>
        <button className="btn btn-ghost mt-2 min-h-10 w-full text-sm" onClick={() => setOffset((o) => o + 1)}>
          🔀 {t('practice.another')}
        </button>
      </section>

      <div className="grid gap-x-4 md:grid-cols-2">
        <div>
          <SectionTitle>{t('practice.questions')}</SectionTitle>
          <ul className="card space-y-2">
            {topic.questions.map((q) => (
              <li key={q} className="flex items-center gap-2">
                <SpeakButton text={q} size="sm" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionTitle>{t('practice.phrases')}</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {topic.phrases.map((p) => (
              <span key={p} className="chip bg-primary-soft text-primary">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="card mt-6 flex flex-col items-center text-center">
        <div className="flex gap-2">
          {DURATIONS.map((d) => (
            <button key={d} className="chip min-h-10 px-4" aria-pressed={minutes === d} disabled={recording} onClick={() => setMinutes(d)}>
              {d} min
            </button>
          ))}
        </div>
        <p className="mt-4 font-mono text-4xl font-bold tabular-nums">{format(left ?? minutes * 60)}</p>
        {left === 0 && <p className="mt-1 font-bold text-success">{t('practice.timeUp')}</p>}

        {canRecord ? (
          <>
            <button
              onClick={toggle}
              className={`mt-4 flex h-24 w-24 items-center justify-center rounded-full text-4xl text-white shadow-lg transition active:scale-95 ${recording ? 'animate-pulse bg-danger' : 'bg-accent'}`}
              aria-label={recording ? t('practice.stop') : t('practice.record')}
            >
              {recording ? '■' : '🎙️'}
            </button>
            <p className="mt-2 text-sm font-bold text-muted">{recording ? t('practice.stop') : t('practice.record')}</p>
            {error && <p className="mt-2 text-sm text-danger">{t('practice.micDenied')}</p>}
            {url && !recording && (
              <div className="mt-4 w-full">
                <p className="mb-1 text-sm font-bold text-muted">{t('practice.listenBack')}</p>
                <audio src={url} controls className="w-full" />
              </div>
            )}
          </>
        ) : (
          <p className="mt-4 text-sm text-muted">{t('practice.noMic')}</p>
        )}
      </section>

      <Link to="/tactics" className="card mt-4 flex items-center gap-3 bg-accent-soft">
        <span className="text-2xl">💡</span>
        <span className="flex-1 font-bold">{t('practice.tactics')}</span>
        <span className="text-muted">→</span>
      </Link>
    </div>
  )
}
