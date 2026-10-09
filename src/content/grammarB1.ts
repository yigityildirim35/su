import type { Lesson } from './lessons'

// B1 grammar lessons. `media` lines are well-documented quotes only.

const perfectVsPast: Lesson = {
  id: 'present-perfect-vs-past-simple',
  level: 'B1',
  title: 'Present Perfect vs Past Simple',
  subtitle: { tr: 'Hangisi ne zaman?', en: 'Which one when?' },
  sections: [
    { kind: 'tip', text: { tr: 'Tek soru sor: “NE ZAMAN olduğu belli mi ve bitti mi?” Evet → Past Simple. Hayır / sonucu şimdi önemli → Present Perfect.', en: 'Ask: is the time finished and stated? Yes → Past Simple. No / result matters now → Present Perfect.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Past Simple', en: 'Past Simple' }, formula: 'V2 + bitmiş zaman\n(yesterday, in 2020, ago)', example: 'I saw that film last week.' },
        { label: { tr: 'Present Perfect', en: 'Present Perfect' }, formula: 'have/has + V3 + zaman yok / bitmemiş zaman\n(ever, yet, today, this week)', example: 'I’ve seen that film. (ne zaman önemli değil)' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Deneyim (zaman yok) → PP; detay (zaman var) → PS', en: 'Experience → PP; details → PS' }, example: 'I’ve been to Rome. I went there in 2022.' },
        { text: { tr: 'Haber → PP; haberin detayı → PS', en: 'News → PP; details → PS' }, example: 'She’s been promoted! She got the news yesterday.' },
        { text: { tr: 'Bitmemiş süre → PP; bitmiş süre → PS', en: 'Unfinished period → PP; finished → PS' }, example: 'I’ve drunk 2 coffees today. I drank 4 yesterday.' },
        { text: { tr: 'Ölmüş / artık olmayan kişiler → PS', en: 'People no longer alive → PS' }, example: 'Shakespeare wrote 39 plays.' },
      ],
    },
    { kind: 'signals', words: ['PS: yesterday, ago, last…, in 2020, when…', 'PP: ever, never, just, already, yet, so far, today, this week'] },
    {
      kind: 'examples',
      items: [
        { en: 'Scientists have revealed new data. They revealed it at a conference on Monday.', tr: 'Bilim insanları yeni veriler açıkladı. Pazartesi bir konferansta açıkladılar.' },
        { en: 'Have you ever met a pioneer? — Yes, I met one in 2019.', tr: 'Hiç bir öncüyle tanıştın mı? — Evet, 2019’da biriyle tanıştım.' },
        { en: 'My keys have vanished! I had them a minute ago.', tr: 'Anahtarlarım kayboldu! Bir dakika önce bendeydi.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Sohbet genelde PP ile açılır, PS ile devam eder:', en: 'Conversations often open with PP, continue with PS:' }, items: ['Have you seen the new Marvel film? — Yes! I watched it on Saturday.', 'I’ve lost my wallet. — Where did you last see it?'] },
    {
      kind: 'media',
      items: [
        { title: 'Blade Runner (1982)', line: 'I’ve seen things you people wouldn’t believe.', who: 'Roy Batty', note: { tr: 'Zamanı söylenmeyen hayat deneyimi → Present Perfect.', en: 'Life experience, no time → Present Perfect.' } },
        { title: 'Apollo 13 mission (1970)', line: 'Houston, we’ve had a problem.', who: 'Jack Swigert', note: { tr: 'Az önce oldu, etkisi şimdi sürüyor → PP.', en: 'Just happened, still affecting them → PP.' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I have finished it yesterday.', right: 'I finished it yesterday.', why: { tr: '“yesterday” → Past Simple.', en: '“yesterday” → Past Simple.' } },
        { wrong: 'Did you ever go to Paris?', right: 'Have you ever been to Paris?', why: { tr: 'Hayat deneyimi sorusu → PP.', en: 'Life experience → PP.' } },
        { wrong: 'When have you arrived?', right: 'When did you arrive?', why: { tr: '“When” soruları Past Simple ister.', en: '“When” questions → Past Simple.' } },
      ],
    },
  ],
  quiz: [
    { question: 'I ___ my homework. Can I go out now?', options: ['finished', 'have finished', 'finish'], answer: 1 },
    { question: 'She ___ to Berlin in 2021.', options: ['has moved', 'moved', 'have moved'], answer: 1 },
    { question: '___ you ever ___ sushi?', options: ['Did / eat', 'Have / eaten', 'Have / ate'], answer: 1 },
    { question: 'When ___ you ___ him?', options: ['have / met', 'did / meet', 'did / met'], answer: 1 },
  ],
}

const usedTo: Lesson = {
  id: 'used-to-would',
  level: 'B1',
  title: 'Used to / Would',
  subtitle: { tr: 'Geçmişteki alışkanlıklar ve durumlar', en: 'Past habits and states' },
  sections: [
    { kind: 'tip', text: { tr: '“used to” = eskiden …ırdım (artık değil). Türkçedeki “-ardım / -erdim” gibi: “Eskiden çok kitap okurdum.” = “I used to read a lot.”', en: '“used to” = something that was true before, but not now.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Olumlu', en: 'Positive' }, formula: 'Subject + used to + V1', example: 'I used to live in Ankara.' },
        { label: { tr: 'Olumsuz / Soru', en: 'Negative / Question' }, formula: 'didn’t use to + V1\nDid you use to + V1?', example: 'She didn’t use to like coffee.' },
        { label: { tr: 'would', en: 'would' }, formula: 'would + V1 (sadece tekrarlanan EYLEMLER)', example: 'Every summer we would go to the beach.' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Eski alışkanlıklar (used to / would)', en: 'Past habits (used to / would)' }, example: 'I used to / would walk to school.' },
        { text: { tr: 'Eski DURUMLAR (sadece used to)', en: 'Past STATES (only used to)' }, example: 'I used to have long hair. (would have ✗)' },
        { text: { tr: 'Nostaljik anlatım (would hikâyelerde sık)', en: 'Nostalgic stories (would)' }, example: 'My grandma would tell us stories every night.' },
      ],
    },
    { kind: 'tip', text: { tr: 'Karıştırma: “be used to + -ing” = bir şeye alışkın olmak. “I’m used to waking up early.” (Erken kalkmaya alışkınım.)', en: 'Don’t confuse with “be used to + -ing” = be accustomed to.' } },
    {
      kind: 'examples',
      items: [
        { en: 'This used to be a conventional school.', tr: 'Burası eskiden geleneksel bir okuldu.' },
        { en: 'I used to doubt myself a lot.', tr: 'Eskiden kendimden çok şüphe ederdim.' },
        { en: 'We would sing in the choir every Sunday.', tr: 'Her pazar koroda şarkı söylerdik.' },
        { en: 'Did you use to play with stuff like this?', tr: 'Eskiden böyle şeylerle oynar mıydın?' },
      ],
    },
    { kind: 'daily', text: { tr: 'Anı anlatırken:', en: 'Telling memories:' }, items: ['I used to love this song!', 'We used to be best friends.', 'Things aren’t what they used to be.'] },
    {
      kind: 'media',
      items: [{ title: 'The Elder Scrolls V: Skyrim (2011, video game)', line: 'I used to be an adventurer like you. Then I took an arrow in the knee.', who: 'Whiterun guard', note: { tr: 'Ünlü bir internet esprisi: eskiden öyleydi, artık değil.', en: 'Famous meme: true before, not anymore.' } }],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I use to play football.', right: 'I used to play football.', why: { tr: 'Olumlu cümlede “used” (-d ile).', en: '“used” with -d in positive.' } },
        { wrong: 'Did you used to…?', right: 'Did you use to…?', why: { tr: '“did” varsa “use” (-d’siz).', en: 'After “did”: use.' } },
        { wrong: 'I would have a dog.', right: 'I used to have a dog.', why: { tr: 'Durum (sahip olmak) → would olmaz.', en: 'States → not would.' } },
      ],
    },
  ],
  quiz: [
    { question: 'I ___ live in Izmir, but now I live in Istanbul.', options: ['use to', 'used to', 'am used to'], answer: 1 },
    { question: 'Did you ___ have a pet?', options: ['used to', 'use to', 'would'], answer: 1 },
    { question: 'Which is NOT possible? “When I was a kid, I ___ a bike.”', options: ['used to have', 'would have', 'had'], answer: 1 },
    { question: 'I’m used to ___ early.', options: ['wake up', 'waking up', 'woke up'], answer: 1 },
  ],
}

