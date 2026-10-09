import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { EmptyState, LevelBadge, MascotBubble, SpeakButton } from '../components/ui'
import { PosTag, wordStatus } from '../components/WordBits'
import { WordForm } from '../components/WordForm'
import { speak, type Accent } from '../lib/speech'
import { daysUntilDue, MAX_BOX } from '../lib/srs'
import { useSettings } from '../store/settings'
import { useWords } from '../store/words'

const SOURCE_LABEL: Record<string, { tr: string; en: string; emoji: string }> = {
  book: { tr: 'Kitap', en: 'Book', emoji: '📚' },
  street: { tr: 'Kafe / Sokak', en: 'Cafe / Street', emoji: '☕' },
  podcast: { tr: 'Podcast', en: 'Podcast', emoji: '🎧' },
  movie: { tr: 'Film / Dizi', en: 'Movie / Series', emoji: '🎬' },
  video: { tr: 'Video', en: 'Video', emoji: '▶️' },
  lesson: { tr: 'Ders', en: 'Lesson', emoji: '📝' },
}

/** Highlights the headword inside an example sentence. */
function Highlight({ text, word }: { text: string; word: string }) {
  const i = text.toLowerCase().indexOf(word.toLowerCase())
  if (i < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <span className="font-bold text-primary">{text.slice(i, i + word.length)}</span>
      {text.slice(i + word.length)}
    </>
  )
}

function AccentButton({ accent, label, ipa, text }: { accent: Accent; label: string; ipa?: string; text: string }) {
  const { settings, update } = useSettings()
  const active = settings.accent === accent
  return (
    <button
      onClick={() => {
        update({ accent })
        speak(text, accent)
      }}
      className={`flex min-h-11 flex-1 items-center gap-2 rounded-2xl border px-3 py-2 text-left text-sm font-bold transition sm:flex-none ${active ? 'border-primary-2 bg-primary-soft/60' : 'border-line bg-surface'}`}
    >
      <span className={`flex h-7 w-7 items-center justify-center rounded-full ${active ? 'bg-primary text-on-primary' : 'bg-surface-3 text-text-2'}`}>
        <Icon name="volume_up" size={16} />
      </span>
      {label}
      {ipa && <span className="hidden font-normal text-muted sm:inline">{ipa}</span>}
    </button>
  )
}

