import { PageHeader, SectionTitle, TipBox } from '../components/ui'
import { channels, channelSearchUrl, videoPicks } from '../content/videos'
import { pickForDay } from '../lib/date'
import { useSettings } from '../store/settings'

export function Video() {
  const { t, tx, settings } = useSettings()
  const pick = pickForDay(videoPicks[settings.level], 3)
  const channel = channels.find((c) => c.id === pick?.channelId)

  return (
    <div className="rise">
      <PageHeader title={t('video.title')} back="/more" />
      {pick && channel && (
        <section className="card">
          <p className="text-sm font-bold uppercase tracking-wide text-muted">
            {channel.name} · {settings.level}
          </p>
          <p className="en mt-1 text-2xl">{pick.series}</p>
          <p className="text-muted">
            {tx(channel.about)} · {pick.minutes} min
          </p>
          <a href={channelSearchUrl(pick)} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4 w-full">
            ▶️ {t('video.open')}
          </a>
        </section>
      )}
      <div className="my-5">
        <TipBox anim="listen">{t('video.tip')}</TipBox>
      </div>
      <SectionTitle>{t('video.channels')}</SectionTitle>
      <ul className="grid gap-2 md:grid-cols-2">
        {channels.map((c) => (
          <li key={c.id}>
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="card flex items-center gap-3">
              <div className="flex-1">
                <p className="font-bold">{c.name}</p>
                <p className="text-sm text-muted">{tx(c.about)}</p>
              </div>
              <span className="text-muted">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
