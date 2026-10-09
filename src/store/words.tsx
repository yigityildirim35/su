import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { SEED_VERSION, seedWords } from '../content/words.seed'
import { newSrs, review, type SrsState } from '../lib/srs'
import { load, save } from '../lib/storage'
import type { Level } from './settings'

export interface Word {
  id: string
  word: string
  ipa?: string
  audio?: string
  pos?: string
  tr: string
  definition?: string
  examples: string[]
  synonyms: string[]
  level?: Level
  tags: string[]
  /** A verified line from a movie/series where the word appears. */
  media?: { title: string; line: string; source?: string }
  createdAt: number
  srs: SrsState
}

export type WordInput = Omit<Word, 'id' | 'createdAt' | 'srs'>

const KEY = 'su.words'
const SEEDED_KEY = 'su.seeded'

// Storage is local for now; a Supabase-backed version will keep the same interface.
interface WordsContextValue {
  words: Word[]
  add: (input: WordInput) => Word
  updateWord: (id: string, patch: Partial<WordInput>) => void
  remove: (id: string) => void
  grade: (id: string, remembered: boolean) => void
  importWords: (incoming: Word[]) => number
  findByText: (text: string) => Word | undefined
}

const WordsContext = createContext<WordsContextValue | null>(null)

function makeId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

// New seed versions only add words the list doesn't already contain, so the user's edits and progress are kept.
function initialWords(): Word[] {
  const stored = load<Word[]>(KEY, [])
  const seededVersion = Number(load<number | boolean>(SEEDED_KEY, 0))
  if (seededVersion >= SEED_VERSION) return stored
  save(SEEDED_KEY, SEED_VERSION)
  const existing = new Set(stored.map((w) => w.word.trim().toLowerCase()))
  const fresh = seedWords
    .filter((w) => !existing.has(w.word.toLowerCase()))
    .map((w, i) => ({ ...w, id: makeId(), createdAt: Date.now() - i, srs: newSrs() }))
  return [...stored, ...fresh]
}

export function WordsProvider({ children }: { children: ReactNode }) {
  const [words, setWords] = useState<Word[]>(initialWords)

  useEffect(() => {
    save(KEY, words)
  }, [words])

  const value = useMemo<WordsContextValue>(() => {
    const normalize = (s: string) => s.trim().toLowerCase()
    return {
      words,
      add: (input) => {
        const word: Word = { ...input, word: input.word.trim(), id: makeId(), createdAt: Date.now(), srs: newSrs() }
        setWords((ws) => [word, ...ws])
        return word
      },
      updateWord: (id, patch) => setWords((ws) => ws.map((w) => (w.id === id ? { ...w, ...patch } : w))),
      remove: (id) => setWords((ws) => ws.filter((w) => w.id !== id)),
      grade: (id, remembered) => setWords((ws) => ws.map((w) => (w.id === id ? { ...w, srs: review(w.srs, remembered) } : w))),
      importWords: (incoming) => {
        const existing = new Set(words.map((w) => normalize(w.word)))
        const fresh = incoming
          .filter((w) => w && typeof w.word === 'string' && !existing.has(normalize(w.word)))
          .map((w) => ({
            ...w,
            id: makeId(),
            tr: w.tr ?? '',
            examples: w.examples ?? [],
            synonyms: w.synonyms ?? [],
            tags: w.tags ?? [],
            createdAt: w.createdAt ?? Date.now(),
            srs: w.srs ?? newSrs(),
          }))
        setWords((ws) => [...fresh, ...ws])
        return fresh.length
      },
      findByText: (text) => words.find((w) => normalize(w.word) === normalize(text)),
    }
  }, [words])

  return <WordsContext.Provider value={value}>{children}</WordsContext.Provider>
}

export function useWords() {
  const ctx = useContext(WordsContext)
  if (!ctx) throw new Error('useWords must be used inside WordsProvider')
  return ctx
}
