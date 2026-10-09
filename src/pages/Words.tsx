import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { EmptyState, LevelBadge, SpeakButton, TipBox } from '../components/ui'
import { PosTag, StatusLabel, wordStatus, type WordStatus } from '../components/WordBits'
import { WordForm } from '../components/WordForm'
import { isLearned } from '../lib/srs'
import { LEVELS, useSettings, type Level } from '../store/settings'
import { useWords, type Word } from '../store/words'

type Filter = 'all' | WordStatus | 'starred'
type Sort = 'review' | 'newest' | 'az'
const PAGE = 20

function ProgressRing({ value }: { value: number }) {
  const r = 26
  const c = 2 * Math.PI * r
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="var(--surface-3)" strokeWidth="6" />
        <circle cx="32" cy="32" r={r} fill="none" stroke="var(--primary)" strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
      </svg>
      <span className="font-display absolute inset-0 flex items-center justify-center text-sm font-bold text-primary">{value}%</span>
    </div>
  )
}

function WordRow({ word }: { word: Word }) {
  const { updateWord } = useWords()
  const { l } = useSettings()
  return (
    <li className="card relative p-4 transition hover:shadow-lift sm:p-5">
      <Link to={`/words/${word.id}`} className="absolute inset-0 rounded-[24px]" aria-label={word.word} />
      <div className="pointer-events-none relative flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className={`font-display text-[22px] font-bold leading-tight ${word.starred ? 'text-primary' : ''}`}>{word.word}</span>
            {word.ipa && <span className="text-[13px] text-muted">{word.ipa}</span>}
            <span className="pointer-events-auto">
              <SpeakButton text={word.word} size="sm" />
            </span>
            <PosTag pos={word.pos} />
          </div>
          <p className="mt-1 text-[15px] text-text-2">{word.tr}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
            <LevelBadge level={word.level} />
            {word.tags.slice(0, 3).map((t) => (
              <span key={t} className="text-[11px] font-bold text-primary">
                #{t}
              </span>
            ))}
            <span className="h-1 w-1 rounded-full bg-outline" />
            <StatusLabel srs={word.srs} />
          </div>
        </div>
        <div className="pointer-events-auto flex shrink-0 items-center gap-1">
          <button
            onClick={() => updateWord(word.id, { starred: !word.starred })}
            className={`flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-2 ${word.starred ? 'text-accent' : 'text-outline'}`}
            aria-label={word.starred ? l('Yıldızı kaldır', 'Unstar') : l('Yıldızla', 'Star')}
            aria-pressed={!!word.starred}
          >
            <Icon name="star" fill={word.starred} size={22} />
          </button>
          <span className="hidden h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-text-2 sm:flex">
            <Icon name="arrow_forward" size={20} />
          </span>
        </div>
      </div>
    </li>
  )
}

