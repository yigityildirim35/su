import { useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { EmptyState, LEVEL_NAMES, MascotBubble, SpeakButton } from '../components/ui'
import { lessons, nextLesson, OVERVIEW_ID, type LessonSection, type QuizQuestion } from '../content/lessons'
import { speak } from '../lib/speech'
import { Mascot } from '../mascot/Mascot'
import type { MascotAnim } from '../mascot/registry'
import { LEVELS, useSettings } from '../store/settings'

const TIP_POSES: MascotAnim[] = ['explain', 'think', 'idle', 'surprise']
const DOTS = ['var(--primary-2)', 'var(--success)', 'var(--accent-2)', 'var(--primary)', 'var(--accent)']

function Numbered({ n, children, right }: { n: number; children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-3 mt-10 flex items-center gap-3">
      <h2 className="section-title flex-1 text-[20px] sm:text-[22px]" style={{ ['--dot' as string]: DOTS[(n - 1) % DOTS.length] }}>
        {n}. {children}
      </h2>
      {right}
    </div>
  )
}

function Tip({ text, index }: { text: string; index: number }) {
  const { l } = useSettings()
  return (
    <div className="my-6 flex items-start gap-4 rounded-[24px] border border-line bg-surface p-4 shadow-card sm:p-5">
      <MascotBubble anim={TIP_POSES[index % TIP_POSES.length]} size={64} className="bg-primary-soft" />
      <div className="min-w-0 flex-1">
        <p className="mb-1 flex flex-wrap items-center gap-2">
          <span className="font-display font-bold text-primary">{index === 0 ? l('Su’nun püf noktası', 'Su’s secret trick') : l('Su’dan bir not', 'A note from Su')}</span>
          <span className="tag tag-peach">{l('İpucu', 'Pro tip')}</span>
        </p>
        <p className="text-[15px] leading-relaxed text-text-2">{text}</p>
      </div>
    </div>
  )
}

function Section({ section, n, tipIndex }: { section: LessonSection; n: number; tipIndex: number }) {
  const { l, tx } = useSettings()
  switch (section.kind) {
    case 'tip':
      return <Tip text={tx(section.text)} index={tipIndex} />
    case 'structure':
      return (
        <>
          <Numbered n={n}>{l('Yapı ve formül', 'Structure & formula')}</Numbered>
          <div className={`grid gap-3 ${section.rows.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {section.rows.map((r, i) => (
              <div key={r.formula} className="card flex flex-col p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-primary">{tx(r.label)}</span>
                  <span className={`tag ${['tag-lav', 'tag-peach', 'tag-sage'][i % 3]}`}>{i === 0 ? '+' : i === 1 ? '−' : '?'}</span>
                </div>
                <p className="whitespace-pre-line rounded-2xl bg-primary-soft/50 px-3 py-2.5 font-mono text-[13px] font-bold leading-relaxed text-primary">{r.formula}</p>
                <p className="mt-3 flex flex-1 items-end gap-2 text-[15px]">
                  <span className="en flex-1">{r.example}</span>
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
          <Numbered n={n}>{l('Ne zaman kullanılır?', 'When to use it')}</Numbered>
          <ul className="card divide-y divide-line p-0">
            {section.items.map((it, i) => (
              <li key={it.example} className="flex items-start gap-3 px-4 py-4 sm:px-5">
                <div className="min-w-0 flex-1">
                  <p className="eyebrow text-muted">
                    {l('Senaryo', 'Scenario')} {String.fromCharCode(65 + i)} · {tx(it.text)}
                  </p>
                  <p className="mt-1 text-[17px] font-semibold text-primary">“{it.example}”</p>
                </div>
                <SpeakButton text={it.example} size="sm" />
              </li>
            ))}
          </ul>
        </>
      )
    case 'signals':
      return (
        <div className="paper mt-4 p-4">
          <p className="eyebrow mb-2 flex items-center gap-1.5">
            <Icon name="schedule" size={16} className="text-primary" /> {l('Zaman işaretleri', 'Time markers')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {section.words.map((w) => (
              <span key={w} className="tag tag-lav text-[12px]">
                {w}
              </span>
            ))}
          </div>
        </div>
      )
    case 'examples':
      return (
        <>
          <Numbered n={n}>{l('Örnekler', 'Examples')}</Numbered>
          <ul className="card divide-y divide-line p-0">
            {section.items.map((it) => (
              <li key={it.en} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                <div className="min-w-0 flex-1">
                  <p className="en text-[16px]">{it.en}</p>
                  <p className="tr text-sm">{it.tr}</p>
                </div>
                <SpeakButton text={it.en} size="sm" />
              </li>
            ))}
          </ul>
        </>
      )
    case 'daily':
      return (
        <>
          <Numbered n={n}>{l('Günlük hayatta', 'In daily life')}</Numbered>
          <p className="tr -mt-1 mb-3 text-[15px]">{tx(section.text)}</p>
          <div className="card">
            <p className="mb-4 flex items-center gap-2 text-sm font-bold">
              <Icon name="local_cafe" size={18} className="text-accent" /> {l('Kafede sohbet', 'Coffee shop catch-up')}
            </p>
            <div className="space-y-3">
              {section.items.map((line, i) => {
                const right = i % 2 === 1
                return (
                  <div key={line} className={`flex items-end gap-2 ${right ? 'flex-row-reverse' : ''}`}>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${right ? 'bg-success-soft text-success' : 'bg-primary-soft text-primary'}`}>{right ? 'SU' : 'A'}</span>
                    <div className={`max-w-[80%] rounded-[18px] px-4 py-2.5 text-[15px] ${right ? 'rounded-br-md bg-success-soft/60' : 'rounded-bl-md bg-surface-3'}`}>{line}</div>
                    <SpeakButton text={line} size="sm" />
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )
    case 'media':
      return (
        <>
          <Numbered n={n}>{l('Filmlerde ve dizilerde', 'In movies & series')}</Numbered>
          <div className="grid gap-3 md:grid-cols-2">
            {section.items.map((m) => (
              <div key={m.line} className="paper flex flex-col p-4">
                <p className="eyebrow flex items-center gap-1.5 text-accent">
                  <Icon name="movie" size={16} /> {m.title}
                </p>
                <p className="mt-2 font-serif text-[18px] italic leading-snug">“{m.line}”</p>
                {m.who && <p className="mt-1 text-xs font-bold text-text-2">— {m.who}</p>}
                <p className="mt-2 flex-1 text-[13px] text-muted">{tx(m.note)}</p>
                <div className="mt-2 self-end">
                  <SpeakButton text={m.line} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </>
      )
    case 'mistakes':
      return (
        <>
          <Numbered n={n}>{l('Sık yapılan hatalar', 'Common mistakes')}</Numbered>
          <p className="tr -mt-1 mb-3 text-[15px]">{l('Türkçe düşünürken düşülen tuzaklar.', 'Traps Turkish learners often fall into.')}</p>
          <div className="space-y-3">
            {section.items.map((m) => (
              <div key={m.wrong} className="grid gap-2 sm:grid-cols-2">
                <div className="flex items-start gap-2 rounded-2xl border border-danger-soft bg-danger-soft/50 p-3.5">
                  <Icon name="cancel" size={20} className="text-danger" />
                  <p className="font-semibold text-danger line-through decoration-2">{m.wrong}</p>
                </div>
                <div className="flex items-start gap-2 rounded-2xl border border-success-soft bg-success-soft/50 p-3.5">
                  <Icon name="check_circle" size={20} className="text-success" />
                  <div>
                    <p className="font-bold text-success">{m.right}</p>
                    <p className="mt-0.5 text-[13px] text-text-2">{tx(m.why)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )
    case 'overview':
      return (
        <div className="no-scrollbar -mx-4 mt-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[640px] border-separate border-spacing-2 text-sm">
            <thead>
              <tr>
                <th />
                {section.columns.map((c) => (
                  <th key={c} className="eyebrow px-1 text-left">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, ri) => (
                <tr key={row.label.en}>
                  <th className="font-display w-24 pr-1 text-left align-middle text-[15px] font-bold" style={{ color: DOTS[ri] }}>
                    {tx(row.label)}
                  </th>
                  {row.cells.map((cell) => (
                    <td key={cell.id} className="align-top">
                      <Link to={`/lessons/${cell.id}`} className="block h-full rounded-[18px] border border-line bg-surface p-3 shadow-card transition hover:-translate-y-0.5 hover:border-primary-2">
                        <span className="block font-mono text-[12px] font-bold text-primary">{cell.formula}</span>
                        <span className="mt-1.5 block font-semibold">{cell.example}</span>
                      </Link>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

function Quiz({ questions, n }: { questions: QuizQuestion[]; n: number }) {
  const { l, tx } = useSettings()
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const done = Object.keys(answers).length === questions.length
  const score = questions.filter((q, i) => answers[i] === q.answer).length

  return (
    <>
      <Numbered n={n} right={<span className="tag tag-sage">{l(`${questions.length} soru`, `${questions.length} questions`)}</span>}>
        {l('Mini kontrol quiz’i', 'Mini checkpoint quiz')}
      </Numbered>
      <div className="card space-y-6">
        {questions.map((q, qi) => (
          <div key={qi}>
            <p className="eyebrow text-muted">
              {l('Soru', 'Question')} {qi + 1} / {questions.length}
            </p>
            <p className="mt-1 text-[17px] font-semibold">{q.question}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {q.options.map((o, oi) => {
                const picked = answers[qi]
                const style =
                  picked === undefined
                    ? 'border-line bg-surface hover:border-primary-2 hover:bg-primary-soft/30'
                    : oi === q.answer
                      ? 'border-success bg-success-soft/70'
                      : oi === picked
                        ? 'border-danger bg-danger-soft/60'
                        : 'border-line bg-surface opacity-50'
                return (
                  <button
                    key={o}
                    disabled={picked !== undefined}
                    onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                    className={`flex min-h-12 items-center gap-2 rounded-2xl border-[1.5px] px-4 py-2.5 text-left font-semibold transition ${style}`}
                  >
                    <span className="flex-1">{o}</span>
                    {picked === undefined && <Icon name="arrow_forward" size={18} className="text-outline" />}
                    {picked !== undefined && oi === q.answer && <Icon name="check_circle" fill size={20} className="text-success" />}
                    {picked === oi && oi !== q.answer && <Icon name="cancel" fill size={20} className="text-danger" />}
                  </button>
                )
              })}
            </div>
            {answers[qi] !== undefined && q.explain && <p className="tr mt-2 text-sm">{tx(q.explain)}</p>}
          </div>
        ))}
        {done && (
          <div className="flex items-center gap-4 rounded-2xl bg-surface-2 p-4">
            <Mascot anim={score === questions.length ? 'celebrate' : score * 2 < questions.length ? 'surprise' : 'think'} size={100} />
            <div>
              <p className="font-display text-[28px] font-bold">
                {score} / {questions.length}
              </p>
              <p className="tr">{score === questions.length ? l('Mükemmel! Hepsi doğru.', 'Perfect! All correct.') : l('Güzel! Yanlışlara bir kez daha göz at.', 'Nice! Have another look at the mistakes.')}</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export function LessonDetail() {
  const { id } = useParams()
  const { l, tx } = useSettings()
  const lesson = lessons.find((x) => x.id === id)
  if (!lesson?.sections) return <EmptyState anim="read" text="…" />

  const next = nextLesson(lesson.id)
  const sameLevel = lessons.filter((x) => x.level === lesson.level && x.id !== OVERVIEW_ID)
  const position = sameLevel.findIndex((x) => x.id === lesson.id) + 1
  const readMinutes = Math.max(3, Math.round(JSON.stringify(lesson.sections).length / 900))
  const examples = lesson.sections.flatMap((s) => (s.kind === 'examples' ? s.items.map((i) => i.en) : s.kind === 'structure' ? s.rows.map((r) => r.example) : []))

  let n = 0
  let tips = 0
  const numberedKinds = new Set(['structure', 'when', 'examples', 'daily', 'media', 'mistakes'])

  return (
    <div className="rise">
      <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-muted">
        <Link to="/lessons" className="hover:text-primary">
          {l('Konular', 'Lessons')}
        </Link>
        <span>/</span>
        <Link to={`/lessons?level=${lesson.level}`} className="hover:text-primary">
          {lesson.level} {tx(LEVEL_NAMES[lesson.level])}
        </Link>
        <span>/</span>
        <span className="text-text-2">{lesson.title}</span>
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex gap-1 rounded-full bg-surface-3 p-1">
          {LEVELS.map((lv) => (
            <Link key={lv} to={`/lessons?level=${lv}`} className={`rounded-full px-3 py-1 text-xs font-bold ${lv === lesson.level ? 'bg-primary text-on-primary' : 'text-text-2'}`}>
              {lv}
            </Link>
          ))}
        </div>
        {position > 0 && (
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-text-2">
            <span className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-3">
              <span className="block h-full rounded-full bg-success" style={{ width: `${(position / sameLevel.length) * 100}%` }} />
            </span>
            {l(`Konu ${position} / ${sameLevel.length}`, `Lesson ${position} of ${sameLevel.length}`)}
          </span>
        )}
      </div>

      <section className="card relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary-soft/50 blur-3xl" />
        <span className="tag tag-lav relative">{lesson.id === OVERVIEW_ID ? l('Genel bakış', 'Overview') : l('Bağlamda gramer', 'Grammar in context')}</span>
        <h1 className="relative mt-3 text-[28px] font-bold leading-tight tracking-tight sm:text-[34px]">{lesson.title}</h1>
        <p className="tr relative mt-1 text-[16px]">{tx(lesson.subtitle)}</p>
        <div className="relative mt-4 flex flex-wrap items-center gap-2">
          <span className="chip">
            <Icon name="schedule" size={16} /> ~{readMinutes} {l('dk sakin okuma', 'min cozy read')}
          </span>
          {lesson.quiz && (
            <span className="chip">
              <Icon name="fact_check" size={16} /> {lesson.quiz.length} {l('kontrol noktası', 'checkpoints')}
            </span>
          )}
          {examples.length > 0 && (
            <button className="btn btn-primary ml-auto min-h-10 px-4 text-sm" onClick={() => speak(examples.join('. '))}>
              <Icon name="play_circle" size={18} /> {l('Örnekleri dinle', 'Listen to examples')}
            </button>
          )}
        </div>
      </section>

      {lesson.sections.map((s, i) => {
        if (numberedKinds.has(s.kind)) n++
        const tipIndex = s.kind === 'tip' ? tips++ : tips
        return <Section key={i} section={s} n={n} tipIndex={tipIndex} />
      })}
      {lesson.quiz && <Quiz key={lesson.id} questions={lesson.quiz} n={n + 1} />}

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link to={`/lessons?level=${lesson.level}`} className="btn btn-secondary">
          <Icon name="arrow_back" size={18} /> {l('Konulara dön', 'Back to lessons')}
        </Link>
        {next && (
          <Link to={`/lessons/${next.id}`} className="btn btn-primary flex-1 justify-between">
            <span className="truncate">
              {l('Sonraki', 'Next')}: {next.title}
            </span>
            <Icon name="arrow_forward" size={20} />
          </Link>
        )}
      </div>
    </div>
  )
}
