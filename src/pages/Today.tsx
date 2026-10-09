import { Link } from 'react-router-dom'
import { QuoteCard } from '../components/QuoteCard'
import { useSpecialDay } from '../components/SpecialDayContext'
import { SpeakButton } from '../components/ui'
import { speakingTopics } from '../content/speaking'
import { channels, videoPicks } from '../content/videos'
import { pickForDay } from '../lib/date'
import { isDue } from '../lib/srs'
import { Mascot } from '../mascot/Mascot'
import { useSettings } from '../store/settings'
import { useWords } from '../store/words'

export function Today() {
  const { t, tx, settings } = useSettings()
  const { words } = useWords()
  const special = useSpecialDay()
  const due = words.filter((w) => isDue(w.srs)).length
  const topic = pickForDay(speakingTopics[settings.level])
  const video = pickForDay(videoPicks[settings.level], 3)
  const channel = channels.find((c) => c.id === video?.channelId)

  return (
    <div className="rise space-y-4">
      <div className="flex items-center gap-3">
        <Mascot anim="wave" size={88} />
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

        {video && channel && (
          <Link to="/video" className="card block transition active:scale-[0.99]">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-3xl">▶️</div>
              <div className="min-w-0 flex-1">
                <h2 className="font-bold">{t('today.video')}</h2>
                <p className="truncate text-sm text-muted">
                  {channel.name} · {video.series} · {video.minutes} min
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