export function Words() {
  const { t, l, tx } = useSettings()
  const { words } = useWords()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [level, setLevel] = useState<Level | null>(null)
  const [tag, setTag] = useState<string | null>(null)
  const [sort, setSort] = useState<Sort>('review')
  const [shown, setShown] = useState(PAGE)
  const adding = params.get('add') === '1'

  const counts = useMemo(() => {
    const c = { all: words.length, due: 0, learning: 0, learned: 0, starred: 0 }
    for (const w of words) {
      c[wordStatus(w.srs)]++
      if (w.starred) c.starred++
    }
    return c
  }, [words])
  const learnedPct = words.length ? Math.round((words.filter((w) => isLearned(w.srs)).length / words.length) * 100) : 0
  const allTags = useMemo(() => [...new Set(words.flatMap((w) => w.tags))].sort(), [words])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = words.filter((w) => {
      if (q && !w.word.toLowerCase().includes(q) && !w.tr.toLowerCase().includes(q) && !w.tags.some((t) => t.toLowerCase().includes(q))) return false
      if (level && w.level !== level) return false
      if (tag && !w.tags.includes(tag)) return false
      if (filter === 'starred') return !!w.starred
      if (filter !== 'all') return wordStatus(w.srs) === filter
      return true
    })
    return [...list].sort((a, b) =>
      sort === 'az' ? a.word.localeCompare(b.word) : sort === 'newest' ? b.createdAt - a.createdAt : a.srs.due.localeCompare(b.srs.due) || a.srs.box - b.srs.box,
    )
  }, [words, query, filter, level, tag, sort])

  const filters: { id: Filter; label: string; dot?: string }[] = [
    { id: 'all', label: l('Tümü', 'All') },
    { id: 'learning', label: l('Öğreniliyor', 'Learning'), dot: 'bg-primary' },
    { id: 'due', label: l('Tekrar zamanı', 'Review due'), dot: 'bg-accent' },
    { id: 'learned', label: l('Öğrenildi', 'Mastered'), dot: 'bg-success' },
    { id: 'starred', label: l('Yıldızlı', 'Starred'), dot: 'bg-accent-2' },
  ]

  const openAdd = () => setParams({ add: '1' })

  return (
    <div className="rise">
      <p className="eyebrow mb-3 flex items-center gap-2 text-muted">
        <span className="h-2 w-2 rounded-full bg-primary-2" />
        {l('Kişisel kelime defterim', 'Personal vocabulary ledger')}
      </p>

      <section className="card mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-4">
          <ProgressRing value={learnedPct} />
          <div>
            <h1 className="flex items-center gap-1.5 text-[26px] font-bold leading-tight">
              {words.length} {l('Kelime', 'Words')}
              <Icon name="verified" size={20} className="text-success" />
            </h1>
            <p className="text-[13px] text-text-2">
              {l(`${counts.learned} kalıcı hafızada, ${counts.learning + counts.due} aktif öğrenimde`, `${counts.learned} mastered, ${counts.learning + counts.due} in active learning`)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {words.length > 0 && (
            <Link to="/study" className="btn btn-soft flex-1 sm:flex-none">
              <Icon name="auto_stories" size={20} />
              {l('Tekrar et', 'Review')}
              {counts.due > 0 && <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-on-primary">{counts.due}</span>}
            </Link>
          )}
          <button onClick={openAdd} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent shadow-card transition hover:scale-105" aria-label={t('words.add')}>
            <Icon name="add" size={26} />
          </button>
        </div>
      </section>

      {words.length === 0 ? (
        <EmptyState anim="sleep" text={t('words.empty')}>
          <button className="btn btn-primary" onClick={openAdd}>
            <Icon name="add" /> {t('words.add')}
          </button>
        </EmptyState>
      ) : (
        <>
          <label className="relative block">
            <Icon name="search" size={22} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              className="input min-h-[52px] rounded-[20px] border-line bg-surface pl-12 shadow-card"
              type="search"
              placeholder={l('Defterinde ara (kelime, anlam, konu)…', 'Search your notebook (word, meaning, topic)…')}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setShown(PAGE)
              }}
            />
          </label>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-1 text-muted">{l('Seviye', 'Level')}:</span>
            <button className={`chip ${level === null ? '' : 'bg-transparent'}`} aria-pressed={level === null} onClick={() => setLevel(null)}>
              {l('Tümü', 'All')}
            </button>
            {LEVELS.map((lv) => (
              <button key={lv} className={`chip ${level === lv ? '' : 'bg-transparent'}`} aria-pressed={level === lv} onClick={() => setLevel(level === lv ? null : lv)}>
                {lv}
              </button>
            ))}
            <label className="ml-auto inline-flex items-center gap-1 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-bold text-text-2">
              <Icon name="swap_vert" size={16} />
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="bg-transparent outline-none" aria-label={l('Sırala', 'Sort')}>
                <option value="review">{l('Sıradaki tekrar', 'Next review')}</option>
                <option value="newest">{l('En yeni', 'Newest')}</option>
                <option value="az">A → Z</option>
              </select>
            </label>
          </div>

          <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-bold transition ${
                  filter === f.id ? 'border-primary-2 bg-primary-soft text-primary' : 'border-line bg-surface text-text-2'
                }`}
              >
                {f.dot && <span className={`h-2 w-2 rounded-full ${f.dot}`} />}
                {f.label}
                <span className="font-semibold opacity-60">{counts[f.id]}</span>
              </button>
            ))}
          </div>

          {allTags.length > 0 && (
            <div className="no-scrollbar -mx-4 mt-3 flex items-center gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
              <span className="mr-1 shrink-0 text-[11px] font-bold text-muted">{l('Konu', 'Topic')}:</span>
              {allTags.map((tg) => (
                <button
                  key={tg}
                  onClick={() => setTag(tag === tg ? null : tg)}
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${tag === tg ? 'bg-primary-soft text-primary' : 'bg-surface-3 text-text-2'}`}
                >
                  #{tg}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="tr py-12 text-center">{t('words.noMatch')}</p>
          ) : (
            <ul className="mt-5 space-y-3">
              {filtered.slice(0, shown).map((w) => (
                <WordRow key={w.id} word={w} />
              ))}
            </ul>
          )}

          {filtered.length > shown && (
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-[13px] text-text-2">
                {l(`${filtered.length} kelimeden ${shown} tanesi gösteriliyor`, `Showing ${shown} of ${filtered.length} words`)}
              </p>
              <button className="btn btn-secondary" onClick={() => setShown((s) => s + PAGE)}>
                {l('Daha fazla göster', 'Show more')}
                <Icon name="expand_more" size={20} />
              </button>
            </div>
          )}

          <div className="mt-6">
            <TipBox title={l('Defter notu', 'Notebook tip')} anim="explain">
              {tx({
                tr: 'Uyumadan hemen önce 5–10 kelimeyi tekrar etmek, akılda kalıcılığı artırır. Acele etme, yavaş yavaş.',
                en: 'Reviewing 5–10 words right before sleeping helps them stick. Don’t rush — keep it gentle.',
              })}
            </TipBox>
          </div>
        </>
      )}

      <button
        className="btn btn-primary fixed bottom-[calc(80px+env(safe-area-inset-bottom))] right-4 z-20 h-14 w-14 rounded-full p-0 shadow-lift md:hidden"
        onClick={openAdd}
        aria-label={t('words.add')}
      >
        <Icon name="add" size={28} />
      </button>

      {adding && <WordForm onClose={() => setParams({})} />}
    </div>
  )
}
