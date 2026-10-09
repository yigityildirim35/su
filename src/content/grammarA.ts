import type { Lesson } from './lessons'

// A1–A2 grammar lessons (tenses live in tenses.ts). `media` lines are well-documented quotes only.

const toBe: Lesson = {
  id: 'to-be',
  level: 'A1',
  title: 'To be (am / is / are)',
  subtitle: { tr: 'Olmak fiili — İngilizcenin temeli', en: 'The verb “to be” — the foundation' },
  sections: [
    { kind: 'tip', text: { tr: 'Türkçede “-im, -sin, -dir” ekleri, İngilizcede ayrı bir kelimedir: am / is / are. “Öğrenciyim” = “I am a student.”', en: 'Turkish suffixes like “-im, -dir” are a separate word in English: am / is / are.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Olumlu', en: 'Positive' }, formula: 'I am (I’m)\nHe / She / It is (’s)\nYou / We / They are (’re)', example: 'She is a reporter.' },
        { label: { tr: 'Olumsuz', en: 'Negative' }, formula: 'I’m not / isn’t / aren’t', example: 'We aren’t tired.' },
        { label: { tr: 'Soru', en: 'Question' }, formula: 'Am I…? / Is he…? / Are you…?', example: 'Are you ready?' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Kim ve ne olduğunu söylemek', en: 'Identity and jobs' }, example: 'I am a student. He is a client.' },
        { text: { tr: 'Nereli olduğunu söylemek', en: 'Origin' }, example: 'We are from Izmir.' },
        { text: { tr: 'Durum ve duygular', en: 'States and feelings' }, example: 'I’m starving! / She is curious.' },
        { text: { tr: 'Yaş, yer, hava durumu', en: 'Age, place, weather' }, example: 'I’m 21. The keys are on the table. It’s cold.' },
      ],
    },
    { kind: 'tip', text: { tr: 'Yaş söylerken “have” değil “be” kullanılır: “I am 21.” (I have 21 yanlış!)', en: 'Age uses “be”, not “have”: “I am 21.”' } },
    {
      kind: 'examples',
      items: [
        { en: 'The answer is obvious.', tr: 'Cevap apaçık.' },
        { en: 'These two problems are distinct.', tr: 'Bu iki sorun birbirinden farklı.' },
        { en: 'Is the data insufficient?', tr: 'Veri yetersiz mi?' },
        { en: 'I’m not sure, but it’s quite expensive.', tr: 'Emin değilim ama oldukça pahalı.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Günlük konuşmada hep kısaltma kullanılır:', en: 'Always contracted in speech:' }, items: ['I’m fine, thanks!', 'What’s your name?', 'Where are you from?', 'It’s okay, don’t worry.'] },
    {
      kind: 'media',
      items: [
        { title: 'The Empire Strikes Back (1980)', line: 'No, I am your father.', who: 'Darth Vader', note: { tr: 'Belki de sinemanın en ünlü “am” cümlesi.', en: 'Maybe the most famous “am” in film history.' } },
        { title: 'Titanic (1997)', line: 'I’m the king of the world!', who: 'Jack Dawson', note: { tr: 'I’m = I am.', en: 'I’m = I am.' } },
        { title: 'Harry Potter and the Philosopher’s Stone (2001)', line: 'You’re a wizard, Harry.', who: 'Hagrid', note: { tr: 'You’re = You are.', en: 'You’re = You are.' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I 21 years old.', right: 'I am 21 years old.', why: { tr: 'İngilizcede fiilsiz cümle olmaz; “am” gerekir.', en: 'An English sentence needs a verb.' } },
        { wrong: 'She are happy.', right: 'She is happy.', why: { tr: 'He/She/It → is.', en: 'He/she/it → is.' } },
        { wrong: 'I am agree.', right: 'I agree.', why: { tr: '“agree” zaten fiil; “am” eklenmez.', en: '“agree” is already a verb.' } },
      ],
    },
  ],
  quiz: [
    { question: 'My parents ___ teachers.', options: ['is', 'are', 'am'], answer: 1 },
    { question: '___ she your sister?', options: ['Are', 'Is', 'Do'], answer: 1 },
    { question: 'I ___ hungry. Let’s eat!', options: ['am', 'is', 'have'], answer: 0 },
    { question: 'It ___ cold today.', options: ['isn’t', 'aren’t', 'don’t'], answer: 0 },
  ],
}

const thereIsAre: Lesson = {
  id: 'there-is-are',
  level: 'A1',
  title: 'There is / There are',
  subtitle: { tr: 'Bir yerde bir şeyin var olduğunu söylemek', en: 'Saying something exists' },
  sections: [
    { kind: 'tip', text: { tr: '“Masada bir kitap var.” → “There is a book on the table.” Türkçedeki “var / yok” = there is / there isn’t.', en: '“There is / there are” = Turkish “var”.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Tekil', en: 'Singular' }, formula: 'There is (There’s) + a/an + noun', example: 'There’s a café near my house.' },
        { label: { tr: 'Çoğul', en: 'Plural' }, formula: 'There are + plural noun', example: 'There are two clients in the office.' },
        { label: { tr: 'Olumsuz / Soru', en: 'Negative / Question' }, formula: 'There isn’t / aren’t…\nIs there…? / Are there…?', example: 'Are there any questions?' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Bir yerde ne olduğunu anlatmak', en: 'Describing a place' }, example: 'There is a big window in my room.' },
        { text: { tr: 'Sayı ve miktar bildirmek', en: 'Numbers and amounts' }, example: 'There are 12 digits on the card.' },
        { text: { tr: 'Sayılamayanlarla “is”', en: 'Uncountables take “is”' }, example: 'There is some milk in the fridge.' },
      ],
    },
    { kind: 'signals', words: ['some', 'any', 'a lot of', 'many', 'no', 'How many…?'] },
    {
      kind: 'examples',
      items: [
        { en: 'There is a choir at my school.', tr: 'Okulumda bir koro var.' },
        { en: 'There are many benefits, but there is one drawback.', tr: 'Birçok faydası var ama bir dezavantajı var.' },
        { en: 'There isn’t enough data.', tr: 'Yeterli veri yok.' },
        { en: 'Is there a replacement for this part?', tr: 'Bu parçanın yedeği var mı?' },
      ],
    },
    { kind: 'daily', text: { tr: 'Yol sorarken ve alışverişte:', en: 'Asking for directions and shopping:' }, items: ['Is there a bathroom here?', 'There’s a problem with my order.', 'Are there any vegan options?', 'There’s no time!'] },
    {
      kind: 'media',
      items: [
        { title: 'The Wizard of Oz (1939)', line: 'There’s no place like home.', who: 'Dorothy', note: { tr: 'There’s = There is. “Ev gibisi yok.”', en: 'There’s = There is.' } },
        { title: 'The Matrix (1999)', line: 'There is no spoon.', who: 'Spoon Boy', note: { tr: '“Kaşık yok.” — olumsuz there is.', en: 'Negative “there is … no”.' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'There is two cats.', right: 'There are two cats.', why: { tr: 'Çoğul isim → there are.', en: 'Plural → there are.' } },
        { wrong: 'It has a park in my city.', right: 'There is a park in my city.', why: { tr: 'Türkçedeki “var” için “have” değil “there is” kullanılır.', en: 'Use “there is”, not “it has”.' } },
      ],
    },
  ],
  quiz: [
    { question: 'There ___ three apples on the table.', options: ['is', 'are', 'be'], answer: 1 },
    { question: '___ there a bank near here?', options: ['Are', 'Is', 'Has'], answer: 1 },
    { question: 'There ___ any milk left.', options: ['isn’t', 'aren’t', 'not'], answer: 0 },
    { question: 'There ___ a lot of people at the concert.', options: ['was', 'were', 'is'], answer: 1 },
  ],
}

const articles: Lesson = {
  id: 'articles',
  level: 'A1',
  title: 'A / An / The',
  subtitle: { tr: 'Artikeller — Türkçede olmayan küçük kelimeler', en: 'Articles — the tiny words Turkish doesn’t have' },
  sections: [
    { kind: 'tip', text: { tr: '“a/an” = herhangi bir, ilk kez bahsedilen. “the” = bildiğimiz, belli olan. Türkçede “bir” ve “-ı/-i” eki gibi düşün: bir kitap aldım → kitabı okudum.', en: '“a/an” = any one, first mention. “the” = the specific one we both know.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'a', en: 'a' }, formula: 'a + ünsüz SESİ', example: 'a book, a university (/juː/)' },
        { label: { tr: 'an', en: 'an' }, formula: 'an + ünlü SESİ', example: 'an apple, an hour (/aʊə/)' },
        { label: { tr: 'the', en: 'the' }, formula: 'the + belli tekil/çoğul isim', example: 'the sun, the keys on the table' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'İlk bahsedişte a/an, sonra the', en: 'a/an first, then the' }, example: 'I saw a dog. The dog was huge.' },
        { text: { tr: 'Meslekler a/an alır', en: 'Jobs take a/an' }, example: 'She is a reporter. He is an engineer.' },
        { text: { tr: 'Tek olan şeyler the alır', en: 'Unique things take the' }, example: 'the moon, the internet, the world' },
        { text: { tr: 'Genel çoğul ve sayılamayanlarda artikel yok', en: 'No article for general plurals/uncountables' }, example: 'I love cats. Water is important.' },
      ],
    },
    { kind: 'tip', text: { tr: 'Önemli olan harf değil SES: “an hour” (h okunmaz), “a university” (y sesiyle başlar).', en: 'It’s the SOUND that matters: an hour, a university.' } },
    {
      kind: 'examples',
      items: [
        { en: 'We need a replacement. The old one is broken.', tr: 'Bir yenisine ihtiyacımız var. Eskisi bozuk.' },
        { en: 'An integer is a whole number.', tr: 'Tamsayı, tam bir sayıdır.' },
        { en: 'The client is waiting in the lobby.', tr: 'Müşteri lobide bekliyor.' },
        { en: 'Marie Curie was a pioneer.', tr: 'Marie Curie bir öncüydü.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Günlük kalıplar:', en: 'Everyday chunks:' }, items: ['Can I have a coffee, please?', 'I’m going to the gym.', 'What a nice day!', 'Once a week / twice a day'] },
    {
      kind: 'media',
      items: [
        { title: 'Star Wars (1977)', line: 'A long time ago in a galaxy far, far away…', who: 'Opening crawl', note: { tr: 'İlk bahsedilen, belirsiz şeyler → a.', en: 'First mention, not specific → a.' } },
        { title: 'James Bond films', line: 'The name’s Bond. James Bond.', who: 'James Bond', note: { tr: 'Belli bir şey (onun adı) → the.', en: 'Specific thing → the.' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'She is teacher.', right: 'She is a teacher.', why: { tr: 'Tekil sayılabilen isim tek başına kalmaz.', en: 'Singular countable nouns need an article.' } },
        { wrong: 'a apple / a hour', right: 'an apple / an hour', why: { tr: 'Ünlü sesinden önce an.', en: 'an before a vowel sound.' } },
        { wrong: 'The life is beautiful.', right: 'Life is beautiful.', why: { tr: 'Genel kavramlarda the kullanılmaz.', en: 'No “the” for general ideas.' } },
      ],
    },
  ],
  quiz: [
    { question: 'I have ___ idea!', options: ['a', 'an', 'the'], answer: 1 },
    { question: '___ moon is beautiful tonight.', options: ['A', 'The', '—'], answer: 1 },
    { question: 'He works at ___ university.', options: ['an', 'a', '—'], answer: 1 },
    { question: 'I love ___ music.', options: ['the', 'a', '—'], answer: 2, explain: { tr: 'Genel olarak müzik → artikel yok.', en: 'Music in general → no article.' } },
  ],
}

const can: Lesson = {
  id: 'can',
  level: 'A1',
  title: 'Can / Can’t',
  subtitle: { tr: 'Yetenek, izin ve rica', en: 'Ability, permission and requests' },
  sections: [
    { kind: 'tip', text: { tr: '“can” en kolay modal fiildir: kişiye göre değişmez, -s almaz, “to” almaz. I can, she can, they can.', en: '“can” never changes: no -s, no “to”.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Olumlu', en: 'Positive' }, formula: 'Subject + can + V1', example: 'She can speak three languages.' },
        { label: { tr: 'Olumsuz', en: 'Negative' }, formula: 'Subject + can’t (cannot) + V1', example: 'I can’t swim.' },
        { label: { tr: 'Soru', en: 'Question' }, formula: 'Can + subject + V1?', example: 'Can you help me?' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Yetenek', en: 'Ability' }, example: 'He can play the guitar.' },
        { text: { tr: 'İzin istemek / vermek', en: 'Permission' }, example: 'Can I sit here? — Sure, you can.' },
        { text: { tr: 'Rica etmek', en: 'Requests' }, example: 'Can you push the door, please?' },
        { text: { tr: 'Olasılık', en: 'Possibility' }, example: 'It can be cold here in winter.' },
      ],
    },
    { kind: 'tip', text: { tr: 'Geçmişte: could. “When I was five, I could read.” Daha kibar rica: “Could you…?”', en: 'Past: could. More polite: “Could you…?”' } },
    {
      kind: 'examples',
      items: [
        { en: 'He can dodge any ball!', tr: 'Her topu atlatabilir!' },
        { en: 'Can you reveal the answer?', tr: 'Cevabı açıklayabilir misin?' },
        { en: 'I can’t find the digit I need.', tr: 'İhtiyacım olan rakamı bulamıyorum.' },
        { en: 'This phone can do amazing things — its capabilities are huge.', tr: 'Bu telefon harika şeyler yapabiliyor — yetenekleri çok büyük.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Kafede, mağazada:', en: 'In cafés and shops:' }, items: ['Can I get a latte, please?', 'Can I pay by card?', 'Sorry, I can’t make it tonight.', 'Can you say that again?'] },
    {
      kind: 'media',
      items: [
        { title: 'A Few Good Men (1992)', line: 'You can’t handle the truth!', who: 'Col. Jessup', note: { tr: 'can’t = yetenek yok.', en: 'can’t = no ability.' } },
        { title: 'Captain America: The First Avenger (2011)', line: 'I can do this all day.', who: 'Steve Rogers', note: { tr: 'Yetenek ve kararlılık.', en: 'Ability and determination.' } },
        { title: 'Barack Obama, 2008', line: 'Yes, we can.', who: 'Campaign slogan', note: { tr: 'Kısa cevaplarda can tek başına kalır.', en: 'Short answers keep “can” alone.' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'She cans swim.', right: 'She can swim.', why: { tr: '“can” -s almaz.', en: 'No -s on “can”.' } },
        { wrong: 'I can to drive.', right: 'I can drive.', why: { tr: '“can”den sonra “to” gelmez.', en: 'No “to” after “can”.' } },
        { wrong: 'Do you can help me?', right: 'Can you help me?', why: { tr: 'Soruda “do” kullanılmaz; can başa gelir.', en: 'No “do” in questions with can.' } },
      ],
    },
  ],
  quiz: [
    { question: 'My brother ___ speak French.', options: ['can', 'cans', 'can to'], answer: 0 },
    { question: '___ I open the window?', options: ['Do', 'Can', 'Am'], answer: 1 },
    { question: 'Sorry, I ___ come to the party.', options: ['can’t', 'don’t can', 'not can'], answer: 0 },
    { question: 'When I was a child, I ___ climb trees.', options: ['can', 'could', 'cans'], answer: 1 },
  ],
}

const prepositions: Lesson = {
  id: 'prepositions',
  level: 'A1',
  title: 'In / On / At',
  subtitle: { tr: 'Yer ve zaman edatları', en: 'Prepositions of place and time' },
  sections: [
    { kind: 'tip', text: { tr: 'Üçgen kuralını hatırla: AT = nokta (en küçük), ON = yüzey / gün, IN = içi / büyük alan ve uzun zaman.', en: 'Triangle rule: AT = point, ON = surface/day, IN = inside/big area/long period.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Zaman', en: 'Time' }, formula: 'AT 5 o’clock, at night\nON Monday, on 26 August\nIN July, in 2027, in the morning', example: 'See you on Friday at 7.' },
        { label: { tr: 'Yer', en: 'Place' }, formula: 'AT the door, at school\nON the table, on the wall\nIN the box, in Izmir', example: 'The keys are on the table.' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'AT: saatler, belirli noktalar, adresler', en: 'AT: clock times, points, addresses' }, example: 'I’m at the bus stop.' },
        { text: { tr: 'ON: günler, tarihler, yüzeyler, ulaşım (otobüs, tren)', en: 'ON: days, dates, surfaces, buses/trains' }, example: 'My birthday is on 26 August.' },
        { text: { tr: 'IN: aylar, yıllar, mevsimler, şehir/ülke, kapalı alan', en: 'IN: months, years, seasons, cities, inside' }, example: 'She was born in 2005.' },
      ],
    },
    { kind: 'signals', words: ['at night', 'in the morning', 'on the weekend (US)', 'at the weekend (UK)', 'in a car', 'on a bus'] },
    {
      kind: 'examples',
      items: [
        { en: 'Draw a circle inscribed in the square.', tr: 'Karenin içine bir çember çiz.' },
        { en: 'The choir sings on Sundays at 10.', tr: 'Koro pazar günleri saat 10’da şarkı söyler.' },
        { en: 'The reporter is at the door.', tr: 'Muhabir kapıda.' },
        { en: 'Her name is inscribed on the ring.', tr: 'Adı yüzüğün üzerine kazınmış.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Sık kullanılan kalıplar:', en: 'Common chunks:' }, items: ['I’m at home.', 'I’m in bed.', 'I’m on my way!', 'See you in a minute.'] },
    {
      kind: 'media',
      items: [{ title: 'The Hobbit (J. R. R. Tolkien)', line: 'In a hole in the ground there lived a hobbit.', who: 'Opening line', note: { tr: 'Bir şeyin içinde → in.', en: 'Inside something → in.' } }],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'in Monday', right: 'on Monday', why: { tr: 'Günler on alır.', en: 'Days take on.' } },
        { wrong: 'at 2027', right: 'in 2027', why: { tr: 'Yıllar in alır.', en: 'Years take in.' } },
        { wrong: 'I am in home.', right: 'I am at home.', why: { tr: '“home” sabit kalıp: at home.', en: 'Fixed phrase: at home.' } },
      ],
    },
  ],
  quiz: [
    { question: 'The meeting is ___ 3 p.m.', options: ['in', 'on', 'at'], answer: 2 },
    { question: 'We go skiing ___ winter.', options: ['in', 'on', 'at'], answer: 0 },
    { question: 'My birthday is ___ 26 August.', options: ['in', 'on', 'at'], answer: 1 },
    { question: 'There’s a picture ___ the wall.', options: ['in', 'on', 'at'], answer: 1 },
  ],
}

