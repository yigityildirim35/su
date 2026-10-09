import { useEffect, useMemo, useState } from 'react'
import { useSettings } from '../store/settings'
import { useSpecialDay } from '../components/SpecialDayContext'
import { preloadFrames } from './preload'
import { resolveFrames, type MascotAnim } from './registry'

/** True only when the user chose to follow the system setting and the device asks for reduced motion. */
export function usePrefersReducedMotion() {
  const { settings } = useSettings()
  const [reduced, setReduced] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced && settings.motion === 'system'
}

interface Props {
  anim: MascotAnim
  size?: number
  loop?: boolean
  /** Pause on the current frame (e.g. while the mascot is being dragged). */
  paused?: boolean
  className?: string
  /** Decorative by default; pass a label when the mascot carries meaning. */
  label?: string
}

/** Plays the mascot's drawn frames in order, like a flipbook. */
export function Mascot({ anim, size = 96, loop = true, paused = false, className = '', label }: Props) {
  const special = useSpecialDay()
  const { frames, fps } = useMemo(() => resolveFrames(anim, special?.id), [anim, special?.id])
  const reduced = usePrefersReducedMotion()
  const [state, setState] = useState({ frames, index: 0, ready: false })

  // Reset when the animation changes (derived during render instead of in an effect).
  if (state.frames !== frames) setState({ frames, index: 0, ready: false })

  // Playback starts only once every frame is decoded.
  useEffect(() => {
    let alive = true
    preloadFrames(frames).then(() => alive && setState((s) => (s.frames === frames ? { ...s, ready: true } : s)))
    return () => {
      alive = false
    }
  }, [frames])

  const playing = state.ready && !paused && !reduced && frames.length > 1
  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setState((s) => ({ ...s, index: s.index + 1 < s.frames.length ? s.index + 1 : loop ? 0 : s.index }))
    }, 1000 / fps)
    return () => window.clearInterval(id)
  }, [playing, fps, loop])

  return (
    <img
      src={frames[Math.min(state.index, frames.length - 1)]}
      height={size}
      alt={label ?? ''}
      aria-hidden={label ? undefined : true}
      draggable={false}
      className={`mascot select-none object-contain ${className}`}
      // Frames are tall drawings: `size` is the figure height, width follows the image.
      style={{ height: size, width: 'auto' }}
    />
  )
}
