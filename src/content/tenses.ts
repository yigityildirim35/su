import type { Lesson } from './lessons'

// The 12 English tenses, expanded from "İngilizce Kelime ve Zamanlar Rehberi".
// Example sentences reuse words from the personal word list on purpose.
// `media` lines are only well-documented quotes; tenses without a solid example simply skip that section.

const presentSimple: Lesson = {
  id: 'present-simple',
  level: 'A1',
  title: 'Present Simple',
  subtitle: { tr: 'Geniş zaman — alışkanlıklar, rutinler ve gerçekler', en: 'Habits, routines and facts' },
  sections: [
    { kind: 'tip', text: { tr: 'Present Simple “her zaman böyle” zamanıdır. Şu an ne yaptığını değil, genelde ne yaptığını anlatır.', en: 'Present Simple is the “this is how it usually is” tense — not what you’re doing now, but what you generally do.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Olumlu', en: 'Positive' }, formula: 'I / You / We / They + V1\nHe / She / It + V1 + s/es', example: 'She drinks coffee every morning.' },
        { label: { tr: 'Olumsuz', en: 'Negative' }, formula: 'Subject + don’t / doesn’t + V1', example: 'He doesn’t like horror movies.' },
        { label: { tr: 'Soru', en: 'Question' }, formula: 'Do / Does + subject + V1?', example: 'Do you speak English?' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Alışkanlıklar ve rutinler', en: 'Habits and routines' }, example: 'I go to the gym on Mondays.' },
        { text: { tr: 'Genel ve bilimsel gerçekler', en: 'General and scientific facts' }, example: 'Water boils at 100 degrees.' },
        { text: { tr: 'Kalıcı durumlar', en: 'Permanent situations' }, example: 'My brother lives in Izmir.' },
        { text: { tr: 'Programlar ve tarifeler', en: 'Timetables and schedules' }, example: 'The train leaves at 8:15.' },
      ],
    },
    { kind: 'signals', words: ['always', 'usually', 'often', 'sometimes', 'seldom', 'never', 'every day', 'on Mondays'] },
    { kind: 'tip', text: { tr: 'He / She / It gördüğünde fiile -s ekle! Hatırlatıcı: “She sells seashells.”', en: 'With he / she / it, add -s to the verb! Memory trick: “She sells seashells.”' } },
    {
      kind: 'examples',
      items: [
        { en: 'The company considers every customer demand seriously.', tr: 'Şirket her müşteri talebini ciddiye alır.' },
        { en: 'An efficient heater doesn’t waste energy.', tr: 'Verimli bir ısıtıcı enerjiyi boşa harcamaz.' },
        { en: '12 is divisible by 3.', tr: '12, 3’e bölünebilir.' },
        { en: 'Does your sister sing in a choir?', tr: 'Kız kardeşin bir koroda şarkı söyler mi?' },
      ],
    },
    { kind: 'daily', text: { tr: 'Tanışırken ve kendini anlatırken en çok bu zamanı kullanırsın:', en: 'You use it all the time when meeting people:' }, items: ['What do you do? — I’m a student.', 'Where do you live?', 'I don’t really like mornings.', 'How often do you work out?'] },
    {
      kind: 'media',
      items: [
        { title: 'Game of Thrones', line: 'You know nothing, Jon Snow.', who: 'Ygritte', note: { tr: '“know” geniş zamanda: genel bir durum.', en: '“know” in Present Simple: a general state.' } },
        { title: 'The Sixth Sense (1999)', line: 'I see dead people.', who: 'Cole', note: { tr: 'Sürekli tekrarlanan bir durum.', en: 'A repeated, ongoing situation.' } },
        { title: 'Guardians of the Galaxy (2014)', line: 'I am Groot.', who: 'Groot', note: { tr: '“to be” geniş zamanda: kimlik bildirir.', en: '“to be” in Present Simple: identity.' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'He go to school.', right: 'He goes to school.', why: { tr: 'He/She/It ile fiile -s/-es eklenir.', en: 'Add -s/-es with he/she/it.' } },
        { wrong: 'Does she likes pizza?', right: 'Does she like pizza?', why: { tr: '“Does” zaten -s’yi taşıyor; fiil yalın kalır.', en: '“Does” already carries the -s; the verb stays bare.' } },
        { wrong: 'I am agree.', right: 'I agree.', why: { tr: '“agree” bir fiil, “am” gerekmez.', en: '“agree” is a verb — no “am”.' } },
      ],
    },
  ],
  quiz: [
    { question: 'She ___ to music every evening.', options: ['listen', 'listens', 'is listen'], answer: 1 },
    { question: '___ you like chocolate?', options: ['Does', 'Are', 'Do'], answer: 2 },
    { question: 'My parents ___ live in Ankara.', options: ['doesn’t', 'don’t', 'aren’t'], answer: 1 },
    { question: 'The shop ___ at 9 a.m.', options: ['opens', 'open', 'opening'], answer: 0, explain: { tr: 'Tarifeler/programlar için geniş zaman.', en: 'Schedules use Present Simple.' } },
  ],
}