const frequency: Lesson = {
  id: 'adverbs-of-frequency',
  level: 'A1',
  title: 'Adverbs of Frequency',
  subtitle: { tr: 'Sıklık zarfları — ne sıklıkla?', en: 'always, usually, never…' },
  sections: [
    { kind: 'tip', text: { tr: 'Yüzde ölçeği gibi düşün: always 100% → usually 90% → often 70% → sometimes 50% → rarely/seldom 10% → never 0%.', en: 'Think of a % scale: always 100% … never 0%.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Normal fiilden ÖNCE', en: 'BEFORE a main verb' }, formula: 'Subject + always/often… + V', example: 'I usually drink tea.' },
        { label: { tr: '“be” fiilinden SONRA', en: 'AFTER “be”' }, formula: 'Subject + am/is/are + always…', example: 'She is never late.' },
        { label: { tr: 'Soru', en: 'Question' }, formula: 'How often do you…?', example: 'How often do you study?' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Alışkanlıkları anlatmak (Present Simple ile)', en: 'Describing habits' }, example: 'I often go to the gym.' },
        { text: { tr: 'Daha belirli sıklık: once/twice a week, every day', en: 'Exact frequency: once a week, every day' }, example: 'I go swimming twice a week.' },
      ],
    },
    { kind: 'signals', words: ['always', 'usually', 'often', 'sometimes', 'rarely', 'seldom', 'never', 'once a week', 'every day'] },
    {
      kind: 'examples',
      items: [
        { en: 'She always considers the cost first.', tr: 'Her zaman önce maliyeti düşünür.' },
        { en: 'He rarely wastes time.', tr: 'Nadiren zaman kaybeder.' },
        { en: 'I’m never sure about prepositions!', tr: 'Edatlardan hiç emin olamıyorum!' },
        { en: 'We sometimes push ourselves too hard.', tr: 'Bazen kendimizi çok zorlarız.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Sohbette:', en: 'In conversation:' }, items: ['I hardly ever watch TV.', 'Every now and then I treat myself.', 'Not very often, to be honest.'] },
    {
      kind: 'media',
      items: [{ title: 'Forrest Gump (1994)', line: 'My mama always said life was like a box of chocolates.', who: 'Forrest Gump', note: { tr: '“always” fiilden (said) önce.', en: '“always” before the verb.' } }],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I go always to school by bus.', right: 'I always go to school by bus.', why: { tr: 'Sıklık zarfı normal fiilden önce gelir.', en: 'Adverb before the main verb.' } },
        { wrong: 'She always is happy.', right: 'She is always happy.', why: { tr: '“be” fiilinden sonra gelir.', en: 'After “be”.' } },
        { wrong: 'I don’t never eat meat.', right: 'I never eat meat.', why: { tr: '“never” zaten olumsuz; çift olumsuz olmaz.', en: 'No double negatives.' } },
      ],
    },
  ],
  quiz: [
    { question: 'Put “often” correctly: “I ___ read ___ books.”', options: ['I often read books.', 'I read often books.', 'Often I books read.'], answer: 0 },
    { question: 'Which is 0%?', options: ['rarely', 'never', 'seldom'], answer: 1 },
    { question: 'He ___ late. He’s very punctual.', options: ['is never', 'never is', 'is always'], answer: 0 },
    { question: '“___ do you go to the cinema?” — “Once a month.”', options: ['How much', 'How often', 'When often'], answer: 1 },
  ],
}

