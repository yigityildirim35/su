import type { Level } from '../store/settings'
import { grammarA } from './grammarA'
import { grammarB1 } from './grammarB1'
import { grammarB2 } from './grammarB2'
import { tenseLessons } from './tenses'

type Bi = { tr: string; en: string }

export type LessonSection =
  | { kind: 'structure'; rows: { label: Bi; formula: string; example: string }[] }
  | { kind: 'when'; items: { text: Bi; example: string }[] }
  | { kind: 'signals'; words: string[] }
  | { kind: 'examples'; items: { en: string; tr: string }[] }
  | { kind: 'daily'; text: Bi; items: string[] }
  | { kind: 'media'; items: { title: string; line: string; who?: string; note: Bi }[] }
  | { kind: 'mistakes'; items: { wrong: string; right: string; why: Bi }[] }
  | { kind: 'tip'; text: Bi }
  | {
      kind: 'overview'
      columns: string[]
      rows: { label: Bi; cells: { id: string; formula: string; example: string }[] }[]
    }

export interface QuizQuestion {
  question: string
  options: string[]
  answer: number
  explain?: Bi
}

export interface Lesson {
  id: string
  level: Level
  title: string
  subtitle: Bi
  sections?: LessonSection[]
  quiz?: QuizQuestion[]
}

// Curriculum order: lessons appear in this order within each level and "Next lesson" follows it.
const ORDER = [
  // A1
  'to-be', 'present-simple', 'present-continuous', 'there-is-are', 'articles', 'can', 'prepositions', 'adverbs-of-frequency',
  // A2
  'past-simple', 'past-continuous', 'future-simple', 'present-perfect', 'comparatives-superlatives', 'some-any-much-many', 'should-must-have-to', 'first-conditional',
  // B1
  'present-perfect-vs-past-simple', 'present-perfect-continuous', 'past-perfect', 'used-to-would', 'second-conditional', 'passive-voice', 'reported-speech', 'relative-clauses', 'gerund-vs-infinitive', 'modals-of-deduction',
  // B2
  'past-perfect-continuous', 'future-continuous', 'future-perfect', 'future-perfect-continuous', 'third-mixed-conditionals', 'wish-if-only', 'modal-perfects', 'causative', 'inversion', 'discourse-markers',
]

const all = [...tenseLessons, ...grammarA, ...grammarB1, ...grammarB2]
const byId = new Map(all.map((l) => [l.id, l]))

export const OVERVIEW_ID = 'tenses-overview'

/** Every lesson in curriculum order (the tenses overview is reached from its own card). */
export const lessons: Lesson[] = [byId.get(OVERVIEW_ID)!, ...ORDER.map((id) => byId.get(id)!)]

export function nextLesson(id: string): Lesson | undefined {
  if (id === OVERVIEW_ID) return byId.get(ORDER[0])
  const i = ORDER.indexOf(id)
  return i >= 0 && i + 1 < ORDER.length ? byId.get(ORDER[i + 1]) : undefined
}
