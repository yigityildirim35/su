import { useState } from 'react'
import { Icon } from '../components/Icon'
import { LevelBadge, PageHeader, TipBox } from '../components/ui'
import { channelOf, channels, thumbnail, videosForToday, watchUrl } from '../content/videos'
import { setWatched, watchedMap } from '../lib/daily'
import { useSettings } from '../store/settings'

export function Video() {
  const { l, tx, settings } = useSettings()
  const todays = videosForToday(settings.level)
  const [selected, setSelected] = useState(0)
  const [watched, setWatchedState] = useState(watchedMap)
  const video = todays[selected]

  return (
    <div className="rise">
      <PageHeader back="/" backLabel={l('Bugün', 'Today')} title={l('Günün videosu', 'Video of the day')} subtitle={l('Seviyene göre seçilmiş kısa bir dinleme pratiği.', 'A short listening practice picked for your level.')} />
      {video && (
        <section className="card overflow-hidden p-0 sm:p-0">
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
          <div className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="tag tag-peach uppercase" lang="en">
                <Icon name="smart_display" size={14} /> {channelOf(video).name}
              </span>
              <LevelBadge level={video.level} />
              <span className="flex items-center gap-1 text-xs font-bold text-text-2">
                <Icon name="timer" size={16} /> {video.minutes} min
              </span>
            </div>
            <p className="font-display mt-2 text-[22px] font-bold leading-snug">{video.title}</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button className={`btn flex-1 ${watched[video.id] ? 'bg-success-soft text-success' : 'btn-primary'}`} onClick={() => setWatchedState(setWatched(video.id, !watched[video.id]))}>
                <Icon name={watched[video.id] ? 'check_circle' : 'visibility'} size={20} />
                {watched[video.id] ? l('İzledim', 'Watched') : l('İzledim olarak işaretle', 'Mark as watched')}
              </button>
              <a href={watchUrl(video)} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Icon name="open_in_new" size={18} /> YouTube
              </a>
            </div>
          </div>
        </section>
      )}

      <div className="my-5">
        <TipBox anim="listen" title={l('Dinleme ipucu', 'Listening tip')}>
          {l('Önce altyazısız izle, sonra İngilizce altyazıyla tekrar izle. Bilmediğin kelimeleri listene ekle.', 'Watch once without subtitles, then again with English subtitles. Add new words to your list.')}
        </TipBox>
      </div>

      {todays.length > 1 && (
        <>
          <h2 className="section-title mb-3 mt-8">{l('Bugünün diğer videoları', 'More videos for today')}</h2>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-3 [&>*]:min-w-0">
            {todays.map((v, i) => (
              <li key={v.id}>
                <button className={`card flex w-full items-center gap-3 p-2.5 text-left md:flex-col md:items-stretch ${i === selected ? 'border-primary-2' : ''}`} onClick={() => setSelected(i)}>
                  <img src={thumbnail(v)} alt="" loading="lazy" className="h-16 w-28 shrink-0 rounded-xl object-cover md:aspect-video md:h-auto md:w-full" />
                  <span className="min-w-0 flex-1 md:px-1 md:pb-1">
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

      <h2 className="section-title mb-3 mt-8">{l('Kanallar', 'Channels')}</h2>
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 [&>*]:min-w-0">
        {channels.map((c) => (
          <li key={c.id}>
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="card flex items-center gap-3 p-4">
              <div className="flex-1">
                <p className="font-bold">{c.name}</p>
                <p className="text-sm text-muted">{tx(c.about)}</p>
              </div>
              <Icon name="open_in_new" size={18} className="text-outline" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
