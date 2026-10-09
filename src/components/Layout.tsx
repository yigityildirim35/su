import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import type { StringKey } from '../i18n/strings'
import { HEAD_SRC } from '../mascot/registry'
import { LEVELS, useSettings } from '../store/settings'
import { Icon } from './Icon'
import { openTour, Tour } from './Tour'
import { LEVEL_NAMES } from './ui'
import { WanderingMascot } from './WanderingMascot'

const TABS: { to: string; key: StringKey; icon: string }[] = [
  { to: '/', key: 'nav.today', icon: 'calendar_today' },
  { to: '/words', key: 'nav.words', icon: 'menu_book' },
  { to: '/lessons', key: 'nav.lessons', icon: 'school' },
  { to: '/practice', key: 'nav.practice', icon: 'record_voice_over' },
  { to: '/more', key: 'nav.more', icon: 'more_horiz' },
]

// Pages reached from a tab keep that tab highlighted.
function activeTab(pathname: string) {
  if (pathname.startsWith('/words') || pathname.startsWith('/study')) return '/words'
  if (pathname.startsWith('/lessons') || pathname.startsWith('/street')) return '/lessons'
  if (pathname.startsWith('/practice') || pathname.startsWith('/tactics')) return '/practice'
  if (pathname.startsWith('/more')) return '/more'
  return '/'
}

function Logo() {
  const { l } = useSettings()
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Su">
      <span className="pebble flex h-10 w-10 items-center justify-center overflow-hidden bg-primary-soft">
        <img src={HEAD_SRC} alt="" className="h-9 w-9 object-contain" />
      </span>
      <span className="leading-none">
        <span className="font-display block text-2xl font-bold text-primary">Su</span>
        <span className="hidden text-[10px] font-semibold tracking-wide text-muted lg:block">{l('sakin ingilizce defterim', 'cozy english notebook')}</span>
      </span>
    </Link>
  )
}

function LangToggle() {
  const { settings, update } = useSettings()
  return (
    <button
      className="inline-flex h-9 items-center gap-1 rounded-full bg-surface-3 px-3 text-xs font-bold"
      onClick={() => update({ lang: settings.lang === 'tr' ? 'en' : 'tr' })}
      aria-label="Türkçe / English"
    >
      <span className={settings.lang === 'tr' ? 'text-primary' : 'text-muted'}>TR</span>
      <span className="text-outline">|</span>
      <span className={settings.lang === 'en' ? 'text-primary' : 'text-muted'}>EN</span>
    </button>
  )
}

function LevelMenu() {
  const { settings, update, tx, l } = useSettings()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    window.addEventListener('pointerdown', close)
    return () => window.removeEventListener('pointerdown', close)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        className="inline-flex h-9 items-center gap-1 rounded-full bg-success-soft px-3 text-xs font-bold text-success"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={l('Seviye', 'Level')}
      >
        {settings.level}
        <span className="hidden lg:inline">{tx(LEVEL_NAMES[settings.level])}</span>
        <Icon name="expand_more" size={16} />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-11 z-40 w-56 rounded-2xl border border-line bg-surface p-1.5 shadow-lift">
          {LEVELS.map((lv) => (
            <button
              key={lv}
              role="menuitemradio"
              aria-checked={settings.level === lv}
              onClick={() => {
                update({ level: lv })
                setOpen(false)
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold ${settings.level === lv ? 'bg-primary-soft text-primary' : 'hover:bg-surface-2'}`}
            >
              <span className="w-7">{lv}</span>
              <span className="flex-1 font-semibold text-text-2">{tx(LEVEL_NAMES[lv])}</span>
              {settings.level === lv && <Icon name="check" size={18} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function GuideButton() {
  const { l } = useSettings()
  return (
    <button onClick={openTour} className="flex h-9 w-9 items-center justify-center rounded-full bg-lemon/60 text-accent transition hover:scale-105" aria-label={l('Tanıtım rehberini aç', 'Open the welcome guide')} title={l('Rehber', 'Guide')}>
      <Icon name="lightbulb" fill size={20} />
    </button>
  )
}

function TopBar() {
  const { t } = useSettings()
  const current = activeTab(useLocation().pathname)
  return (
    <header className="pt-safe sticky top-0 z-30 border-b border-line/70 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center gap-3 px-4 md:h-[72px] md:px-6 lg:px-8">
        <Logo />
        <nav className="mx-auto hidden items-center gap-0.5 rounded-full bg-surface-3 p-1 md:flex" aria-label="Main">
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={`rounded-full px-3.5 py-2 text-[15px] font-bold transition lg:px-5 ${current === tab.to ? 'bg-primary text-on-primary shadow-sm' : 'text-text-2 hover:bg-surface-4'}`}
            >
              {t(tab.key)}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <GuideButton />
          <LangToggle />
          <LevelMenu />
        </div>
      </div>
    </header>
  )
}

function BottomBar() {
  const { t } = useSettings()
  const current = activeTab(useLocation().pathname)
  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 backdrop-blur-md md:hidden" aria-label="Main">
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {TABS.map((tab) => {
          const active = current === tab.to
          return (
            <li key={tab.to}>
              <NavLink to={tab.to} className={`flex min-h-[64px] flex-col items-center justify-center gap-0.5 text-[11px] font-bold ${active ? 'text-primary' : 'text-text-2'}`}>
                <span className={`flex h-8 w-14 items-center justify-center rounded-full transition ${active ? 'bg-primary-soft' : ''}`}>
                  <Icon name={tab.icon} fill={active} size={24} />
                </span>
                {t(tab.key)}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function Footer() {
  const { l } = useSettings()
  return (
    <footer className="mt-12 border-t border-line bg-surface-2">
      <div className="mx-auto flex max-w-[800px] flex-col gap-1 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          <span className="font-display text-lg font-bold text-primary">Su</span> — {l('Her gün biraz, sakin sakin ilerlemek için.', 'A calm space for gentle daily progress.')}
        </p>
        <p className="font-semibold">{l('Dikkat dağıtmayan öğrenme.', 'Distraction-free learning.')}</p>
      </div>
    </footer>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar />
      <main className="mx-auto w-full max-w-[800px] flex-1 px-4 pt-5 sm:px-8 md:pt-8">
        <Outlet />
      </main>
      <div className="pb-[calc(72px+env(safe-area-inset-bottom))] md:pb-0">
        <Footer />
      </div>
      <BottomBar />
      <WanderingMascot />
      <Tour />
    </div>
  )
}
