import { addDays, dayKey, today } from './date'

// Leitner boxes: remembering moves a word up, forgetting sends it back to the start.
// Index = box number, value = days until the next review.
const INTERVALS = [0, 1, 2, 4, 8, 16, 32]
export const MAX_BOX = INTERVALS.length - 1

export type Rating = 'again' | 'good' | 'easy'

export interface SrsState {
  box: number
  due: string // YYYY-MM-DD
}

export function newSrs(): SrsState {
  return { box: 0, due: dayKey() }
}

export function isDue(srs: SrsState): boolean {
  return srs.due <= dayKey()
}

function nextBox(srs: SrsState, rating: Rating): number {
  if (rating === 'again') return 0
  return Math.min(srs.box + (rating === 'easy' ? 2 : 1), MAX_BOX)
}

export function review(srs: SrsState, rating: Rating): SrsState {
  const box = nextBox(srs, rating)
  return { box, due: dayKey(addDays(today(), INTERVALS[box])) }
}

/** Days until the next review if the word gets this rating (0 = again today). */
export function intervalFor(srs: SrsState, rating: Rating): number {
  return INTERVALS[nextBox(srs, rating)]
}

export function daysUntilDue(srs: SrsState): number {
  const [y, m, d] = srs.due.split('-').map(Number)
  const due = new Date(y, m - 1, d)
  const t = today()
  const now = new Date(t.getFullYear(), t.getMonth(), t.getDate())
  return Math.round((due.getTime() - now.getTime()) / 86_400_000)
}

export function isLearned(srs: SrsState): boolean {
  return srs.box >= 4
}
