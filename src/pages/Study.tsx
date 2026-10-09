import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { EmptyState, PageHeader, SpeakButton } from '../components/ui'
import { speak } from '../lib/speech'
import { isDue } from '../lib/srs'
import { Mascot } from '../mascot/Mascot'
import { useSettings } from '../store/settings'
import { useWords, type Word } from '../store/words'

type Mode = 'flash' | 'choice' | 'type' | 'listen'

function shuffle<T>(items: T[]): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const clean = (s: string) => s.trim().toLowerCase().replace(/[’']/g, "'").replace(/[.!?]$/, '')

function Flashcard({ word, onAnswer }: { word: Word; onAnswer: (ok: boolean) => void }) {
  const { t } = useSettings()
  const [flipped, setFlipped] = useState(false)
  const [dx, setDx] = useState(0)
  const [dragging, setDragging] = useState(false)
  const start = useRef<number | null>(null)

  const end = () => {
    if (start.current !== null && Math.abs(dx) > 90) onAnswer(dx > 0)
    start.current = null
    setDragging(false)
    setDx(0)
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label={t('study.tapToFlip')}
        onClick={() => Math.abs(dx) < 5 && setFlipped((f) => !f)}
        onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && setFlipped((f) => !f)}
        onPointerDown={(e) => {
          start.current = e.clientX
          setDragging(true)
        }}
        onPointerMove={(e) => start.current !== null && setDx(e.clientX - start.current)}
        onPointerUp={end}
        onPointerCancel={end}
        className="card relative flex min-h-[320px] touch-pan-y select-none flex-col items-center justify-center text-center shadow-sm"
        style={{ transform: `translateX(${dx}px) rotate(${dx / 25}deg)`, transition: dragging ? 'none' : 'transform .2s' }}
      >
        {dx > 40 && <span className="absolute left-4 top-4 rounded-lg bg-success-soft px-2 py-1 font-bold text-success">{t('study.knew')}</span>}
        {dx < -40 && <span className="absolute right-4 top-4 rounded-lg bg-danger-soft px-2 py-1 font-bold text-danger">{t('study.again')}</span>}
        {!flipped ? (
          <>
            <p className="en break-words text-4xl font-extrabold">{word.word}</p>
            {word.ipa && <p className="mt-2 text-muted">{word.ipa}</p>}
            <div className="mt-4" onPointerDown={(e) => e.stopPropagation()}>
              <SpeakButton text={word.word} size="lg" />
            </div>
            <p className="mt-6 text-sm text-muted">{t('study.tapToFlip')}</p>
          </>
        ) : (
          <>
            <p className="text-3xl font-extrabold">{word.tr}</p>
            {word.definition && <p className="mt-3 text-muted">{word.definition}</p>}
            {word.examples[0] && <p className="en mt-4 italic">“{word.examples[0]}”</p>}
          </>
        )}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button className="btn bg-danger-soft text-danger" onClick={() => onAnswer(false)}>
          ↺ {t('study.again')}
        </button>
        <button className="btn bg-success-soft text-success" onClick={() => onAnswer(true)}>
          ✓ {t('study.knew')}
        </button>
      </div>
    </div>
  )
}

function Choice({ word, pool, onAnswer }: { word: Word; pool: Word[]; onAnswer: (ok: boolean) => void }) {
  const { t } = useSettings()
  const options = useMemo(() => shuffle([word, ...shuffle(pool.filter((w) => w.id !== word.id)).slice(0, 3)]), [word, pool])
  const [picked, setPicked] = useState<string | null>(null)

  return (
    <div>
      <div className="card flex min-h-[160px] flex-col items-center justify-center text-center">
        <p className="en text-4xl font-extrabold">{word.word}</p>
        <div className="mt-3">
          <SpeakButton text={word.word} />
        </div>
      </div>
      <div className="mt-4 grid gap-2">
        {options.map((o) => {
          const state = picked === null ? '' : o.id === word.id ? 'border-success bg-success-soft' : o.id === picked ? 'border-danger bg-danger-soft' : 'opacity-50'
          return (
            <button key={o.id} disabled={picked !== null} className={`card min-h-14 text-left font-bold transition ${state}`} onClick={() => setPicked(o.id)}>
              {o.tr}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <button className="btn btn-primary mt-4 w-full" onClick={() => onAnswer(picked === word.id)}>
          {t('study.next')} →
        </button>
      )}
    </div>
  )
}

function TypeIn({ word, listen, onAnswer }: { word: Word; listen: boolean; onAnswer: (ok: boolean) => void }) {
  const { t, settings } = useSettings()
  const [value, setValue] = useState('')
  const [result, setResult] = useState<boolean | null>(null)

  useEffect(() => {
    if (listen) speak(word.word, settings.accent)
  }, [listen, word, settings.accent])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (result === null) setResult(clean(value) === clean(word.word))
        else onAnswer(result)
      }}
    >
      <div className="card flex min-h-[160px] flex-col items-center justify-center text-center">
        {listen ? <SpeakButton text={word.word} size="lg" /> : <p className="text-3xl font-extrabold">{word.tr}</p>}
        {!listen && word.examples[0] && <p className="mt-3 text-sm text-muted">{word.examples[0].replace(new RegExp(word.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig'), '____')}</p>}
      </div>
      <input
        className="input mt-4 text-center text-lg"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t('study.typeHere')}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        readOnly={result !== null}
        autoFocus
      />
      {result !== null && (
        <p className={`mt-3 text-center font-bold ${result ? 'text-success' : 'text-danger'}`}>
          {result ? t('study.correct') : `${t('study.wrong')} ${word.word}`}
        </p>
      )}
      <button type="submit" className="btn btn-primary mt-4 w-full" disabled={result === null && !value.trim()}>
        {result === null ? t('study.check') : `${t('study.next')} →`}
      </button>
    </form>
  )
}

export function Study() {
  const { t } = useSettings()
  const { words, grade } = useWords()
  const [mode, setMode] = useState<Mode>('flash')
  const [all, setAll] = useState(false)
  // Snapshot the queue so grading doesn't reshuffle the session.
  const [queue, setQueue] = useState<string[]>(() => shuffle(words.filter((w) => isDue(w.srs))).map((w) => w.id))
  const [index, setIndex] = useState(0)

  const restart = (everything: boolean) => {
    setAll(everything)
    setQueue(shuffle(everything ? words : words.filter((w) => isDue(w.srs))).map((w) => w.id))
    setIndex(0)
  }

  const current = words.find((w) => w.id === queue[index])
  const answer = (ok: boolean) => {
    if (current) grade(current.id, ok)
    setIndex((i) => i + 1)
  }

  const modes: { id: Mode; label: string }[] = [
    { id: 'flash', label: t('study.flash') },
    { id: 'choice', label: t('study.choice') },
    { id: 'type', label: t('study.type') },
    { id: 'listen', label: t('study.listen') },
  ]

  const needsPool = mode === 'choice' && words.length < 4

  return (
    <div className="rise mx-auto max-w-lg">
      <PageHeader title={t('study.title')} back="/words" />
      <div className="mb-4 grid grid-cols-4 gap-1 rounded-2xl bg-surface-2 p-1">
        {modes.map((m) => (
          <button key={m.id} className={`min-h-10 rounded-xl text-sm font-bold transition ${mode === m.id ? 'bg-surface text-primary shadow-sm' : 'text-muted'}`} onClick={() => setMode(m.id)}>
            {m.label}
          </button>
        ))}
      </div>

      {queue.length === 0 ? (
        <EmptyState anim="read" text={t('study.nothing')}>
          {words.length > 0 && (
            <button className="btn btn-soft" onClick={() => restart(true)}>
              {t('study.practiceAll')}
            </button>
          )}
        </EmptyState>
      ) : !current ? (
        <div className="flex flex-col items-center py-8 text-center">
          <Mascot anim="celebrate" size={160} />
          <h2 className="mt-3 text-2xl font-extrabold">{t('study.done')}</h2>
          <p className="text-muted">{t('study.doneSub')}</p>
          <div className="mt-6 flex w-full gap-3">
            <Link to="/words" className="btn btn-ghost flex-1">
              {t('study.back')}
            </Link>
            <button className="btn btn-soft flex-1" onClick={() => restart(all)}>
              ↺
            </button>
          </div>
        </div>
      ) : needsPool ? (
        <EmptyState anim="think" text={t('study.needMore')} />
      ) : (
        <>
          <div className="mb-3 h-2 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(index / queue.length) * 100}%` }} />
          </div>
          <p className="mb-3 text-center text-sm text-muted">
            {index + 1} / {queue.length}
          </p>
          {mode === 'flash' && <Flashcard key={current.id} word={current} onAnswer={answer} />}
          {mode === 'choice' && <Choice key={current.id} word={current} pool={words} onAnswer={answer} />}
          {(mode === 'type' || mode === 'listen') && <TypeIn key={`${mode}-${current.id}`} word={current} listen={mode === 'listen'} onAnswer={answer} />}
        </>
      )}
    </div>
  )
}
