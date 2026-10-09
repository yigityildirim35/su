import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Mascot, usePrefersReducedMotion } from '../mascot/Mascot'

const HEIGHT = 84
const HIT_WIDTH = 56 // the drawing is narrow; give fingers a wider target
const SPEED = 55 // px per second
const GRAVITY = 2400 // px/s² when dropped
const LONG_PRESS_MS = 350
// ?wander in the URL makes her show up right away (handy for testing).
const FIRST_VISIT = new URLSearchParams(window.location.search).has('wander') ? [600, 600] : [8_000, 20_000] // ms before the first walk
const NEXT_VISIT = [40_000, 90_000] // ms range between walks

type Mode = 'hidden' | 'walking' | 'dragging' | 'falling' | 'poof'

const between = ([min, max]: number[]) => min + Math.random() * (max - min)

/** Ground line: just above the bottom tab bar on phones, near the bottom edge on tablets/desktop. */
function groundY() {
  const tabBar = window.matchMedia('(min-width: 768px)').matches ? 12 : 84
  return window.innerHeight - tabBar - HEIGHT
}

/**
 * Every now and then the mascot walks across the screen.
 * Tap → she vanishes. Press and hold → pick her up and move her; let go → she drops and keeps walking.
 */
export function WanderingMascot() {
  const reduced = usePrefersReducedMotion()
  const { pathname } = useLocation()
  const [mode, setMode] = useState<Mode>('hidden')
  const modeRef = useRef<Mode>('hidden')
  const node = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0, vy: 0, dir: 1 })
  const press = useRef<{ id: number; x: number; y: number; t: number; timer: number; offX: number; offY: number } | null>(null)
  const nextTimer = useRef<number | undefined>(undefined)

  const setBoth = (m: Mode) => {
    modeRef.current = m
    setMode(m)
  }

  const paint = () => {
    const el = node.current
    if (!el) return
    el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
  }

  const scheduleNext = useCallback((range: number[]) => {
    window.clearTimeout(nextTimer.current)
    nextTimer.current = window.setTimeout(() => {
      const dir = Math.random() < 0.5 ? 1 : -1
      pos.current = { x: dir === 1 ? -HIT_WIDTH : window.innerWidth, y: groundY(), vy: 0, dir }
      setBoth('walking')
    }, between(range))
  }, [])

  // Disabled on the study screen (focus) and for people who prefer reduced motion.
  const enabled = !reduced && !pathname.startsWith('/study')

  useEffect(() => {
    if (!enabled) {
      window.clearTimeout(nextTimer.current)
      setBoth('hidden')
      return
    }
    if (modeRef.current === 'hidden') scheduleNext(FIRST_VISIT)
    return () => window.clearTimeout(nextTimer.current)
  }, [enabled, scheduleNext])

  // Movement loop: walk along the ground, or fall back down after being dropped.
  useEffect(() => {
    if (mode !== 'walking' && mode !== 'falling') return
    let last = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const p = pos.current
      const ground = groundY()
      if (modeRef.current === 'falling') {
        p.vy += GRAVITY * dt
        p.y = Math.min(ground, p.y + p.vy * dt)
        if (p.y >= ground) {
          p.vy = 0
          setBoth('walking')
        }
      } else {
        p.y = ground
        p.x += p.dir * SPEED * dt
        if (p.x > window.innerWidth + 10 || p.x < -HIT_WIDTH - 10) {
          setBoth('hidden')
          scheduleNext(NEXT_VISIT)
          return
        }
      }
      paint()
      raf = requestAnimationFrame(tick)
    }
    paint()
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [mode, scheduleNext])

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    try {
      node.current?.setPointerCapture(e.pointerId) // keep receiving moves even if the finger outruns her
    } catch {
      /* pointer already gone */
    }
    const p = pos.current
    const timer = window.setTimeout(() => {
      if (!press.current) return
      setBoth('dragging')
      navigator.vibrate?.(15)
    }, LONG_PRESS_MS)
    press.current = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), timer, offX: e.clientX - p.x, offY: e.clientY - p.y }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const pr = press.current
    if (!pr || pr.id !== e.pointerId) return
    if (modeRef.current === 'dragging') {
      const maxX = window.innerWidth - HIT_WIDTH
      const maxY = window.innerHeight - HEIGHT
      pos.current.x = Math.max(0, Math.min(maxX, e.clientX - pr.offX))
      pos.current.y = Math.max(0, Math.min(maxY, e.clientY - pr.offY))
      paint()
    } else if (Math.hypot(e.clientX - pr.x, e.clientY - pr.y) > 12) {
      // Finger slid away before the long press — not a tap, not a drag.
      window.clearTimeout(pr.timer)
      press.current = null
    }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const pr = press.current
    press.current = null
    if (!pr || pr.id !== e.pointerId) return
    window.clearTimeout(pr.timer)
    if (modeRef.current === 'dragging') {
      pos.current.vy = 0
      setBoth('falling')
    } else if (performance.now() - pr.t < LONG_PRESS_MS) {
      setBoth('poof')
      window.setTimeout(() => {
        setBoth('hidden')
        scheduleNext(NEXT_VISIT)
      }, 350)
    }
  }

  if (mode === 'hidden') return null

  return (
    <div
      ref={node}
      role="button"
      aria-label="Su"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onContextMenu={(e) => e.preventDefault()}
      className={`fixed left-0 top-0 z-[25] flex select-none justify-center ${mode === 'dragging' ? 'cursor-grabbing' : 'cursor-pointer'}`}
      style={{
        width: HIT_WIDTH,
        height: HEIGHT,
        transform: `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`,
        touchAction: 'none',
        WebkitTouchCallout: 'none',
        willChange: 'transform',
      }}
    >
      {/* The drawings walk to the right; mirror them when walking left. */}
      <div className={mode === 'poof' ? 'poof' : ''} style={{ transform: `scaleX(${pos.current.dir})` }}>
        <Mascot anim={mode === 'walking' ? 'walk' : 'surprise'} size={HEIGHT} />
      </div>
    </div>
  )
}
