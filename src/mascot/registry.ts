import type { SpecialDayId } from '../lib/specialDays'

export type MascotAnim = 'idle' | 'walk' | 'explain' | 'wave' | 'celebrate' | 'think' | 'surprise' | 'read' | 'sleep' | 'talk' | 'listen'

interface AnimDef {
  frames: number
  fps: number
  /** File name prefix inside public/mascot/su/ (frames are <file>_01.webp, _02, …). */
  file: string
}

// Frames are produced from the raw drawings in gorseller/ by scripts/process_mascot.py.
// Poses that only have one drawing yet are static; adding frames + bumping `frames` animates them.
const ANIMS: Record<string, AnimDef> = {
  idle: { frames: 1, fps: 1, file: 'idle' },
  walk: { frames: 6, fps: 8, file: 'walk' },
  explain: { frames: 1, fps: 1, file: 'explain' },
  wave: { frames: 1, fps: 1, file: 'explain' },
  celebrate: { frames: 1, fps: 1, file: 'celebrate' },
  think: { frames: 1, fps: 1, file: 'think' },
  surprise: { frames: 1, fps: 1, file: 'surprise' },
  // No dedicated drawings yet — closest existing pose.
  read: { frames: 1, fps: 1, file: 'think' },
  sleep: { frames: 1, fps: 1, file: 'idle' },
  talk: { frames: 1, fps: 1, file: 'explain' },
  listen: { frames: 1, fps: 1, file: 'idle' },
  // Special-day variants: "<dayId>-<anim>". Missing variants fall back to the normal animation.
  'newyear-celebrate': { frames: 6, fps: 4, file: 'newyear-celebrate' },
  'newyear-wave': { frames: 6, fps: 4, file: 'newyear-celebrate' },
}

const BASE = `${import.meta.env.BASE_URL}mascot/su/`

export const HEAD_SRC = `${BASE}head.webp`

export function resolveFrames(anim: MascotAnim, special?: SpecialDayId | null): { frames: string[]; fps: number } {
  const themed = special ? `${special}-${anim}` : null
  const def = ANIMS[themed && ANIMS[themed] ? themed : anim]
  const frames = Array.from({ length: def.frames }, (_, i) => `${BASE}${def.file}_${String(i + 1).padStart(2, '0')}.webp`)
  return { frames, fps: def.fps }
}
