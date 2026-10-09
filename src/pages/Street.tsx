import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { SpeakButton, TipBox } from '../components/ui'
import { streetCategories, streetCheckpoints, textbookVsStreet } from '../content/street'
import { speak } from '../lib/speech'
import { Mascot } from '../mascot/Mascot'
import { useSettings } from '../store/settings'

function Checkpoint() {
  const { l, tx } = useSettings()
  const [answers, setAnswers] = useState<Record<number, number>>({})
  return (
    <section className="card mt-8">
      <p className="eyebrow text-success">{l('Hızlı kontrol', 'Quick checkpoint')}</p>
      <h2 className="mt-1 text-[22px] font-bold">{l('Sokak refleksi: Ne dersin?', 'Street reaction: what do you say?')}</h2>
      <div className="mt-4 space-y-6">
        {streetCheckpoints.map((c, ci) => {
          const picked = answers[ci]
          return (
            <div key={ci}>
              <div className="flex items-start gap-3 rounded-2xl bg-surface-3 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon name="chat_bubble" size={20} />
                </span>
                <div>
                  <p className="eyebrow text-muted">{l('Durum', 'Situation')}</p>
                  <p className="text-[15px]">
                    {tx(c.situation)} <span className="font-bold">{c.prompt}</span>
                  </p>
                </div>
              </div>
              <div className="mt-2 space-y-2">
                {c.options.map((o, oi) => {
                  const style =
                    picked === undefined ? 'border-line bg-surface hover:border-primary-2' : oi === c.answer ? 'border-success bg-success-soft/70' : oi === picked ? 'border-danger bg-danger-soft/60' : 'border-line opacity-50'
                  return (
                    <button
                      key={o}
                      disabled={picked !== undefined}
                      onClick={() => setAnswers((a) => ({ ...a, [ci]: oi }))}
                      className={`flex w-full items-center gap-3 rounded-2xl border-[1.5px] px-4 py-3 text-left font-semibold transition ${style}`}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-3 text-xs font-bold text-text-2">{String.fromCharCode(65 + oi)}</span>
                      <span className="flex-1">{o}</span>
                    </button>
                  )
                })}
              </div>
              {picked !== undefined && (
                <p className="mt-2 flex items-center gap-2 text-sm text-text-2">
                  <Mascot anim={picked === c.answer ? 'celebrate' : 'surprise'} size={44} />
                  {tx(c.why)}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function Street() {
  const { l, tx } = useSettings()
  const [active, setActive] = useState(streetCategories[0].id)
  const cat = streetCategories.find((c) => c.id === active)!

  return (
    <div className="rise">
      <div className="mb-3 flex flex-wrap items-center gap-x-2 text-xs font-semibold text-muted">
        <Link to="/lessons" className="hover:text-primary">
          {l('Konular', 'Lessons')}
        </Link>
        <span>/</span>
        <span className="text-text-2">{l('Sokak İngilizcesi', 'Street English')}</span>
      </div>
      <div className="mb-2 flex flex-wrap gap-1.5">
        <span className="tag tag-sage">CEFR A2–B2</span>
        <span className="tag tag-lav">#StreetEnglish</span>
        <span className="tag tag-peach">{l('Argo & doğal akış', 'Slang & natural flow')}</span>
      </div>
      <h1 className="text-[28px] font-bold leading-tight tracking-tight sm:text-[34px]">{l('Sokak İngilizcesi: kalıplar, argo ve yazılmayan kurallar', 'Street English: small talk, slang & unwritten rules')}</h1>
      <p className="tr mt-1 text-[15px]">{l('Ders kitaplarında yazmayan ama bir kafeye girdiğin ilk saniyede duyacağın doğal ritim.', 'What textbooks skip — the natural rhythm you hear the second you walk into a café.')}</p>

      <div className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {streetCategories.map((c) => (
          <button key={c.id} className="chip min-h-10 shrink-0 text-sm" aria-pressed={c.id === active} onClick={() => setActive(c.id)}>
            {c.emoji} {tx(c.title)}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <TipBox anim="think" title={tx(cat.title)}>
          {tx(cat.intro)}
        </TipBox>
      </div>

      {cat.dialogue && (
        <section className="card mt-5">
          <div className="mb-4 flex items-center gap-2">
            <p className="eyebrow flex-1 text-muted">{l('Etkileşimli diyalog', 'Interactive script')}</p>
            <button className="btn btn-soft min-h-9 px-3 text-sm" onClick={() => speak(cat.dialogue!.map((d) => d.line).join(' '))}>
              <Icon name="play_circle" size={18} /> {l('Tümünü dinle', 'Listen to all')}
            </button>
          </div>
          <div className="space-y-3">
            {cat.dialogue.map((d, i) => {
              const me = d.who === 'B'
              return (
                <div key={i} className={`flex items-end gap-2 ${me ? 'flex-row-reverse' : ''}`}>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${me ? 'bg-success-soft text-success' : 'bg-primary-soft text-primary'}`}>{me ? 'SU' : 'LM'}</span>
                  <div className={`max-w-[78%] rounded-[18px] px-4 py-3 ${me ? 'rounded-br-md bg-success-soft/60' : 'rounded-bl-md bg-surface-3'}`}>
                    <p className="eyebrow mb-0.5 text-[10px] text-muted">{me ? l('Su (müşteri)', 'Su (customer)') : l('Liam (barista)', 'Liam (barista)')}</p>
                    <p className="text-[15px]">“{d.line}”</p>
                  </div>
                  <SpeakButton text={d.line} size="sm" />
                </div>
              )
            })}
          </div>
        </section>
      )}

      {cat.items && (
        <>
          <p className="eyebrow mb-1 mt-8 text-accent">{l('Derinlemesine kartlar', 'Deep dive cards')}</p>
          <h2 className="text-[24px] font-bold">{l('Sokak sözlüğü', 'The street lexicon')}</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 [&>*]:min-w-0">
            {cat.items.map((it) => (
              <div key={it.en} className="card flex flex-col p-4">
                <div className="flex items-start gap-2">
                  <p className="font-display flex-1 text-[22px] font-bold leading-tight text-primary">{it.en}</p>
                  <SpeakButton text={it.example ?? it.en} size="sm" />
                </div>
                <p className="mt-1 text-[14px] text-text-2">
                  <span className="font-bold">{l('Anlam', 'Meaning')}:</span> {it.tr}
                </p>
                {it.example && <p className="mt-3 rounded-xl bg-surface-2 px-3 py-2 text-[15px] italic">“{it.example}”</p>}
              </div>
            ))}
          </div>
        </>
      )}

      <section className="card mt-8">
        <p className="eyebrow text-muted">{l('Yan yana', 'Side by side')}</p>
        <h2 className="mt-1 text-[22px] font-bold">{l('Ders kitabı vs. gerçek sokak', 'Textbook English vs. real street English')}</h2>
        <p className="tr mt-1 text-sm">{l('Okulda ezberlenen kalıplar ve sokaktaki doğal karşılıkları.', 'Stiff school phrases and how people really say them.')}</p>
        <div className="mt-4 space-y-2">
          {textbookVsStreet.map((row) => (
            <div key={row.book} className="grid gap-2 rounded-2xl bg-surface-2 p-3 sm:grid-cols-2 sm:items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-muted">{l('Kitap kalıbı (sert)', 'Textbook (stiff)')}</p>
                <p className="text-[15px] text-muted line-through">“{row.book}”</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-success">{l('Sokakta (doğal)', 'Street (natural)')}</p>
                  <p className="text-[15px] font-bold">“{row.street}”</p>
                  <p className="tr text-xs">{row.tr}</p>
                </div>
                <SpeakButton text={row.street.split('/')[0]} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Checkpoint />
    </div>
  )
}
