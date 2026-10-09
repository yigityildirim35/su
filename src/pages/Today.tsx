import { Link } from 'react-router-dom'
import { QuoteCard } from '../components/QuoteCard'
import { useSpecialDay } from '../components/SpecialDayContext'
import { SpeakButton } from '../components/ui'
import { speakingTopics } from '../content/speaking'
import { channelOf, thumbnail, videosForToday } from '../content/videos'
import { pickForDay } from '../lib/date'
import { isDue } from '../lib/srs'
import { Mascot } from '../mascot/Mascot'
import type { MascotAnim } from '../mascot/registry'
import { useSettings } from '../store/settings'
import { useWords } from '../store/words'

// A different greeting pose each day.
const GREETINGS: MascotAnim[] = ['wave', 'idle', 'celebrate', 'think']

export function Today() {
  const { t, tx, settings } = useSettings()
  const { words } = useWords()
  const special = useSpecialDay()
  const due = words.filter((w) => isDue(w.srs)).length
  const topic = pickForDay(speakingTopics[settings.level])
  const video = videosForToday(settings.level)[0]

  return (
    <div className="rise space-y-4">
      <div className="flex items-center gap-3">
        <Mascot anim={special ? 'wave' : (pickForDay(GREETINGS, 1) ?? 'wave')} size={96} />
        <div>
          <h1 className="text-2xl font-extrabold">{special ? `${special.emoji} ${tx(special.title)}` : t('today.hello')}</h1>
          <p className="text-muted">{special ? tx(special.message) : t('today.subtitle')}</p>
        </div>
      </div>

      {special && (
        <section className="card border-accent/40 bg-accent-soft">
          <h2 className="mb-2 font-bold">{t('today.specialWords')}</h2>
          <ul className="space-y-1.5">
            {special.words.map((w) => (
              <li key={w.en} className="flex items-center gap-2">
                <SpeakButton text={w.en} size="sm" />
                <span className="en">{w.en}</span>
                <span className="text-muted">— {w.tr}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 [&>*]:min-w-0">
        <section className="card flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-3xl font-extrabold text-primary">{due}</div>
          <div className="flex-1">
            <h2 className="font-bold">{t('today.review')}</h2>
            <p className="text-sm text-muted">{words.length === 0 ? t('words.empty') : due > 0 ? `${due} ${t('today.reviewCount')}` : t('today.reviewNone')}</p>
          </div>
          {words.length === 0 ? (
            <Link to="/words?add=1" className="btn btn-primary">
              +
            </Link>
          ) : (
            <Link to="/study" className="btn btn-primary">
              {t('today.start')}
            </Link>
          )}
        </section>

        {video && (
          <Link to="/video" className="card block transition active:scale-[0.99]">
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-2xl bg-accent-soft">
                <img src={thumbnail(video)} alt="" loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center text-2xl drop-shadow">▶️</span>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-bold uppercase tracking-wide text-muted">{t('today.video')}</h2>
                <p className="line-clamp-2 text-sm font-bold">{video.title}</p>
                <p className="truncate text-xs text-muted">
                  {channelOf(video).name} · {video.minutes} min
                </p>
              </div>
            </div>
          </Link>
        )}
      </div>

      {topic && (
        <section className="card">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted">{t('today.speaking')}</h2>
          <p className="en mt-1 text-xl">{topic.topic}</p>
          <p className="text-sm text-muted">{topic.tr}</p>
          <Link to="/practice" className="btn btn-soft mt-3 w-full">
            🎙️ {t('today.speakNow')}
          </Link>
        </section>
      )}

      <QuoteCard />
    </div>
  )
}