const comparatives: Lesson = {
  id: 'comparatives-superlatives',
  level: 'A2',
  title: 'Comparatives & Superlatives',
  subtitle: { tr: 'Karşılaştırma: daha … / en …', en: 'bigger, the biggest' },
  sections: [
    { kind: 'tip', text: { tr: 'Kısa sıfat → -er / the -est. Uzun sıfat → more / the most. Düzensizler: good → better → the best, bad → worse → the worst.', en: 'Short → -er / -est. Long → more / most. Irregular: good, better, best.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Kısa sıfat', en: 'Short adjective' }, formula: 'adj + er + than\nthe + adj + est', example: 'Cats are smaller than dogs. The cheetah is the fastest.' },
        { label: { tr: 'Uzun sıfat', en: 'Long adjective' }, formula: 'more + adj + than\nthe most + adj', example: 'This is more efficient. It’s the most controversial idea.' },
        { label: { tr: 'Eşitlik', en: 'Equality' }, formula: 'as + adj + as', example: 'Mine is as good as yours.' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'İki şeyi karşılaştırmak (comparative)', en: 'Two things' }, example: 'Istanbul is bigger than Izmir.' },
        { text: { tr: 'Bir gruptaki en uç olanı söylemek (superlative)', en: 'The extreme in a group' }, example: 'It’s the best day of my life!' },
        { text: { tr: 'Benzerlik / farklılık (as…as / not as…as)', en: 'Similarity' }, example: 'It’s not as cold as yesterday.' },
      ],
    },
    { kind: 'tip', text: { tr: 'Yazım: big → bigger (son harf ikilenir), happy → happier (y → i), nice → nicer (sadece -r).', en: 'Spelling: big → bigger, happy → happier, nice → nicer.' } },
    {
      kind: 'examples',
      items: [
        { en: 'The new system is more efficient than the old one.', tr: 'Yeni sistem eskisinden daha verimli.' },
        { en: 'This is the most obvious answer.', tr: 'Bu en bariz cevap.' },
        { en: 'The drawbacks are smaller than the benefits.', tr: 'Dezavantajlar faydalardan daha küçük.' },
        { en: 'Her ratio is the highest in the class.', tr: 'Onun oranı sınıftaki en yüksek oran.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Gündelik ifadeler:', en: 'Everyday phrases:' }, items: ['The sooner, the better.', 'Better late than never.', 'It’s getting better and better.', 'That’s the worst!'] },
    {
      kind: 'media',
      items: [
        { title: 'Jaws (1975)', line: 'You’re gonna need a bigger boat.', who: 'Chief Brody', note: { tr: 'big → bigger (son harf ikilenir).', en: 'big → bigger.' } },
        { title: 'Alice’s Adventures in Wonderland', line: 'Curiouser and curiouser!', who: 'Alice', note: { tr: 'Esprili bir HATA! Doğrusu “more and more curious” — Alice heyecandan yanlış söylüyor.', en: 'A deliberate mistake! Correct: “more and more curious”.' } },
        { title: 'Olympic motto', line: 'Faster, Higher, Stronger', who: 'Citius, Altius, Fortius', note: { tr: 'Üç kısa sıfat, üç -er.', en: 'Three short adjectives with -er.' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'more bigger', right: 'bigger', why: { tr: 'İkisi birden kullanılmaz.', en: 'Never both.' } },
        { wrong: 'He is taller then me.', right: 'He is taller than me.', why: { tr: 'Karşılaştırmada “than” (then = sonra).', en: '“than”, not “then”.' } },
        { wrong: 'the most good', right: 'the best', why: { tr: '“good” düzensizdir.', en: '“good” is irregular.' } },
      ],
    },
  ],
  quiz: [
    { question: 'A plane is ___ than a car.', options: ['fast', 'faster', 'more fast'], answer: 1 },
    { question: 'This is ___ book I’ve ever read.', options: ['the more interesting', 'the most interesting', 'most interestinger'], answer: 1 },
    { question: 'My English is ___ than last year.', options: ['gooder', 'better', 'more good'], answer: 1 },
    { question: 'She is as tall ___ her mother.', options: ['than', 'as', 'like'], answer: 1 },
  ],
}