export function WordDetail() {
  const { id } = useParams()
  const { t, l, tx } = useSettings()
  const { words, remove, updateWord, markDue } = useWords()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const word = words.find((w) => w.id === id)

  if (!word) return <EmptyState anim="surprise" text={t('word.notFound')} />

  const status = wordStatus(word.srs)
  const days = daysUntilDue(word.srs)
  const source = word.source ? SOURCE_LABEL[word.source] : undefined

  return (
    <div className="rise space-y-4">
      <div className="flex items-center gap-2">
        <Link to="/words" className="-ml-1 inline-flex min-h-10 items-center gap-1 rounded-full px-2 text-sm font-bold text-text-2 hover:bg-surface-3">
          <Icon name="arrow_back" size={18} /> {l('Kelime listesine dön', 'Back to words list')}
        </Link>
        <div className="ml-auto flex items-center gap-1 rounded-full bg-surface-3 p-1">
          <button onClick={() => updateWord(word.id, { starred: !word.starred })} className={`flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface ${word.starred ? 'text-accent' : 'text-text-2'}`} aria-label={l('Yıldızla', 'Star')} aria-pressed={!!word.starred}>
            <Icon name="star" fill={word.starred} size={20} />
          </button>
          <button onClick={() => setEditing(true)} className="flex h-9 w-9 items-center justify-center rounded-full text-text-2 hover:bg-surface" aria-label={t('word.edit')}>
            <Icon name="edit" size={20} />
          </button>
          <button
            onClick={() => {
              if (window.confirm(t('word.deleteConfirm'))) {
                remove(word.id)
                navigate('/words')
              }
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-text-2 hover:bg-surface hover:text-danger"
            aria-label={t('word.delete')}
          >
            <Icon name="delete" size={20} />
          </button>
        </div>
      </div>
      <p className="text-xs font-semibold text-muted">
        <Link to="/words" className="hover:text-primary">
          {l('Kelimeler', 'Words')}
        </Link>
        {word.level && <span> / {word.level} </span>}/ <span className="text-text-2">{word.word}</span>
      </p>

      <section className="card relative overflow-hidden">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-soft/40 blur-2xl" />
        <div className="relative flex flex-wrap items-center gap-2">
          <PosTag pos={word.pos} />
          <LevelBadge level={word.level} long />
          {source && (
            <span className="tag">
              {source.emoji} {tx(source)}
            </span>
          )}
        </div>
        <h1 className="relative mt-3 break-words text-[40px] font-bold leading-tight tracking-tight sm:text-[48px]">{word.word}</h1>
        {word.ipa && <p className="relative text-lg text-muted sm:hidden">{word.ipa}</p>}
        <div className="relative mt-4 flex flex-wrap gap-2">
          <AccentButton accent="en-US" label="US" ipa={word.ipa} text={word.word} />
          <AccentButton accent="en-GB" label="UK" text={word.word} />
          {word.audio && (
            <button onClick={() => new Audio(word.audio).play().catch(() => undefined)} className="flex min-h-11 items-center gap-2 rounded-2xl border border-line bg-surface px-3 text-sm font-bold text-text-2">
              <Icon name="headphones" size={18} /> {l('Kayıt', 'Recording')}
            </button>
          )}
        </div>
        {word.tags.length > 0 && (
          <div className="relative mt-4 flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-muted">
            {l('Etiketler', 'Tags')}:
            {word.tags.map((tg) => (
              <span key={tg} className="rounded-full bg-surface-3 px-2 py-0.5 text-text-2">
                #{tg}
              </span>
            ))}
          </div>
        )}
      </section>

      <section className="paper">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="tag tag-peach">TR</span>
          <span className="eyebrow text-accent">{l('Türkçe anlamı', 'Turkish meaning')}</span>
        </div>
        <p className="font-display text-[20px] font-bold leading-snug">“{word.tr}”</p>
      </section>

      {word.definition && (
        <section className="card">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="tag tag-lav">EN</span>
            <span className="eyebrow">{l('İngilizce tanım', 'English definition')}</span>
          </div>
          <p className="text-[17px] leading-relaxed text-primary">{word.definition}</p>
        </section>
      )}

      {word.examples.length > 0 && (
        <section>
          <h2 className="mb-3 mt-6 flex items-center gap-2 text-lg font-bold">
            <Icon name="format_quote" className="text-primary" /> {l('Örnek cümleler', 'Example sentences')}
          </h2>
          <ul className="space-y-2.5">
            {word.examples.map((ex) => (
              <li key={ex} className="card flex items-start gap-3 p-4">
                <p className="flex-1 text-[16px] leading-relaxed">
                  “<Highlight text={ex} word={word.word} />”
                </p>
                <SpeakButton text={ex} size="sm" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {word.media && (
        <section className="paper">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-primary">
            <Icon name="movie" /> {l('Gerçek hayatta nerede geçiyor?', 'Seen in real-world media')}
          </h2>
          <div className="rounded-2xl bg-surface p-4">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{word.media.title}</p>
                <p className="mt-1.5 text-[17px] italic text-primary">“{word.media.line}”</p>
                {word.media.source && <p className="mt-1.5 text-xs text-muted">{word.media.source}</p>}
              </div>
              <SpeakButton text={word.media.line} size="sm" />
            </div>
          </div>
        </section>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {word.synonyms.length > 0 && (
          <section className="card">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
              <Icon name="hub" className="text-success" /> {l('İlişkili kelimeler', 'Relations')}
            </h2>
            <p className="eyebrow mb-2">{l('Eş anlamlılar', 'Synonyms')}</p>
            <div className="flex flex-wrap gap-2">
              {word.synonyms.map((s) => (
                <button key={s} onClick={() => speak(s)} className="chip">
                  {s}
                </button>
              ))}
            </div>
          </section>
        )}
        {word.note && (
          <section className="rounded-[24px] border border-lemon bg-lemon/40 p-5">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-accent">
              <Icon name="push_pin" /> {l('Kişisel hatırlatıcı', 'Memory hook')}
            </h2>
            <p className="italic text-text">“{word.note}”</p>
          </section>
        )}
      </div>

      <section className="card">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${status === 'learned' ? 'bg-success-soft text-success' : status === 'due' ? 'bg-accent-soft text-accent' : 'bg-primary-soft text-primary'}`}>
            <Icon name="psychology" size={24} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-center gap-2 font-bold">
              {status === 'learned' ? l('Öğrenilmiş kelime', 'Mastered word') : status === 'due' ? l('Bugün tekrar zamanı', 'Due for review today') : l('Öğreniliyor', 'Learning')}
              <span className="tag tag-sage">
                {l('Aşama', 'Stage')} {word.srs.box}/{MAX_BOX}
              </span>
            </p>
            <p className="text-[13px] text-text-2">{status === 'due' ? l('Kuyrukta seni bekliyor.', 'Waiting for you in the queue.') : l(`Sonraki tekrar ${days} gün sonra.`, `Next spaced review in ${days} days.`)}</p>
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Link to={`/study?word=${word.id}`} className="btn btn-primary">
            <Icon name="style" size={20} /> {l('Kartla çalış', 'Practise with flashcard')}
          </Link>
          <button className="btn btn-secondary" onClick={() => markDue(word.id)} disabled={status === 'due'}>
            <Icon name="replay" size={20} /> {l('Hemen tekrara ekle', 'Mark for immediate review')}
          </button>
        </div>
      </section>

      <div className="flex items-start gap-3 rounded-[24px] bg-surface-2 p-4">
        <MascotBubble anim="explain" size={48} className="bg-surface" />
        <div>
          <p className="font-display font-bold text-primary">{l('Su’nun notu', 'Su’s note')}</p>
          <p className="text-[14px] text-text-2">
            {l(`“${word.word}” kelimesini bugünkü konuşma pratiğinde bir kez kullanmayı dene.`, `Try using “${word.word}” once in today’s speaking practice.`)}
          </p>
        </div>
      </div>

      {editing && <WordForm editing={word} onClose={() => setEditing(false)} />}
    </div>
  )
}
