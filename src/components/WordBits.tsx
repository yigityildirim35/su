import { daysUntilDue, isDue, isLearned, MAX_BOX, type SrsState } from '../lib/srs'
import { useSettings } from '../store/settings'

const POS_TR: Record<string, string> = {
  noun: 'isim',
  verb: 'fiil',
  adjective: 'sıfat',
  adverb: 'zarf',
  'phrasal verb': 'phrasal verb',
  phrase: 'kalıp',
  preposition: 'edat',
  conjunction: 'bağlaç',
  determiner: 'belirteç',
}

export function posTone(pos?: string) {
  const p = (pos ?? '').toLowerCase()
  if (p.startsWith('noun')) return 'tag-lav'
  if (p.startsWith('adj')) return 'tag-sage'
  if (p.includes('verb')) return 'tag-peach'
  return ''
}

/** Part-of-speech pill: noun = lavender, adjective = sage, verbs = peach. */
export function PosTag({ pos }: { pos?: string }) {
  const { settings } = useSettings()
  if (!pos) return <span />
  const label = settings.lang === 'tr' ? (POS_TR[pos.toLowerCase()] ?? pos) : pos
  return <span className={`tag ${posTone(pos)}`}>{label}</span>
}

export type WordStatus = 'due' | 'learning' | 'learned'

export function wordStatus(srs: SrsState): WordStatus {
  if (isDue(srs)) return 'due'
  return isLearned(srs) ? 'learned' : 'learning'
}

/** Coloured dot + short text describing where the word is in the review cycle. */
export function StatusLabel({ srs }: { srs: SrsState }) {
  const { l } = useSettings()
  const status = wordStatus(srs)
  const days = daysUntilDue(srs)
  const text =
    status === 'due'
      ? l('Bugün tekrar', 'Review due today')
      : status === 'learned'
        ? l(`Öğrenildi · ${days} gün sonra`, `Mastered · in ${days}d`)
        : days === 1
          ? l(`Öğreniliyor (${srs.box}/${MAX_BOX}) · yarın`, `Learning (${srs.box}/${MAX_BOX}) · tomorrow`)
          : l(`Öğreniliyor (${srs.box}/${MAX_BOX}) · ${days} gün`, `Learning (${srs.box}/${MAX_BOX}) · ${days}d`)
  const color = status === 'due' ? 'text-accent' : status === 'learned' ? 'text-success' : 'text-primary'
  const dot = status === 'due' ? 'bg-accent' : status === 'learned' ? 'bg-success' : 'bg-primary'
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${color}`}>
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {text}
    </span>
  )
}
