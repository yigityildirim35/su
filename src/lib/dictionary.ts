// Primary: Free Dictionary API (https://dictionaryapi.dev) — has IPA + audio but is sometimes down.
// Fallback: Wiktionary REST API — reliable, definitions and examples only.
export interface DictionaryResult {
  ipa?: string
  audio?: string
  pos?: string
  definition?: string
  examples: string[]
  synonyms: string[]
}

interface FreeDictEntry {
  phonetic?: string
  phonetics?: { text?: string; audio?: string }[]
  meanings?: {
    partOfSpeech?: string
    synonyms?: string[]
    definitions?: { definition?: string; example?: string; synonyms?: string[] }[]
  }[]
}

interface WiktionaryEntry {
  partOfSpeech?: string
  language?: string
  definitions?: { definition?: string; examples?: string[]; parsedExamples?: { example?: string }[] }[]
}

const TIMEOUT_MS = 5000

function withTimeout(signal?: AbortSignal): AbortSignal {
  const timeout = AbortSignal.timeout(TIMEOUT_MS)
  return signal ? AbortSignal.any([signal, timeout]) : timeout
}

function stripHtml(html: string): string {
  return (new DOMParser().parseFromString(html, 'text/html').body.textContent ?? '').replace(/\s+/g, ' ').trim()
}

async function freeDictionary(word: string, signal?: AbortSignal): Promise<DictionaryResult | null> {
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`, { signal: withTimeout(signal) })
  if (!res.ok) return null
  const entries = (await res.json()) as FreeDictEntry[]
  if (!Array.isArray(entries) || entries.length === 0) return null

  const phonetics = entries.flatMap((e) => e.phonetics ?? [])
  const meanings = entries.flatMap((e) => e.meanings ?? [])
  const definitions = meanings.flatMap((m) => m.definitions ?? [])

  return {
    ipa: entries.find((e) => e.phonetic)?.phonetic ?? phonetics.find((p) => p.text)?.text,
    audio: phonetics.find((p) => p.audio)?.audio || undefined,
    pos: meanings[0]?.partOfSpeech,
    definition: definitions[0]?.definition,
    examples: definitions.map((d) => d.example).filter((x): x is string => !!x).slice(0, 3),
    synonyms: [...new Set(meanings.flatMap((m) => [...(m.synonyms ?? []), ...(m.definitions ?? []).flatMap((d) => d.synonyms ?? [])]))].slice(0, 6),
  }
}

async function wiktionary(word: string, signal?: AbortSignal): Promise<DictionaryResult | null> {
  const res = await fetch(`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(word)}`, { signal: withTimeout(signal) })
  if (!res.ok) return null
  const data = (await res.json()) as { en?: WiktionaryEntry[] }
  const entry = data.en?.find((e) => e.definitions?.some((d) => d.definition))
  if (!entry) return null
  const defs = (entry.definitions ?? []).filter((d) => d.definition && stripHtml(d.definition))
  return {
    pos: entry.partOfSpeech?.toLowerCase(),
    definition: defs[0] ? stripHtml(defs[0].definition!) : undefined,
    examples: defs
      .flatMap((d) => [...(d.parsedExamples ?? []).map((p) => p.example ?? ''), ...(d.examples ?? [])])
      .map(stripHtml)
      .filter((x) => x && x.length < 160)
      .slice(0, 3),
    synonyms: [],
  }
}

export async function lookup(word: string, signal?: AbortSignal): Promise<DictionaryResult | null> {
  const q = word.trim().toLowerCase()
  try {
    const primary = await freeDictionary(q, signal)
    if (primary) return primary
  } catch (err) {
    if (signal?.aborted) throw err
  }
  return wiktionary(q, signal)
}
