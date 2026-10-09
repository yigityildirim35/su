import { useEffect, useMemo, useState } from 'react'
import { useSpecialDay } from '../components/SpecialDayContext'
import { resolveFrames, type MascotAnim } from './registry'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

interface Props {
  anim: MascotAnim
  size?: number
  loop?: boolean
  className?: string
  /** Decorative by default; pass a label when the mascot carries meaning. */
  label?: string
}

/** Plays the mascot's drawn frames in order, like a flipbook. */
export function Mascot({ anim, size = 96, loop = true, className = '', label }: Props) {
  const special = useSpecialDay()
  const { frames, fps } = useMemo(() => resolveFrames(anim, special?.id), [anim, special?.id])
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)

  // Preload every frame so playback never flickers.
  useEffect(() => {
    frames.forEach((src) => {
      const img = new Image()
      img.src = src
    })
    setIndex(0)
  }, [frames])

  useEffect(() => {
    if (reduced || frames.length < 2) return
    const id = window.setInterval(() => {
      setIndex((i) => {
        if (i + 1 < frames.length) return i + 1
        return loop ? 0 : i
      })
    }, 1000 / fps)
    return () => window.clearInterval(id)
  }, [frames.length, fps, loop, reduced])

  return (
    <img
      src={frames[Math.min(index, frames.length - 1)]}
      width={size}
      height={size}
      alt={label ?? ''}
      aria-hidden={label ? undefined : true}
      draggable={false}
      className={`select-none object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  )
}
