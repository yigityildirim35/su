import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Mascot } from '../mascot/Mascot'
import type { MascotAnim } from '../mascot/registry'
import { speak, type Accent } from '../lib/speech'
import { useSettings, type Level } from '../store/settings'
import { Icon } from './Icon'

export function SpeakButton({ text, size = 'md', label, accent }: { text: string; size?: 'sm' | 'md' | 'lg'; label?: string; accent?: Accent }) {
  const { settings, t } = useSettings()
  const dim = size === 'lg' ? 'h-14 w-14' : size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  const icon = size === 'lg' ? 28 : size === 'sm' ? 18 : 22
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        speak(text, accent ?? settings.accent)
      }}
      aria-label={label ?? `${t('common.listen')}: ${text}`}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition hover:brightness-95 active:scale-90 ${dim}`}
    >
      <Icon name="volume_up" size={icon} />
    </button>
  )
}

/** Mascot peeking out of a round "pebble" frame (head and shoulders). */
export function MascotBubble({ anim = 'idle', size = 64, className = '', style }: { anim?: MascotAnim; size?: number; className?: string; style?: CSSProperties }) {
  return (
    <div className={`pebble relative shrink-0 overflow-hidden bg-surface-3 ${className}`} style={{ width: size, height: size, ...style }}>
      <div className="absolute left-1/2 -translate-x-1/2" style={{ top: size * 0.08 }}>
        <Mascot anim={anim} size={size * 1.9} />
      </div>
    </div>
  )
}

/** "Su's note" — the mascot explaining a tip, notebook style. */
export function TipBox({ children, title, anim = 'explain', tone = 'paper' }: { children: ReactNode; title?: string; anim?: MascotAnim; tone?: 'paper' | 'lav' | 'peach' }) {
  const toneClass = tone === 'lav' ? 'bg-primary-soft/60 border-primary-soft' : tone === 'peach' ? 'bg-accent-soft/60 border-accent-soft' : 'bg-surface-2 border-line'
  return (
    <div className={`flex items-start gap-3 rounded-[24px] border p-4 sm:gap-4 sm:p-5 ${toneClass}`}>
      <MascotBubble anim={anim} size={56} className="bg-surface" />
      <div className="min-w-0 flex-1 text-[15px] leading-relaxed text-text-2">
        {title && <p className="font-display mb-0.5 font-bold text-primary">{title}</p>}
        {children}
      </div>
    </div>
  )
}

export interface Crumb {
  label: string
  to?: string
}

export function PageHeader({ title, subtitle, back, backLabel, crumbs, action }: { title: string; subtitle?: string; back?: string; backLabel?: string; crumbs?: Crumb[]; action?: ReactNode }) {
  const { t } = useSettings()
  return (
    <div className="mb-5">
      {(back || crumbs) && (
        <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-muted">
          {back && (
            <Link to={back} className="-ml-1 inline-flex min-h-9 items-center gap-1 rounded-full px-2 text-sm font-bold text-text-2 hover:bg-surface-3">
              <Icon name="arrow_back" size={18} />
              {backLabel ?? t('common.back')}
            </Link>
          )}
          {crumbs?.map((c, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              {(i > 0 || back) && <span className="opacity-50">/</span>}
              {c.to ? (
                <Link to={c.to} className="hover:text-primary">
                  {c.label}
                </Link>
              ) : (
                <span className="text-text-2">{c.label}</span>
              )}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="text-[26px] font-bold leading-tight tracking-tight sm:text-[32px]">{title}</h1>
          {subtitle && <p className="tr mt-1 text-[15px]">{subtitle}</p>}
        </div>
        {action}
      </div>
    </div>
  )
}

export function SectionTitle({ children, dot, right, className = '' }: { children: ReactNode; dot?: string; right?: ReactNode; className?: string }) {
  return (
    <div className={`mb-3 mt-8 flex items-center gap-3 ${className}`}>
      <h2 className="section-title flex-1" style={dot ? ({ '--dot': dot } as CSSProperties) : undefined}>
        {children}
      </h2>
      {right}
    </div>
  )
}

export function EmptyState({ anim, text, children }: { anim: MascotAnim; text: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <Mascot anim={anim} size={150} />
      <p className="tr max-w-xs">{text}</p>
      {children}
    </div>
  )
}

export const LEVEL_NAMES: Record<Level, { tr: string; en: string }> = {
  A1: { tr: 'Başlangıç', en: 'Beginner' },
  A2: { tr: 'Temel', en: 'Elementary' },
  B1: { tr: 'Orta', en: 'Intermediate' },
  B2: { tr: 'Orta-Üstü', en: 'Upper-Intermediate' },
}

export function levelTone(level?: string) {
  return level === 'B1' ? 'tag-lav' : level === 'B2' ? 'tag-peach' : 'tag-sage'
}

export function LevelBadge({ level, long = false }: { level?: string; long?: boolean }) {
  const { tx } = useSettings()
  if (!level) return null
  const name = long && level in LEVEL_NAMES ? ` ${tx(LEVEL_NAMES[level as Level])}` : ''
  return (
    <span className={`tag ${levelTone(level)}`}>
      {level}
      {name}
    </span>
  )
}

/** Segmented control (mode tabs, level picker…). */
export function Segmented<T extends string>({ value, options, onChange, className = '' }: { value: T; options: { value: T; label: ReactNode }[]; onChange: (v: T) => void; className?: string }) {
  return (
    <div className={`flex gap-1 rounded-full bg-surface-3 p-1 ${className}`} role="tablist">
      {options.map((o) => (
        <button
          key={o.value}
          role="tab"
          aria-selected={value === o.value}
          onClick={() => onChange(o.value)}
          className={`inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 text-sm font-bold transition ${
            value === o.value ? 'bg-primary text-on-primary shadow-sm' : 'text-text-2 hover:bg-surface-4'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
