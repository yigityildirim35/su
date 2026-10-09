import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { EmptyState, LevelBadge, MascotBubble, Segmented, SpeakButton } from '../components/ui'
import { Waveform } from '../components/Waveform'
import { speakingTopics, type SpeakingTopic } from '../content/speaking'
import { markSpoke } from '../lib/daily'
import { dayNumber } from '../lib/date'
import { addEntry, deleteEntry, journalSupported, listEntries, type JournalEntry } from '../lib/journal'
import { canRecord, useRecorder } from '../lib/recorder'
import { speak } from '../lib/speech'
import { useSettings } from '../store/settings'
import { useWords } from '../store/words'

type Tab = 'daily' | 'library' | 'journal'
const DURATIONS = [1, 3, 5]

const format = (sec: number) => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`

function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const refresh = () => {
    listEntries().then(setEntries)
  }
  useEffect(refresh, [])
  return { entries, refresh }
}

function Recorder({ topic, onSaved }: { topic: SpeakingTopic; onSaved: () => void }) {
  const { l, settings } = useSettings()
  const [minutes, setMinutes] = useState(3)
  const [elapsed, setElapsed] = useState(0)
  const [saved, setSaved] = useState(false)
  const { recording, blob, url, error, stream, start, stop, reset } = useRecorder()
  const limit = minutes * 60

  useEffect(() => {
    if (!recording) return
    const id = window.setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [recording])

  // Stop automatically when the time is up.
  useEffect(() => {
    if (recording && elapsed >= limit) stop()
  }, [recording, elapsed, limit, stop])

  useEffect(() => {
    if (!recording && blob && elapsed >= 5) markSpoke()
  }, [recording, blob, elapsed])

  const toggle = async () => {
    if (recording) {
      stop()
      return
    }
    setElapsed(0)
    setSaved(false)
    await start()
  }

  const startOver = () => {
    reset()
    setElapsed(0)
    setSaved(false)
  }

  const save = async () => {
    if (!blob) return
    await addEntry({ topic: topic.topic, level: settings.level, seconds: elapsed, audio: blob })
    setSaved(true)
    onSaved()
  }

  if (!canRecord) {
    return <p className="paper text-sm text-text-2">{l('Bu cihazda ses kaydı desteklenmiyor. Yine de konuyu sesli anlatabilirsin!', 'Recording isn’t supported on this device — you can still talk it through out loud!')}</p>
  }

  return (
    <section className="rounded-[24px] bg-surface-3 p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        {recording ? (
          <p className="flex flex-1 items-center gap-2 text-sm font-bold text-danger">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-danger" /> {l('Kayıt sürüyor…', 'Recording in progress…')}
          </p>
        ) : (
          <p className="flex flex-1 items-center gap-2 text-sm font-bold text-text-2">
            <Icon name="mic" size={18} /> {url ? l('Kayıt hazır', 'Recording ready') : l('Hazır olduğunda başla', 'Start when you’re ready')}
          </p>
        )}
        <div className="flex gap-1">
          {DURATIONS.map((d) => (
            <button
              key={d}
              disabled={recording}
              onClick={() => setMinutes(d)}
              className={`rounded-full px-3 py-1 text-xs font-bold ${minutes === d ? 'bg-primary text-on-primary' : 'bg-surface text-text-2'} disabled:opacity-60`}
            >
              {d} {l('dk', 'min')}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[20px] bg-surface p-4">
        <p className="text-center">
          <span className="font-display text-[44px] font-bold tabular-nums">{format(elapsed)}</span>
          <span className="text-lg font-semibold text-muted"> / {format(limit)}</span>
        </p>
        <p className="text-center text-[11px] font-semibold text-muted">{l('Sakin konuşma temposu: dakikada ~110–130 kelime', 'Gentle speaking pace: ~110–130 words per minute')}</p>
        <div className="relative mt-3 h-20">
          <Waveform stream={stream} />
          <div className="pointer-events-none absolute inset-y-0 w-px bg-accent-2" style={{ left: `${Math.min(100, (elapsed / limit) * 100)}%` }} />
        </div>
        <div className="mt-1 flex justify-between text-[10px] font-bold text-muted">
          <span>00:00</span>
          <span>{format(Math.round(limit / 2))}</span>
          <span>{format(limit)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button className="btn btn-secondary min-h-10 px-3 text-sm" onClick={startOver} disabled={!url && !recording}>
          <Icon name="restart_alt" size={18} /> {l('Baştan', 'Start over')}
        </button>
        <button
          onClick={toggle}
          className={`flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lift ring-8 transition active:scale-95 ${recording ? 'bg-danger ring-danger-soft' : 'bg-primary ring-primary-soft'}`}
          aria-label={recording ? l('Durdur', 'Stop') : l('Kaydet', 'Record')}
        >
          <Icon name={recording ? 'stop' : 'mic'} fill size={36} />
        </button>
        <button className="btn btn-secondary min-h-10 px-3 text-sm" onClick={() => speak(topic.topic, settings.accent)}>
          <Icon name="volume_up" size={18} /> {l('Konu', 'Topic')}
        </button>
      </div>
      {error && <p className="mt-3 text-center text-sm font-bold text-danger">{l('Mikrofon izni verilmedi.', 'Microphone permission was denied.')}</p>}

      {url && !recording && (
        <div className="mt-4 rounded-[20px] bg-surface p-4">
          <p className="eyebrow mb-2">{l('Kaydını dinle', 'Listen back')}</p>
          <audio src={url} controls className="w-full" />
          {journalSupported && (
            <button className={`btn mt-3 w-full ${saved ? 'bg-success-soft text-success' : 'btn-primary'}`} onClick={save} disabled={saved}>
              <Icon name={saved ? 'check_circle' : 'library_add'} size={20} /> {saved ? l('Ses günlüğüne kaydedildi', 'Saved to your voice journal') : l('Ses günlüğüne kaydet', 'Save to voice journal')}
            </button>
          )}
        </div>
      )}
    </section>
  )
}

function TopicCard({ topic }: { topic: SpeakingTopic }) {
  const { l, settings } = useSettings()
  const { words } = useWords()
  // A few of the learner's own words to weave into the talk.
  const target = useMemo(() => {
    const pool = words.filter((w) => w.level === settings.level)
    const list = pool.length >= 4 ? pool : words
    const start = list.length ? dayNumber() % list.length : 0
    return [0, 1, 2, 3].map((i) => list[(start + i * 7) % Math.max(1, list.length)]).filter((w, i, a) => w && a.indexOf(w) === i)
  }, [words, settings.level])

  return (
    <section className="card relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-soft via-success-soft to-accent-soft" />
      <div className="flex items-center gap-2">
        <LevelBadge level={settings.level} long />
        <span className="ml-auto flex items-center gap-1 text-xs font-bold text-text-2">
          <Icon name="timer" size={16} /> {l('Hedef: 2–3 dk', 'Target: 2–3 mins')}
        </span>
      </div>
      <p className="font-display mt-3 text-[24px] font-bold leading-snug">“{topic.topic}”</p>
      <p className="tr mt-1 italic">“{topic.tr}”</p>

      <p className="eyebrow mb-2 mt-5 flex items-center gap-1.5">
        <Icon name="lightbulb" size={16} className="text-accent" /> {l('Cümle başlatıcılar', 'Sentence starters')}
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {topic.phrases.map((p) => (
          <button key={p} onClick={() => speak(p)} className="flex items-center gap-2 rounded-2xl border border-line bg-surface-2 px-3 py-2.5 text-left text-[15px] italic text-primary">
            <span className="flex-1">“{p}”</span>
            <Icon name="volume_up" size={18} className="text-outline" />
          </button>
        ))}
      </div>

      <p className="eyebrow mb-2 mt-5">{l('Yardımcı sorular', 'Helper questions')}</p>
      <ul className="space-y-1.5">
        {topic.questions.map((q) => (
          <li key={q} className="flex items-center gap-2 text-[15px]">
            <SpeakButton text={q} size="sm" />
            {q}
          </li>
        ))}
      </ul>

      {target.length > 0 && (
        <>
          <p className="eyebrow mb-2 mt-5 flex items-center justify-between gap-2">
            {l('Hedef kelimeler', 'Target vocabulary')}
            <span className="text-[10px] font-semibold normal-case tracking-normal text-muted">{l('Konuşmana 1–2 tanesini kat', 'Try weaving 1 or 2 into your talk')}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {target.map((w) => (
              <Link key={w.id} to={`/words/${w.id}`} className="chip bg-success-soft/70 text-success">
                ✨ {w.word} <span className="font-normal text-text-2">({w.tr.split(/[;,]/)[0]})</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

function Journal({ entries, onChange }: { entries: JournalEntry[]; onChange: () => void }) {
  const { l, settings } = useSettings()
  const urls = useMemo(() => new Map(entries.map((e) => [e.id, URL.createObjectURL(e.audio)])), [entries])
  useEffect(() => () => urls.forEach((u) => URL.revokeObjectURL(u)), [urls])

  if (entries.length === 0) {
    return (
      <EmptyState anim="idle" text={l('Henüz kayıt yok. Bir konuşma kaydedip “Ses günlüğüne kaydet” dediğinde burada görünür.', 'No recordings yet. Record a talk and tap “Save to voice journal”.')} />
    )
  }
  return (
    <div className="space-y-3">
      <p className="tr text-sm">{l('Eski kayıtlarınla bugünkünü karşılaştır — ilerlemeyi duymak çok motive eder.', 'Compare old recordings with today’s — hearing your progress is motivating.')}</p>
      {entries.map((e) => (
        <div key={e.id} className="card p-4">
          <div className="mb-2 flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <p className="font-bold">“{e.topic}”</p>
              <p className="text-xs font-semibold text-muted">
                {new Date(e.createdAt).toLocaleDateString(settings.lang === 'tr' ? 'tr-TR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · {format(e.seconds)} · {e.level}
              </p>
            </div>
            <button
              onClick={async () => {
                if (window.confirm(l('Bu kayıt silinsin mi?', 'Delete this recording?'))) {
                  await deleteEntry(e.id)
                  onChange()
                }
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full text-text-2 hover:bg-surface-2 hover:text-danger"
              aria-label={l('Sil', 'Delete')}
            >
              <Icon name="delete" size={20} />
            </button>
          </div>
          <audio src={urls.get(e.id)} controls className="w-full" />
        </div>
      ))}
    </div>
  )
}

export function Practice() {
  const { l, settings } = useSettings()
  const [params, setParams] = useSearchParams()
  const tab = (params.get('tab') as Tab) || 'daily'
  const topics = speakingTopics[settings.level]
  const [picked, setPicked] = useState<number | null>(null)
  const index = picked ?? dayNumber() % topics.length
  const topic = topics[index % topics.length]
  const { entries, refresh } = useJournal()
  const others = [1, 2, 3].map((i) => (index + i) % topics.length).filter((i) => i !== index)

  const setTab = (t: Tab) => setParams(t === 'daily' ? {} : { tab: t }, { replace: true })
  const choose = (i: number) => {
    setPicked(i)
    setTab('daily')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="rise">
      <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-muted">
        <Icon name="record_voice_over" size={16} /> {l('Pratik', 'Practice')} / <span className="text-primary">{l('Konuşma stüdyosu', 'Speaking & self-talk studio')}</span>
      </div>
      <h1 className="flex items-center gap-2 text-[28px] font-bold leading-tight sm:text-[32px]">
        {l('Sakin Konuşma Stüdyosu', 'Cozy Speaking Studio')}
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success-soft text-success">
          <Icon name="mic" size={18} />
        </span>
      </h1>
      <p className="tr mt-1 italic">{l('Kendi kendine konuşarak akıcılık geliştirme alanı.', 'A private space to build fluency by talking to yourself.')}</p>
      <p className="mt-2 text-[15px] text-text-2">{l('1–3 dakikalık kayıtlar. Yargı yok, acele yok — sadece sıcak ve sakin bir pratik.', 'Gentle 1-to-3 minute recordings. No judgement, no rush — just practice in a warm, private space.')}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="chip">
          <Icon name="hourglass_empty" size={16} /> {l('Bugünün hedefi: 3 dk', 'Today’s target: 3 mins')}
        </span>
        <span className="chip">
          <Icon name="library_music" size={16} /> {l(`Kayıtlı: ${entries.length} ses`, `Saved: ${entries.length} clips`)}
        </span>
      </div>

      <Segmented
        className="mt-5"
        value={tab}
        onChange={setTab}
        options={[
          { value: 'daily', label: <><Icon name="wb_sunny" size={18} /> <span className="hidden sm:inline">{l('Günün konusu', 'Daily focus topic')}</span><span className="sm:hidden">{l('Bugün', 'Today')}</span></> },
          { value: 'library', label: <><Icon name="grid_view" size={18} /> <span className="hidden sm:inline">{l('Konu kütüphanesi', 'Topic library')}</span><span className="sm:hidden">{l('Konular', 'Topics')}</span></> },
          { value: 'journal', label: <><Icon name="graphic_eq" size={18} /> <span className="hidden sm:inline">{l('Ses günlüğüm', 'My journal')}</span><span className="sm:hidden">{l('Günlük', 'Journal')}</span></> },
        ]}
      />

      <div className="mt-5 space-y-5">
        {tab === 'daily' && (
          <>
            <TopicCard topic={topic} />
            <Recorder key={topic.topic} topic={topic} onSaved={refresh} />

            <section className="card">
              <div className="flex items-start gap-3">
                <MascotBubble anim="explain" size={52} className="bg-primary-soft" />
                <div>
                  <p className="font-display font-bold text-primary">{l('Su’nun nazik değerlendirmesi', 'Su’s gentle reflection')}</p>
                  <p className="text-[14px] text-text-2">{l('Kaydını dinlerken kendine şunları sor:', 'While listening back, ask yourself:')}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  { icon: 'speed', t: l('Akıcılık', 'Fluency'), d: l('Uzun sessizlikler yerine “well…, let me think…” dedin mi?', 'Did you fill pauses with “well…, let me think…”?') },
                  { icon: 'menu_book', t: l('Hedef kelimeler', 'Target vocabulary'), d: l('Kelimelerinden 1–2 tanesini kullandın mı?', 'Did you use 1–2 of your words?') },
                  { icon: 'link', t: l('Bağlantılar', 'Smooth transitions'), d: l('“because, so, then” ile cümleleri bağladın mı?', 'Did you link ideas with “because, so, then”?') },
                  { icon: 'hearing', t: l('Telaffuz', 'Pronunciation'), d: l('En doğal duyulan cümlen hangisiydi? Onu tekrar söyle.', 'Which sentence sounded most natural? Say it again.') },
                ].map((c) => (
                  <div key={c.t} className="flex items-start gap-2.5 rounded-2xl bg-surface-2 p-3">
                    <Icon name={c.icon} size={20} className="text-primary" />
                    <div>
                      <p className="text-sm font-bold">{c.t}</p>
                      <p className="text-[13px] text-text-2">{c.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div>
              <div className="mb-3 mt-8 flex items-end justify-between gap-2">
                <div>
                  <h2 className="text-[20px] font-bold">{l('Diğer konuşma kartları', 'Explore other speaking cards')}</h2>
                  <p className="tr text-sm">{l('Farklı konularda düşüncelerini seslendir.', 'Voice your thoughts on different topics.')}</p>
                </div>
                <button onClick={() => setTab('library')} className="shrink-0 text-sm font-bold text-primary">
                  {l(`Tümü (${topics.length})`, `See all ${topics.length}`)} →
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 [&>*]:min-w-0">
                {others.map((i) => (
                  <div key={i} className="card flex flex-col p-4">
                    <LevelBadge level={settings.level} />
                    <p className="font-display mt-2 font-bold leading-snug">{topics[i].topic}</p>
                    <p className="tr text-xs italic">{topics[i].tr}</p>
                    <p className="mt-2 rounded-xl bg-surface-2 p-2 text-xs text-text-2">
                      <span className="font-bold">{l('Başlangıç', 'Starter')}:</span> “{topics[i].phrases[0]}”
                    </p>
                    <button onClick={() => choose(i)} className="btn btn-secondary mt-3 min-h-10 text-sm text-primary">
                      <Icon name="mic" size={16} /> {l('Bu konuya geç', 'Switch to this prompt')}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/tactics" className="card flex items-center gap-3 bg-accent-soft/40">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <Icon name="tips_and_updates" />
              </span>
              <div className="flex-1">
                <p className="font-bold">{l('Kendi kendine konuşma taktikleri', 'Self-talk tactics')}</p>
                <p className="text-[13px] text-text-2">{l('1-3-5 kuralı, gölgeleme, ayna konuşması…', '1-3-5 rule, shadowing, mirror talk…')}</p>
              </div>
              <Icon name="arrow_forward" className="text-accent" />
            </Link>
          </>
        )}

        {tab === 'library' && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 [&>*]:min-w-0">
            {topics.map((tp, i) => (
              <button key={tp.topic} onClick={() => choose(i)} className={`card p-4 text-left transition hover:shadow-lift ${i === index ? 'border-primary-2' : ''}`}>
                <div className="flex items-center gap-2">
                  <LevelBadge level={settings.level} />
                  {i === index && <span className="tag tag-lav">{l('Seçili', 'Current')}</span>}
                </div>
                <p className="font-display mt-2 text-lg font-bold">{tp.topic}</p>
                <p className="tr text-sm">{tp.tr}</p>
              </button>
            ))}
          </div>
        )}

        {tab === 'journal' && <Journal entries={entries} onChange={refresh} />}
      </div>
    </div>
  )
}
