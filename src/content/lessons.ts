import type { Level } from '../store/settings'
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

const soon = (level: Level, title: string, tr: string, en: string): Lesson => ({
  id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  level,
  title,
  subtitle: { tr, en },
})

// Lessons without sections show as "coming soon".
const otherLessons: Lesson[] = [
  soon('A1', 'To be (am / is / are)', 'Olmak fiili', 'The verb “to be”'),
  soon('A1', 'There is / There are', 'Var / Yok', 'Saying what exists'),
  soon('A1', 'A / An / The', 'Artikeller', 'Articles'),
  soon('A1', 'Can / Can’t', 'Yetenek', 'Ability'),
  soon('A1', 'In / On / At', 'Yer ve zaman edatları', 'Prepositions of place and time'),
  soon('A1', 'Adverbs of Frequency', 'Sıklık zarfları', 'always, usually, never…'),
  soon('A2', 'Comparatives & Superlatives', 'Karşılaştırma', 'bigger, the biggest'),
  soon('A2', 'Some / Any / Much / Many', 'Sayılabilen ve sayılamayan', 'Countable and uncountable'),
  soon('A2', 'Should / Must / Have to', 'Tavsiye ve zorunluluk', 'Advice and obligation'),
  soon('A2', 'First Conditional', 'Gerçek koşul', 'If it rains, I’ll stay home'),
  soon('B1', 'Present Perfect vs Past Simple', 'Hangisi ne zaman?', 'Which one when?'),
  soon('B1', 'Used to / Would', 'Eski alışkanlıklar', 'Past habits'),
  soon('B1', 'Second Conditional', 'Hayali koşul', 'If I won the lottery…'),
  soon('B1', 'Passive Voice', 'Edilgen yapı', 'It was made in…'),
  soon('B1', 'Reported Speech', 'Dolaylı anlatım', 'She said that…'),
  soon('B1', 'Relative Clauses', 'Sıfat cümlecikleri', 'who, which, that'),
  soon('B1', 'Gerund vs Infinitive', '-ing mi to mu?', 'enjoy doing vs want to do'),
  soon('B1', 'Modals of Deduction', 'Tahmin', 'must, might, can’t'),
  soon('B2', 'Third & Mixed Conditionals', 'Geçmişe dair pişmanlık', 'If I had known…'),
  soon('B2', 'Wish / If only', 'Dilekler ve pişmanlıklar', 'Wishes and regrets'),
  soon('B2', 'Modal Perfects', 'should have, could have', 'Past possibilities and regrets'),
  soon('B2', 'Causative', 'Bir işi yaptırmak', 'have something done'),
  soon('B2', 'Inversion', 'Vurgulu devrik yapı', 'Never have I ever…'),
  soon('B2', 'Discourse Markers', 'Bağlaçlar ve geçiş ifadeleri', 'however, moreover, having said that'),
]

export const TENSE_IDS = new Set(tenseLessons.map((l) => l.id))

export const lessons: Lesson[] = [...tenseLessons, ...otherLessons]
