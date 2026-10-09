import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import type { StringKey } from '../i18n/strings'
import { HEAD_SRC } from '../mascot/registry'
import { LEVELS, useSettings } from '../store/settings'

const TABS: { to: string; key: StringKey; icon: string }[] = [
  { to: '/', key: 'nav.today', icon: '☀️' },
  { to: '/words', key: 'nav.words', icon: '📚' },
  { to: '/lessons', key: 'nav.lessons', icon: '💡' },
  { to: '/practice', key: 'nav.practice', icon: '🎙️' },
  { to: '/more', key: 'nav.more', icon: '✨' },
]

function TopBar() {
  const { settings, update } = useSettings()
  const nextLevel = LEVELS[(LEVELS.indexOf(settings.level) + 1) % LEVELS.length]
  return (
    <header className="pt-safe sticky top-0 z-20 border-b border-line/60 bg-bg/90 backdrop-blur md:hidden">
      <div className="mx-auto flex h-14 max-w-2xl items-center gap-2 px-4">
        <img src={HEAD_SRC} alt="" className="h-9 w-9" />
        <span className="flex-1 text-xl font-extrabold tracking-tight">
          <span className="text-primary">Su</span>
        </span>
        <button className="chip" onClick={() => update({ lang: settings.lang === 'tr' ? 'en' : 'tr' })} aria-label="TR / EN">
          {settings.lang.toUpperCase()}
        </button>
        <button className="chip" aria-pressed="true" onClick={() => update({ level: nextLevel })} aria-label={`Level ${settings.level}`}>
          {settings.level}
        </button>
      </div>
    </header>
  )
}

function TabBar() {
  const { t } = useSettings()
  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface/95 backdrop-blur md:hidden" aria-label="Main">
      <ul className="mx-auto grid max-w-2xl grid-cols-5">
        {TABS.map((tab) => (
          <li key={tab.to}>
            <NavLink
              to={tab.to}
              end={tab.to === '/'}
              className={({ isActive }) =>
                `flex min-h-[60px] flex-col items-center justify-center gap-0.5 text-[11px] font-bold transition ${isActive ? 'text-primary' : 'text-muted'}`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`text-xl transition ${isActive ? 'scale-110' : 'opacity-70 grayscale'}`}>{tab.icon}</span>
                  {t(tab.key)}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function SideBar() {
  const { t, settings, update } = useSettings()
  return (
    <aside className="pt-safe sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-1 border-r border-line bg-surface p-4 md:flex">
      <div className="mb-6 flex items-center gap-2 px-2">
        <img src={HEAD_SRC} alt="" className="h-11 w-11" />
        <span className="text-2xl font-extrabold text-primary">Su</span>
      </div>
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) =>
            `flex min-h-12 items-center gap-3 rounded-2xl px-3 font-bold transition ${isActive ? 'bg-primary-soft text-primary' : 'text-muted hover:bg-surface-2'}`
          }
        >
          <span className="text-xl">{tab.icon}</span>
          {t(tab.key)}
        </NavLink>
      ))}
      <div className="mt-auto flex gap-2 px-1">
        <button className="chip" onClick={() => update({ lang: settings.lang === 'tr' ? 'en' : 'tr' })}>
          {settings.lang.toUpperCase()}
        </button>
        {LEVELS.map((l) => (
          <button key={l} className="chip" aria-pressed={settings.level === l} onClick={() => update({ level: l })}>
            {l}
          </button>
        ))}
      </div>
    </aside>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-dvh">
      <SideBar />
      <div className="min-w-0 flex-1">
        <TopBar />
        <main className="mx-auto max-w-2xl px-4 pb-28 pt-4 md:max-w-4xl md:px-8 md:pb-12 md:pt-8">
          <Outlet />
        </main>
        <TabBar />
      </div>
    </div>
  )
}
