import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { EmptyState, PageHeader, SectionTitle, SpeakButton, TipBox } from '../components/ui'
import { lessons, TENSE_IDS, type LessonSection, type QuizQuestion } from '../content/lessons'
import { Mascot } from '../mascot/Mascot'
import { useSettings } from '../store/settings'

function Section({ section }: { section: LessonSection }) {
  const { t, tx } = useSettings()
  switch (section.kind) {
    case 'tip':
      return (
        <div className="my-5">
          <TipBox>{tx(section.text)}</TipBox>
        </div>
      )
    case 'structure':
      return (
        <>
          <SectionTitle>📐 {t('lessons.structure')}</SectionTitle>
          <div className="grid gap-2 md:grid-cols-3">
            {section.rows.map((r) => (
              <div key={r.formula} className="card">
                <p className="text-xs font-bold uppercase text-muted">{tx(r.label)}</p>
                <p className="mt-1 whitespace-pre-line rounded-xl bg-primary-soft px-3 py-2 font-mono text-sm font-bold text-primary">{r.formula}</p>
                <p className="mt-2 flex items-center gap-2">
                  <span className="flex-1">{r.example}</span>
                  <SpeakButton text={r.example} size="sm" />
                </p>
              </div>
            ))}
          </div>
        </>
      )
    case 'when':
      return (
        <>
          <SectionTitle>🕐 {t('lessons.when')}</SectionTitle>
          <ul className="space-y-2">
            {section.items.map((i) => (
              <li key={i.example} className="card">
                <p className="font-bold">{tx(i.text)}</p>
                <p className="en mt-1 flex items-center gap-2">
                  <span className="flex-1">{i.example}</span>
                  <SpeakButton text={i.example} size="sm" />
                </p>
              </li>
            ))}
          </ul>
        </>
      )
    case 'signals':
      return (
        <>
          <SectionTitle>🔎 {t('lessons.signals')}</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {section.words.map((w) => (
              <span key={w} className="chip bg-accent-soft">
                {w}
              </span>
            ))}
          </div>
        </>
      )
    case 'overview':
      return (
        <div className="-mx-4 mt-4 overflow-x-auto px-4 pb-2">
          <table className="w-full min-w-[640px] border-separate border-spacing-1.5 text-sm">
            <thead>
              <tr>
                <th />
                {section.columns.map((c) => (
                  <th key={c} className="px-1 text-left font-bold text-muted">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row) => (
                <tr key={row.label.en}>
                  <th className="w-20 pr-1 text-left align-middle font-bold">{tx(row.label)}</th>
                  {row.cells.map((cell) => (
                    <td key={cell.id} className="align-top">
                      <Link to={`/lessons/${cell.id}`} className="block h-full rounded-2xl border border-line bg-surface p-2.5 transition active:scale-95 hover:border-primary">
                        <span className="block font-mono text-xs font-bold text-primary">{cell.formula}</span>
                        <span className="mt-1 block">{cell.example}</span>
                      </Link>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'examples':
      return (
        <>
          <SectionTitle>✏️ {t('lessons.examples')}</SectionTitle>
          <ul className="card divide-y divide-line p-0">
            {section.items.map((i) => (
              <li key={i.en} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1">
                  <p className="en">{i.en}</p>
                  <p className="text-sm text-muted">{i.tr}</p>
                </div>
                <SpeakButton text={i.en} size="sm" />
              </li>
            ))}
          </ul>
        </>
      )
    case 'daily':
      return (
        <>
          <SectionTitle>☕ {t('lessons.daily')}</SectionTitle>
          <div className="card">
            <p className="mb-2 text-muted">{tx(section.text)}</p>
            <ul className="space-y-1.5">
              {section.items.map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <SpeakButton text={i} size="sm" />
                  <span className="en">{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )
    case 'media':
      return (
        <>
          <SectionTitle>🎬 {t('lessons.media')}</SectionTitle>
          <ul className="grid gap-2 md:grid-cols-3">
            {section.items.map((m) => (
              <li key={m.line} className="card bg-accent-soft">
                <p className="en text-lg">“{m.line}”</p>
                <p className="text-sm font-bold">
                  {m.title}
                  {m.who && <span className="font-normal text-muted"> · {m.who}</span>}
                </p>
                <p className="mt-1 text-sm text-muted">{tx(m.note)}</p>
              </li>
            ))}
          </ul>
        </>
      )
    case 'mistakes':
      return (
        <>
          <SectionTitle>⚠️ {t('lessons.mistakes')}</SectionTitle>
          <ul className="space-y-2">
            {section.items.map((m) => (
              <li key={m.wrong} className="card">
                <p className="text-danger line-through">✗ {m.wrong}</p>
                <p className="font-bold text-success">✓ {m.right}</p>
                <p className="mt-1 text-sm text-muted">{tx(m.why)}</p>
              </li>
            ))}
          </ul>
        </>
      )
  }
}

function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const { t, tx } = useSettings()
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const done = Object.keys(answers).length === questions.length
  const score = questions.filter((q, i) => answers[i] === q.answer).length

  return (
    <>
      <SectionTitle>🧠 {t('lessons.quiz')}</SectionTitle>
      <div className="space-y-3">
        {questions.map((q, qi) => (
          <div key={qi} className="card">
            <p className="font-bold">{q.question}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {q.options.map((o, oi) => {
                const picked = answers[qi]
                const style = picked === undefined ? '' : oi === q.answer ? '!bg-success-soft !text-success' : oi === picked ? '!bg-danger-soft !text-danger' : 'opacity-50'
                return (
                  <button key={o} className={`chip min-h-10 ${style}`} disabled={picked !== undefined} onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}>
                    {o}
                  </button>
                )
              })}
            </div>
            {answers[qi] !== undefined && q.explain && <p className="mt-2 text-sm text-muted">{tx(q.explain)}</p>}
          </div>
        ))}
      </div>
      {done && (
        <div className="mt-4 flex items-center gap-3">
          <Mascot anim={score === questions.length ? 'celebrate' : 'think'} size={96} />
          <p className="text-2xl font-extrabold">
            {score} / {questions.length}
          </p>
        </div>
      )}
    </>
  )
}

export function LessonDetail() {
  const { id } = useParams()
  const { t, tx } = useSettings()
  const lesson = lessons.find((l) => l.id === id)
  if (!lesson?.sections) return <EmptyState anim="read" text="…" />

  // Tense lessons are a series: offer the next one at the bottom.
  const tenses = lessons.filter((l) => TENSE_IDS.has(l.id))
  const next = TENSE_IDS.has(lesson.id) ? tenses[tenses.findIndex((l) => l.id === lesson.id) + 1] : undefined

  return (
    <div className="rise">
      <PageHeader title={lesson.title} back="/lessons" />
      <p className="-mt-3 mb-2 text-muted">{tx(lesson.subtitle)}</p>
      {lesson.sections.map((s, i) => (
        <Section key={i} section={s} />
      ))}
      {lesson.quiz && <Quiz key={lesson.id} questions={lesson.quiz} />}
      {next && (
        <Link to={`/lessons/${next.id}`} className="card mt-8 flex items-center gap-3 bg-primary-soft">
          <div className="flex-1">
            <p className="text-xs font-bold uppercase text-muted">{t('lessons.next')}</p>
            <p className="font-bold text-primary">{next.title}</p>
          </div>
          <span className="text-primary">→</span>
        </Link>
      )}
    </div>
  )
}
