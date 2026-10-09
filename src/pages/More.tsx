import { useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, SectionTitle } from '../components/ui'
import { dayKey } from '../lib/date'
import { LEVELS, useSettings } from '../store/settings'
import { useWords, type Word } from '../store/words'

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2 py-3">
      <span className="flex-1 font-bold">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  )
}

export function More() {
  const { t, settings, update } = useSettings()
  const { words, importWords } = useWords()
  const fileInput = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState('')

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ app: 'su', version: 1, words }, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `su-words-${dayKey()}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const importData = async (file: File) => {
    try {
      const data = JSON.parse(await file.text()) as { words?: Word[] } | Word[]
      const list = Array.isArray(data) ? data : data.words ?? []
      setMessage(`${importWords(list)} ${t('settings.imported')}`)
    } catch {
      setMessage(t('settings.importError'))
    }
  }

  const links = [
    { to: '/video', icon: '▶️', label: t('video.title') },
    { to: '/street', icon: '🗣️', label: t('lessons.street') },
    { to: '/tactics', icon: '💡', label: t('practice.tactics') },
  ]

  return (
    <div className="rise">
      <PageHeader title={t('more.title')} />
      <ul className="grid gap-2 md:grid-cols-3">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="card flex min-h-16 items-center gap-3">
              <span className="text-2xl">{l.icon}</span>
              <span className="flex-1 font-bold">{l.label}</span>
              <span className="text-muted">→</span>
            </Link>
          </li>
        ))}
      </ul>

      <SectionTitle>{t('settings.title')}</SectionTitle>
      <div className="card divide-y divide-line py-0">
        <Row label={t('settings.level')}>
          {LEVELS.map((l) => (
            <button key={l} className="chip min-h-10" aria-pressed={settings.level === l} onClick={() => update({ level: l })}>
              {l}
            </button>
          ))}
        </Row>
        <Row label={t('settings.language')}>
          <button className="chip min-h-10" aria-pressed={settings.lang === 'tr'} onClick={() => update({ lang: 'tr' })}>
            Türkçe
          </button>
          <button className="chip min-h-10" aria-pressed={settings.lang === 'en'} onClick={() => update({ lang: 'en' })}>
            English
          </button>
        </Row>
        <Row label={t('settings.accent')}>
          <button className="chip min-h-10" aria-pressed={settings.accent === 'en-US'} onClick={() => update({ accent: 'en-US' })}>
            🇺🇸 US
          </button>
          <button className="chip min-h-10" aria-pressed={settings.accent === 'en-GB'} onClick={() => update({ accent: 'en-GB' })}>
            🇬🇧 UK
          </button>
        </Row>
        <Row label={t('settings.theme')}>
          {(['light', 'dark', 'system'] as const).map((th) => (
            <button key={th} className="chip min-h-10" aria-pressed={settings.theme === th} onClick={() => update({ theme: th })}>
              {t(`settings.${th}`)}
            </button>
          ))}
        </Row>
        <Row label={t('settings.specialDays')}>
          <button className="chip min-h-10" aria-pressed={settings.specialDays} onClick={() => update({ specialDays: true })}>
            {t('settings.on')}
          </button>
          <button className="chip min-h-10" aria-pressed={!settings.specialDays} onClick={() => update({ specialDays: false })}>
            {t('settings.off')}
          </button>
        </Row>
      </div>

      <SectionTitle>{t('settings.data')}</SectionTitle>
      <div className="card">
        <div className="flex gap-3">
          <button className="btn btn-soft flex-1" onClick={exportData}>
            ⬇️ {t('settings.export')}
          </button>
          <button className="btn btn-soft flex-1" onClick={() => fileInput.current?.click()}>
            ⬆️ {t('settings.import')}
          </button>
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
        </div>
        {message && <p className="mt-3 text-sm font-bold">{message}</p>}
        <p className="mt-3 text-sm text-muted">{t('settings.sync')}</p>
      </div>
    </div>
  )
}