const presentContinuous: Lesson = {
  id: 'present-continuous',
  level: 'A1',
  title: 'Present Continuous',
  subtitle: { tr: 'Şimdiki zaman — şu an olanlar', en: 'Things happening right now' },
  sections: [
    { kind: 'tip', text: { tr: 'Şu an elinde ne var? Onu Present Continuous ile anlatırsın. Türkçedeki “-yor” eki gibi düşün.', en: 'What are you doing at this moment? That’s Present Continuous — like the Turkish “-yor”.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Olumlu', en: 'Positive' }, formula: 'Subject + am / is / are + V-ing', example: 'I am studying English.' },
        { label: { tr: 'Olumsuz', en: 'Negative' }, formula: 'Subject + am not / isn’t / aren’t + V-ing', example: 'She isn’t watching TV.' },
        { label: { tr: 'Soru', en: 'Question' }, formula: 'Am / Is / Are + subject + V-ing?', example: 'Are you listening to me?' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Konuşma anında olan eylemler', en: 'Actions happening now' }, example: 'The reporter is interviewing the pioneer right now.' },
        { text: { tr: 'Bu aralar süren geçici durumlar', en: 'Temporary situations these days' }, example: 'I’m living with my aunt this month.' },
        { text: { tr: 'Yakın gelecek için kesin planlar', en: 'Fixed plans for the near future' }, example: 'We’re meeting a new client tomorrow.' },
        { text: { tr: 'Değişen / gelişen durumlar', en: 'Changing situations' }, example: 'The cost of living is getting higher.' },
      ],
    },
    { kind: 'signals', words: ['now', 'right now', 'at the moment', 'currently', 'these days', 'today', 'Look!', 'Listen!'] },
    { kind: 'tip', text: { tr: 'Bazı fiiller “durum” bildirir ve -ing almaz: know, like, love, want, need, believe, understand. “I am knowing” değil, “I know”.', en: 'State verbs don’t usually take -ing: know, like, love, want, need, believe, understand. Not “I am knowing” — “I know”.' } },
    {
      kind: 'examples',
      items: [
        { en: 'Look! The fog is vanishing.', tr: 'Bak! Sis kayboluyor.' },
        { en: 'They are considering a replacement for the old system.', tr: 'Eski sistem için bir yenisini düşünüyorlar.' },
        { en: 'Why are you pushing me?', tr: 'Neden beni itiyorsun?' },
        { en: 'I’m not doing anything — I’m starving, let’s eat!', tr: 'Hiçbir şey yapmıyorum — çok acıktım, hadi yiyelim!' },
      ],
    },
    { kind: 'daily', text: { tr: 'Mesajlaşırken ve telefonda çok kullanılır:', en: 'Super common in texts and on the phone:' }, items: ['What are you doing?', 'I’m on my way!', 'I’m just looking, thanks. (mağazada)', 'Are you kidding me?'] },
    {
      kind: 'media',
      items: [
        { title: 'Taxi Driver (1976)', line: 'You talkin’ to me?', who: 'Travis Bickle', note: { tr: '“Are you talking to me?” cümlesinin sokak hali — “are” düşmüş.', en: 'Street form of “Are you talking to me?” — “are” is dropped.' } },
        { title: 'Midnight Cowboy (1969)', line: 'I’m walking here! I’m walking here!', who: 'Ratso Rizzo', note: { tr: 'Tam şu an yaptığı eylem.', en: 'The action happening right at that moment.' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I studying now.', right: 'I am studying now.', why: { tr: 'am / is / are unutulmamalı.', en: 'Don’t forget am / is / are.' } },
        { wrong: 'I am wanting a coffee.', right: 'I want a coffee.', why: { tr: '“want” durum fiilidir, -ing almaz.', en: '“want” is a state verb.' } },
        { wrong: 'He is swiming.', right: 'He is swimming.', why: { tr: 'Kısa ünlü + ünsüzle biten fiillerde son harf ikilenir: swim → swimming, run → running.', en: 'Double the final consonant: swim → swimming.' } },
      ],
    },
  ],
  quiz: [
    { question: 'Be quiet! The baby ___.', options: ['sleeps', 'is sleeping', 'sleep'], answer: 1 },
    { question: '___ they coming to the party tonight?', options: ['Do', 'Is', 'Are'], answer: 2 },
    { question: 'I ___ the answer.', options: ['know', 'am knowing', 'knowing'], answer: 0, explain: { tr: '“know” durum fiili — Present Simple ile kullanılır.', en: '“know” is a state verb.' } },
    { question: 'She ___ (not / work) today, it’s her day off.', options: ['doesn’t working', 'isn’t working', 'not working'], answer: 1 },
  ],
}

const presentPerfect: Lesson = {
  id: 'present-perfect',
  level: 'A2',
  title: 'Present Perfect',
  subtitle: { tr: 'Geçmişten bugüne etkisi süren olaylar', en: 'Past actions with a link to now' },
  sections: [
    { kind: 'tip', text: { tr: 'Present Perfect bir köprüdür: geçmişte oldu ama sonucu ŞİMDİ önemli. Ne zaman olduğu söylenmez!', en: 'Present Perfect is a bridge: it happened in the past but the result matters NOW. We don’t say when!' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Olumlu', en: 'Positive' }, formula: 'Subject + have / has + V3', example: 'I have finished my homework.' },
        { label: { tr: 'Olumsuz', en: 'Negative' }, formula: 'Subject + haven’t / hasn’t + V3', example: 'She hasn’t called me yet.' },
        { label: { tr: 'Soru', en: 'Question' }, formula: 'Have / Has + subject + V3?', example: 'Have you ever been to London?' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Zamanı belirtilmeyen deneyimler', en: 'Life experiences (no time given)' }, example: 'I have never eaten sushi.' },
        { text: { tr: 'Sonucu şu an görülen yakın geçmiş olaylar', en: 'Recent actions with a present result' }, example: 'Scientists have revealed new data about the disease.' },
        { text: { tr: 'Geçmişte başlayıp hâlâ süren durumlar (for / since)', en: 'Situations that started in the past and continue (for / since)' }, example: 'We have known each other since 2015.' },
        { text: { tr: 'Henüz bitmemiş zaman dilimleri', en: 'Unfinished time periods' }, example: 'I’ve drunk three coffees today.' },
      ],
    },
    { kind: 'signals', words: ['just', 'already', 'yet', 'ever', 'never', 'for', 'since', 'so far', 'recently'] },
    { kind: 'tip', text: { tr: '“for” süre (for two years), “since” başlangıç noktası (since 2020) bildirir.', en: '“for” = a period (for two years), “since” = a starting point (since 2020).' } },
    {
      kind: 'examples',
      items: [
        { en: 'The fog has vanished — we can drive now.', tr: 'Sis kayboldu — artık sürebiliriz.' },
        { en: 'She has just been promoted to manager!', tr: 'Az önce müdürlüğe terfi etti!' },
        { en: 'Have you considered the drawbacks?', tr: 'Dezavantajlarını düşündün mü?' },
        { en: 'I haven’t found a replacement yet.', tr: 'Henüz yerine birini bulamadım.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Haber verirken ve deneyim sorarken:', en: 'For news and experiences:' }, items: ['I’ve lost my keys!', 'Have you seen my phone?', 'Have you ever tried Turkish coffee?', 'I’ve already eaten, thanks.'] },
    {
      kind: 'media',
      items: [
        { title: 'Apollo 13 mission (1970)', line: 'Houston, we’ve had a problem.', who: 'Jack Swigert & Jim Lovell', note: { tr: 'Gerçek telsiz kaydı Present Perfect’tir! 1995 filminde “we have a problem” olarak değiştirildi.', en: 'The real radio call is Present Perfect! The 1995 film changed it to “we have a problem”.' } },
        { title: 'Titanic (1997)', line: 'It’s been 84 years…', who: 'Old Rose', note: { tr: '“It has been” — geçmişten bugüne uzanan süre.', en: '“It has been” — time stretching from the past to now.' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I have seen him yesterday.', right: 'I saw him yesterday.', why: { tr: 'Geçmiş zaman belirteci (yesterday, ago, last week) varsa Past Simple kullanılır.', en: 'With a finished time (yesterday, ago), use Past Simple.' } },
        { wrong: 'I live here since 2020.', right: 'I have lived here since 2020.', why: { tr: '“since” ile hâlâ süren durum → Present Perfect.', en: '“since” + ongoing situation → Present Perfect.' } },
        { wrong: 'She has went home.', right: 'She has gone home.', why: { tr: 'have/has’ten sonra V3 gelir: go → went → gone.', en: 'Use V3 after have/has: go → went → gone.' } },
      ],
    },
  ],
  quiz: [
    { question: 'I ___ this movie three times.', options: ['have seen', 'have saw', 'seen'], answer: 0 },
    { question: 'She has lived here ___ 2019.', options: ['for', 'since', 'ago'], answer: 1 },
    { question: '___ you ever been to Paris?', options: ['Did', 'Has', 'Have'], answer: 2 },
    { question: 'We ___ to the beach last summer.', options: ['have gone', 'went', 'have went'], answer: 1, explain: { tr: '“last summer” bitmiş bir zaman → Past Simple.', en: '“last summer” is finished time → Past Simple.' } },
  ],
}

const presentPerfectContinuous: Lesson = {
  id: 'present-perfect-continuous',
  level: 'B1',
  title: 'Present Perfect Continuous',
  subtitle: { tr: 'Geçmişte başlayıp kesintisiz süren eylemler', en: 'How long have you been doing it?' },
  sections: [
    { kind: 'tip', text: { tr: 'Bu zaman SÜREYE odaklanır: “Ne kadar zamandır yapıyorsun?” Eylem hâlâ sürüyor olabilir ya da az önce bitmiş ve izleri görünüyor olabilir.', en: 'This tense focuses on DURATION: “How long have you been doing it?” The action may still be going on, or just stopped with visible results.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Olumlu', en: 'Positive' }, formula: 'Subject + have / has been + V-ing', example: 'I have been learning English for two years.' },
        { label: { tr: 'Olumsuz', en: 'Negative' }, formula: 'Subject + haven’t / hasn’t been + V-ing', example: 'She hasn’t been sleeping well.' },
        { label: { tr: 'Soru', en: 'Question' }, formula: 'Have / Has + subject + been + V-ing?', example: 'How long have you been waiting?' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Şu ana kadar süren eylemin süresi', en: 'Duration of an action up to now' }, example: 'They have been discussing this controversial topic for hours.' },
        { text: { tr: 'Az önce bitmiş, sonucu görünen eylemler', en: 'Recent actions with visible results' }, example: 'Your eyes are red — have you been crying?' },
        { text: { tr: 'Son zamanlarda tekrarlanan eylemler', en: 'Repeated actions recently' }, example: 'I’ve been going to the gym a lot lately.' },
      ],
    },
    { kind: 'signals', words: ['for', 'since', 'how long', 'all day', 'lately', 'recently'] },
    { kind: 'tip', text: { tr: 'Present Perfect sonucu (“3 kitap okudum”), Present Perfect Continuous süreci (“bütün gün kitap okuyorum”) vurgular.', en: 'Present Perfect = result (“I’ve read 3 books”); Perfect Continuous = process (“I’ve been reading all day”).' } },
    {
      kind: 'examples',
      items: [
        { en: 'We have been working with this client since March.', tr: 'Mart’tan beri bu müşteriyle çalışıyoruz.' },
        { en: 'I’m starving — I’ve been studying all day!', tr: 'Açlıktan ölüyorum — bütün gün ders çalışıyorum!' },
        { en: 'He has been dodging my calls for a week.', tr: 'Bir haftadır telefonlarımdan kaçıyor.' },
        { en: 'How long have you been singing in the choir?', tr: 'Ne zamandır koroda şarkı söylüyorsun?' },
      ],
    },
    { kind: 'daily', text: { tr: 'Arkadaş sohbetlerinde sıkça:', en: 'Common in everyday chats:' }, items: ['I’ve been waiting for ages!', 'What have you been up to?', 'I’ve been meaning to call you.', 'It’s been raining all week.'] },
    {
      kind: 'media',
      items: [{ title: 'Star Wars: A New Hope (1977)', line: 'I’ve been waiting for you, Obi-Wan.', who: 'Darth Vader', note: { tr: 'Geçmişte başlayan ve o ana kadar süren bekleyiş.', en: 'Waiting that started in the past and continued up to that moment.' } }],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I am waiting here for an hour.', right: 'I have been waiting here for an hour.', why: { tr: 'Süre (for an hour) + hâlâ süren eylem → Present Perfect Continuous.', en: 'Duration + ongoing action → Present Perfect Continuous.' } },
        { wrong: 'I have been knowing her for years.', right: 'I have known her for years.', why: { tr: 'Durum fiilleri (know, like, own) continuous olmaz.', en: 'State verbs don’t take the continuous form.' } },
      ],
    },
  ],
  quiz: [
    { question: 'She ___ for three hours.', options: ['has been studying', 'is studying', 'studies'], answer: 0 },
    { question: 'How long ___ you been living here?', options: ['are', 'have', 'did'], answer: 1 },
    { question: 'I ___ him since we were kids.', options: ['have been knowing', 'have known', 'know'], answer: 1 },
    { question: 'Your hands are dirty. ___ in the garden?', options: ['Have you been working', 'Did you work', 'Are you work'], answer: 0 },
  ],
}

const pastSimple: Lesson = {
  id: 'past-simple',
  level: 'A2',
  title: 'Past Simple',
  subtitle: { tr: 'Geçmiş zaman — bitmiş olaylar', en: 'Finished actions in the past' },
  sections: [
    { kind: 'tip', text: { tr: 'Past Simple bir fotoğraf karesidir: geçmişte belli bir zamanda oldu ve bitti.', en: 'Past Simple is a snapshot: it happened at a specific time in the past and it’s over.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Olumlu', en: 'Positive' }, formula: 'Subject + V2 (worked / went)', example: 'I visited my grandma last weekend.' },
        { label: { tr: 'Olumsuz', en: 'Negative' }, formula: 'Subject + didn’t + V1', example: 'We didn’t go out yesterday.' },
        { label: { tr: 'Soru', en: 'Question' }, formula: 'Did + subject + V1?', example: 'Did you sleep well?' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Geçmişte belirli bir zamanda tamamlanmış eylemler', en: 'Completed actions at a specific past time' }, example: 'The former manager signed the replacement agreement yesterday.' },
        { text: { tr: 'Art arda olan geçmiş olaylar (hikâye anlatımı)', en: 'A sequence of past events (storytelling)' }, example: 'I woke up, took a shower and left.' },
        { text: { tr: 'Geçmişteki alışkanlıklar ve durumlar', en: 'Past habits and states' }, example: 'She lived in Berlin when she was a child.' },
      ],
    },
    { kind: 'signals', words: ['yesterday', 'ago', 'last week', 'last year', 'in 2020', 'when I was…', 'then'] },
    { kind: 'tip', text: { tr: 'Düzenli fiiller -ed alır (work → worked). Düzensizleri ezberlemek gerekir: go → went, see → saw, get → got, buy → bought.', en: 'Regular verbs add -ed. Irregular ones must be learned: go → went, see → saw, get → got.' } },
    {
      kind: 'examples',
      items: [
        { en: 'The magician’s coin vanished in a second.', tr: 'Sihirbazın parası bir saniyede kayboldu.' },
        { en: 'The reporter revealed the truth last year.', tr: 'Muhabir geçen yıl gerçeği ortaya çıkardı.' },
        { en: 'I got a new job two weeks ago.', tr: 'İki hafta önce yeni bir iş buldum.' },
        { en: 'Did they promote her last month?', tr: 'Geçen ay onu terfi ettirdiler mi?' },
      ],
    },
    { kind: 'daily', text: { tr: 'Hafta sonunu ve dünü anlatırken:', en: 'Talking about your weekend:' }, items: ['How was your weekend?', 'I didn’t do much, just relaxed.', 'What did you do last night?', 'I bumped into an old friend.'] },
    {
      kind: 'media',
      items: [
        { title: 'Forrest Gump (1994)', line: 'My mama always said life was like a box of chocolates.', who: 'Forrest Gump', note: { tr: '“said” ve “was” — geçmişte söylenmiş bir söz.', en: '“said” and “was” — something said in the past.' } },
        { title: 'Friends', line: 'We were on a break!', who: 'Ross Geller', note: { tr: '“to be” fiilinin geçmiş hali: was / were.', en: 'Past of “to be”: was / were.' } },
        { title: 'Julius Caesar (47 BC)', line: 'I came, I saw, I conquered.', who: 'Veni, vidi, vici', note: { tr: 'Art arda üç düzensiz fiil: come → came, see → saw.', en: 'Three past verbs in a row: come → came, see → saw.' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I didn’t went to school.', right: 'I didn’t go to school.', why: { tr: '“didn’t”tan sonra fiil yalın (V1) kalır.', en: 'After “didn’t”, use V1.' } },
        { wrong: 'Did you saw the match?', right: 'Did you see the match?', why: { tr: 'Soruda “did” geçmişi taşır, fiil V1.', en: '“did” carries the past; the verb is V1.' } },
        { wrong: 'I buyed a new phone.', right: 'I bought a new phone.', why: { tr: '“buy” düzensizdir: buy → bought.', en: '“buy” is irregular.' } },
      ],
    },
  ],
  quiz: [
    { question: 'We ___ a great movie last night.', options: ['watch', 'watched', 'have watched'], answer: 1 },
    { question: 'She ___ to the party yesterday.', options: ['didn’t come', 'didn’t came', 'not came'], answer: 0 },
    { question: '___ you finish the report?', options: ['Do', 'Did', 'Were'], answer: 1 },
    { question: 'I ___ him two days ago.', options: ['have seen', 'saw', 'seen'], answer: 1 },
  ],
}

const pastContinuous: Lesson = {
  id: 'past-continuous',
  level: 'A2',
  title: 'Past Continuous',
  subtitle: { tr: 'Geçmişte devam etmekte olan eylemler', en: 'What was happening at a moment in the past' },
  sections: [
    { kind: 'tip', text: { tr: 'Past Continuous bir filmin arka planıdır: “Ben yürüyordum…” — sonra Past Simple ile olay gelir: “…telefon çaldı.”', en: 'Past Continuous is the background of a story: “I was walking…” — then Past Simple brings the event: “…my phone rang.”' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Olumlu', en: 'Positive' }, formula: 'Subject + was / were + V-ing', example: 'I was reading when you called.' },
        { label: { tr: 'Olumsuz', en: 'Negative' }, formula: 'Subject + wasn’t / weren’t + V-ing', example: 'They weren’t listening.' },
        { label: { tr: 'Soru', en: 'Question' }, formula: 'Was / Were + subject + V-ing?', example: 'What were you doing at 8 p.m.?' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Geçmişte belirli bir anda süren eylem', en: 'An action in progress at a past moment' }, example: 'At 10 o’clock last night, I was sleeping.' },
        { text: { tr: 'Başka bir olayla kesilen eylem (when)', en: 'An action interrupted by another (when)' }, example: 'The choir was singing when the audience entered the hall.' },
        { text: { tr: 'Aynı anda süren iki eylem (while)', en: 'Two actions at the same time (while)' }, example: 'While I was cooking, he was setting the table.' },
      ],
    },
    { kind: 'signals', words: ['while', 'when', 'at 8 p.m. yesterday', 'all evening', 'at that moment'] },
    { kind: 'tip', text: { tr: 'Kalıp: Uzun eylem (Past Continuous) + when + kısa eylem (Past Simple).', en: 'Pattern: long action (Past Continuous) + when + short action (Past Simple).' } },
    {
      kind: 'examples',
      items: [
        { en: 'I was pushing the door when it suddenly opened.', tr: 'Kapıyı itiyordum ki birden açıldı.' },
        { en: 'The reporter was asking questions while the pioneer was smiling.', tr: 'Öncü gülümserken muhabir sorular soruyordu.' },
        { en: 'What were you doing when the lights went out?', tr: 'Işıklar gittiğinde ne yapıyordun?' },
        { en: 'We weren’t paying attention, so we missed the data.', tr: 'Dikkat etmiyorduk, bu yüzden veriyi kaçırdık.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Hikâye ve bahane anlatırken:', en: 'For stories and excuses:' }, items: ['Sorry, I was driving and couldn’t answer.', 'I was just about to call you!', 'I was thinking… what if we order pizza?', 'Were you sleeping? Sorry!'] },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'When he called, I cooked dinner.', right: 'When he called, I was cooking dinner.', why: { tr: 'Arama geldiğinde yemek yapma süreci devam ediyordu.', en: 'The cooking was already in progress.' } },
        { wrong: 'They was playing football.', right: 'They were playing football.', why: { tr: 'I/He/She/It → was; You/We/They → were.', en: 'I/he/she/it → was; you/we/they → were.' } },
      ],
    },
  ],
  quiz: [
    { question: 'I ___ TV when the phone rang.', options: ['watched', 'was watching', 'were watching'], answer: 1 },
    { question: 'While she ___, he was cleaning.', options: ['was cooking', 'cooked', 'cooks'], answer: 0 },
    { question: 'What ___ you doing at 9 last night?', options: ['was', 'did', 'were'], answer: 2 },
    { question: 'The lights went out while we ___ dinner.', options: ['had', 'were having', 'have'], answer: 1 },
  ],
}

const pastPerfect: Lesson = {
  id: 'past-perfect',
  level: 'B1',
  title: 'Past Perfect',
  subtitle: { tr: 'Geçmişin geçmişi', en: 'The past before the past' },
  sections: [
    { kind: 'tip', text: { tr: 'Geçmişte iki olay var. Hangisi DAHA ÖNCE olduysa ona Past Perfect, sonrakine Past Simple kullanırsın.', en: 'Two past events: the EARLIER one takes Past Perfect, the later one Past Simple.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Olumlu', en: 'Positive' }, formula: 'Subject + had + V3', example: 'The movie had started when we arrived.' },
        { label: { tr: 'Olumsuz', en: 'Negative' }, formula: 'Subject + hadn’t + V3', example: 'I hadn’t met him before the party.' },
        { label: { tr: 'Soru', en: 'Question' }, formula: 'Had + subject + V3?', example: 'Had you ever flown before that trip?' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Geçmişteki bir olaydan daha önce olanlar', en: 'Something that happened before another past event' }, example: 'The fog had vanished before the clients arrived at the office.' },
        { text: { tr: 'Geçmişteki bir ana kadarki deneyim', en: 'Experience up to a past moment' }, example: 'I had never seen snow until I moved to Erzurum.' },
        { text: { tr: 'Pişmanlık ve dolaylı anlatım', en: 'Regrets and reported speech' }, example: 'She said she had lost her keys.' },
      ],
    },
    { kind: 'signals', words: ['before', 'after', 'by the time', 'already', 'never… before', 'until then'] },
    {
      kind: 'examples',
      items: [
        { en: 'By the time I got there, the data had disappeared.', tr: 'Oraya vardığımda veri çoktan kaybolmuştu.' },
        { en: 'She had already promoted him before the meeting.', tr: 'Toplantıdan önce onu çoktan terfi ettirmişti.' },
        { en: 'I was starving because I hadn’t eaten all day.', tr: 'Bütün gün yemek yemediğim için açlıktan ölüyordum.' },
        { en: 'Had they considered the cost before they started?', tr: 'Başlamadan önce maliyeti düşünmüşler miydi?' },
      ],
    },
    { kind: 'daily', text: { tr: 'Hikâyede “zaten olmuştu” demek için:', en: 'To say “it had already happened”:' }, items: ['When I got to the station, the train had already left.', 'I realized I had forgotten my wallet.', 'It was the best meal I had ever had.'] },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'When I arrived, she left. (önce gitmişti demek istiyorsan)', right: 'When I arrived, she had left.', why: { tr: 'Gitme, varmadan ÖNCE oldu → Past Perfect.', en: 'Leaving happened BEFORE arriving.' } },
        { wrong: 'I had saw it before.', right: 'I had seen it before.', why: { tr: '“had”den sonra V3: see → saw → seen.', en: 'Use V3 after “had”.' } },
      ],
    },
  ],
  quiz: [
    { question: 'When we got home, someone ___ the window.', options: ['broke', 'had broken', 'has broken'], answer: 1 },
    { question: 'I ___ never ___ a koala before I went to Australia.', options: ['have / seen', 'had / saw', 'had / seen'], answer: 2 },
    { question: 'By the time she called, I ___ to bed.', options: ['had gone', 'go', 'have gone'], answer: 0 },
    { question: 'He was tired because he ___ well.', options: ['didn’t sleep', 'hadn’t slept', 'hasn’t slept'], answer: 1 },
  ],
}

