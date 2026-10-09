import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { load, save } from '../lib/storage'
import { Mascot } from '../mascot/Mascot'
import type { MascotAnim } from '../mascot/registry'
import { useSettings } from '../store/settings'
import { Icon } from './Icon'

const SEEN_KEY = 'su.tourSeen'
export const TOUR_EVENT = 'su:tour'

/** Opens the guide from anywhere (the lightbulb in the header). */
export function openTour() {
  window.dispatchEvent(new Event(TOUR_EVENT))
}

interface Step {
  anim: MascotAnim
  title: { tr: string; en: string }
  text: { tr: string; en: string }
  section?: { icon: string; to: string; name: { tr: string; en: string } }
}

// The mascot meets… herself. Short and a bit silly on purpose.
const STEPS: Step[] = [
  {
    anim: 'wave',
    title: { tr: 'Merhaba, ben Su! 👋', en: 'Hi, I’m Su! 👋' },
    text: {
      tr: 'Burası benim sitem. Burada her gün biraz İngilizce çalışıyorum: kelimeler, konular, biraz da kendi kendime konuşma…',
      en: 'This is my site. I study a little English here every day: words, lessons, and a bit of talking to myself…',
    },
  },
  {
    anim: 'surprise',
    title: { tr: 'Bir dakika… bir dakika!', en: 'Wait… wait a minute!' },
    text: {
      tr: 'Sen bana benziyorsun! Aynı saç, aynı küpeler… Nasıl yani, sen ben misin?! Olamaaaz. Ben buraya nasıl geldim?',
      en: 'You look just like me! Same hair, same earrings… Wait, are you ME?! Nooo. How did I even get in here?',
    },
  },
  {
    anim: 'think',
    title: { tr: 'Neyse… madem buradayız', en: 'Anyway… since we’re here' },
    text: {
      tr: 'Bu kafa karışıklığını sonra çözeriz. Şimdilik sana rehberlik edeyim — sonuçta kendimi en iyi ben tanırım. 🙃',
      en: 'We’ll sort out this identity crisis later. For now, let me be your guide — who knows me better than me? 🙃',
    },
  },
  {
    anim: 'explain',
    section: { icon: 'calendar_today', to: '/', name: { tr: 'Bugün', en: 'Today' } },
    title: { tr: 'Her güne buradan başla', en: 'Start every day here' },
    text: {
      tr: 'Tekrar edilecek kelimeler, günün videosu, günün konuşma konusu ve küçük bir “bugünün listesi”. Seri yok, baskı yok — söz.',
      en: 'Words to review, the video of the day, a speaking topic and a tiny “today’s list”. No streaks, no pressure — promise.',
    },
  },
  {
    anim: 'idle',
    section: { icon: 'menu_book', to: '/words', name: { tr: 'Kelimeler', en: 'Words' } },
    title: { tr: 'Kelime defterim', en: 'My word notebook' },
    text: {
      tr: '+ ile kelime ekle; okunuşu, tanımı ve örnekleri ben doldururum (çoğu zaman 😅). “Tekrar et” ile kartları çevir — unuttukların daha sık gelir.',
      en: 'Add words with +; I fill in pronunciation, meaning and examples (most of the time 😅). Flip cards in “Review” — forgotten ones come back sooner.',
    },
  },
  {
    anim: 'explain',
    section: { icon: 'school', to: '/lessons', name: { tr: 'Konular', en: 'Lessons' } },
    title: { tr: 'Gramer, ama sıkmadan', en: 'Grammar, minus the boredom' },
    text: {
      tr: '12 zaman tek tabloda, A1’den B2’ye konular, film replikleri ve mini quizler. Bir de “Sokak İngilizcesi” var — kitapta yazmayanlar.',
      en: 'All 12 tenses on one page, A1–B2 lessons, movie lines and mini quizzes. Plus “Street English” — what textbooks never tell you.',
    },
  },
  {
    anim: 'talk',
    section: { icon: 'record_voice_over', to: '/practice', name: { tr: 'Pratik', en: 'Practice' } },
    title: { tr: 'Kendi kendine konuşma stüdyosu', en: 'The self-talk studio' },
    text: {
      tr: 'Her gün bir konu, cümle kalıpları ve kayıt düğmesi. Kayıtlarını ses günlüğüne sakla; bir ay sonra kendini dinleyince şaşıracaksın (ben şaşırdım).',
      en: 'A topic a day, sentence starters and a record button. Save takes to your voice journal — you’ll be amazed in a month (I was).',
    },
  },
  {
    anim: 'think',
    section: { icon: 'more_horiz', to: '/more', name: { tr: 'Daha', en: 'More' } },
    title: { tr: 'Ayarlar ve gizli çekmeceler', en: 'Settings & secret drawers' },
    text: {
      tr: 'Seviye, TR/EN arayüz, US/UK aksan, koyu mod, kelimeleri yedekleme… Üstteki seviye çipinden de seviyeni hızlıca değiştirebilirsin.',
      en: 'Level, TR/EN interface, US/UK accent, dark mode, backing up your words… You can also switch level from the chip at the top.',
    },
  },
  {
    anim: 'celebrate',
    title: { tr: 'Hepsi bu kadar!', en: 'That’s it!' },
    text: {
      tr: 'Ara sıra sayfalarda yürüdüğümü görürsen şaşırma: dokunursan kaybolurum, basılı tutarsan beni taşıyabilirsin. Beni tekrar çağırmak için 💡 ampule dokun. Hadi başlayalım!',
      en: 'If you see me strolling across a page, don’t panic: tap me and I vanish, hold me and you can carry me around. Tap the 💡 bulb to call me back. Let’s go!',
    },
  },
]

