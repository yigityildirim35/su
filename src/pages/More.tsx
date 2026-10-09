import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { LEVEL_NAMES, MascotBubble, Segmented } from '../components/ui'
import { LEARNER_NAME } from '../lib/daily'
import { dayKey } from '../lib/date'
import { listEntries } from '../lib/journal'
import { isLearned } from '../lib/srs'
import { LEVELS, useSettings } from '../store/settings'
import { useWords, type Word } from '../store/words'

function download(content: string, type: string, name: string) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([content], { type }))
  a.download = name
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}

const csvCell = (s: string) => `"${s.replace(/"/g, '""')}"`

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition ${checked ? 'bg-primary' : 'bg-surface-4'}`}
    >
      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? 'left-6' : 'left-1'}`} />
    </button>
  )
}

function SettingRow({ icon, title, desc, children }: { icon: string; title: string; desc?: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-surface-2 p-3.5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-primary">
        <Icon name={icon} size={20} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-bold">{title}</p>
        {desc && <p className="text-[12px] text-text-2">{desc}</p>}
      </div>
      {children}
    </div>
  )
}

function Tool({ to, onClick, icon, tone, title, desc, badge, action }: { to?: string; onClick?: () => void; icon: string; tone: string; title: string; desc: string; badge?: string; action: string }) {
  const body = (
    <>
      <div className="flex items-start justify-between">
        <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tone}`}>
          <Icon name={icon} size={22} />
        </span>
        {badge && <span className="tag">{badge}</span>}
      </div>
      <p className="font-display mt-3 text-[17px] font-bold">{title}</p>
      <p className="mt-0.5 flex-1 text-[13px] text-text-2">{desc}</p>
      <p className="mt-3 flex items-center justify-between text-[13px] font-bold text-primary">
        {action} <Icon name="arrow_forward" size={18} />
      </p>
    </>
  )
  const cls = 'card flex h-full flex-col p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lift'
  return to ? (
    <Link to={to} className={cls}>
      {body}
    </Link>
  ) : (
    <button onClick={onClick} className={cls}>
      {body}
    </button>
  )
}

export function More() {
  const { l, tx, settings, update } = useSettings()
  const { words, importWords } = useWords()
  const fileInput = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState('')
  const [clips, setClips] = useState(0)
  const [aboutOpen, setAboutOpen] = useState(false)

  useEffect(() => {
    listEntries().then((e) => setClips(e.length))
  }, [])

  const learned = words.filter((w) => isLearned(w.srs)).length
  const levelStep = LEVELS.indexOf(settings.level) + 1

  const exportJson = () => download(JSON.stringify({ app: 'su', version: 1, words }, null, 2), 'application/json', `su-words-${dayKey()}.json`)
  // CSV works with Anki / Quizlet / spreadsheets.
  const exportCsv = () =>
    download(
      ['word,meaning,ipa,example,level,tags', ...words.map((w) => [w.word, w.tr, w.ipa ?? '', w.examples[0] ?? '', w.level ?? '', w.tags.join(' ')].map(csvCell).join(','))].join('\n'),
      'text/csv',
      `su-words-${dayKey()}.csv`,
    )

  const importData = async (file: File) => {
    try {
      const data = JSON.parse(await file.text()) as { words?: Word[] } | Word[]
      const list = Array.isArray(data) ? data : (data.words ?? [])
      setMessage(l(`${importWords(list)} kelime içe aktarıldı.`, `${importWords(list)} words imported.`))
    } catch {
      setMessage(l('Dosya okunamadı.', 'Couldn’t read the file.'))
    }
  }

  return (
    <div className="rise space-y-8">
      <div>
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold text-muted">
          {l('Ana sayfa', 'Home')} <span>/</span> <span className="text-primary">{l('Çalışma köşesi & ayarlar', 'Study corner & settings')}</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-bold text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> {l('Çevrimdışı hazır', 'Offline ready')}
          </span>
        </p>
        <section className="card relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-success-soft/50 blur-3xl" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-4">
              <MascotBubble anim="wave" size={76} className="bg-primary-soft" />
              <div>
                <h1 className="flex flex-wrap items-center gap-2 text-[26px] font-bold leading-tight">
                  {l('Merhaba', 'Hello')}, {LEARNER_NAME}! <span className="tag tag-sage">{settings.level} {tx(LEVEL_NAMES[settings.level])}</span>
                </h1>
                <p className="text-[14px] text-text-2">{l('Kendi ritminde, telaşsız İngilizce defteri · B2 yolculuğunda', 'Your unhurried English notebook · on the way to B2')}</p>
              </div>
            </div>
            <div className="rounded-2xl bg-surface-2 p-3 sm:w-52">
              <p className="flex justify-between text-[11px] font-bold text-text-2">
                {l('CEFR yolculuğu', 'CEFR journey')} <span className="text-primary">{levelStep}/4</span>
              </p>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-4">
                <div className="h-full rounded-full bg-primary-2" style={{ width: `${(levelStep / 4) * 100}%` }} />
              </div>
              <p className="mt-1 text-right text-[10px] font-semibold text-muted">{l('Hedef: B2 bağımsız kullanıcı', 'Goal: B2 independent')}</p>
            </div>
          </div>
          <div className="relative mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-surface-2 p-3 text-center">
            {[
              { icon: 'menu_book', n: words.length, label: l('Kelime', 'Words'), cls: 'text-primary' },
              { icon: 'done_all', n: learned, label: l('Öğrenilen', 'Mastered'), cls: 'text-success' },
              { icon: 'mic', n: clips, label: l('Ses kaydı', 'Recordings'), cls: 'text-accent' },
            ].map((s) => (
              <div key={s.label}>
                <p className={`font-display flex items-center justify-center gap-1 text-[22px] font-bold ${s.cls}`}>
                  <Icon name={s.icon} size={18} /> {s.n}
                </p>
                <p className="text-[11px] font-semibold text-text-2">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="relative mt-3 rounded-2xl bg-primary-soft/40 px-4 py-3 text-sm italic text-text-2">
            “{l('Küçük adımlar, sakin tekrar, kalıcı öğrenme. Acelemiz yok.', 'Small steps, calm repetition, lasting learning. No rush.')}”
            <span className="mt-0.5 block text-[11px] not-italic text-muted">{l('Su defter prensibi', 'The Su notebook principle')}</span>
          </p>
        </section>
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="section-title">{l('Çalışma araçları', 'Study tools')}</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 [&>*]:min-w-0">
          <Tool to="/practice?tab=journal" icon="graphic_eq" tone="bg-primary-soft text-primary" badge={l(`${clips} kayıt`, `${clips} clips`)} title={l('Kişisel ses günlüğü', 'Personal voice journal')} desc={l('Kendi konuşma kayıtların; eskilerle karşılaştır, ilerlemeni duy.', 'Your speaking recordings — compare and hear your progress.')} action={l('Dinle & pratik yap', 'Listen & practise')} />
          <Tool onClick={exportCsv} icon="download" tone="bg-success-soft text-success" badge="CSV + JSON" title={l('Kelime defterini dışa aktar', 'Export word vault')} desc={l('Anki/Quizlet için CSV. Yedek için aşağıdaki JSON’u kullan.', 'CSV for Anki/Quizlet. Use JSON below for backups.')} action={l('CSV indir', 'Download CSV')} />
          <Tool to="/video" icon="smart_display" tone="bg-accent-soft text-accent" title={l('Günün videosu', 'Video of the day')} desc={l('Seviyene göre seçilmiş kısa dinleme pratiği.', 'Short listening practice picked for your level.')} action={l('İzle', 'Watch')} />
          <Tool to="/tactics" icon="tips_and_updates" tone="bg-surface-3 text-text-2" title={l('Kendi kendine konuşma taktikleri', 'Self-talk tactics')} desc={l('1-3-5 kuralı, gölgeleme, ayna konuşması ve fazlası.', '1-3-5 rule, shadowing, mirror talk and more.')} action={l('Oku', 'Read')} />
        </div>
      </section>

      <section className="card space-y-3">
        <h2 className="section-title mb-1">{l('Öğrenme ritmi', 'Learning rhythm')}</h2>
        <div>
          <p className="mb-2 text-sm font-bold text-text-2">{l('Seviyem', 'My level')}</p>
          <Segmented value={settings.level} onChange={(lv) => update({ level: lv })} options={LEVELS.map((lv) => ({ value: lv, label: lv }))} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-surface-2 p-3">
            <p className="mb-2 flex items-center gap-1.5 text-sm font-bold text-text-2">
              <Icon name="translate" size={18} /> {l('Arayüz dili', 'Interface language')}
            </p>
            <Segmented value={settings.lang} onChange={(lang) => update({ lang })} options={[{ value: 'tr', label: l('TR · Destekli', 'TR · Assisted') }, { value: 'en', label: l('Tamamen EN', 'English only') }]} />
          </div>
          <div className="rounded-2xl bg-surface-2 p-3">
            <p className="mb-2 flex items-center gap-1.5 text-sm font-bold text-text-2">
              <Icon name="record_voice_over" size={18} /> {l('Telaffuz aksanı', 'Pronunciation accent')}
            </p>
            <Segmented value={settings.accent} onChange={(accent) => update({ accent })} options={[{ value: 'en-GB', label: 'British' }, { value: 'en-US', label: 'American' }]} />
          </div>
        </div>
      </section>

      <section className="card space-y-3">
        <h2 className="section-title mb-1" style={{ ['--dot' as string]: 'var(--accent)' }}>
          {l('Görünüm & sakin ortam', 'Appearance & ambiance')}
        </h2>
        <p className="text-sm font-bold text-text-2">{l('Defter teması', 'Notebook theme')}</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { v: 'light' as const, icon: 'light_mode', t: l('Sakin kağıt', 'Calm paper'), d: l('Krem defter', 'Cream notebook'), swatch: '#fdf9f3' },
            { v: 'dark' as const, icon: 'dark_mode', t: l('Gece lambası', 'Night lamp'), d: l('Sıcak karanlık', 'Warm dark'), swatch: '#17161d' },
            { v: 'system' as const, icon: 'contrast', t: l('Sistem', 'System'), d: l('Cihaza uy', 'Follow device'), swatch: 'linear-gradient(135deg,#fdf9f3 50%,#17161d 50%)' },
          ].map((o) => (
            <button key={o.v} onClick={() => update({ theme: o.v })} className={`rounded-2xl border-[1.5px] p-3 text-left transition ${settings.theme === o.v ? 'border-primary-2 bg-primary-soft/40' : 'border-line bg-surface-2'}`}>
              <span className="flex items-center justify-between">
                <span className="h-5 w-5 rounded-full border border-line" style={{ background: o.swatch }} />
                {settings.theme === o.v && <Icon name="check_circle" fill size={18} className="text-primary" />}
              </span>
              <span className="mt-2 block text-sm font-bold">{o.t}</span>
              <span className="block text-[11px] text-text-2">{o.d}</span>
            </button>
          ))}
        </div>
        <SettingRow icon="animation" title={l('Animasyonlar', 'Animations')} desc={l('Kapalıysa cihazın “hareketi azalt” ayarına uyulur.', 'When off, follows the device’s reduce-motion setting.')}>
          <Switch checked={settings.motion === 'on'} onChange={(v) => update({ motion: v ? 'on' : 'system' })} label={l('Animasyonlar', 'Animations')} />
        </SettingRow>
        <SettingRow icon="celebration" title={l('Özel gün temaları', 'Special-day themes')} desc={l('Doğum günü, yılbaşı, bayramlar…', 'Birthday, New Year, holidays…')}>
          <Switch checked={settings.specialDays} onChange={(v) => update({ specialDays: v })} label={l('Özel gün temaları', 'Special-day themes')} />
        </SettingRow>
      </section>

      <section className="card space-y-3">
        <h2 className="section-title mb-1" style={{ ['--dot' as string]: 'var(--success)' }}>
          {l('Verilerim & Su hakkında', 'My data & about Su')}
        </h2>
        <SettingRow icon="cloud_off" title={l('Bu cihazda saklanıyor', 'Stored on this device')} desc={l('Telefon ↔ tablet otomatik senkron yakında. O zamana kadar yedeği aşağıdan al.', 'Phone ↔ tablet sync is coming. Until then, back up below.')}>
          <div className="flex gap-2">
            <button className="btn btn-secondary min-h-10 px-3 text-sm" onClick={exportJson}>
              <Icon name="download" size={18} /> {l('Yedekle', 'Back up')}
            </button>
            <button className="btn btn-secondary min-h-10 px-3 text-sm" onClick={() => fileInput.current?.click()}>
              <Icon name="upload" size={18} /> {l('Geri yükle', 'Restore')}
            </button>
          </div>
        </SettingRow>
        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) importData(file)
            e.target.value = ''
          }}
        />
        {message && <p className="text-sm font-bold text-success">{message}</p>}
        <div className="rounded-2xl bg-surface-2">
          <button className="flex w-full items-center gap-3 p-3.5 text-left" onClick={() => setAboutOpen((o) => !o)} aria-expanded={aboutOpen}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-accent">
              <Icon name="favorite" size={20} />
            </span>
            <span className="flex-1 font-bold">{l('Su’nun hikâyesi', 'The story of Su')}</span>
            <Icon name="expand_more" className={`transition ${aboutOpen ? 'rotate-180' : ''}`} />
          </button>
          {aboutOpen && (
            <p className="px-4 pb-4 text-[14px] leading-relaxed text-text-2">
              {l(
                'Su, tek bir öğrenci için hazırlanmış küçük bir İngilizce defteri. Seri yok, yarış yok, puan yok — sadece her gün biraz kelime, biraz dinleme ve biraz konuşma. Maskot, defterin sahibinin çöp adam hali; arada bir sayfalarda yürüyüp selam veriyor.',
                'Su is a small English notebook made for one learner. No streaks, no races, no points — just a few words, a little listening and a little speaking every day. The mascot is the notebook owner as a stick figure, who sometimes walks across the pages to say hi.',
              )}
            </p>
          )}
        </div>
        <p className="pt-2 text-center text-[11px] text-muted">Su · {l('Kendi ritminde, sakin ilerleme', 'Made with peace & curiosity')} 💜</p>
      </section>
    </div>
  )
}
