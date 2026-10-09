import { dayNumber } from '../lib/date'
import type { Level } from '../store/settings'
import { videos, type Video } from './videoList'

export type { Video }

export interface Channel {
  id: string
  name: string
  url: string
  about: { tr: string; en: string }
}

export const channels: Channel[] = [
  { id: 'bbcle', name: 'BBC Learning English', url: 'https://www.youtube.com/@bbclearningenglish', about: { tr: 'İngilizce öğrenenler için kısa, net bölümler.', en: 'Short, clear episodes made for learners.' } },
  { id: 'teded', name: 'TED-Ed', url: 'https://www.youtube.com/@TEDEd', about: { tr: 'Animasyonlu, merak uyandıran 5 dakikalık dersler.', en: 'Animated 5-minute lessons that spark curiosity.' } },
  { id: 'bbcideas', name: 'BBC Ideas', url: 'https://www.youtube.com/@BBCIdeas', about: { tr: 'Düşündüren kısa videolar.', en: 'Short films for curious minds.' } },
  { id: 'vox', name: 'Vox', url: 'https://www.youtube.com/@Vox', about: { tr: 'Açıklayıcı videolar, hızlı doğal konuşma.', en: 'Explainers with fast, natural speech.' } },
  { id: 'ted', name: 'TED', url: 'https://www.youtube.com/@TED', about: { tr: 'Konuşmalar — uzun ve gerçek konuşma dili.', en: 'Talks — longer, real-world speech.' } },
]

export const channelOf = (v: Video) => channels.find((c) => c.id === v.channelId)!

// Stable pseudo-random order so consecutive days jump between playlists instead of walking one series.
function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

const byLevel = new Map<Level, Video[]>()
for (const v of videos) byLevel.set(v.level, [...(byLevel.get(v.level) ?? []), v])
for (const list of byLevel.values()) list.sort((a, b) => hash(a.id) - hash(b.id))

/** Today's video plus two spares for the chosen level. */
export function videosForToday(level: Level): Video[] {
  const list = byLevel.get(level) ?? []
  if (list.length === 0) return []
  const start = (dayNumber() * 3) % list.length
  return [0, 1, 2].map((i) => list[(start + i) % list.length])
}

export const thumbnail = (v: Video) => `https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`
export const watchUrl = (v: Video) => `https://www.youtube.com/watch?v=${v.id}`
