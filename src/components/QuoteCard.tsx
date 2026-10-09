import { useState } from 'react'
import { quotes } from '../content/quotes'
import { pickForDay } from '../lib/date'
import { useSettings } from '../store/settings'

/** Small, quiet quote corner — meant to be noticed, not to distract. */
export function QuoteCard() {
  const { t } = useSettings()
  const [open, setOpen] = useState(false)
  const quote = pickForDay(quotes, 7)
  if (!quote) return null

  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className="mx-auto mt-10 block max-w-md px-4 text-center text-sm text-muted opacity-80"
      aria-expanded={open}
    >
      <span className="italic">“{quote.text.replace(/^“|”$/g, '')}”</span>
      <span className="mt-1 block text-xs">— {quote.author}</span>
      {open ? <span className="mt-2 block text-xs">{quote.tr}</span> : <span className="mt-1 block text-[11px] opacity-60">{t('quote.tap')}</span>}
    </button>
  )
}
