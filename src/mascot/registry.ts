import type { SpecialDayId } from '../lib/specialDays'

export type MascotAnim = 'idle' | 'walk' | 'explain' | 'wave' | 'celebrate' | 'think' | 'read' | 'sleep' | 'talk' | 'listen'

interface AnimDef {
  frames: number
  fps: number
  /** Folder under public/mascot/ */
  set: string
  ext: 'svg' | 'png' | 'webp'
}

// Frame files live at public/mascot/<set>/<name>_01.<ext>, _02, …
// When the real drawings arrive: drop them in a new folder (e.g. "su"), then point each entry here at it.
const ANIMS: Record<string, AnimDef> = {
  idle: { frames: 1, fps: 1, set: 'placeholder', ext: 'svg' },
  walk: { frames: 4, fps: 6, set: 'placeholder', ext: 'svg' },
  explain: { frames: 2, fps: 3, set: 'placeholder', ext: 'svg' },
  wave: { frames: 2, fps: 4, set: 'placeholder', ext: 'svg' },
  celebrate: { frames: 2, fps: 4, set: 'placeholder', ext: 'svg' },
  think: { frames: 2, fps: 2, set: 'placeholder', ext: 'svg' },
  read: { frames: 1, fps: 1, set: 'placeholder', ext: 'svg' },
  sleep: { frames: 2, fps: 1.5, set: 'placeholder', ext: 'svg' },
  talk: { frames: 2, fps: 4, set: 'placeholder', ext: 'svg' },
  listen: { frames: 2, fps: 2, set: 'placeholder', ext: 'svg' },
  // Special-day variants: "<dayId>-<anim>". Missing variants fall back to the normal animation.
  'birthday-celebrate': { frames: 2, fps: 4, set: 'placeholder', ext: 'svg' },
  'birthday-wave': { frames: 2, fps: 4, set: 'placeholder', ext: 'svg' },
}

// Until a dedicated birthday-wave drawing exists, it plays the birthday-celebrate files.
const NAME_ALIASES: Record<string, string> = { 'birthday-wave': 'birthday-celebrate' }

export const HEAD_SRC = `${import.meta.env.BASE_URL}mascot/placeholder/head.svg`

export function resolveFrames(anim: MascotAnim, special?: SpecialDayId | null): { frames: string[]; fps: number } {
  const themed = special ? `${special}-${anim}` : null
  const key = themed && ANIMS[themed] ? themed : anim
  const def = ANIMS[key]
  const fileName = NAME_ALIASES[key] ?? key
  const frames = Array.from({ length: def.frames }, (_, i) => `${import.meta.env.BASE_URL}mascot/${def.set}/${fileName}_${String(i + 1).padStart(2, '0')}.${def.ext}`)
  return { frames, fps: def.fps }
}
