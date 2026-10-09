import type { Level } from '../store/settings'

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
  { id: 'vox', name: 'Vox', url: 'https://www.youtube.com/@Vox', about: { tr: 'Haber ve açıklayıcı videolar, hızlı doğal konuşma.', en: 'Explainers with fast, natural speech.' } },
  { id: 'ted', name: 'TED', url: 'https://www.youtube.com/@TED', about: { tr: 'Konuşmalar — uzun ve gerçek konuşma dili.', en: 'Talks — longer, real-world speech.' } },
]

export interface VideoPick {
  channelId: string
  /** Series or search phrase inside the channel. */
  series: string
  query: string
  minutes: string
}

// Daily rotation per level. A curated list of individual verified videos will replace this.
export const videoPicks: Record<Level, VideoPick[]> = {
  A1: [
    { channelId: 'bbcle', series: 'English in a Minute', query: 'english in a minute', minutes: '1' },
    { channelId: 'bbcle', series: 'Learn English with Vocabulary', query: 'vocabulary', minutes: '3–5' },
    { channelId: 'bbcle', series: 'Pronunciation', query: 'pronunciation', minutes: '3–6' },
  ],
  A2: [
    { channelId: 'bbcle', series: 'English in a Minute', query: 'english in a minute', minutes: '1' },
    { channelId: 'bbcle', series: 'The English We Speak', query: 'the english we speak', minutes: '3' },
    { channelId: 'bbcle', series: '6 Minute English', query: '6 minute english', minutes: '6' },
    { channelId: 'teded', series: 'TED-Ed Animations', query: 'animation', minutes: '4–6' },
  ],
  B1: [
    { channelId: 'bbcle', series: '6 Minute English', query: '6 minute english', minutes: '6' },
    { channelId: 'teded', series: 'TED-Ed', query: 'why', minutes: '4–6' },
    { channelId: 'bbcideas', series: 'BBC Ideas', query: 'life', minutes: '4–8' },
    { channelId: 'bbcle', series: 'The English We Speak', query: 'the english we speak', minutes: '3' },
  ],
  B2: [
    { channelId: 'teded', series: 'TED-Ed', query: 'history', minutes: '5' },
    { channelId: 'bbcideas', series: 'BBC Ideas', query: 'psychology', minutes: '5–8' },
    { channelId: 'vox', series: 'Vox Explained', query: 'explained', minutes: '8–15' },
    { channelId: 'ted', series: 'TED Talks', query: 'talk', minutes: '10–18' },
  ],
}

export function channelSearchUrl(pick: VideoPick): string {
  const channel = channels.find((c) => c.id === pick.channelId)!
  return `${channel.url}/search?query=${encodeURIComponent(pick.query)}`
}