const pastPerfectContinuous: Lesson = {
  id: 'past-perfect-continuous',
  level: 'B2',
  title: 'Past Perfect Continuous',
  subtitle: { tr: 'Geçmişteki bir ana kadar süren eylemler', en: 'How long something had been going on' },
  sections: [
    { kind: 'tip', text: { tr: 'Present Perfect Continuous’ın geçmişe kaydırılmış hali: “O ana kadar ne kadar süredir yapıyordu?”', en: 'Present Perfect Continuous moved into the past: “How long had it been going on until then?”' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Olumlu', en: 'Positive' }, formula: 'Subject + had been + V-ing', example: 'I had been waiting for an hour when he arrived.' },
        { label: { tr: 'Olumsuz', en: 'Negative' }, formula: 'Subject + hadn’t been + V-ing', example: 'She hadn’t been feeling well.' },
        { label: { tr: 'Soru', en: 'Question' }, formula: 'Had + subject + been + V-ing?', example: 'How long had you been living there?' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Geçmişteki bir noktaya kadar süren eylemin süresi', en: 'Duration of an action up to a past point' }, example: 'He had been pushing the cart for a mile before it broke.' },
        { text: { tr: 'Geçmişteki bir durumun nedeni', en: 'The cause of a past situation' }, example: 'Her eyes were red because she had been crying.' },
      ],
    },
    { kind: 'signals', words: ['for', 'since', 'how long', 'before', 'when', 'all day'] },
    {
      kind: 'examples',
      items: [
        { en: 'They had been discussing the controversial plan for weeks before they agreed.', tr: 'Anlaşmadan önce tartışmalı planı haftalardır tartışıyorlardı.' },
        { en: 'I was exhausted because I had been studying ratios all night.', tr: 'Bütün gece oranlar üzerine çalıştığım için bitkindim.' },
        { en: 'The reporter had been following the story since 2019.', tr: 'Muhabir 2019’dan beri haberin peşindeydi.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Daha çok hikâye ve açıklamalarda:', en: 'Mostly in stories and explanations:' }, items: ['We had been driving for hours when we finally saw the sea.', 'I’d been meaning to tell you…', 'The ground was wet — it had been raining.'] },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I was waiting for two hours when she came.', right: 'I had been waiting for two hours when she came.', why: { tr: 'O ana kadarki SÜRE vurgulanıyor.', en: 'The duration up to that moment is emphasized.' } },
        { wrong: 'He had been owning the car for years.', right: 'He had owned the car for years.', why: { tr: '“own” durum fiilidir.', en: '“own” is a state verb.' } },
      ],
    },
  ],
  quiz: [
    { question: 'She was tired because she ___ all day.', options: ['had been working', 'has been working', 'is working'], answer: 0 },
    { question: 'How long ___ they been waiting before the doors opened?', options: ['have', 'had', 'were'], answer: 1 },
    { question: 'The streets were wet. It ___.', options: ['had been raining', 'has rained', 'rains'], answer: 0 },
  ],
}

