import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { EmptyState, LevelBadge, MascotBubble, SpeakButton } from '../components/ui'
import { PosTag } from '../components/WordBits'
import { speak } from '../lib/speech'
import { intervalFor, isDue, type Rating } from '../lib/srs'
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

const clean = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[.!?]$/, '')
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const blankOut = (sentence: string, word: string) => sentence.replace(new RegExp(escapeRe(word), 'ig'), '_____')

function RatingButtons({ word, onRate }: { word: Word; onRate: (r: Rating) => void }) {
  const { l } = useSettings()
  const days = (r: Rating) => {
    const d = intervalFor(word.srs, r)
    return d === 0 ? l('bugün tekrar', 'again today') : d === 1 ? l('1 gün', '1 day') : l(`${d} gün`, `${d} days`)
  }
  const items: { r: Rating; key: string; icon: string; label: string; sub: string; cls: string; badge: string }[] = [
    { r: 'again', key: '1', icon: 'replay', label: l('Tekrar', 'Again'), sub: l('Zor', 'Hard'), cls: 'bg-accent-soft text-accent', badge: 'bg-accent text-white' },
    { r: 'good', key: '2', icon: 'thumb_up', label: l('İyi', 'Good'), sub: l('Dengeli', 'Steady'), cls: 'bg-primary-soft text-primary', badge: 'bg-primary text-on-primary' },
    { r: 'easy', key: '3', icon: 'sentiment_satisfied', label: l('Biliyordum!', 'I knew it!'), sub: l('Kolay', 'Easy'), cls: 'bg-success-soft text-success', badge: 'bg-success text-white' },
  ]
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {items.map((it) => (
        <button key={it.r} onClick={() => onRate(it.r)} className={`flex min-h-[88px] flex-col items-center justify-center rounded-[20px] px-1 py-3 shadow-card transition active:scale-95 ${it.cls}`}>
          <span className="flex items-center gap-1.5 text-[15px] font-bold sm:text-base">
            <Icon name={it.icon} size={20} />
            {it.label}
            <span className={`hidden h-5 w-5 items-center justify-center rounded-md text-[11px] sm:flex ${it.badge}`}>{it.key}</span>
          </span>
          <span className="mt-0.5 text-xs font-bold opacity-90">{days(it.r)}</span>
          <span className="text-[11px] opacity-70">{it.sub}</span>
        </button>
      ))}
    </div>
  )
}

