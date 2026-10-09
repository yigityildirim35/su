import { useState } from 'react'
import { PageHeader, SectionTitle, TipBox } from '../components/ui'
import { channelOf, channels, thumbnail, videosForToday, watchUrl } from '../content/videos'
import { dayKey } from '../lib/date'
import { load, save } from '../lib/storage'
import { useSettings } from '../store/settings'

const WATCHED_KEY = 'su.watched'

export function Video() {
  const { t, tx, settings } = useSettings()
  const todays = videosForToday(settings.level)
  const [selected, setSelected] = useState(0)
  const [watched, setWatched] = useState<Record<string, string>>(() => load(WATCHED_KEY, {}))
  const video = todays[selected]

  const toggleWatched = (id: string) => {
    const next = { ...watched }
    if (next[id]) delete next[id]
    else next[id] = dayKey()
    setWatched(next)
    save(WATCHED_KEY, next)
  }

  return (
    <div className="rise">
      <PageHeader title={t('video.title')} back="/" />
      {video && (
        <section className="card overflow-hidden p-0">
          <div className="relative aspect-video w-full bg-black">
            <iframe
              key={video.id}
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${video.id}?playsinline=1&rel=0&cc_lang_pref=en&hl=en`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <p lang="en" className="text-sm font-bold uppercase tracking-wide text-muted">
              {channelOf(video).name} · {video.level} · {video.minutes} min
            </p>
            <p className="mt-1 text-lg font-bold">{video.title}</p>
            <div className="mt-3 flex gap-2">
              <button className={`btn flex-1 ${watched[video.id] ? 'bg-success-soft text-success' : 'btn-soft'}`} onClick={() => toggleWatched(video.id)}>
                {watched[video.id] ? `✓ ${t('video.watched')}` : t('video.markWatched')}
              </button>
              <a href={watchUrl(video)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                ↗ YouTube
              </a>
            </div>
          </div>
        </section>
      )}

      <div className="my-5">
        <TipBox anim="listen">{t('video.tip')}</TipBox>
      </div>

      {todays.length > 1 && (
        <>
          <SectionTitle>{t('video.more')}</SectionTitle>
          <ul className="grid gap-2 md:grid-cols-3">
            {todays.map((v, i) => (
              <li key={v.id}>
                <button className={`card flex w-full items-center gap-3 p-2 text-left ${i === selected ? 'border-primary' : ''}`} onClick={() => setSelected(i)}>
                  <img src={thumbnail(v)} alt="" loading="lazy" className="h-14 w-24 shrink-0 rounded-xl object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-2 text-sm font-bold">{v.title}</span>
                    <span className="text-xs text-muted">
                      {channelOf(v).name} · {v.minutes} min {watched[v.id] && '· ✓'}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

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
