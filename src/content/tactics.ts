export interface Tactic {
  title: { tr: string; en: string }
  body: { tr: string; en: string }
  example?: string
}

export const selfTalkTactics: Tactic[] = [
  {
    title: { tr: '1-3-5 kuralı', en: 'The 1-3-5 rule' },
    body: {
      tr: 'Aynı konuyu üç kez anlat: önce 1 dakika, sonra 3, sonra 5 dakika. Her turda daha akıcı olduğunu göreceksin, çünkü beynin kelimeleri artık hazır tutuyor.',
      en: 'Talk about the same topic three times: 1 minute, then 3, then 5. You get more fluent each round because your brain already has the words ready.',
    },
  },
  {
    title: { tr: 'Yaptığını anlat (narrating)', en: 'Narrate what you do' },
    body: {
      tr: 'Gün içinde yaptığın şeyi kafandan ya da sesli olarak İngilizce anlat. Basit cümleler yeterli.',
      en: 'Describe what you’re doing in English, out loud or in your head. Simple sentences are enough.',
    },
    example: 'I’m making tea. Now I’m looking for the sugar. Where is it? Oh, it’s here.',
  },
  {
    title: { tr: 'Gölgeleme (shadowing)', en: 'Shadowing' },
    body: {
      tr: 'Bir video ya da örnek cümleyi dinle, hemen ardından aynı tonlama ve hızla tekrar et. Anlamaktan çok ritmi taklit etmeye odaklan.',
      en: 'Listen to a sentence and repeat it right after with the same rhythm and speed. Focus on copying the melody, not on perfection.',
    },
  },
  {
    title: { tr: 'Etrafından dolaş', en: 'Talk around the word' },
    body: {
      tr: 'Bir kelimeyi bilmiyorsan durma! Onu tarif et. Gerçek konuşmada yerliler bile bunu yapar.',
      en: 'Don’t stop when you don’t know a word — describe it. Even native speakers do this.',
    },
    example: 'It’s the thing you use to open a bottle of wine… (corkscrew)',
  },
  {
    title: { tr: 'Kaydet ve dinle', en: 'Record and listen back' },
    body: {
      tr: 'Kendini kaydet ve dinle. Utanma; bir ay sonra eski kaydınla karşılaştırdığında ilerlemeni duyacaksın.',
      en: 'Record yourself and listen back. In a month, compare with an old recording — you’ll hear your progress.',
    },
  },
  {
    title: { tr: 'Ayna konuşması', en: 'Mirror talk' },
    body: {
      tr: 'Aynanın karşısında, sanki biriyle sohbet ediyormuş gibi konuş. Yüz ifadesi ve el hareketleri de konuşmanın bir parçası.',
      en: 'Talk to yourself in the mirror as if you’re chatting with a friend. Facial expressions and gestures are part of speaking too.',
    },
  },
  {
    title: { tr: 'Dolgu kelimeleriyle zaman kazan', en: 'Buy time with fillers' },
    body: {
      tr: 'Düşünürken susmak yerine yerlilerin kullandığı kalıpları kullan.',
      en: 'Instead of silence while thinking, use the fillers native speakers use.',
    },
    example: 'Well… Let me think… That’s a good question… You know what I mean?',
  },
  {
    title: { tr: 'İngilizce düşünme dakikası', en: 'One minute of thinking in English' },
    body: {
      tr: 'Her gün bir dakika boyunca sadece İngilizce düşün: planlarını, ne yiyeceğini, yolda gördüklerini.',
      en: 'For one minute a day, think only in English: your plans, what to eat, what you see.',
    },
  },
]
