type Bi = { tr: string; en: string }

export interface StreetItem {
  en: string
  tr: string
  example?: string
}

export interface StreetCategory {
  id: string
  emoji: string
  title: Bi
  intro: Bi
  items?: StreetItem[]
  dialogue?: { who: 'A' | 'B'; line: string }[]
}

export const streetCategories: StreetCategory[] = [
  {
    id: 'contractions',
    emoji: '🗣️',
    title: { tr: 'Kısaltmalar', en: 'Contractions' },
    intro: { tr: 'Hızlı konuşmada kelimeler birleşir. Yazarken resmi metinlerde kullanma ama duyduğunda tanı!', en: 'In fast speech words merge. Don’t write them formally, but recognise them!' },
    items: [
      { en: 'gonna', tr: 'going to', example: 'I’m gonna call you later.' },
      { en: 'wanna', tr: 'want to', example: 'Do you wanna grab a coffee?' },
      { en: 'gotta', tr: 'have got to', example: 'I gotta go, bye!' },
      { en: 'kinda', tr: 'kind of — biraz, sanki', example: 'It’s kinda cold today.' },
      { en: 'lemme', tr: 'let me', example: 'Lemme see.' },
      { en: 'dunno', tr: 'don’t know', example: 'I dunno, maybe tomorrow?' },
      { en: 'y’all', tr: 'you all — hepiniz (ABD güneyi)', example: 'Y’all ready?' },
    ],
  },
  {
    id: 'fillers',
    emoji: '💬',
    title: { tr: 'Dolgu kelimeleri', en: 'Fillers' },
    intro: { tr: 'Düşünürken boşluğu doldurmak için kullanılır. Doğal konuşmanın sırrı!', en: 'Used to fill pauses while thinking — the secret of natural speech.' },
    items: [
      { en: 'like', tr: 'şey, yani', example: 'It was, like, really expensive.' },
      { en: 'you know', tr: 'biliyorsun ya', example: 'He’s, you know, a bit shy.' },
      { en: 'I mean', tr: 'yani, demek istediğim', example: 'It’s fine. I mean, it’s not perfect.' },
      { en: 'well…', tr: 'şey… / aslında', example: 'Well, I’m not sure.' },
      { en: 'actually', tr: 'aslında', example: 'Actually, I’ve never been there.' },
      { en: 'sort of', tr: 'bir nevi', example: 'I sort of understand.' },
    ],
  },
  {
    id: 'idioms',
    emoji: '🍰',
    title: { tr: 'Deyimler', en: 'Idioms' },
    intro: { tr: 'Kelime kelime çevirme, bütün olarak öğren.', en: 'Don’t translate word by word — learn them as a whole.' },
    items: [
      { en: 'a piece of cake', tr: 'çocuk oyuncağı', example: 'The exam was a piece of cake.' },
      { en: 'break the ice', tr: 'buzları eritmek', example: 'He told a joke to break the ice.' },
      { en: 'under the weather', tr: 'keyifsiz, hafif hasta', example: 'I’m feeling a bit under the weather.' },
      { en: 'hit the sack', tr: 'yatmaya gitmek', example: 'I’m tired, I’m gonna hit the sack.' },
      { en: 'call it a day', tr: 'bugünlük bu kadar demek', example: 'Let’s call it a day.' },
      { en: 'it’s not my cup of tea', tr: 'pek bana göre değil', example: 'Jazz isn’t really my cup of tea.' },
    ],
  },
  {
    id: 'phrasal',
    emoji: '🧩',
    title: { tr: 'Phrasal verb’ler', en: 'Phrasal verbs' },
    intro: { tr: 'Günlük konuşmada “resmi” fiillerden çok daha sık kullanılır.', en: 'Far more common in everyday speech than formal verbs.' },
    items: [
      { en: 'hang out', tr: 'takılmak', example: 'Wanna hang out this weekend?' },
      { en: 'pick up', tr: 'almak (birini/bir şeyi)', example: 'I’ll pick you up at 7.' },
      { en: 'run out of', tr: '…bitmek, tükenmek', example: 'We ran out of milk.' },
      { en: 'come up with', tr: '(fikir) bulmak', example: 'She came up with a great idea.' },
      { en: 'give up', tr: 'vazgeçmek, bırakmak', example: 'Don’t give up!' },
      { en: 'look forward to', tr: 'dört gözle beklemek', example: 'I’m looking forward to the weekend.' },
    ],
  },
  {
    id: 'cafe',
    emoji: '☕',
    title: { tr: 'Kafede', en: 'At a café' },
    intro: { tr: 'Gerçek bir sipariş diyaloğu. Dikkat: “Can I get…” çok yaygındır.', en: 'A real ordering dialogue. Note how common “Can I get…” is.' },
    dialogue: [
      { who: 'A', line: 'Hi there! What can I get you?' },
      { who: 'B', line: 'Hi! Can I get a medium latte, please?' },
      { who: 'A', line: 'Sure. For here or to go?' },
      { who: 'B', line: 'To go, please.' },
      { who: 'A', line: 'Anything else?' },
      { who: 'B', line: 'No, that’s it, thanks.' },
      { who: 'A', line: 'That’ll be four fifty.' },
      { who: 'B', line: 'Here you go. Have a good one!' },
    ],
  },
  {
    id: 'smalltalk',
    emoji: '👋',
    title: { tr: 'Selamlaşma & sohbet', en: 'Greetings & small talk' },
    intro: { tr: '“How are you?” gerçek bir soru değil, bir selamlaşmadır.', en: '“How are you?” is a greeting, not a real question.' },
    items: [
      { en: 'What’s up? — Not much, you?', tr: 'N’aber? — Pek bir şey yok, sen?' },
      { en: 'How’s it going? — Pretty good!', tr: 'Nasıl gidiyor? — Gayet iyi!' },
      { en: 'Long time no see!', tr: 'Görüşmeyeli uzun zaman oldu!' },
      { en: 'Catch you later!', tr: 'Sonra görüşürüz!' },
      { en: 'Take care!', tr: 'Kendine iyi bak!' },
    ],
  },
]
