// Voice journal: speaking-practice recordings kept on this device (IndexedDB — audio is too big for localStorage).
export interface JournalEntry {
  id: string
  createdAt: number
  topic: string
  level: string
  seconds: number
  audio: Blob
}

const DB = 'su-journal'
const STORE = 'recordings'

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'id' })
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function tx<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open()
  return new Promise((resolve, reject) => {
    const req = run(db.transaction(STORE, mode).objectStore(STORE))
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export const journalSupported = typeof indexedDB !== 'undefined'

export async function listEntries(): Promise<JournalEntry[]> {
  try {
    const all = await tx<JournalEntry[]>('readonly', (s) => s.getAll() as IDBRequest<JournalEntry[]>)
    return all.sort((a, b) => b.createdAt - a.createdAt)
  } catch {
    return []
  }
}

export function addEntry(entry: Omit<JournalEntry, 'id' | 'createdAt'>): Promise<IDBValidKey> {
  const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now())
  return tx('readwrite', (s) => s.put({ ...entry, id, createdAt: Date.now() }))
}

export function deleteEntry(id: string): Promise<undefined> {
  return tx('readwrite', (s) => s.delete(id) as IDBRequest<undefined>)
}