const futureSimple: Lesson = {
  id: 'future-simple',
  level: 'A2',
  title: 'Future Simple (will / be going to)',
  subtitle: { tr: 'Gelecek zaman — kararlar, tahminler, planlar', en: 'Decisions, predictions and plans' },
  sections: [
    { kind: 'tip', text: { tr: '“will” = o an verilen karar veya tahmin. “be going to” = önceden yapılmış plan ya da kanıta dayalı tahmin.', en: '“will” = instant decision or prediction. “be going to” = a plan made before, or a prediction with evidence.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'will', en: 'will' }, formula: 'Subject + will + V1\nwon’t + V1 / Will + subject + V1?', example: 'I’ll help you with that.' },
        { label: { tr: 'be going to', en: 'be going to' }, formula: 'Subject + am / is / are going to + V1', example: 'We’re going to visit Rome in June.' },
        { label: { tr: 'Soru', en: 'Question' }, formula: 'Will you…? / Are you going to…?', example: 'Are you going to tell her?' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Anlık kararlar (will)', en: 'Instant decisions (will)' }, example: 'It’s cold. I’ll close the window.' },
        { text: { tr: 'Görüş/tahmin (will)', en: 'Opinions and predictions (will)' }, example: 'The new system will reduce costs and make the workflow efficient.' },
        { text: { tr: 'Söz, teklif, rica (will)', en: 'Promises, offers, requests (will)' }, example: 'I won’t tell anyone, I promise.' },
        { text: { tr: 'Önceden yapılmış planlar (going to)', en: 'Plans made before (going to)' }, example: 'I’m going to start a new course next month.' },
        { text: { tr: 'Kanıta dayalı tahmin (going to)', en: 'Predictions with evidence (going to)' }, example: 'Look at those clouds — it’s going to rain.' },
      ],
    },
    { kind: 'signals', words: ['tomorrow', 'next week', 'soon', 'in 2030', 'I think…', 'probably', 'tonight'] },
    {
      kind: 'examples',
      items: [
        { en: 'Don’t worry, I’ll find a replacement.', tr: 'Merak etme, yerine birini bulurum.' },
        { en: 'They’re going to promote her next year.', tr: 'Onu gelecek yıl terfi ettirecekler.' },
        { en: 'I think the results will reveal a lot.', tr: 'Bence sonuçlar çok şey ortaya çıkaracak.' },
        { en: 'He’s not going to dodge this question again.', tr: 'Bu soruyu bir daha geçiştirmeyecek.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Sokakta “going to” çoğu zaman “gonna” diye söylenir:', en: 'In speech “going to” often becomes “gonna”:' }, items: ['I’m gonna grab a coffee.', 'I’ll call you later!', 'Will you marry me?', 'It’s gonna be fine.'] },
    {
      kind: 'media',
      items: [
        { title: 'The Terminator (1984)', line: 'I’ll be back.', who: 'The Terminator', note: { tr: '“will” — söz / niyet.', en: '“will” — a promise / intention.' } },
        { title: 'The Godfather (1972)', line: 'I’m gonna make him an offer he can’t refuse.', who: 'Vito Corleone', note: { tr: '“gonna” = going to — önceden düşünülmüş plan.', en: '“gonna” = going to — a plan.' } },
        { title: 'Jaws (1975)', line: 'You’re gonna need a bigger boat.', who: 'Chief Brody', note: { tr: 'Kanıta dayalı tahmin: köpekbalığını az önce gördü!', en: 'Prediction based on evidence: he just saw the shark!' } },
        { title: 'When Harry Met Sally… (1989)', line: 'I’ll have what she’s having.', who: 'Customer at Katz’s Deli', note: { tr: 'Sipariş verirken anlık karar: “I’ll have…”', en: 'Instant decision when ordering: “I’ll have…”' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I will to call you.', right: 'I will call you.', why: { tr: '“will”den sonra “to” gelmez.', en: 'No “to” after “will”.' } },
        { wrong: 'Look at the sky! It will rain.', right: 'Look at the sky! It’s going to rain.', why: { tr: 'Görünen bir kanıt varsa “going to”.', en: 'Visible evidence → “going to”.' } },
        { wrong: 'I going to study tonight.', right: 'I am going to study tonight.', why: { tr: '“am / is / are” unutulmamalı.', en: 'Don’t forget am / is / are.' } },
      ],
    },
  ],
  quiz: [
    { question: 'The phone is ringing. — I ___ get it!', options: ['’m going to', '’ll', 'am'], answer: 1, explain: { tr: 'O an verilen karar → will.', en: 'Instant decision → will.' } },
    { question: 'We ___ visit Japan next summer. We booked the tickets.', options: ['will', 'are going to', 'going to'], answer: 1 },
    { question: 'I think it ___ be a great year.', options: ['will', 'is going', 'goes'], answer: 0 },
    { question: 'Careful! You ___ fall!', options: ['will to', 'are going to', 'going'], answer: 1 },
  ],
}

const futureContinuous: Lesson = {
  id: 'future-continuous',
  level: 'B2',
  title: 'Future Continuous',
  subtitle: { tr: 'Gelecekte belli bir anda sürüyor olacak eylemler', en: 'What will be happening at a future moment' },
  sections: [
    { kind: 'tip', text: { tr: 'Geleceğe bir fotoğraf makinesi tut: “Yarın bu saatte uçakta uçuyor olacağım.”', en: 'Point a camera at the future: “This time tomorrow I’ll be flying.”' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Olumlu', en: 'Positive' }, formula: 'Subject + will be + V-ing', example: 'I will be working at 9 tomorrow.' },
        { label: { tr: 'Olumsuz', en: 'Negative' }, formula: 'Subject + won’t be + V-ing', example: 'She won’t be using the car tonight.' },
        { label: { tr: 'Soru', en: 'Question' }, formula: 'Will + subject + be + V-ing?', example: 'Will you be coming to the meeting?' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Gelecekte belirli bir anda sürecek eylem', en: 'An action in progress at a future time' }, example: 'This time tomorrow, we will be testing our team’s capabilities.' },
        { text: { tr: 'Kibar soru (planını sormak)', en: 'Polite questions about plans' }, example: 'Will you be using the laptop later?' },
        { text: { tr: 'Normal akışta zaten olacak şeyler', en: 'Things that will happen as a matter of course' }, example: 'I’ll be seeing her at work anyway.' },
      ],
    },
    { kind: 'signals', words: ['this time tomorrow', 'at 5 p.m. tomorrow', 'next week at this time', 'all day tomorrow'] },
    {
      kind: 'examples',
      items: [
        { en: 'At noon tomorrow, the reporter will be interviewing the pioneer.', tr: 'Yarın öğlen muhabir öncüyle röportaj yapıyor olacak.' },
        { en: 'Don’t call at 8 — I’ll be singing with the choir.', tr: '8’de arama — koroyla şarkı söylüyor olacağım.' },
        { en: 'Will you be considering other clients?', tr: 'Başka müşterileri de değerlendiriyor olacak mısınız?' },
      ],
    },
    { kind: 'daily', text: { tr: 'Plan konuşurken kibar ve doğal duyulur:', en: 'Sounds polite and natural for plans:' }, items: ['I’ll be waiting for you outside.', 'Will you be staying for dinner?', 'Don’t worry, I’ll be thinking of you!'] },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'Tomorrow at 10 I will work.', right: 'Tomorrow at 10 I will be working.', why: { tr: 'O anda SÜRÜYOR olacak eylem → will be + V-ing.', en: 'In progress at that time → will be + V-ing.' } },
        { wrong: 'I will be know the answer.', right: 'I will know the answer.', why: { tr: 'Durum fiilleri continuous olmaz.', en: 'State verbs aren’t used in continuous.' } },
      ],
    },
  ],
  quiz: [
    { question: 'This time next week, I ___ on a beach.', options: ['will lie', 'will be lying', 'lie'], answer: 1 },
    { question: '___ you be using the car tonight?', options: ['Are', 'Will', 'Do'], answer: 1 },
    { question: 'At 7 tomorrow she ___ dinner.', options: ['will be cooking', 'will cooking', 'is cook'], answer: 0 },
  ],
}

const futurePerfect: Lesson = {
  id: 'future-perfect',
  level: 'B2',
  title: 'Future Perfect',
  subtitle: { tr: 'Gelecekte bir andan önce tamamlanmış olacak eylemler', en: 'What will be finished by a future time' },
  sections: [
    { kind: 'tip', text: { tr: 'Geleceğe gidip geriye bak: “2027’ye kadar diplomamı almış olacağım.”', en: 'Travel to the future and look back: “By 2027, I will have got my degree.”' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Olumlu', en: 'Positive' }, formula: 'Subject + will have + V3', example: 'I will have finished by 6.' },
        { label: { tr: 'Olumsuz', en: 'Negative' }, formula: 'Subject + won’t have + V3', example: 'They won’t have arrived by then.' },
        { label: { tr: 'Soru', en: 'Question' }, formula: 'Will + subject + have + V3?', example: 'Will you have read it by Monday?' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Gelecekte bir tarihten önce bitmiş olacak eylem', en: 'Something completed before a future time' }, example: 'By 2027, she will have completed her baccalaureate degree.' },
        { text: { tr: 'Gelecekteki bir ana kadarki toplam', en: 'Totals up to a future point' }, example: 'By the end of the year, I will have learned 1,000 words.' },
      ],
    },
    { kind: 'signals', words: ['by tomorrow', 'by 2030', 'by the time', 'by then', 'before', 'in two years’ time'] },
    {
      kind: 'examples',
      items: [
        { en: 'By next month, the old system will have vanished completely.', tr: 'Gelecek aya kadar eski sistem tamamen ortadan kalkmış olacak.' },
        { en: 'By the time you arrive, we will have solved the inequality.', tr: 'Sen gelene kadar eşitsizliği çözmüş olacağız.' },
        { en: 'Will they have found a replacement by Friday?', tr: 'Cumaya kadar yerine birini bulmuş olacaklar mı?' },
      ],
    },
    { kind: 'daily', text: { tr: 'Hedeflerden bahsederken çok işe yarar:', en: 'Great for talking about goals:' }, items: ['By the end of this year, I’ll have saved enough money.', 'Don’t worry, I’ll have finished it by tonight.', 'In June, we’ll have been married for five years. (bkz. Future Perfect Continuous)'] },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'By 2030 I will finish university.', right: 'By 2030 I will have finished university.', why: { tr: '“by + gelecek zaman” → o tarihe kadar bitmiş olacak.', en: '“by + future time” → completed before then.' } },
        { wrong: 'I will have went.', right: 'I will have gone.', why: { tr: '“have”den sonra V3.', en: 'Use V3 after “have”.' } },
      ],
    },
  ],
  quiz: [
    { question: 'By 10 p.m., I ___ my homework.', options: ['will finish', 'will have finished', 'finished'], answer: 1 },
    { question: 'They ___ by the time we get there.', options: ['will have left', 'will leave', 'have left'], answer: 0 },
    { question: '___ you have finished the book by Sunday?', options: ['Do', 'Will', 'Have'], answer: 1 },
  ],
}

