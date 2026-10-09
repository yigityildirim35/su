import { today } from './date'

export type SpecialDayId = 'birthday' | 'newyear' | 'kurban' | 'april23' | 'may19' | 'summer' | 'oct29'

export interface SpecialDay {
  id: SpecialDayId
  emoji: string
  title: { tr: string; en: string }
  message: { tr: string; en: string }
  /** Small themed English word set shown on the Today page. */
  words: { en: string; tr: string }[]
}

const BIRTH_YEAR = 2005
const BIRTH_MONTH = 8 // August
const BIRTH_DAY = 26

// Kurban Bayramı follows the lunar calendar. 2027 is from the Diyanet calendar;
// later years are astronomical estimates — re-check when Diyanet publishes them.
const KURBAN: Record<number, [month: number, day: number]> = {
  2027: [5, 16],
  2028: [5, 5],
  2029: [4, 24],
  2030: [4, 13],
}
const KURBAN_LENGTH = 4

function ordinal(n: number): string {
  const s = n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'
  return `${n}${s}`
}

function isKurban(date: Date): boolean {
  const start = KURBAN[date.getFullYear()]
  if (!start) return false
  const first = new Date(date.getFullYear(), start[0] - 1, start[1])
  const diff = Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - first.getTime()) / 86_400_000)
  return diff >= 0 && diff < KURBAN_LENGTH
}

export function getSpecialDay(date: Date = today()): SpecialDay | null {
  const m = date.getMonth() + 1
  const d = date.getDate()

  // Order = priority when two days overlap (e.g. Kurban on 19 May 2027).
  if (m === BIRTH_MONTH && d === BIRTH_DAY) {
    const age = date.getFullYear() - BIRTH_YEAR
    return {
      id: 'birthday',
      emoji: '🎂',
      title: { tr: 'İyi ki doğdun!', en: 'Happy Birthday!' },
      message: {
        tr: `${age}. yaşın kutlu olsun! Bugün ders yok, sadece pasta 🍰 (ama birkaç kelime de fena olmaz).`,
        en: `Happy ${ordinal(age)} birthday! No lessons today, just cake 🍰 (well… maybe a few words).`,
      },
      words: [
        { en: 'make a wish', tr: 'dilek tutmak' },
        { en: 'blow out the candles', tr: 'mumları üflemek' },
        { en: 'many happy returns', tr: 'nice yıllara' },
        { en: `I'm turning ${age}`, tr: `${age} yaşına giriyorum` },
      ],
    }
  }
  if ((m === 12 && d === 31) || (m === 1 && d === 1)) {
    return {
      id: 'newyear',
      emoji: '🎆',
      title: { tr: 'Mutlu yıllar!', en: 'Happy New Year!' },
      message: { tr: 'Yeni yılda yeni kelimeler!', en: 'New year, new words!' },
      words: [
        { en: 'resolution', tr: 'yeni yıl kararı' },
        { en: 'countdown', tr: 'geri sayım' },
        { en: 'fireworks', tr: 'havai fişek' },
        { en: 'a fresh start', tr: 'yeni bir başlangıç' },
      ],
    }
  }
  if (isKurban(date)) {
    return {
      id: 'kurban',
      emoji: '🌙',
      title: { tr: 'İyi bayramlar!', en: 'Happy Eid!' },
      message: { tr: 'Kurban Bayramın mübarek olsun.', en: 'Wishing you a blessed Eid al-Adha.' },
      words: [
        { en: 'holiday', tr: 'tatil / bayram' },
        { en: 'relatives', tr: 'akrabalar' },
        { en: 'to visit', tr: 'ziyaret etmek' },
        { en: 'to share', tr: 'paylaşmak' },
      ],
    }
  }
  if (m === 4 && d === 23) {
    return {
      id: 'april23',
      emoji: '🪁',
      title: { tr: '23 Nisan kutlu olsun!', en: 'Happy Children’s Day!' },
      message: { tr: 'Ulusal Egemenlik ve Çocuk Bayramı kutlu olsun.', en: 'Happy National Sovereignty and Children’s Day.' },
      words: [
        { en: 'kite', tr: 'uçurtma' },
        { en: 'sovereignty', tr: 'egemenlik' },
        { en: 'childhood', tr: 'çocukluk' },
        { en: 'parliament', tr: 'meclis' },
      ],
    }
  }
  if (m === 5 && d === 19) {
    return {
      id: 'may19',
      emoji: '🇹🇷',
      title: { tr: '19 Mayıs kutlu olsun!', en: 'Happy Youth and Sports Day!' },
      message: { tr: 'Atatürk’ü Anma, Gençlik ve Spor Bayramı kutlu olsun.', en: 'Happy Commemoration of Atatürk, Youth and Sports Day.' },
      words: [
        { en: 'youth', tr: 'gençlik' },
        { en: 'to commemorate', tr: 'anmak' },
        { en: 'independence', tr: 'bağımsızlık' },
        { en: 'to work out', tr: 'spor yapmak' },
      ],
    }
  }
  if (m === 6 && d === 21) {
    return {
      id: 'summer',
      emoji: '🍦',
      title: { tr: 'Yaz geldi!', en: 'Summer is here!' },
      message: { tr: 'Yılın en uzun günü — bol güneşli çalışmalar!', en: 'The longest day of the year — enjoy the sunshine!' },
      words: [
        { en: 'sunscreen', tr: 'güneş kremi' },
        { en: 'heatwave', tr: 'sıcak hava dalgası' },
        { en: 'to get a tan', tr: 'bronzlaşmak' },
        { en: 'seaside', tr: 'deniz kenarı' },
      ],
    }
  }
  if (m === 10 && d === 29) {
    return {
      id: 'oct29',
      emoji: '🇹🇷',
      title: { tr: 'Cumhuriyet Bayramı kutlu olsun!', en: 'Happy Republic Day!' },
      message: { tr: 'Cumhuriyetimizin yaşı kutlu olsun.', en: 'Happy anniversary of the Republic of Türkiye.' },
      words: [
        { en: 'republic', tr: 'cumhuriyet' },
        { en: 'anniversary', tr: 'yıl dönümü' },
        { en: 'to celebrate', tr: 'kutlamak' },
        { en: 'flag', tr: 'bayrak' },
      ],
    }
  }
  return null
}
