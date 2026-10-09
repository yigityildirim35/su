import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { QuoteCard } from '../components/QuoteCard'
import { useSpecialDay } from '../components/SpecialDayContext'
import { LevelBadge, MascotBubble, SpeakButton } from '../components/ui'
import { PosTag } from '../components/WordBits'
import { speakingTopics } from '../content/speaking'
import { channelOf, thumbnail, videosForToday } from '../content/videos'
import { greeting, LEARNER_NAME, setWatched, spokeToday, watchedMap } from '../lib/daily'
import { dayKey, pickForDay } from '../lib/date'
import { isDue } from '../lib/srs'
import type { MascotAnim } from '../mascot/registry'
import { useSettings } from '../store/settings'
import { useWords } from '../store/words'

// A different greeting pose each day.
const GREETINGS: MascotAnim[] = ['wave', 'idle', 'celebrate', 'think']

function Hero({ dueCount, watched, spoke }: { dueCount: number; watched: boolean; spoke: boolean }) {
  const { l, tx } = useSettings()
  const special = useSpecialDay()
  const g = greeting()
  const tasks = [
    { done: dueCount === 0, label: l('Kelimeleri tekrar et', 'Review your words') },
    { done: watched, label: l('Günün videosunu izle', 'Watch the video of the day') },
    { done: spoke, label: l('Biraz sesli konuş', 'Speak out loud for a bit') },
  ]
  const doneCount = tasks.filter((t) => t.done).length

  return (
    <section className="relative overflow-hidden rounded-[28px] bg-surface-3 p-5 sm:p-7">
      {special && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 90}%`, background: ['var(--accent-2)', 'var(--primary-2)', 'var(--sky)', 'var(--lemon)'][i % 4], opacity: 0.6 }}
            />
          ))}
        </div>
      )}
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4 sm:flex-1 sm:gap-5">
          <MascotBubble anim={special ? 'celebrate' : (pickForDay(GREETINGS, 1) ?? 'wave')} size={92} className="bg-surface" />
          <div className="min-w-0 flex-1">
            <span className="tag tag-lav mb-1.5 uppercase">
              <Icon name={special ? 'celebration' : g.icon} size={14} />
              {special ? l('Özel gün', 'Special day') : tx(g.ritual)}
            </span>
            <h1 className="text-[24px] font-bold leading-tight sm:text-[30px]">{special ? `${special.title.en} ${special.emoji}` : `${g.en}, ${LEARNER_NAME}!`}</h1>
            <p className="mt-1 text-[15px] text-text-2">
              {special
                ? tx(special.message)
                : l('Sakin bir çalışmaya hazır mısın? Bugünün kelimeleri ve kısa bir konuşma seni bekliyor.', 'Ready for a gentle study session? Today’s words and a short talk are waiting for you.')}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-surface p-4 sm:w-56 sm:shrink-0">
          <p className="eyebrow mb-2 flex items-center justify-between">
            {l('Bugünün listesi', 'Today’s list')}
            <span className="text-primary">
              {doneCount}/{tasks.length}
            </span>
          </p>
          <ul className="space-y-1.5">
            {tasks.map((t) => (
              <li key={t.label} className={`flex items-center gap-2 text-[13px] font-semibold ${t.done ? 'text-muted line-through' : 'text-text'}`}>
                <Icon name={t.done ? 'check_circle' : 'radio_button_unchecked'} fill={t.done} size={18} className={t.done ? 'text-success' : 'text-outline'} />
                {t.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ReviewQueue() {
  const { l } = useSettings()
  const { words } = useWords()
  const due = words.filter((w) => isDue(w.srs))
  const preview = due.slice(0, 3)
  const minutes = Math.max(1, Math.round((due.length * 20) / 60))

  return (
    <section className="card">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <h2 className="section-title text-lg" style={{ ['--dot' as string]: 'var(--accent)' }}>
          {l('Tekrar kuyruğu', 'Review queue')}
        </h2>
        {due.length > 0 && <span className="tag tag-peach">{l(`${due.length} kelime bekliyor`, `${due.length} words waiting`)}</span>}
        {due.length > 0 && (
          <span className="ml-auto flex items-center gap-1 text-sm font-semibold text-text-2">
            <Icon name="schedule" size={18} className="text-primary" />~{minutes} {l('dk', 'min')}
          </span>
        )}
      </div>

      {words.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <p className="tr">{l('Henüz kelime yok. İlk kelimeni ekle!', 'No words yet. Add your first one!')}</p>
          <Link to="/words?add=1" className="btn btn-primary">
            <Icon name="add" /> {l('Kelime ekle', 'Add word')}
          </Link>
        </div>
      ) : due.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-success-soft/50 p-5 text-center sm:flex-row sm:text-left">
          <Icon name="check_circle" fill size={36} className="text-success" />
          <p className="flex-1 font-semibold text-text-2">{l('Bugünlük tekrar yok — harikasın! İstersen yine de çalışabilirsin.', 'Nothing to review today — lovely! You can still practise if you like.')}</p>
          <Link to="/study?all=1" className="btn btn-secondary">
            {l('Yine de çalış', 'Practise anyway')}
          </Link>
        </div>
      ) : (
        <>
          <div className="no-scrollbar -mx-5 flex snap-x scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {preview.map((w) => (
              <Link key={w.id} to={`/words/${w.id}`} className="w-[78%] shrink-0 snap-start rounded-[20px] bg-surface-2 p-4 transition hover:shadow-card sm:w-auto">
                <div className="flex items-center justify-between">
                  <PosTag pos={w.pos} />
                  <SpeakButton text={w.word} size="sm" />
                </div>
                <p className="font-display mt-2 text-[22px] font-bold leading-tight">{w.word}</p>
                {w.ipa && <p className="font-serif text-sm italic text-muted">{w.ipa}</p>}
                <p className="mt-3 rounded-xl bg-surface p-2.5 text-[13px] leading-snug text-text-2">{w.tr}</p>
              </Link>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="flex flex-1 items-center gap-2 text-[13px] text-text-2">
              <Icon name="psychology" size={20} className="text-success" />
              {l('Aralıklı tekrar, kelimeleri uzun süreli hafızada tutar.', 'Spaced repetition keeps these in long-term memory.')}
            </p>
            <Link to="/study" className="btn btn-primary">
              {l(`Tekrara başla (${due.length})`, `Start review (${due.length})`)}
              <Icon name="arrow_forward" size={20} />
            </Link>
          </div>
        </>
      )}
    </section>
  )
}

function VideoCard({ watched, onToggle }: { watched: boolean; onToggle: () => void }) {
  const { l, settings } = useSettings()
  const video = videosForToday(settings.level)[0]
  if (!video) return null
  return (
    <section className="card flex flex-col">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="tag tag-peach uppercase">
          <Icon name="smart_display" size={14} /> {l('Günün videosu', 'Video of the day')}
        </span>
        <LevelBadge level={video.level} />
      </div>
      <Link to="/video" className="group relative block aspect-video overflow-hidden rounded-[18px] bg-surface-3">
        <img src={thumbnail(video)} alt="" loading="lazy" className="h-full w-full object-cover transition group-hover:scale-[1.02]" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface/90 text-primary shadow-lift">
            <Icon name="play_arrow" fill size={32} />
          </span>
        </span>
        <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-bold text-white">{video.minutes} min</span>
      </Link>
      <Link to="/video" className="font-display mt-3 line-clamp-2 text-lg font-bold leading-snug hover:text-primary">
        {video.title}
      </Link>
      <p className="mt-1 text-[13px] font-semibold text-text-2" lang="en">
        {channelOf(video).name}
      </p>
      <label className="mt-4 flex cursor-pointer items-center gap-2.5 rounded-2xl bg-surface-2 px-3 py-2.5 text-sm font-semibold text-text-2 md:mt-auto">
        <input type="checkbox" checked={watched} onChange={onToggle} className="h-5 w-5 accent-[var(--primary)]" />
        {l('İzledim olarak işaretle', 'Mark as watched')}
      </label>
    </section>
  )
}

function SpeakingCard() {
  const { l, settings } = useSettings()
  const topic = pickForDay(speakingTopics[settings.level])
  if (!topic) return null
  return (
    <section className="card flex flex-col">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="tag tag-sage uppercase">
          <Icon name="record_voice_over" size={14} /> {l('Günlük konuşma', 'Daily self-talk')}
        </span>
        <span className="text-xs font-bold text-text-2">{l('3 dk hedef', '3 min target')}</span>
      </div>
      <p className="font-display text-[22px] font-bold leading-snug">“{topic.topic}”</p>
      <p className="tr mt-1 text-sm">{topic.tr}</p>
      <p className="eyebrow mt-4">{l('Cümle kalıpları', 'Helpful starters')}</p>
      <div className="mb-5 mt-2 flex flex-wrap gap-2">
        {topic.phrases.slice(0, 3).map((p) => (
          <span key={p} className="chip font-semibold">
            “{p}”
          </span>
        ))}
      </div>
      <Link to="/practice" className="btn btn-secondary mt-auto w-full text-primary">
        <Icon name="mic" size={20} /> {l('Konuşma stüdyosunu aç', 'Open practice recorder')}
      </Link>
    </section>
  )
}

function SpecialWords() {
  const { l } = useSettings()
  const special = useSpecialDay()
  if (!special) return null
  return (
    <section className="card border-accent-soft">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="section-title text-lg" style={{ ['--dot' as string]: 'var(--accent-2)' }}>
          {l('Bugünün özel kelimeleri', 'Words of the day')}
        </h2>
        <span className="text-xl">{special.emoji}</span>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {special.words.map((w) => (
          <li key={w.en} className="flex items-center gap-3 rounded-2xl bg-surface-2 p-3">
            <SpeakButton text={w.en} size="sm" />
            <div className="min-w-0">
              <p className="en">{w.en}</p>
              <p className="tr text-sm">{w.tr}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Today() {
  const { words } = useWords()
  const { settings } = useSettings()
  const [watched, setWatchedState] = useState(watchedMap)
  const video = videosForToday(settings.level)[0]
  const dueCount = words.filter((w) => isDue(w.srs)).length
  const watchedToday = !!video && watched[video.id] === dayKey()

  return (
    <div className="rise space-y-5">
      <Hero dueCount={dueCount} watched={watchedToday} spoke={spokeToday()} />
      <SpecialWords />
      <ReviewQueue />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 [&>*]:min-w-0">
        <VideoCard watched={watchedToday} onToggle={() => video && setWatchedState(setWatched(video.id, !watchedToday))} />
        <SpeakingCard />
      </div>
      <QuoteCard />
    </div>
  )
}
