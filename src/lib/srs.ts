import { addDays, dayKey, today } from './date'

// Leitner boxes: a word moves up a box each time it's remembered and back to box 1 when forgotten.
// Index = box number, value = days until the next review.
const INTERVALS = [0, 1, 2, 4, 8, 16, 32]
export const MAX_BOX = INTERVALS.length - 1

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

export function review(srs: SrsState, remembered: boolean): SrsState {
  const box = remembered ? Math.min(srs.box + 1, MAX_BOX) : 1
  return { box, due: dayKey(addDays(today(), INTERVALS[box])) }
}

export function isLearned(srs: SrsState): boolean {
  return srs.box >= 4
}
