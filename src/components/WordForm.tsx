import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { lookup } from '../lib/dictionary'
import { speak } from '../lib/speech'
import { LEVELS, useSettings, type Level } from '../store/settings'
import { useWords, type Word } from '../store/words'
import { Icon } from './Icon'
import { MascotBubble } from './ui'

interface Props {
  onClose: () => void
  editing?: Word
}

const splitList = (s: string, sep: RegExp) =>
  s
    .split(sep)
    .map((x) => x.trim())
    .filter(Boolean)

const SOURCES = [
  { id: 'book', emoji: '📚', tr: 'Kitap', en: 'Book' },
  { id: 'street', emoji: '☕', tr: 'Kafe / Sokak', en: 'Cafe / Street' },
  { id: 'podcast', emoji: '🎧', tr: 'Podcast', en: 'Podcast' },
  { id: 'movie', emoji: '🎬', tr: 'Film / Dizi', en: 'Movie / Series' },
  { id: 'video', emoji: '▶️', tr: 'Video', en: 'Video' },
  { id: 'lesson', emoji: '📝', tr: 'Ders', en: 'Lesson' },
]

function Panel({ title, side, badge, children, className = '' }: { title: string; side?: string; badge?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[20px] border border-line bg-surface p-4 ${className}`}>
      <div className="mb-2 flex items-center gap-2">
        <span className="font-display flex-1 text-[15px] font-bold">{title}</span>
        {badge && <span className="tag tag-sage">{badge}</span>}
        {side && <span className="text-[11px] font-bold text-primary">{side}</span>}
      </div>
      {children}
    </div>
  )
}

/** Add / edit a word. A centred card on tablet+ and a bottom sheet on phones; new words auto-fill from the dictionary. */
export function WordForm({ onClose, editing }: Props) {
  const { t, l, settings } = useSettings()
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
  const [source, setSource] = useState(editing?.source ?? '')
  const [note, setNote] = useState(editing?.note ?? '')
  const [status, setStatus] = useState<'idle' | 'loading' | 'filled' | 'notfound'>('idle')
  const touched = useRef(new Set<string>())

  const duplicate = !editing && word.trim() ? findByText(word) : undefined

  // Lock page scroll behind the sheet; Escape closes it.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

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
      source: source || undefined,
      note: note.trim() || undefined,
    }
    if (editing) updateWord(editing.id, data)
    else add(data)
    onClose()
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-bg/80 backdrop-blur-sm md:items-center md:p-6" onClick={onClose}>
      <form
        role="dialog"
        aria-modal="true"
        aria-label={editing ? t('add.editTitle') : t('add.title')}
        className="sheet-up relative flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[28px] border border-line bg-bg shadow-lift md:rounded-[28px]"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <div className="h-1.5 shrink-0 bg-gradient-to-r from-primary-soft via-success-soft to-accent-soft" />
        <div className="overflow-y-auto px-4 pb-4 pt-4 sm:px-6">
          <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-line md:hidden" />
          <div className="mb-4 flex items-start gap-3">
            <MascotBubble anim="explain" size={52} className="bg-primary-soft" />
            <div className="min-w-0 flex-1">
              <h2 className="flex flex-wrap items-center gap-2 text-[22px] font-bold leading-tight">
                {editing ? l('Kelimeyi düzenle', 'Edit word') : l('Defterine ekle', 'Add to your notebook')}
              </h2>
              <p className="text-[13px] text-text-2">{l('Kitaptan, podcastten, sokaktan ya da aklından geçenlerden kelimeler topla.', 'Collect words from books, podcasts, street chats or your daily thoughts.')}</p>
            </div>
            <button type="button" onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-3 text-text-2" aria-label={t('common.close')}>
              <Icon name="close" />
            </button>
          </div>

          <Panel title={l('Kelime ya da kalıp', 'Word or phrase')} side={status === 'loading' ? t('add.lookingUp') : status === 'filled' ? l('Sözlükten dolduruldu', 'Smart lookup') : undefined}>
            <div className="flex items-center gap-2 rounded-2xl bg-surface-2 pr-2">
              <input
                className="font-display min-w-0 flex-1 bg-transparent px-4 py-3 text-[24px] font-bold outline-none placeholder:text-outline"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                autoFocus={!editing}
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                placeholder="serendipity"
                aria-label={t('add.word')}
              />
              {word.trim() && (
                <button type="button" onClick={() => speak(word, settings.accent)} className="inline-flex h-10 items-center gap-1 rounded-xl bg-surface-3 px-3 text-sm font-bold text-primary">
                  <Icon name="volume_up" size={20} /> {settings.accent === 'en-GB' ? 'UK' : 'US'}
                </button>
              )}
            </div>
            {status === 'notfound' && <p className="mt-2 text-sm text-text-2">{t('add.notFound')}</p>}
            {duplicate && <p className="mt-2 text-sm font-bold text-danger">{t('add.exists')}</p>}
            <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl bg-primary-soft/50 p-2.5">
              <input className="w-36 min-w-0 flex-1 rounded-xl bg-transparent px-2 py-1 font-mono text-sm outline-none focus:bg-surface" value={ipa} onChange={touch('ipa', setIpa)} placeholder="/ˌser.ənˈdɪp.ə.ti/" aria-label={t('add.ipa')} />
              <input className="w-28 rounded-xl bg-transparent px-2 py-1 text-sm font-bold italic outline-none focus:bg-surface" value={pos} onChange={touch('pos', setPos)} placeholder="noun" aria-label={t('add.pos')} />
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-text-2">{l('Seviye', 'Level')}:</span>
                {LEVELS.map((lv) => (
                  <button type="button" key={lv} onClick={() => setLevel(lv)} className={`rounded-full px-2.5 py-1 text-xs font-bold ${level === lv ? 'bg-primary text-on-primary' : 'bg-surface text-text-2'}`}>
                    {lv}
                  </button>
                ))}
              </div>
            </div>
          </Panel>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <Panel title={l('Türkçe anlamı', 'Turkish meaning')} side="TR">
              <textarea className="input min-h-[84px] resize-none" rows={2} value={tr} onChange={(e) => setTr(e.target.value)} placeholder={l('tatlı tesadüf', 'tatlı tesadüf')} />
            </Panel>
            <Panel title={l('İngilizce tanım', 'English definition')} side="EN" badge={definition ? auto : undefined}>
              <textarea className="input min-h-[84px] resize-none" rows={2} value={definition} onChange={touch('definition', setDefinition)} />
            </Panel>
          </div>

          <Panel title={l('Bağlam cümlesi', 'Example sentence')} badge={examples ? auto : undefined} className="mt-3 bg-surface-2">
            <textarea className="input min-h-[84px] bg-surface italic" rows={3} value={examples} onChange={touch('examples', setExamples)} placeholder={l('Her satıra bir cümle', 'One sentence per line')} />
            <p className="mb-2 mt-3 text-xs font-bold text-text-2">{l('Kelimeyi nerede yakaladın?', 'Where did you catch it?')}</p>
            <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
              {SOURCES.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setSource(source === s.id ? '' : s.id)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-bold ${source === s.id ? 'bg-success-soft text-success' : 'bg-surface-3 text-text-2'}`}
                >
                  {s.emoji} {l(s.tr, s.en)}
                  {source === s.id && <Icon name="check" size={16} />}
                </button>
              ))}
            </div>
          </Panel>

          <div className="mt-3 rounded-[20px] border border-lemon bg-lemon/40 p-4">
            <p className="mb-2 flex items-center gap-1.5 text-sm font-bold text-accent">
              <Icon name="push_pin" size={18} /> {l('Kişisel hatırlatıcı', 'Memory hook')}
            </p>
            <textarea
              className="w-full resize-none bg-transparent italic text-text outline-none placeholder:text-text-2/60"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={l('“Kadıköy’de kaybolurken keşfettiğim o sakin plakçı gibi ☕”', '“Like that quiet record shop I found by chance ☕”')}
            />
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <Panel title={t('add.synonyms')} badge={synonyms ? auto : undefined}>
              <input className="input" value={synonyms} onChange={touch('synonyms', setSynonyms)} placeholder="luck, fluke" />
            </Panel>
            <Panel title={t('add.tags')}>
              <input className="input" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="daily-life, emotions" />
            </Panel>
          </div>
        </div>

        <div className="pb-safe flex shrink-0 gap-3 border-t border-line bg-surface px-4 py-3 sm:px-6">
          <button type="button" className="btn btn-secondary px-4" onClick={onClose} aria-label={t('add.cancel')}>
            <Icon name="close" />
          </button>
          <button type="submit" className="btn btn-primary flex-1" disabled={!canSave}>
            {editing ? l('Kaydet', 'Save') : l('Deftere ekle', 'Save to notebook')}
            <Icon name="auto_awesome" size={18} />
          </button>
        </div>
      </form>
    </div>,
    document.body,
  )
}
