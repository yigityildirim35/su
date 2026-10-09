import { useEffect, useRef, useState, type ReactNode } from 'react'
import { lookup } from '../lib/dictionary'
import { LEVELS, useSettings, type Level } from '../store/settings'
import { useWords, type Word } from '../store/words'

interface Props {
  onClose: () => void
  editing?: Word
}

const splitList = (s: string, sep: RegExp) =>
  s
    .split(sep)
    .map((x) => x.trim())
    .filter(Boolean)

function Field({ label, badge, children }: { label: string; badge?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center gap-2 text-sm font-bold text-muted">
        {label}
        {badge && <span className="rounded bg-success-soft px-1.5 text-[11px] font-bold text-success">{badge}</span>}
      </span>
      {children}
    </label>
  )
}

/** Bottom sheet for adding or editing a word; new words are auto-filled from the dictionary. */
export function WordForm({ onClose, editing }: Props) {
  const { t, settings } = useSettings()
  const { add, updateWord, findByText } = useWords()

  const [word, setWord] = useState(editing?.word ?? '')
  const [ipa, setIpa] = useState(editing?.ipa ?? '')
  const [audio, setAudio] = useState(editing?.audio)
  const [pos, setPos] = useState(editing?.pos ?? '')
  const [tr, setTr] = useState(editing?.tr ?? '')
  const [definition, setDefinition] = useState(editing?.definition ?? '')
  const [examples, setExamples] = useState(editing?.examples.join('\n') ?? '')
  const [synonyms, setSynonyms] = useState(editing?.synonyms.join(', ') ?? '')
  const [level, setLevel] = useState<Level>(editing?.level ?? settings.level)
  const [tags, setTags] = useState(editing?.tags.join(', ') ?? '')
  const [status, setStatus] = useState<'idle' | 'loading' | 'filled' | 'notfound'>('idle')
  const touched = useRef(new Set<string>())

  const duplicate = !editing && word.trim() ? findByText(word) : undefined

  // Debounced dictionary lookup — never overwrites a field the user already typed in.
  useEffect(() => {
    if (editing) return
    const q = word.trim()
    if (q.length < 2) {
      setStatus('idle')
      return
    }
    const ctrl = new AbortController()
    const timer = window.setTimeout(async () => {
      setStatus('loading')
      try {
        const res = await lookup(q, ctrl.signal)
        if (!res) {
          setStatus('notfound')
          return
        }
        const fill = (key: string, setter: (v: string) => void, value?: string) => {
          if (!touched.current.has(key)) setter(value ?? '')
        }
        fill('ipa', setIpa, res.ipa)
        fill('pos', setPos, res.pos)
        fill('definition', setDefinition, res.definition)
        fill('examples', setExamples, res.examples.join('\n'))
        fill('synonyms', setSynonyms, res.synonyms.join(', '))
        setAudio(res.audio)
        setStatus('filled')
      } catch {
        if (!ctrl.signal.aborted) setStatus('notfound')
      }
    }, 600)
    return () => {
      ctrl.abort()
      window.clearTimeout(timer)
    }
  }, [word, editing])

  const touch = (key: string, setter: (v: string) => void) => (e: { target: { value: string } }) => {
    touched.current.add(key)
    setter(e.target.value)
  }

  const auto = status === 'filled' ? t('add.autoFilled') : undefined
  const canSave = word.trim().length > 0 && tr.trim().length > 0 && !duplicate

  const submit = () => {
    if (!canSave) return
    const data = {
      word: word.trim(),
      ipa: ipa.trim() || undefined,
      audio,
      pos: pos.trim() || undefined,
      tr: tr.trim(),
      definition: definition.trim() || undefined,
      examples: splitList(examples, /\n/),
      synonyms: splitList(synonyms, /,/),
      level,
      tags: splitList(tags, /,/),
    }
    if (editing) updateWord(editing.id, data)
    else add(data)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/30 md:items-center" onClick={onClose}>
      <form
        className="sheet-up pb-safe max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-[28px] bg-bg p-5 shadow-2xl md:rounded-[28px]"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-line md:hidden" />
        <h2 className="mb-4 text-xl font-extrabold">{editing ? t('add.editTitle') : t('add.title')}</h2>

        <div className="space-y-3">
          <Field label={t('add.word')}>
            <input className="input text-lg font-bold" value={word} onChange={(e) => setWord(e.target.value)} autoFocus={!editing} autoCapitalize="none" autoCorrect="off" spellCheck={false} />
          </Field>
          {status === 'loading' && <p className="text-sm text-muted">{t('add.lookingUp')}</p>}
          {status === 'notfound' && <p className="text-sm text-muted">{t('add.notFound')}</p>}
          {duplicate && <p className="text-sm font-bold text-danger">{t('add.exists')}</p>}

          <Field label={t('add.tr')}>
            <input className="input" value={tr} onChange={(e) => setTr(e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t('add.ipa')} badge={ipa ? auto : undefined}>
              <input className="input" value={ipa} onChange={touch('ipa', setIpa)} />
            </Field>
            <Field label={t('add.pos')} badge={pos ? auto : undefined}>
              <input className="input" value={pos} onChange={touch('pos', setPos)} />
            </Field>
          </div>
          <Field label={t('add.definition')} badge={definition ? auto : undefined}>
            <textarea className="input" rows={2} value={definition} onChange={touch('definition', setDefinition)} />
          </Field>
          <Field label={t('add.examples')} badge={examples ? auto : undefined}>
            <textarea className="input" rows={3} value={examples} onChange={touch('examples', setExamples)} />
          </Field>
          <Field label={t('add.synonyms')} badge={synonyms ? auto : undefined}>
            <input className="input" value={synonyms} onChange={touch('synonyms', setSynonyms)} />
          </Field>
          <div>
            <span className="mb-1 block text-sm font-bold text-muted">{t('add.level')}</span>
            <div className="flex gap-2">
              {LEVELS.map((l) => (
                <button type="button" key={l} className="chip min-h-10 flex-1 justify-center" aria-pressed={level === l} onClick={() => setLevel(l)}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <Field label={t('add.tags')}>
            <input className="input" value={tags} onChange={(e) => setTags(e.target.value)} />
          </Field>
        </div>

        <div className="mt-5 flex gap-3">
          <button type="button" className="btn btn-ghost flex-1" onClick={onClose}>
            {t('add.cancel')}
          </button>
          <button type="submit" className="btn btn-primary flex-[2]" disabled={!canSave}>
            {t('add.save')}
          </button>
        </div>
      </form>
    </div>
  )
}
