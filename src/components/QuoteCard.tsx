import { useState } from 'react'
import { quotes } from '../content/quotes'
import { pickForDay } from '../lib/date'
import { useSettings } from '../store/settings'
import { Icon } from './Icon'

/** "Daily notebook thought" — a quiet quote at the bottom of the page, translation on tap. */
export function QuoteCard() {
  const { l } = useSettings()
  const [open, setOpen] = useState(false)
  const quote = pickForDay(quotes, 7)
  if (!quote) return null

  return (
    <section className="rounded-[24px] bg-surface-2 px-5 py-6 text-center sm:px-10">
      <p className="eyebrow text-muted">{l('Günün düşüncesi', 'Daily notebook thought')}</p>
      <blockquote className="mx-auto mt-2 max-w-xl font-serif text-[17px] font-semibold italic leading-snug text-text-2 sm:text-lg" lang="en">
        “{quote.text.replace(/^“|”$/g, '')}”
      </blockquote>
      <p className="mt-1.5 text-xs font-semibold text-muted">— {quote.author}</p>
      {open && <p className="tr mx-auto mt-2 max-w-xl text-sm">{quote.tr}</p>}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-surface-3 px-3 py-1.5 text-[11px] font-bold text-text-2"
        aria-expanded={open}
      >
        <Icon name="translate" size={14} />
        {open ? l('Çeviriyi gizle', 'Hide translation') : l('Türkçesini göster', 'Show Turkish translation')}
      </button>
    </section>
  )
}
