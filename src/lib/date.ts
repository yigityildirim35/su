// "Today" can be overridden with ?date=YYYY-MM-DD to preview special-day themes.
export function today(): Date {
  try {
    const param = new URLSearchParams(window.location.search).get('date')
    if (param && /^\d{4}-\d{2}-\d{2}$/.test(param)) {
      const [y, m, d] = param.split('-').map(Number)
      return new Date(y, m - 1, d)
    }
  } catch {
    /* ignore */
  }
  return new Date()
}

export function dayKey(date: Date = today()): string {
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${m}-${d}`
}

/** Days since epoch in local time — used to rotate daily content. */
export function dayNumber(date: Date = today()): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000)
}

/** Picks a stable item for the given day; `salt` keeps different lists from moving in lockstep. */
export function pickForDay<T>(items: T[], salt = 0, date: Date = today()): T | undefined {
  if (items.length === 0) return undefined
  return items[(dayNumber(date) + salt) % items.length]
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}