const secondConditional: Lesson = {
  id: 'second-conditional',
  level: 'B1',
  title: 'Second Conditional',
  subtitle: { tr: 'Hayali koşul — şimdi / gelecek', en: 'Imaginary situations' },
  sections: [
    { kind: 'tip', text: { tr: 'Gerçek dışı, hayali durumlar: “Piyangoyu kazansam dünyayı gezerdim.” Geçmiş zaman kullanılır ama anlam ŞİMDİ veya GELECEK!', en: 'Past form, but present/future meaning — unreal situations.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Kalıp', en: 'Pattern' }, formula: 'If + Past Simple, would + V1', example: 'If I had more time, I would learn Spanish.' },
        { label: { tr: 'were', en: 'were' }, formula: 'If I/he/she/it were…', example: 'If I were you, I’d apologise.' },
        { label: { tr: 'could / might', en: 'could / might' }, formula: 'would yerine could / might', example: 'If we had a car, we could go to the beach.' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Hayali / imkânsız durumlar', en: 'Imaginary situations' }, example: 'If I were a bird, I would fly.' },
        { text: { tr: 'Gerçekleşmesi düşük ihtimaller', en: 'Unlikely future' }, example: 'If I won the lottery, I’d buy a house.' },
        { text: { tr: 'Tavsiye: If I were you…', en: 'Advice: If I were you…' }, example: 'If I were you, I’d consider other options.' },
      ],
    },
    { kind: 'tip', text: { tr: 'First vs Second: “If I see her, I’ll tell her” (görmem muhtemel) / “If I saw her, I’d tell her” (görmem pek olası değil).', en: 'First = likely, Second = unlikely/imaginary.' } },
    {
      kind: 'examples',
      items: [
        { en: 'If I were the manager, I would promote her.', tr: 'Müdür ben olsaydım onu terfi ettirirdim.' },
        { en: 'If the data were sufficient, we could reveal the results.', tr: 'Veri yeterli olsaydı sonuçları açıklayabilirdik.' },
        { en: 'What would you do if you could vanish for a day?', tr: 'Bir günlüğüne görünmez olabilseydin ne yapardın?' },
        { en: 'If it didn’t cost so much, I’d buy it.', tr: 'Bu kadar pahalı olmasaydı alırdım.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Sohbette “What would you do if…?” çok sevilir:', en: '“What would you do if…?” is a favourite question:' }, items: ['If I were you, I wouldn’t worry.', 'I’d love to, if I had time.', 'What would you do if you were invisible?'] },
    {
      kind: 'media',
      items: [{ title: 'Alice in Wonderland (1951)', line: 'If I had a world of my own, everything would be nonsense.', who: 'Alice', note: { tr: 'Hayali bir dünya → If + had, would + be.', en: 'Imaginary world → If + had, would + be.' } }],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'If I would have money, I would buy it.', right: 'If I had money, I would buy it.', why: { tr: 'If kısmında would kullanılmaz.', en: 'No “would” in the if-clause.' } },
        { wrong: 'If I was you…', right: 'If I were you…', why: { tr: 'Tavsiye kalıbında “were” tercih edilir.', en: '“were” in “If I were you”.' } },
      ],
    },
  ],
  quiz: [
    { question: 'If I ___ rich, I would travel the world.', options: ['am', 'were', 'will be'], answer: 1 },
    { question: 'She ___ happier if she lived by the sea.', options: ['will be', 'would be', 'is'], answer: 1 },
    { question: 'If I ___ you, I’d say sorry.', options: ['were', 'am', 'would be'], answer: 0 },
    { question: 'What ___ you do if you saw a ghost?', options: ['will', 'would', 'do'], answer: 1 },
  ],
}