const quantifiers: Lesson = {
  id: 'some-any-much-many',
  level: 'A2',
  title: 'Some / Any / Much / Many',
  subtitle: { tr: 'Sayılabilen ve sayılamayan isimler', en: 'Countable and uncountable nouns' },
  sections: [
    { kind: 'tip', text: { tr: 'Önce sor: sayabilir miyim? apple → 1, 2, 3 (sayılabilir). water, data, advice → sayılamaz (çoğul yapılamaz, “a” almaz).', en: 'Ask: can I count it? apples ✓, water ✗.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'some / any', en: 'some / any' }, formula: 'some → olumlu (ve teklifler)\nany → olumsuz ve sorular', example: 'I have some time. Do you have any questions?' },
        { label: { tr: 'many / much', en: 'many / much' }, formula: 'many + sayılabilen çoğul\nmuch + sayılamayan', example: 'How many clients? How much money?' },
        { label: { tr: 'a lot of', en: 'a lot of' }, formula: 'a lot of + her ikisi (olumlu cümlelerde doğal)', example: 'There’s a lot of stuff here.' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Teklif ve ricalarda soru olsa da “some”', en: '“some” in offers/requests' }, example: 'Would you like some tea?' },
        { text: { tr: '“much” daha çok olumsuz ve sorularda', en: '“much” mostly in negatives/questions' }, example: 'I don’t have much time.' },
        { text: { tr: 'Az: a few (sayılabilen), a little (sayılamayan)', en: 'a few / a little' }, example: 'a few digits / a little doubt' },
      ],
    },
    { kind: 'tip', text: { tr: 'Tuzak kelimeler sayılamaz: information, advice, news, furniture, data, stuff, homework. “an advice” değil, “a piece of advice”.', en: 'Tricky uncountables: information, advice, news, data, stuff.' } },
    {
      kind: 'examples',
      items: [
        { en: 'We don’t have much data yet.', tr: 'Henüz fazla verimiz yok.' },
        { en: 'How many integers are between 1 and 10?', tr: '1 ile 10 arasında kaç tamsayı var?' },
        { en: 'There is some doubt about the results.', tr: 'Sonuçlar hakkında biraz şüphe var.' },
        { en: 'Are there any drawbacks?', tr: 'Herhangi bir dezavantajı var mı?' },
      ],
    },
    { kind: 'daily', text: { tr: 'Alışverişte ve evde:', en: 'Shopping and at home:' }, items: ['How much is it?', 'Can I have some water?', 'I don’t have any cash.', 'Not many people know that.'] },
    {
      kind: 'media',
      items: [
        { title: 'Return of the Jedi (1983)', line: 'Many Bothans died to bring us this information.', who: 'Mon Mothma', note: { tr: 'Bothans sayılabilir → many. “information” sayılamaz!', en: 'many + countable; “information” is uncountable.' } },
        { title: 'Winston Churchill, 1940', line: 'Never in the field of human conflict was so much owed by so many to so few.', who: 'Speech', note: { tr: 'much (borç — sayılamaz), many / few (insanlar — sayılabilir).', en: 'much vs many/few.' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'How much people?', right: 'How many people?', why: { tr: 'people sayılabilir → many.', en: 'Countable → many.' } },
        { wrong: 'informations / advices', right: 'information / advice', why: { tr: 'Bunlar sayılamaz, -s almaz.', en: 'Uncountable — no plural.' } },
        { wrong: 'I don’t have some money.', right: 'I don’t have any money.', why: { tr: 'Olumsuzda any.', en: 'any in negatives.' } },
      ],
    },
  ],
  quiz: [
    { question: 'How ___ sugar do you want?', options: ['many', 'much', 'any'], answer: 1 },
    { question: 'There aren’t ___ eggs left.', options: ['some', 'any', 'much'], answer: 1 },
    { question: 'Can you give me ___ advice?', options: ['an', 'some', 'many'], answer: 1 },
    { question: 'I have ___ friends in London — about three.', options: ['a few', 'a little', 'much'], answer: 0 },
  ],
}

const obligation: Lesson = {
  id: 'should-must-have-to',
  level: 'A2',
  title: 'Should / Must / Have to',
  subtitle: { tr: 'Tavsiye ve zorunluluk', en: 'Advice and obligation' },
  sections: [
    { kind: 'tip', text: { tr: 'should = “-meli (tavsiye)”, must = “-meli (güçlü, içten gelen)”, have to = “zorunda (kural/dış etken)”. Dikkat: mustn’t = yasak, don’t have to = gerek yok!', en: 'mustn’t = forbidden; don’t have to = not necessary!' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'should', en: 'should' }, formula: 'should / shouldn’t + V1', example: 'You should see a doctor.' },
        { label: { tr: 'must', en: 'must' }, formula: 'must / mustn’t + V1', example: 'I must call my mum. You mustn’t smoke here.' },
        { label: { tr: 'have to', en: 'have to' }, formula: 'have/has to + V1\ndon’t/doesn’t have to + V1', example: 'She has to work on Saturdays.' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Tavsiye ve fikir: should', en: 'Advice: should' }, example: 'You should consider the drawbacks.' },
        { text: { tr: 'Kişisel güçlü zorunluluk / kurallar (yazılı): must', en: 'Strong personal obligation / written rules: must' }, example: 'Passengers must wear seat belts.' },
        { text: { tr: 'Dış zorunluluk, her zaman: have to', en: 'External obligation: have to' }, example: 'I have to wear a uniform at work.' },
        { text: { tr: 'Geçmiş: had to (must’ın geçmişi yok)', en: 'Past: had to' }, example: 'We had to wait for an hour.' },
      ],
    },
    {
      kind: 'examples',
      items: [
        { en: 'You shouldn’t waste so much time on your phone.', tr: 'Telefonunda bu kadar çok zaman harcamamalısın.' },
        { en: 'The answer must be an integer.', tr: 'Cevap bir tamsayı olmalı.' },
        { en: 'You don’t have to pay — it’s free!', tr: 'Ödemene gerek yok — ücretsiz!' },
        { en: 'Clients have to read the terms first.', tr: 'Müşteriler önce şartları okumak zorunda.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Gündelik:', en: 'Everyday:' }, items: ['I have to go, bye!', 'You should try it!', 'You must be tired.', 'Do I have to?'] },
    {
      kind: 'media',
      items: [
        { title: 'The Empire Strikes Back (1980)', line: 'You must unlearn what you have learned.', who: 'Yoda', note: { tr: 'Güçlü zorunluluk → must.', en: 'Strong obligation → must.' } },
        { title: 'Lost (2007)', line: 'We have to go back!', who: 'Jack Shephard', note: { tr: 'Kaçınılmaz bir zorunluluk → have to.', en: 'Unavoidable necessity → have to.' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'You must to study.', right: 'You must study.', why: { tr: 'must/should’dan sonra “to” yok.', en: 'No “to” after must/should.' } },
        { wrong: 'You mustn’t come. (gerek yok anlamında)', right: 'You don’t have to come.', why: { tr: 'mustn’t = yasak; gerek yok = don’t have to.', en: 'mustn’t = forbidden.' } },
        { wrong: 'I musted go.', right: 'I had to go.', why: { tr: 'must’ın geçmişi yoktur → had to.', en: 'No past of must → had to.' } },
      ],
    },
  ],
  quiz: [
    { question: 'You look tired. You ___ go to bed.', options: ['should', 'mustn’t', 'don’t have to'], answer: 0 },
    { question: 'You ___ park here. It’s forbidden.', options: ['don’t have to', 'mustn’t', 'should'], answer: 1 },
    { question: 'Tomorrow is Sunday, so I ___ get up early.', options: ['mustn’t', 'don’t have to', 'must'], answer: 1 },
    { question: 'Yesterday I ___ work late.', options: ['must', 'had to', 'have to'], answer: 1 },
  ],
}

const firstConditional: Lesson = {
  id: 'first-conditional',
  level: 'A2',
  title: 'First Conditional',
  subtitle: { tr: 'Gerçek koşul — olası gelecek', en: 'Real future possibilities' },
  sections: [
    { kind: 'tip', text: { tr: 'Gerçekleşmesi muhtemel bir koşul + sonucu: “Yağmur yağarsa evde kalırım.” If kısmında will KULLANILMAZ!', en: 'Likely condition + result. No “will” in the if-part!' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Kalıp', en: 'Pattern' }, formula: 'If + Present Simple, will + V1', example: 'If it rains, I’ll stay home.' },
        { label: { tr: 'Ters sıra', en: 'Reversed' }, formula: 'will + V1 + if + Present Simple', example: 'I’ll call you if I have time.' },
        { label: { tr: 'unless', en: 'unless' }, formula: 'unless = if not', example: 'You’ll be late unless you hurry.' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Olası gelecek durumlar', en: 'Possible future situations' }, example: 'If you study, you’ll pass.' },
        { text: { tr: 'Uyarılar ve tehditler', en: 'Warnings' }, example: 'If you push it, it will break.' },
        { text: { tr: 'Söz ve teklifler', en: 'Promises and offers' }, example: 'If you help me, I’ll buy you dinner.' },
      ],
    },
    { kind: 'tip', text: { tr: 'If cümle başındaysa virgül koy; sondaysa virgül gerekmez.', en: 'Comma when “if” comes first.' } },
    {
      kind: 'examples',
      items: [
        { en: 'If x = 2, it will satisfy the equation.', tr: 'x = 2 olursa denklemi sağlar.' },
        { en: 'If we reduce costs, the company will benefit.', tr: 'Maliyetleri düşürürsek şirket fayda sağlar.' },
        { en: 'She won’t be promoted unless she works harder.', tr: 'Daha çok çalışmazsa terfi etmeyecek.' },
        { en: 'If you don’t eat, you’ll be starving later.', tr: 'Yemezsen sonra çok acıkırsın.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Plan yaparken:', en: 'Making plans:' }, items: ['If I’m late, start without me.', 'I’ll text you if anything changes.', 'If you need anything, just ask.'] },
    {
      kind: 'media',
      items: [
        { title: 'Field of Dreams (1989)', line: 'If you build it, he will come.', who: 'The Voice', note: { tr: 'Tam bir First Conditional: if + present, will + V1.', en: 'A perfect First Conditional.' } },
        { title: 'Dodgeball (2004)', line: 'If you can dodge a wrench, you can dodge a ball.', who: 'Patches O’Houlihan', note: { tr: 'Sonuç kısmında “will” yerine “can” de olabilir.', en: '“can” instead of “will” works too.' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'If it will rain, I will stay.', right: 'If it rains, I will stay.', why: { tr: 'If kısmında will kullanılmaz.', en: 'No “will” after “if”.' } },
        { wrong: 'Unless you don’t hurry…', right: 'Unless you hurry…', why: { tr: 'unless zaten olumsuz anlam taşır.', en: '“unless” is already negative.' } },
      ],
    },
  ],
  quiz: [
    { question: 'If you ___ hard, you will succeed.', options: ['will work', 'work', 'worked'], answer: 1 },
    { question: 'I ___ you if I see her.', options: ['tell', 'will tell', 'told'], answer: 1 },
    { question: '___ you leave now, you’ll miss the bus.', options: ['If', 'Unless', 'When not'], answer: 1 },
    { question: 'If it ___ sunny tomorrow, we’ll go to the beach.', options: ['is', 'will be', 'was'], answer: 0 },
  ],
}

export const grammarA: Lesson[] = [toBe, thereIsAre, articles, can, prepositions, frequency, comparatives, quantifiers, obligation, firstConditional]