const futurePerfectContinuous: Lesson = {
  id: 'future-perfect-continuous',
  level: 'B2',
  title: 'Future Perfect Continuous',
  subtitle: { tr: 'Gelecekteki bir ana gelindiğinde ne kadar süredir yapılıyor olacağı', en: 'How long something will have been going on' },
  sections: [
    { kind: 'tip', text: { tr: 'En uzun isimli zaman ama mantığı basit: “Haziranda, 3 yıldır İngilizce çalışıyor olacağım.” SÜRE + GELECEK.', en: 'The longest name, simple idea: “In June, I’ll have been studying English for 3 years.” DURATION + FUTURE.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Olumlu', en: 'Positive' }, formula: 'Subject + will have been + V-ing', example: 'By June, I will have been working here for a year.' },
        { label: { tr: 'Olumsuz', en: 'Negative' }, formula: 'Subject + won’t have been + V-ing', example: 'She won’t have been waiting long.' },
        { label: { tr: 'Soru', en: 'Question' }, formula: 'Will + subject + have been + V-ing?', example: 'How long will you have been living here?' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Gelecekteki bir noktaya kadar süreyi vurgulama', en: 'Emphasizing duration up to a future point' }, example: 'Next month, they will have been working with this client for two years.' },
        { text: { tr: 'Gelecekteki bir durumun nedeni', en: 'The cause of a future situation' }, example: 'You’ll be tired because you’ll have been driving all day.' },
      ],
    },
    { kind: 'signals', words: ['for + süre', 'by + zaman', 'by the time', 'next month', 'in 2030'] },
    {
      kind: 'examples',
      items: [
        { en: 'In September, she will have been singing in the choir for ten years.', tr: 'Eylülde, on yıldır koroda şarkı söylüyor olacak.' },
        { en: 'By the time the report comes out, the reporter will have been investigating for months.', tr: 'Rapor çıktığında, muhabir aylardır araştırıyor olacak.' },
        { en: 'At 6, we will have been discussing these terms for three hours.', tr: 'Saat 6’da, bu şartları üç saattir tartışıyor olacağız.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Günlük konuşmada nadirdir; daha çok yıl dönümleri ve süreler için:', en: 'Rare in casual speech; used for anniversaries and durations:' }, items: ['Next year we’ll have been friends for ten years!', 'By the time you land, I’ll have been waiting for hours.'] },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'Next year I will work here for 5 years.', right: 'Next year I will have been working here for 5 years.', why: { tr: 'Gelecekteki bir ana kadarki SÜRE → will have been + V-ing.', en: 'Duration up to a future point → will have been + V-ing.' } },
      ],
    },
  ],
  quiz: [
    { question: 'By 2030, I ___ English for ten years.', options: ['will learn', 'will have been learning', 'am learning'], answer: 1 },
    { question: 'At 5, she ___ for eight hours.', options: ['will have been working', 'will working', 'has worked'], answer: 0 },
  ],
}

