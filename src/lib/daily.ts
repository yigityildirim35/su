import { dayKey } from './date'
import { load, save } from './storage'

// Small per-day markers for the "Today" checklist (not a streak — nothing carries over between days).
const WATCHED_KEY = 'su.watched' // videoId -> day watched
const SPOKE_KEY = 'su.spoke' // last day a speaking session was recorded

export function watchedMap(): Record<string, string> {
  return load<Record<string, string>>(WATCHED_KEY, {})
}

export function setWatched(id: string, watched: boolean): Record<string, string> {
  const next = { ...watchedMap() }
  if (watched) next[id] = dayKey()
  else delete next[id]
  save(WATCHED_KEY, next)
  return next
}

export function spokeToday(): boolean {
  return load<string>(SPOKE_KEY, '') === dayKey()
}

export function markSpoke() {
  save(SPOKE_KEY, dayKey())
}

export function greeting(hour = new Date().getHours()) {
  if (hour >= 5 && hour < 12) return { en: 'Good morning', tr: 'Günaydın', ritual: { tr: 'Sabah ritüeli', en: 'Morning ritual' }, icon: 'wb_sunny' }
  if (hour >= 12 && hour < 18) return { en: 'Good afternoon', tr: 'İyi günler', ritual: { tr: 'Öğleden sonra molası', en: 'Afternoon break' }, icon: 'local_cafe' }
  return { en: 'Good evening', tr: 'İyi akşamlar', ritual: { tr: 'Akşam sakinliği', en: 'Evening calm' }, icon: 'bedtime' }
}

/** The learner's name, used in greetings. */
export const LEARNER_NAME = 'Su'