const passive: Lesson = {
  id: 'passive-voice',
  level: 'B1',
  title: 'Passive Voice',
  subtitle: { tr: 'Edilgen yapı — yapan değil, yapılan önemli', en: 'When the action matters more than who did it' },
  sections: [
    { kind: 'tip', text: { tr: 'Türkçedeki “-ıl / -ın” eki: “Köprü 1973’te yapıldı.” = “The bridge was built in 1973.” Kimin yaptığı önemsiz ya da bilinmiyor.', en: 'Like Turkish “-ıl/-ın”: the doer is unknown or unimportant.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Formül', en: 'Formula' }, formula: 'be (zamana göre) + V3', example: 'English is spoken here.' },
        { label: { tr: 'Zamanlar', en: 'Tenses' }, formula: 'is made / was made / has been made\nwill be made / is being made', example: 'The results will be revealed tomorrow.' },
        { label: { tr: 'Yapan (by)', en: 'Agent (by)' }, formula: '… + by + yapan (gerekirse)', example: 'Hamlet was written by Shakespeare.' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Yapan bilinmiyor / önemsiz', en: 'Doer unknown / unimportant' }, example: 'My bike was stolen.' },
        { text: { tr: 'Bilimsel, resmi ve haber dili', en: 'Scientific, formal and news language' }, example: 'The data was collected over two years.' },
        { text: { tr: 'Süreçleri anlatmak', en: 'Describing processes' }, example: 'The olives are picked, washed and pressed.' },
      ],
    },
    { kind: 'tip', text: { tr: 'Sadece nesne alan fiiller edilgen olur: “He arrived” edilgen yapılamaz, “They built a house” yapılabilir.', en: 'Only verbs with an object can be passive.' } },
    {
      kind: 'examples',
      items: [
        { en: 'The new manager was promoted last month.', tr: 'Yeni müdür geçen ay terfi ettirildi.' },
        { en: 'The inequality is solved in three steps.', tr: 'Eşitsizlik üç adımda çözülür.' },
        { en: 'Her name has been inscribed on the trophy.', tr: 'Adı kupaya kazındı.' },
        { en: 'A replacement will be sent to the client.', tr: 'Müşteriye yenisi gönderilecek.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Tabelalarda ve haberlerde:', en: 'On signs and in the news:' }, items: ['Breakfast is served from 7 to 10.', 'Photos are not allowed.', 'I was born in 2005.', 'The flight has been cancelled.'] },
    {
      kind: 'media',
      items: [
        { title: 'Julius Caesar, 49 BC', line: 'The die is cast.', who: 'Alea iacta est', note: { tr: 'Zar atıldı — kimin attığı önemli değil.', en: 'Who cast it doesn’t matter.' } },
        { title: 'US politics, 1980s', line: 'Mistakes were made.', who: 'Famous non-apology', note: { tr: 'Edilgen yapı suçluyu gizler! “Ben hata yaptım” demekten kaçınmanın ünlü yolu.', en: 'The passive hides who is responsible!' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'The house built in 1990.', right: 'The house was built in 1990.', why: { tr: '“be” fiili unutulmamalı.', en: 'Don’t forget “be”.' } },
        { wrong: 'I was born at 2005.', right: 'I was born in 2005.', why: { tr: 'Yıllar “in” alır.', en: 'Years take “in”.' } },
        { wrong: 'It was happened.', right: 'It happened.', why: { tr: '“happen” nesne almaz, edilgen olmaz.', en: '“happen” can’t be passive.' } },
      ],
    },
  ],
  quiz: [
    { question: 'This song ___ by millions of people.', options: ['loves', 'is loved', 'is love'], answer: 1 },
    { question: 'The Mona Lisa ___ by Leonardo da Vinci.', options: ['painted', 'was painted', 'has painting'], answer: 1 },
    { question: 'The results ___ tomorrow.', options: ['will announce', 'will be announced', 'are announce'], answer: 1 },
    { question: 'My phone ___! I can’t find it.', options: ['has been stolen', 'has stolen', 'stole'], answer: 0 },
  ],
}

const reported: Lesson = {
  id: 'reported-speech',
  level: 'B1',
  title: 'Reported Speech',
  subtitle: { tr: 'Dolaylı anlatım — “dedi ki…”', en: 'She said that…' },
  sections: [
    { kind: 'tip', text: { tr: 'Birinin sözünü aktarırken zaman bir adım geriye gider: “I am tired.” → She said (that) she WAS tired.', en: 'Tenses shift one step back: “I am tired” → she said she was tired.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Zaman kayması', en: 'Backshift' }, formula: 'am/is → was · do → did · did/have done → had done\nwill → would · can → could', example: '“I will help.” → He said he would help.' },
        { label: { tr: 'Soru', en: 'Questions' }, formula: 'asked + if / wh- + normal cümle sırası', example: '“Are you OK?” → She asked if I was OK.' },
        { label: { tr: 'Emir / rica', en: 'Commands' }, formula: 'told / asked + someone + (not) to + V1', example: '“Sit down.” → He told me to sit down.' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Birinin söylediğini başkasına aktarmak', en: 'Passing on what someone said' }, example: 'She said she was starving.' },
        { text: { tr: 'Zaman ve yer kelimeleri de değişir', en: 'Time/place words change too' }, example: 'today → that day, tomorrow → the next day, here → there' },
        { text: { tr: 'Hâlâ doğru olan şeylerde kayma şart değil', en: 'No backshift if still true' }, example: 'He said the earth is round.' },
      ],
    },
    { kind: 'tip', text: { tr: 'say vs tell: say something (to someone), tell SOMEONE something. “He told me…” ✓ “He said me…” ✗', en: 'say vs tell: tell someone, say something.' } },
    {
      kind: 'examples',
      items: [
        { en: '“The answer is obvious.” → She said that the answer was obvious.', tr: '“Cevap bariz.” → Cevabın bariz olduğunu söyledi.' },
        { en: '“I have revealed everything.” → He said he had revealed everything.', tr: '“Her şeyi açıkladım.” → Her şeyi açıkladığını söyledi.' },
        { en: '“Can you push the door?” → She asked me if I could push the door.', tr: '“Kapıyı itebilir misin?” → Kapıyı itip itemeyeceğimi sordu.' },
        { en: '“Don’t dodge the question.” → The reporter told him not to dodge the question.', tr: '“Soruyu geçiştirmeyin.” → Muhabir ona soruyu geçiştirmemesini söyledi.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Dedikoduda vazgeçilmez:', en: 'Essential for gossip:' }, items: ['She told me she was quitting!', 'He asked where I lived.', 'They said they’d be late.'] },
    {
      kind: 'media',
      items: [{ title: 'Forrest Gump (1994)', line: 'My mama always said life was like a box of chocolates.', who: 'Forrest Gump', note: { tr: 'said + was: annesinin sözünü aktarıyor.', en: 'said + was: reporting his mother’s words.' } }],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'He said me that…', right: 'He told me that… / He said that…', why: { tr: '“say”den hemen sonra kişi gelmez.', en: 'No person right after “say”.' } },
        { wrong: 'She asked where did I live.', right: 'She asked where I lived.', why: { tr: 'Aktarılan soruda düz cümle sırası.', en: 'Statement word order in reported questions.' } },
      ],
    },
  ],
  quiz: [
    { question: '“I am busy.” → She said she ___ busy.', options: ['is', 'was', 'were'], answer: 1 },
    { question: '“I will call you.” → He said he ___ call me.', options: ['will', 'would', 'can'], answer: 1 },
    { question: 'He ___ me to close the door.', options: ['said', 'told', 'asked that'], answer: 1 },
    { question: '“Do you like jazz?” → She asked ___ I liked jazz.', options: ['that', 'if', 'do'], answer: 1 },
  ],
}