function Flashcard({ word, onRate }: { word: Word; onRate: (r: Rating) => void }) {
  const { l, settings, update } = useSettings()
  const [flipped, setFlipped] = useState(false)
  const [hint, setHint] = useState(false)
  const [dx, setDx] = useState(0)
  const [dragging, setDragging] = useState(false)
  const start = useRef<number | null>(null)
  const example = word.examples[0]

  // Keyboard: Space flips, 1/2/3 rate.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input, textarea')) return
      if (e.code === 'Space') {
        e.preventDefault()
        setFlipped((f) => !f)
      } else if (e.key === '1') onRate('again')
      else if (e.key === '2') onRate('good')
      else if (e.key === '3') onRate('easy')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onRate])

  const end = () => {
    if (start.current !== null && Math.abs(dx) > 90) onRate(dx > 0 ? 'easy' : 'again')
    start.current = null
    setDragging(false)
    setDx(0)
  }

  const toggleAccent = (
    <span className="inline-flex rounded-full bg-surface-3 p-0.5 text-xs font-bold" onPointerDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
      {(['en-US', 'en-GB'] as const).map((a) => (
        <button
          key={a}
          onClick={() => {
            update({ accent: a })
            speak(word.word, a)
          }}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 ${settings.accent === a ? 'bg-primary text-on-primary' : 'text-text-2'}`}
        >
          {settings.accent === a && <Icon name="volume_up" size={14} />}
          {a === 'en-US' ? 'US' : 'UK'}
        </button>
      ))}
    </span>
  )

  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute -left-12 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-1 text-outline lg:flex">
          <Icon name="arrow_back" />
          <span className="text-[10px] font-bold [writing-mode:vertical-rl]">{l('TEKRAR (1)', 'AGAIN (1)')}</span>
        </span>
        <span className="pointer-events-none absolute -right-12 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-1 text-outline lg:flex">
          <Icon name="arrow_forward" />
          <span className="text-[10px] font-bold [writing-mode:vertical-rl]">{l('KOLAY (3)', 'EASY (3)')}</span>
        </span>

        <div
          className="flip-scene touch-pan-y select-none"
          onPointerDown={(e) => {
            start.current = e.clientX
            setDragging(true)
          }}
          onPointerMove={(e) => start.current !== null && setDx(e.clientX - start.current)}
          onPointerUp={end}
          onPointerCancel={end}
          style={{ transform: `translateX(${dx}px) rotate(${dx / 30}deg)`, transition: dragging ? 'none' : 'transform .25s' }}
        >
          <div
            role="button"
            tabIndex={0}
            aria-label={l('Kartı çevir', 'Flip card')}
            onClick={() => Math.abs(dx) < 5 && setFlipped((f) => !f)}
            className={`flip-card relative grid min-h-[380px] sm:min-h-[420px] ${flipped ? 'flipped' : ''}`}
          >
            {/* Front */}
            <div className="flip-face card col-start-1 row-start-1 flex flex-col shadow-lift">
              <div className="flex items-center gap-2">
                <LevelBadge level={word.level} long />
                <PosTag pos={word.pos} />
              </div>
              <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
                <p className="eyebrow text-primary">{l('Odak kelime', 'Focus word')}</p>
                <p className="font-display mt-2 break-words text-[40px] font-bold leading-tight sm:text-[52px]">{word.word}</p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                  {word.ipa && <span className="text-lg text-text-2">{word.ipa}</span>}
                  {toggleAccent}
                </div>
                {example && (
                  <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation()
                      setHint((h) => !h)
                    }}
                    className="mt-6 inline-flex max-w-full items-center gap-2 rounded-full bg-surface-3 px-4 py-2 text-sm font-semibold text-text-2"
                  >
                    <Icon name="lightbulb" size={18} className="text-accent" />
                    {hint ? <span className="italic">{blankOut(example, word.word)}</span> : l('İpucu ister misin? (kelimesiz cümle)', 'Need a hint? (sentence without word)')}
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-muted">
                <span className="flex items-center gap-1">
                  <Icon name="touch_app" size={16} /> {l('Çevirmek için karta dokun', 'Tap anywhere on the card')}
                </span>
                <span className="hidden items-center gap-1 rounded-full bg-surface-2 px-3 py-1 text-primary sm:flex">
                  <Icon name="flip" size={16} /> {l('[Boşluk] ile çevir', 'Press [Space] to flip')}
                </span>
              </div>
            </div>

            {/* Back */}
            <div className="flip-face flip-back card col-start-1 row-start-1 flex flex-col gap-3 border-primary-soft shadow-lift">
              <div className="flex flex-wrap items-center gap-2 border-b border-line pb-3">
                <span className="tag tag-sage">
                  <Icon name="visibility" size={14} /> {l('Açıldı', 'Revealed')}
                </span>
                <span className="font-display text-[22px] font-bold">{word.word}</span>
                <LevelBadge level={word.level} />
                <PosTag pos={word.pos} />
                {word.ipa && <span className="text-sm text-muted">{word.ipa}</span>}
                <span className="ml-auto flex items-center gap-1 rounded-full bg-surface-2 px-3 py-1 text-xs font-bold text-text-2">
                  <Icon name="refresh" size={14} /> {l('Geri çevir', 'Flip back')}
                </span>
              </div>
              <div className="rounded-2xl border border-line bg-surface-2 p-4">
                <p className="eyebrow mb-1 flex items-center gap-1.5 text-primary">
                  <Icon name="translate" size={16} /> {l('Türkçe anlamı', 'Turkish meaning')}
                </p>
                <p className="font-display text-xl font-bold leading-snug">{word.tr}</p>
              </div>
              {word.definition && (
                <div>
                  <p className="eyebrow mb-1">{l('İngilizce tanım', 'English definition')}</p>
                  <p className="text-[16px] leading-relaxed">{word.definition}</p>
                </div>
              )}
              {example && (
                <div className="flex items-start gap-3 rounded-2xl bg-surface-3 p-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex-1">
                    <p className="eyebrow mb-1 text-success">{l('Defter örneği', 'Notebook example')}</p>
                    <p className="text-[16px] italic leading-relaxed">“{example}”</p>
                  </div>
                  <SpeakButton text={example} size="sm" />
                </div>
              )}
              {word.synonyms.length > 0 && (
                <p className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-text-2">
                  {l('Eş anlamlılar', 'Synonyms')}:
                  {word.synonyms.slice(0, 4).map((s) => (
                    <span key={s} className="chip py-1 text-xs">
                      {s}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        {flipped && (
          <p className="mb-3 flex items-center gap-2 rounded-2xl bg-primary-soft/50 px-4 py-2.5 text-sm font-bold text-primary">
            <Icon name="psychology" size={18} /> {l('Ne kadar kolay hatırladın?', 'How easily did you recall this?')}
          </p>
        )}
        <RatingButtons word={word} onRate={onRate} />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-text-2">
          <span className="flex items-center gap-1">
            <Icon name="swipe" size={16} /> {l('İpucu: sola kaydır = Tekrar, sağa = Kolay', 'Tip: swipe left for Again, right for Easy')}
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            {l('Kısayollar', 'Shortcuts')}:
            {['Space', '1', '2', '3'].map((k) => (
              <kbd key={k} className="rounded-md bg-surface-3 px-1.5 py-0.5 font-bold">
                {k}
              </kbd>
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}

function Choice({ word, pool, onRate }: { word: Word; pool: Word[]; onRate: (r: Rating) => void }) {
  const { l } = useSettings()
  const options = useMemo(() => shuffle([word, ...shuffle(pool.filter((w) => w.id !== word.id)).slice(0, 3)]), [word, pool])
  const [picked, setPicked] = useState<string | null>(null)
  const correct = picked === word.id

  return (
    <div>
      <div className="card flex min-h-[180px] flex-col items-center justify-center text-center shadow-lift">
        <PosTag pos={word.pos} />
        <p className="font-display mt-2 text-[40px] font-bold leading-tight">{word.word}</p>
        <div className="mt-3">
          <SpeakButton text={word.word} />
        </div>
      </div>
      <p className="eyebrow mb-2 mt-5">{l('Türkçe anlamını seç', 'Pick the Turkish meaning')}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((o) => {
          const state =
            picked === null ? 'border-line bg-surface hover:border-primary-2' : o.id === word.id ? 'border-success bg-success-soft' : o.id === picked ? 'border-accent bg-accent-soft' : 'border-line bg-surface opacity-50'
          return (
            <button key={o.id} disabled={picked !== null} onClick={() => setPicked(o.id)} className={`flex min-h-14 items-center gap-3 rounded-2xl border-[1.5px] px-4 py-3 text-left font-semibold transition ${state}`}>
              <span className="flex-1">{o.tr}</span>
              {picked !== null && o.id === word.id && <Icon name="check_circle" fill className="text-success" />}
              {picked === o.id && o.id !== word.id && <Icon name="cancel" fill className="text-accent" />}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <div className="mt-4 flex items-end gap-3">
          <Mascot anim={correct ? 'celebrate' : 'surprise'} size={84} />
          <button className="btn btn-primary flex-1" onClick={() => onRate(correct ? 'good' : 'again')} autoFocus>
            {l('Sonraki', 'Next')} <Icon name="arrow_forward" size={20} />
          </button>
        </div>
      )}
    </div>
  )
}

function TypeIn({ word, listen, onRate }: { word: Word; listen: boolean; onRate: (r: Rating) => void }) {
  const { l, settings } = useSettings()
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
        else onRate(result ? 'good' : 'again')
      }}
    >
      <div className="card flex min-h-[200px] flex-col items-center justify-center text-center shadow-lift">
        {listen ? (
          <>
            <p className="eyebrow mb-3 text-primary">{l('Dinle ve yaz', 'Listen and type')}</p>
            <SpeakButton text={word.word} size="lg" />
          </>
        ) : (
          <>
            <p className="eyebrow mb-2 text-primary">{l('İngilizcesi ne?', 'What’s the English word?')}</p>
            <p className="font-display text-[28px] font-bold leading-snug">{word.tr}</p>
            {word.examples[0] && <p className="tr mt-3 text-sm italic">“{blankOut(word.examples[0], word.word)}”</p>}
          </>
        )}
      </div>
      <input
        className="mt-5 w-full border-0 border-b-2 border-line bg-transparent px-1 py-3 text-center text-2xl font-bold outline-none focus:border-primary-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={l('İngilizcesini yaz…', 'Type the English word…')}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        readOnly={result !== null}
        autoFocus
      />
      {result !== null && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <Mascot anim={result ? 'celebrate' : 'surprise'} size={76} />
          <p className={`font-bold ${result ? 'text-success' : 'text-accent'}`}>{result ? l('Doğru!', 'Correct!') : `${l('Doğrusu:', 'Answer:')} ${word.word}`}</p>
        </div>
      )}
      <button type="submit" className="btn btn-primary mt-5 w-full" disabled={result === null && !value.trim()}>
        {result === null ? l('Kontrol et', 'Check') : l('Sonraki', 'Next')}
        <Icon name={result === null ? 'check' : 'arrow_forward'} size={20} />
      </button>
    </form>
  )
}

function StatChip({ cls, icon, children }: { cls: string; icon?: string; children: ReactNode }) {
  return (
    <span className={`tag ${cls}`}>
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  )
}

export function Study() {
  const { l } = useSettings()
  const { words, grade } = useWords()
  const [params] = useSearchParams()
  const [mode, setMode] = useState<Mode>('flash')

  const [all, setAll] = useState(params.get('all') === '1')
  // The queue is fixed when the session starts, so grading doesn't reshuffle it.
  const [queue, setQueue] = useState<string[]>(() => {
    const single = params.get('word')
    if (single && words.some((w) => w.id === single)) return [single]
    return shuffle(params.get('all') === '1' ? words : words.filter((w) => isDue(w.srs))).map((w) => w.id)
  })
  const [index, setIndex] = useState(0)
  const [stats, setStats] = useState({ remembered: 0, again: 0 })

  const restart = (everything: boolean) => {
    setAll(everything)
    setQueue(shuffle(everything ? words : words.filter((w) => isDue(w.srs))).map((w) => w.id))
    setIndex(0)
    setStats({ remembered: 0, again: 0 })
  }

  const current = words.find((w) => w.id === queue[index])
  const rate = useCallback(
    (r: Rating) => {
      const id = queue[index]
      if (!id) return
      grade(id, r)
      if (r === 'again') setQueue((q) => [...q, id]) // forgotten cards come back at the end of the session
      setStats((s) => (r === 'again' ? { ...s, again: s.again + 1 } : { ...s, remembered: s.remembered + 1 }))
      setIndex((i) => i + 1)
    },
    [queue, index, grade],
  )

  const modes: { value: Mode; icon: string; label: string }[] = [
    { value: 'flash', icon: 'style', label: l('Kart', 'Card flip') },
    { value: 'choice', icon: 'checklist', label: l('Seçmeli', 'Multiple choice') },
    { value: 'type', icon: 'keyboard', label: l('Yaz', 'Type') },
    { value: 'listen', icon: 'headphones', label: l('Dinle', 'Listen') },
  ]
  const needsPool = mode === 'choice' && words.length < 4
  const remaining = Math.max(0, queue.length - index)
  const pct = queue.length ? Math.round((index / queue.length) * 100) : 0

  return (
    <div className="rise mx-auto max-w-[720px]">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Link to="/words" className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-surface-3 px-4 text-sm font-bold text-text-2">
          <Icon name="arrow_back" size={18} /> {l('Kelimelere dön', 'Exit to words')}
        </Link>
        <div className="no-scrollbar order-last -mx-4 flex w-[calc(100%+2rem)] gap-1 overflow-x-auto px-4 sm:order-none sm:mx-auto sm:w-auto sm:px-0">
          <div className="flex gap-1 rounded-full bg-surface-3 p-1">
            {modes.map((m) => (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm font-bold ${mode === m.value ? 'bg-primary text-on-primary' : 'text-text-2'}`}
              >
                <Icon name={m.icon} size={18} /> {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {queue.length === 0 ? (
        <EmptyState anim="read" text={l('Şu an tekrar edilecek kelime yok.', 'No words are due right now.')}>
          {words.length > 0 && (
            <button className="btn btn-primary" onClick={() => restart(true)}>
              {l('Yine de tüm kelimelerle çalış', 'Practise all words anyway')}
            </button>
          )}
        </EmptyState>
      ) : !current ? (
        <div className="card flex flex-col items-center py-10 text-center">
          <Mascot anim="celebrate" size={170} />
          <h2 className="mt-3 text-[26px] font-bold">{l('Bugünlük bitti!', 'All done for today!')}</h2>
          <p className="tr">{l(`${stats.remembered} kelimeyi hatırladın. Harika iş çıkardın.`, `You remembered ${stats.remembered} words. Lovely work.`)}</p>
          <div className="mt-6 flex w-full max-w-sm gap-3">
            <Link to="/words" className="btn btn-secondary flex-1">
              {l('Kelimelere dön', 'Back to words')}
            </Link>
            <button className="btn btn-primary flex-1" onClick={() => restart(all)}>
              <Icon name="replay" size={20} /> {l('Tekrarla', 'Again')}
            </button>
          </div>
        </div>
      ) : needsPool ? (
        <EmptyState anim="think" text={l('Bu mod için en az 4 kelime gerekiyor.', 'This mode needs at least 4 words.')} />
      ) : (
        <>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h1 className="section-title text-[17px]">{l('Bugünün tekrar kuyruğu', 'Today’s review queue')}</h1>
            <span className="hidden text-sm text-muted sm:inline">· {l('Aralıklı tekrar', 'Spaced repetition')}</span>
            <span className="ml-auto flex flex-wrap gap-1.5">
              <StatChip cls="tag-sage" icon="check_circle">
                {stats.remembered} {l('hatırlandı', 'remembered')}
              </StatChip>
              {stats.again > 0 && (
                <StatChip cls="tag-peach" icon="replay">
                  {stats.again} {l('tekrar', 'again')}
                </StatChip>
              )}
              <StatChip cls="">
                {remaining} {l('kaldı', 'remaining')}
              </StatChip>
            </span>
          </div>
          <div className="mb-1 flex justify-between text-xs font-bold text-text-2">
            <span>
              {l('Kart', 'Card')} {index + 1} / {queue.length}
            </span>
            <span>
              %{pct} {l('tamamlandı', 'completed')}
            </span>
          </div>
          <div className="mb-5 h-2 overflow-hidden rounded-full bg-surface-3">
            <div className="h-full rounded-full bg-primary-2 transition-all" style={{ width: `${pct}%` }} />
          </div>

          <div className="mb-5 flex items-center gap-3 rounded-[20px] bg-surface-2 p-3 sm:p-4">
            <MascotBubble anim="idle" size={44} className="bg-primary-soft" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-primary">{l('Su’nun hatırlatması', 'Su’s gentle reminder')}</p>
              <p className="text-[13px] text-text-2">{l('Acele yok, zamanlayıcı yok — sadece sakin bir tekrar.', 'Take your time. No rush, no timers — just gentle absorption.')}</p>
            </div>
          </div>

          {mode === 'flash' && <Flashcard key={`${current.id}-${index}`} word={current} onRate={rate} />}
          {mode === 'choice' && <Choice key={`${current.id}-${index}`} word={current} pool={words} onRate={rate} />}
          {(mode === 'type' || mode === 'listen') && <TypeIn key={`${mode}-${current.id}-${index}`} word={current} listen={mode === 'listen'} onRate={rate} />}

          {mode === 'flash' && (current.note || current.source) && (
            <section className="paper mt-6">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
                <Icon name="auto_stories" className="text-primary" /> {l('Bu kartın notları', 'Notebook notes for this card')}
              </h2>
              {current.note && <p className="rounded-2xl bg-surface p-4 italic">“{current.note}”</p>}
            </section>
          )}
        </>
      )}
    </div>
  )
}
