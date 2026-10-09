import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { strings, type Lang, type StringKey } from '../i18n/strings'
import type { Accent } from '../lib/speech'
import { load, save } from '../lib/storage'

export type Level = 'A1' | 'A2' | 'B1' | 'B2'
export const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2']

export interface Settings {
  level: Level
  lang: Lang
  accent: Accent
  theme: 'light' | 'dark' | 'system'
  specialDays: boolean
}

const DEFAULTS: Settings = { level: 'A1', lang: 'tr', accent: 'en-US', theme: 'system', specialDays: true }
const KEY = 'su.settings'

interface SettingsContextValue {
  settings: Settings
  update: (patch: Partial<Settings>) => void
  t: (key: StringKey) => string
  /** Picks the TR or EN variant of a bilingual content field. */
  tx: (text: { tr: string; en: string }) => string
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

function useSystemDark() {
  const query = '(prefers-color-scheme: dark)'
  const [dark, setDark] = useState(() => window.matchMedia?.(query).matches ?? false)
  useEffect(() => {
    const mq = window.matchMedia?.(query)
    if (!mq) return
    const onChange = () => setDark(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return dark
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => ({ ...DEFAULTS, ...load<Partial<Settings>>(KEY, {}) }))
  const systemDark = useSystemDark()

  useEffect(() => {
    save(KEY, settings)
  }, [settings])

  const resolvedTheme = settings.theme === 'system' ? (systemDark ? 'dark' : 'light') : settings.theme
  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme
    document.documentElement.lang = settings.lang
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', resolvedTheme === 'dark' ? '#1C1B26' : '#FFFBF5'))
  }, [resolvedTheme, settings.lang])

  const value = useMemo<SettingsContextValue>(
    () => ({
      settings,
      update: (patch) => setSettings((s) => ({ ...s, ...patch })),
      t: (key) => strings[settings.lang][key],
      tx: (text) => text[settings.lang],
    }),
    [settings],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider')
  return ctx
}
