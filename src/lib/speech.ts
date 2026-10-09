export type Accent = 'en-US' | 'en-GB'

let voices: SpeechSynthesisVoice[] = []

function refreshVoices() {
  try {
    voices = window.speechSynthesis.getVoices()
  } catch {
    voices = []
  }
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  refreshVoices()
  // iOS/Chrome load voices asynchronously.
  window.speechSynthesis.addEventListener?.('voiceschanged', refreshVoices)
}

export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window

function pickVoice(accent: Accent): SpeechSynthesisVoice | undefined {
  if (voices.length === 0) refreshVoices()
  const exact = voices.filter((v) => v.lang.replace('_', '-') === accent)
  return (
    exact.find((v) => /natural|enhanced|premium|google|samantha|daniel/i.test(v.name)) ??
    exact[0] ??
    voices.find((v) => v.lang.startsWith('en'))
  )
}

export function speak(text: string, accent: Accent = 'en-US', rate = 0.95) {
  if (!canSpeak) return
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = accent
  u.rate = rate
  const voice = pickVoice(accent)
  if (voice) u.voice = voice
  synth.speak(u)
}