const relative: Lesson = {
  id: 'relative-clauses',
  level: 'B1',
  title: 'Relative Clauses',
  subtitle: { tr: 'Sıfat cümlecikleri: who, which, that, where, whose', en: 'who, which, that, where, whose' },
  sections: [
    { kind: 'tip', text: { tr: 'Türkçedeki “-en, -dığı” yapısı: “Dün tanıştığım kız” = “the girl (who) I met yesterday”. İngilizcede açıklama ismin ARKASINA gelir.', en: 'The description comes AFTER the noun in English.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Kişi', en: 'People' }, formula: 'who / that', example: 'The reporter who interviewed her is famous.' },
        { label: { tr: 'Şey', en: 'Things' }, formula: 'which / that', example: 'The phone which I bought is great.' },
        { label: { tr: 'Yer / Sahiplik', en: 'Place / Possession' }, formula: 'where · whose', example: 'The city where I was born. The girl whose dad is a pilot.' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Hangi kişi/şey olduğunu belirlemek (virgülsüz)', en: 'Defining (no commas)' }, example: 'The client who called yesterday wants a refund.' },
        { text: { tr: 'Ek bilgi vermek (virgüllü, “that” kullanılmaz)', en: 'Extra info (commas, no “that”)' }, example: 'My sister, who lives in London, is a nurse.' },
        { text: { tr: 'Nesne konumundaysa zamir düşebilir', en: 'Object pronoun can be dropped' }, example: 'The book (that) I read was amazing.' },
      ],
    },
    {
      kind: 'examples',
      items: [
        { en: 'A coefficient is a number which multiplies a variable.', tr: 'Katsayı, bir değişkeni çarpan sayıdır.' },
        { en: 'Marie Curie was a pioneer whose work changed science.', tr: 'Marie Curie, çalışmaları bilimi değiştiren bir öncüydü.' },
        { en: 'This is the school where I sang in the choir.', tr: 'Burası koroda şarkı söylediğim okul.' },
        { en: 'The drawback that worries me most is the cost.', tr: 'Beni en çok endişelendiren dezavantaj maliyet.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Bir şeyin adını unuttuğunda kurtarıcı:', en: 'A lifesaver when you forget a word:' }, items: ['It’s the thing which you use to open wine.', 'He’s the guy who works at the café.', 'You know, the place where we had pizza?'] },
    {
      kind: 'media',
      items: [
        { title: 'Harry Potter and the Philosopher’s Stone', line: 'The Boy Who Lived', who: 'Chapter 1 title', note: { tr: 'Kişi → who.', en: 'Person → who.' } },
        { title: 'The Man Who Knew Too Much (1956)', line: 'The Man Who Knew Too Much', who: 'Alfred Hitchcock film title', note: { tr: 'Film adı: “Çok Şey Bilen Adam”.', en: 'Film title.' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'The man which lives next door…', right: 'The man who lives next door…', why: { tr: 'Kişi için which kullanılmaz.', en: 'Not “which” for people.' } },
        { wrong: 'The book that I read it was good.', right: 'The book that I read was good.', why: { tr: '“it” tekrar edilmez.', en: 'Don’t repeat the object.' } },
        { wrong: 'My mum, that is a doctor, …', right: 'My mum, who is a doctor, …', why: { tr: 'Virgüllü yapıda “that” olmaz.', en: 'No “that” in non-defining clauses.' } },
      ],
    },
  ],
  quiz: [
    { question: 'The woman ___ lives upstairs is a teacher.', options: ['which', 'who', 'where'], answer: 1 },
    { question: 'This is the café ___ we first met.', options: ['which', 'where', 'who'], answer: 1 },
    { question: 'I have a friend ___ brother is an actor.', options: ['who', 'whose', 'which'], answer: 1 },
    { question: 'The film ___ we watched was boring.', options: ['who', 'where', '(nothing) / that'], answer: 2 },
  ],
}

const gerundInfinitive: Lesson = {
  id: 'gerund-vs-infinitive',
  level: 'B1',
  title: 'Gerund vs Infinitive',
  subtitle: { tr: '-ing mi, to + V1 mi?', en: 'enjoy doing vs want to do' },
  sections: [
    { kind: 'tip', text: { tr: 'Kural yok gibi görünür ama ipucu var: -ing genelde gerçek / süregelen / yapılmış şeyler; to + V1 genelde gelecek / hedef / plan.', en: 'Hint: -ing ≈ real/ongoing; to + V1 ≈ future/goal.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: '-ing alanlar', en: 'Verb + -ing' }, formula: 'enjoy, finish, avoid, mind, suggest,\nkeep, consider, miss, can’t stand', example: 'I enjoy reading. Consider changing it.' },
        { label: { tr: 'to + V1 alanlar', en: 'Verb + to' }, formula: 'want, decide, hope, plan, need,\nlearn, promise, refuse, afford', example: 'I decided to learn English.' },
        { label: { tr: 'Edattan sonra', en: 'After prepositions' }, formula: 'preposition + -ing', example: 'I’m good at singing. Thanks for helping.' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Cümlenin öznesi olarak -ing', en: '-ing as a subject' }, example: 'Swimming is good for you.' },
        { text: { tr: 'Amaç bildirirken to + V1', en: 'to + V1 for purpose' }, example: 'I came here to study.' },
        { text: { tr: 'Anlamı değişenler: stop, remember, try', en: 'Meaning changes: stop, remember, try' }, example: 'I stopped smoking. (bıraktım) / I stopped to smoke. (sigara içmek için durdum)' },
      ],
    },
    {
      kind: 'examples',
      items: [
        { en: 'Stop dodging the question!', tr: 'Soruyu geçiştirmeyi bırak!' },
        { en: 'We can’t afford to waste more time.', tr: 'Daha fazla zaman kaybetmeyi göze alamayız.' },
        { en: 'She avoids talking about controversial topics.', tr: 'Tartışmalı konular hakkında konuşmaktan kaçınır.' },
        { en: 'He promised to reveal the truth.', tr: 'Gerçeği açıklamaya söz verdi.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Çok sık kullanılanlar:', en: 'Very common:' }, items: ['Do you mind waiting?', 'I’m looking forward to seeing you!', 'I need to go.', 'Remember to lock the door!'] },
    {
      kind: 'media',
      items: [
        { title: 'Hamlet', line: 'To be, or not to be: that is the question.', who: 'William Shakespeare', note: { tr: 'Mastar (to + V1) özne gibi kullanılmış.', en: 'Infinitives as a subject.' } },
        { title: 'The Shawshank Redemption (1994)', line: 'Get busy living, or get busy dying.', who: 'Andy Dufresne', note: { tr: '“busy”den sonra her zaman -ing gelir.', en: '“busy” is always followed by -ing.' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I enjoy to read.', right: 'I enjoy reading.', why: { tr: '“enjoy” -ing alır.', en: '“enjoy” + -ing.' } },
        { wrong: 'I want going home.', right: 'I want to go home.', why: { tr: '“want” to + V1 alır.', en: '“want” + to.' } },
        { wrong: 'I’m looking forward to see you.', right: 'I’m looking forward to seeing you.', why: { tr: 'Buradaki “to” bir edat → -ing.', en: '“to” is a preposition here.' } },
      ],
    },
  ],
  quiz: [
    { question: 'I don’t mind ___ the dishes.', options: ['to do', 'doing', 'do'], answer: 1 },
    { question: 'She decided ___ to Canada.', options: ['moving', 'to move', 'move'], answer: 1 },
    { question: 'Thank you for ___ me.', options: ['help', 'to help', 'helping'], answer: 2 },
    { question: '“I stopped ___ coffee” = I don’t drink coffee anymore.', options: ['drinking', 'to drink', 'drink'], answer: 0 },
  ],
}

const deduction: Lesson = {
  id: 'modals-of-deduction',
  level: 'B1',
  title: 'Modals of Deduction',
  subtitle: { tr: 'Tahmin ve çıkarım: must, might, can’t', en: 'must, might, can’t' },
  sections: [
    { kind: 'tip', text: { tr: 'Dedektif gibi düşün: Ne kadar eminsin? must = %95 eminim (olmalı), might/may/could = %50 (olabilir), can’t = %95 eminim ki değil (olamaz).', en: 'How sure are you? must 95% yes · might 50% · can’t 95% no.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Kesin evet', en: 'Sure yes' }, formula: 'must + V1', example: 'She must be tired — she worked 12 hours.' },
        { label: { tr: 'Belki', en: 'Maybe' }, formula: 'might / may / could + V1', example: 'He might be at home.' },
        { label: { tr: 'Kesin hayır', en: 'Sure no' }, formula: 'can’t + V1', example: 'That can’t be true!' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Kanıta dayalı tahmin', en: 'Guessing from evidence' }, example: 'The lights are off. They must be out.' },
        { text: { tr: 'Emin olmadığın olasılıklar', en: 'Uncertain possibilities' }, example: 'It might rain later.' },
        { text: { tr: 'İmkânsız gördüğün şeyler', en: 'Things you think are impossible' }, example: 'You can’t be serious!' },
        { text: { tr: 'Geçmiş için: must have / can’t have + V3 (B2’de)', en: 'Past: must have / can’t have + V3' }, example: 'She must have forgotten.' },
      ],
    },
    { kind: 'tip', text: { tr: 'Tahminde “mustn’t” kullanılmaz! “Olamaz” = can’t. (mustn’t = yasak)', en: 'For deduction, the opposite of must is can’t, not mustn’t.' } },
    {
      kind: 'examples',
      items: [
        { en: 'The answer must be an integer — it’s a count of people.', tr: 'Cevap tamsayı olmalı — insan sayısı bu.' },
        { en: 'This number can’t be divisible by 2 — it’s odd.', tr: 'Bu sayı 2’ye bölünebilir olamaz — tek sayı.' },
        { en: 'The client might want a replacement.', tr: 'Müşteri bir yenisini isteyebilir.' },
        { en: 'You must be starving after that run!', tr: 'O koşudan sonra açlıktan ölüyor olmalısın!' },
      ],
    },
    { kind: 'daily', text: { tr: 'Tepkilerde çok sık:', en: 'Very common in reactions:' }, items: ['You must be joking!', 'That can’t be right.', 'It might be a good idea.', 'You must be Ali — nice to meet you!'] },
    {
      kind: 'media',
      items: [{ title: 'Sherlock Holmes — The Sign of Four', line: 'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.', who: 'Arthur Conan Doyle', note: { tr: 'Dedektifin tahmin “must”ı.', en: 'The detective’s deduction “must”.' } }],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'He mustn’t be at home — his car is gone.', right: 'He can’t be at home — his car is gone.', why: { tr: 'Tahminde olumsuz → can’t.', en: 'Negative deduction → can’t.' } },
        { wrong: 'She must to be tired.', right: 'She must be tired.', why: { tr: 'Modal’dan sonra “to” yok.', en: 'No “to” after modals.' } },
      ],
    },
  ],
  quiz: [
    { question: 'He’s been running for an hour. He ___ be exhausted.', options: ['must', 'can’t', 'mustn’t'], answer: 0 },
    { question: 'That ___ be Jane — she’s in Paris this week.', options: ['must', 'might', 'can’t'], answer: 2 },
    { question: 'Take an umbrella. It ___ rain.', options: ['might', 'can’t', 'must not'], answer: 0 },
    { question: 'You’ve just eaten! You ___ be hungry again.', options: ['must', 'can’t', 'might'], answer: 1 },
  ],
}

export const grammarB1: Lesson[] = [perfectVsPast, usedTo, secondConditional, passive, reported, relative, gerundInfinitive, deduction]