const overview: Lesson = {
  id: 'tenses-overview',
  level: 'A1',
  title: '12 Tenses — Overview',
  subtitle: { tr: 'Tüm zamanlar tek tabloda', en: 'All tenses on one page' },
  sections: [
    { kind: 'tip', text: { tr: 'İngilizcede 3 zaman (Present, Past, Future) × 4 görünüş (Simple, Continuous, Perfect, Perfect Continuous) = 12 zaman. Bir kutuya dokunarak dersine git!', en: '3 times (Present, Past, Future) × 4 aspects (Simple, Continuous, Perfect, Perfect Continuous) = 12 tenses. Tap a box to open its lesson!' } },
    {
      kind: 'overview',
      columns: ['Simple', 'Continuous', 'Perfect', 'Perfect Continuous'],
      rows: [
        {
          label: { tr: 'Present (Şimdi / Geniş)', en: 'Present' },
          cells: [
            { id: 'present-simple', formula: 'V1 / V1+s', example: 'I work' },
            { id: 'present-continuous', formula: 'am/is/are + V-ing', example: 'I am working' },
            { id: 'present-perfect', formula: 'have/has + V3', example: 'I have worked' },
            { id: 'present-perfect-continuous', formula: 'have/has been + V-ing', example: 'I have been working' },
          ],
        },
        {
          label: { tr: 'Past (Geçmiş)', en: 'Past' },
          cells: [
            { id: 'past-simple', formula: 'V2', example: 'I worked' },
            { id: 'past-continuous', formula: 'was/were + V-ing', example: 'I was working' },
            { id: 'past-perfect', formula: 'had + V3', example: 'I had worked' },
            { id: 'past-perfect-continuous', formula: 'had been + V-ing', example: 'I had been working' },
          ],
        },
        {
          label: { tr: 'Future (Gelecek)', en: 'Future' },
          cells: [
            { id: 'future-simple', formula: 'will + V1', example: 'I will work' },
            { id: 'future-continuous', formula: 'will be + V-ing', example: 'I will be working' },
            { id: 'future-perfect', formula: 'will have + V3', example: 'I will have worked' },
            { id: 'future-perfect-continuous', formula: 'will have been + V-ing', example: 'I will have been working' },
          ],
        },
      ],
    },
    { kind: 'tip', text: { tr: 'Sinyal kelimeler ipucu verir: always → Present Simple · yesterday, ago → Past Simple · just, already, yet, since, for → Present Perfect · tomorrow, next week, by the time → Future.', en: 'Signal words help: always → Present Simple · yesterday, ago → Past Simple · just, already, yet, since, for → Present Perfect · tomorrow, next week, by the time → Future.' } },
  ],
  quiz: [
    { question: 'I ___ here since 2020.', options: ['live', 'have lived', 'lived'], answer: 1 },
    { question: 'Look! It ___.', options: ['snows', 'is snowing', 'snowed'], answer: 1 },
    { question: 'She ___ her keys yesterday.', options: ['lost', 'has lost', 'had lost'], answer: 0 },
    { question: 'By 2030 we ___ a house.', options: ['will buy', 'will have bought', 'buy'], answer: 1 },
    { question: 'When I arrived, the film ___.', options: ['already started', 'had already started', 'has already started'], answer: 1 },
  ],
}

export const tenseLessons: Lesson[] = [
  overview,
  presentSimple,
  presentContinuous,
  presentPerfect,
  presentPerfectContinuous,
  pastSimple,
  pastContinuous,
  pastPerfect,
  pastPerfectContinuous,
  futureSimple,
  futureContinuous,
  futurePerfect,
  futurePerfectContinuous,
]