export function Tour() {
  const { l, tx } = useSettings()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)

  const show = useCallback(() => {
    setStep(0)
    setOpen(true)
  }, [])

  const close = useCallback(() => {
    save(SEEN_KEY, true)
    setOpen(false)
  }, [])

  // First visit: open once the splash screen (and any birthday surprise) is out of the way.
  useEffect(() => {
    if (load(SEEN_KEY, false)) return
    const id = window.setInterval(() => {
      if (!document.querySelector('[data-splash], [data-special-overlay]')) {
        window.clearInterval(id)
        show()
      }
    }, 600)
    return () => window.clearInterval(id)
  }, [show])

  useEffect(() => {
    window.addEventListener(TOUR_EVENT, show)
    return () => window.removeEventListener(TOUR_EVENT, show)
  }, [show])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') setStep((s) => Math.min(s + 1, STEPS.length - 1))
      if (e.key === 'ArrowLeft') setStep((s) => Math.max(s - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  if (!open) return null
  const s = STEPS[step]
  const last = step === STEPS.length - 1

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-bg/80 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={l('Tanıtım rehberi', 'Welcome guide')}>
      <div className="sheet-up pb-safe relative w-full max-w-lg overflow-hidden rounded-t-[28px] border border-line bg-bg shadow-lift sm:rounded-[28px]">
        <div className="h-1.5 bg-gradient-to-r from-primary-soft via-success-soft to-accent-soft" />
        <button onClick={close} className="absolute right-4 top-4 z-10 rounded-full bg-surface-3 px-3 py-1.5 text-xs font-bold text-text-2">
          {l('Atla', 'Skip')}
        </button>

        <div className="px-5 pb-5 pt-6 sm:px-7">
          <div key={step} className="rise flex flex-col items-center text-center">
            <div className="relative flex h-[190px] items-end justify-center">
              <div className="pebble absolute bottom-0 h-28 w-40 bg-primary-soft/60" />
              <Mascot anim={s.anim} size={180} className="relative" />
            </div>
            {s.section && (
              <span className="tag tag-lav mt-3">
                <Icon name={s.section.icon} size={14} /> {tx(s.section.name)}
              </span>
            )}
            <h2 className="mt-3 text-[24px] font-bold leading-tight">{tx(s.title)}</h2>
            <div className="relative mt-3 rounded-[20px] bg-surface-2 px-4 py-3 text-[15px] leading-relaxed text-text-2">
              <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-surface-2" />
              <span className="relative">{tx(s.text)}</span>
            </div>
            {s.section && (
              <button
                onClick={() => {
                  close()
                  navigate(s.section!.to)
                }}
                className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary"
              >
                {l(`${tx(s.section.name)} sayfasına git`, `Go to ${tx(s.section.name)}`)} <Icon name="arrow_forward" size={16} />
              </button>
            )}
          </div>

          <div className="mt-5 flex justify-center gap-1.5" aria-hidden>
            {STEPS.map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all ${i === step ? 'w-6 bg-primary' : 'w-1.5 bg-outline'}`} />
            ))}
          </div>

          <div className="mt-5 flex gap-3">
            {step > 0 && (
              <button className="btn btn-secondary" onClick={() => setStep(step - 1)} aria-label={l('Geri', 'Back')}>
                <Icon name="arrow_back" size={20} />
              </button>
            )}
            <button className="btn btn-primary flex-1" onClick={() => (last ? close() : setStep(step + 1))}>
              {last ? l('Hadi başlayalım!', 'Let’s start!') : step === 2 ? l('Peki, göster bakalım', 'Okay, show me') : l('Devam', 'Next')}
              <Icon name={last ? 'celebration' : 'arrow_forward'} size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
