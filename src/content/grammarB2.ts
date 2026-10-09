import type { Lesson } from './lessons'

// B2 grammar lessons. `media` lines are well-documented quotes only.

const thirdMixed: Lesson = {
  id: 'third-mixed-conditionals',
  level: 'B2',
  title: 'Third & Mixed Conditionals',
  subtitle: { tr: 'Geçmişe dair “keşke öyle olsaydı”', en: 'Imagining a different past' },
  sections: [
    { kind: 'tip', text: { tr: 'Third Conditional geçmişi değiştiremeyeceğimizi bildiğimiz hayallerdir: “Erken kalksaydım treni kaçırmazdım.” (Ama kalkmadım, kaçırdım.)', en: 'Third Conditional imagines a past that didn’t happen.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Third', en: 'Third' }, formula: 'If + had + V3, would have + V3', example: 'If I had left earlier, I wouldn’t have missed the train.' },
        { label: { tr: 'Mixed (geçmiş → şimdi)', en: 'Mixed (past → now)' }, formula: 'If + had + V3, would + V1', example: 'If I had studied medicine, I would be a doctor now.' },
        { label: { tr: 'Mixed (şimdi → geçmiş)', en: 'Mixed (now → past)' }, formula: 'If + Past Simple, would have + V3', example: 'If I were braver, I would have said something.' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Geçmişteki pişmanlıklar', en: 'Past regrets' }, example: 'If I’d known, I would have helped.' },
        { text: { tr: 'Geçmişteki farklı sonuçları hayal etmek', en: 'Imagining different results' }, example: 'If she hadn’t pushed the door, it wouldn’t have opened.' },
        { text: { tr: 'Geçmiş bir olayın bugüne etkisi (mixed)', en: 'Past cause → present result (mixed)' }, example: 'If I hadn’t moved here, I wouldn’t know you.' },
      ],
    },
    { kind: 'tip', text: { tr: 'Konuşmada kısaltılır: “If I’d known, I would’ve come.” (would’ve = would have — “would of” diye yazılmaz!)', en: 'Spoken: “If I’d known, I would’ve come.” Never write “would of”.' } },
    {
      kind: 'examples',
      items: [
        { en: 'If we had considered the cost, we wouldn’t have started the project.', tr: 'Maliyeti düşünseydik projeye başlamazdık.' },
        { en: 'If the data hadn’t vanished, we would have revealed the results.', tr: 'Veri kaybolmasaydı sonuçları açıklardık.' },
        { en: 'If she hadn’t been promoted, she would still be my manager.', tr: 'Terfi etmeseydi hâlâ benim müdürüm olurdu.' },
        { en: 'If he weren’t so efficient, he wouldn’t have finished on time.', tr: 'Bu kadar verimli olmasaydı zamanında bitiremezdi.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Pişmanlık ve rahatlama:', en: 'Regret and relief:' }, items: ['If I’d known you were coming, I’d have baked a cake!', 'If it hadn’t been for you, I’d have given up.', 'I wouldn’t have done that if I were you.'] },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'If I would have known…', right: 'If I had known…', why: { tr: 'If kısmında would olmaz.', en: 'No “would” in the if-clause.' } },
        { wrong: 'I would of come.', right: 'I would have (would’ve) come.', why: { tr: '“would’ve” kulağa “would of” gibi gelir ama yazımı “have”.', en: 'Sounds like “of”, written “have”.' } },
        { wrong: 'If I had studied, I would pass. (geçmiş sınav)', right: 'If I had studied, I would have passed.', why: { tr: 'Sonuç da geçmişteyse would have + V3.', en: 'Past result → would have + V3.' } },
      ],
    },
  ],
  quiz: [
    { question: 'If I ___ about the party, I would have come.', options: ['knew', 'had known', 'would know'], answer: 1 },
    { question: 'If she had taken the job, she ___ rich now.', options: ['would be', 'would have been', 'will be'], answer: 0, explain: { tr: 'Geçmiş neden → şimdiki sonuç: mixed.', en: 'Past cause → present result.' } },
    { question: 'We ___ the match if we had played better.', options: ['would win', 'would have won', 'won'], answer: 1 },
    { question: 'If he ___ so shy, he would have asked her out.', options: ['weren’t', 'hadn’t', 'wouldn’t be'], answer: 0 },
  ],
}

const wish: Lesson = {
  id: 'wish-if-only',
  level: 'B2',
  title: 'Wish / If only',
  subtitle: { tr: 'Dilekler ve pişmanlıklar', en: 'Wishes and regrets' },
  sections: [
    { kind: 'tip', text: { tr: 'Türkçedeki “keşke”. Zamanı bir adım geriye at: şimdiki dilek → geçmiş zaman, geçmiş pişmanlık → past perfect.', en: 'Like Turkish “keşke”: shift the tense one step back.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Şimdi', en: 'Present' }, formula: 'wish + Past Simple (were)', example: 'I wish I were taller. I wish I had more time.' },
        { label: { tr: 'Geçmiş', en: 'Past' }, formula: 'wish + had + V3', example: 'I wish I had studied harder.' },
        { label: { tr: 'Şikâyet', en: 'Annoyance' }, formula: 'wish + someone + would + V1', example: 'I wish you would stop talking!' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Şu anki durumdan memnuniyetsizlik', en: 'Unhappy with now' }, example: 'I wish I lived by the sea.' },
        { text: { tr: 'Geçmişteki bir şeye pişmanlık', en: 'Regret about the past' }, example: 'I wish I hadn’t said that.' },
        { text: { tr: 'Başkasının davranışından şikâyet', en: 'Complaining about others' }, example: 'I wish it would stop raining.' },
        { text: { tr: '“If only” daha güçlü, daha duygusal', en: '“If only” is stronger' }, example: 'If only I had listened to you!' },
      ],
    },
    {
      kind: 'examples',
      items: [
        { en: 'I wish the data weren’t so insufficient.', tr: 'Keşke veriler bu kadar yetersiz olmasaydı.' },
        { en: 'She wishes she had considered the drawbacks.', tr: 'Dezavantajları düşünmüş olmayı diliyor.' },
        { en: 'If only my keys hadn’t vanished!', tr: 'Keşke anahtarlarım kaybolmasaydı!' },
        { en: 'I wish you would stop dodging my calls.', tr: 'Keşke telefonlarımdan kaçmayı bıraksan.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Günlük konuşmada:', en: 'In everyday speech:' }, items: ['I wish I could, but I can’t.', 'I wish I’d known that earlier!', 'If only it were Friday…'] },
    {
      kind: 'media',
      items: [
        { title: 'The Fellowship of the Ring', line: 'I wish it need not have happened in my time.', who: 'Frodo', note: { tr: 'Geçmişe dair bir dilek; Gandalf’ın ünlü cevabından hemen önce.', en: 'A wish about the past, right before Gandalf’s famous reply.' } },
        { title: 'Brokeback Mountain (2005)', line: 'I wish I knew how to quit you.', who: 'Jack Twist', note: { tr: 'wish + Past Simple = şimdiki bir dilek.', en: 'wish + past = present wish.' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I wish I have a car.', right: 'I wish I had a car.', why: { tr: 'Şimdiki dilek → geçmiş zaman.', en: 'Present wish → past form.' } },
        { wrong: 'I wish I didn’t go.', right: 'I wish I hadn’t gone.', why: { tr: 'Geçmiş pişmanlık → had + V3.', en: 'Past regret → had + V3.' } },
        { wrong: 'I wish I would be taller.', right: 'I wish I were taller.', why: { tr: '“would” sadece başkalarının davranışı için.', en: '“would” is for other people’s behaviour.' } },
      ],
    },
  ],
  quiz: [
    { question: 'I wish I ___ speak Japanese.', options: ['can', 'could', 'will'], answer: 1 },
    { question: 'I wish I ___ that cake. I feel sick.', options: ['didn’t eat', 'hadn’t eaten', 'don’t eat'], answer: 1 },
    { question: 'I wish you ___ leave your socks everywhere!', options: ['wouldn’t', 'didn’t', 'won’t'], answer: 0 },
    { question: 'If only I ___ richer!', options: ['am', 'were', 'will be'], answer: 1 },
  ],
}

const modalPerfects: Lesson = {
  id: 'modal-perfects',
  level: 'B2',
  title: 'Modal Perfects',
  subtitle: { tr: 'should have, could have, must have…', en: 'Past possibilities, regrets and guesses' },
  sections: [
    { kind: 'tip', text: { tr: 'Modal + have + V3 = geçmişe bakarak yorum: “Söylemeliydin” (should have told), “Kaçırmış olmalı” (must have missed), “Olabilirdi” (could have been).', en: 'Modal + have + V3 = commenting on the past.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Eleştiri / pişmanlık', en: 'Criticism / regret' }, formula: 'should(n’t) have + V3', example: 'You should have told me!' },
        { label: { tr: 'Gerçekleşmemiş olasılık', en: 'Unrealised possibility' }, formula: 'could have / would have + V3', example: 'I could have won, but I fell.' },
        { label: { tr: 'Geçmiş tahmin', en: 'Past deduction' }, formula: 'must have / might have / can’t have + V3', example: 'She must have forgotten. He can’t have seen us.' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Yapılması gereken ama yapılmayan şeyler', en: 'Things that should have happened' }, example: 'We should have considered the cost.' },
        { text: { tr: 'Mümkündü ama olmadı', en: 'It was possible but didn’t happen' }, example: 'You could have hurt yourself!' },
        { text: { tr: 'Geçmiş hakkında kanıta dayalı tahmin', en: 'Guessing about the past' }, example: 'The ground is wet. It must have rained.' },
      ],
    },
    { kind: 'tip', text: { tr: 'Konuşmada: should’ve, could’ve, must’ve — kulağa “shoulda, coulda” gibi gelir.', en: 'Spoken: should’ve / shoulda, could’ve / coulda.' } },
    {
      kind: 'examples',
      items: [
        { en: 'He must have dodged the question on purpose.', tr: 'Soruyu bilerek geçiştirmiş olmalı.' },
        { en: 'The data can’t have vanished — I saved it!', tr: 'Veri kaybolmuş olamaz — kaydetmiştim!' },
        { en: 'You shouldn’t have wasted so much money.', tr: 'Bu kadar parayı boşa harcamamalıydın.' },
        { en: 'She might have been promoted — I’m not sure.', tr: 'Terfi etmiş olabilir — emin değilim.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Gündelik tepkiler:', en: 'Everyday reactions:' }, items: ['You shouldn’t have! (hediye alınca: “Zahmet etmeseydin!”)', 'I could’ve sworn I locked the door.', 'You must have been so tired!'] },
    {
      kind: 'media',
      items: [{ title: 'On the Waterfront (1954)', line: 'I coulda been a contender.', who: 'Terry Malloy (Marlon Brando)', note: { tr: '“could have been” = olabilirdim ama olamadım. Sinemanın en ünlü pişmanlıklarından.', en: '“could have been” — one of film’s most famous regrets.' } }],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'You should told me.', right: 'You should have told me.', why: { tr: '“have” unutulmamalı.', en: 'Don’t forget “have”.' } },
        { wrong: 'He must had left.', right: 'He must have left.', why: { tr: 'Modal’dan sonra her zaman “have”.', en: 'Always “have” after a modal.' } },
        { wrong: 'She mustn’t have seen me. (tahmin)', right: 'She can’t have seen me.', why: { tr: 'Olumsuz tahmin → can’t have.', en: 'Negative deduction → can’t have.' } },
      ],
    },
  ],
  quiz: [
    { question: 'I failed. I ___ studied more.', options: ['should have', 'must have', 'can’t have'], answer: 0 },
    { question: 'Her eyes are red. She ___ been crying.', options: ['must have', 'should have', 'can’t have'], answer: 0 },
    { question: 'He ___ stolen it — he was with me all day.', options: ['must have', 'can’t have', 'should have'], answer: 1 },
    { question: 'Why did you drive so fast? You ___ had an accident!', options: ['could have', 'must have', 'should have'], answer: 0 },
  ],
}

const causative: Lesson = {
  id: 'causative',
  level: 'B2',
  title: 'Causative (have / get something done)',
  subtitle: { tr: 'Bir işi başkasına yaptırmak', en: 'Getting someone to do something for you' },
  sections: [
    { kind: 'tip', text: { tr: 'Türkçedeki “-tır / -dir” eki: “Saçımı kestirdim.” = “I had my hair cut.” (Kendim kesmedim, kuaföre kestirdim.)', en: 'Like Turkish “-tır”: “I had my hair cut” = someone else cut it.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'have', en: 'have' }, formula: 'have + nesne + V3', example: 'I had my car repaired.' },
        { label: { tr: 'get (daha gündelik)', en: 'get (informal)' }, formula: 'get + nesne + V3', example: 'I need to get my phone fixed.' },
        { label: { tr: 'Kişiye yaptırmak', en: 'Making a person do it' }, formula: 'have + kişi + V1 / get + kişi + to V1', example: 'I had the mechanic check it. I got him to check it.' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Hizmet aldığımız işler', en: 'Services' }, example: 'She had her nails done.' },
        { text: { tr: 'İstemeden başımıza gelenler', en: 'Bad experiences' }, example: 'He had his wallet stolen.' },
        { text: { tr: 'Birini ikna edip yaptırmak (get … to)', en: 'Persuading someone (get … to)' }, example: 'I got my brother to help me.' },
      ],
    },
    {
      kind: 'examples',
      items: [
        { en: 'We had the old screen replaced.', tr: 'Eski ekranı değiştirttik.' },
        { en: 'She had her name inscribed on the ring.', tr: 'Adını yüzüğe kazıttı.' },
        { en: 'The company had the data checked by an expert.', tr: 'Şirket verileri bir uzmana kontrol ettirdi.' },
        { en: 'I finally got the reporter to reveal his source.', tr: 'Sonunda muhabire kaynağını açıklattım.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Gündelik hayatta:', en: 'Everyday life:' }, items: ['I’m getting my hair cut tomorrow.', 'Where can I get this printed?', 'We’re having the house painted.'] },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I cut my hair yesterday. (kuaförde)', right: 'I had my hair cut yesterday.', why: { tr: 'Kendin kesmediysen causative.', en: 'If someone else did it, use the causative.' } },
        { wrong: 'I had repaired my car. (tamirciye)', right: 'I had my car repaired.', why: { tr: 'Sıra önemli: have + NESNE + V3.', en: 'Word order: have + object + V3.' } },
        { wrong: 'I got him fix it.', right: 'I got him to fix it.', why: { tr: '“get + kişi” → to + V1.', en: '“get + person” → to + V1.' } },
      ],
    },
  ],
  quiz: [
    { question: 'I ___ my eyes tested last week.', options: ['had', 'did', 'made'], answer: 0 },
    { question: 'She is having her house ___.', options: ['paint', 'painting', 'painted'], answer: 2 },
    { question: 'I got my friend ___ me move.', options: ['help', 'to help', 'helped'], answer: 1 },
    { question: 'Which means the barber did it?', options: ['I cut my hair.', 'I had my hair cut.', 'I was cutting my hair.'], answer: 1 },
  ],
}

const inversion: Lesson = {
  id: 'inversion',
  level: 'B2',
  title: 'Inversion',
  subtitle: { tr: 'Vurgulu devrik yapı', en: 'Never have I ever…' },
  sections: [
    { kind: 'tip', text: { tr: 'Olumsuz veya kısıtlayıcı bir ifadeyle cümleye başlarsan, ardından SORU sırası gelir: “I have never seen…” → “Never have I seen…” Daha dramatik ve resmî duyulur.', en: 'Start with a negative adverb → question word order. Sounds dramatic/formal.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Olumsuz zarf', en: 'Negative adverb' }, formula: 'Never / Rarely / Seldom + aux + subject + V', example: 'Rarely do we see such talent.' },
        { label: { tr: 'Zaman ifadeleri', en: 'Time expressions' }, formula: 'No sooner had… than / Hardly had… when', example: 'No sooner had I arrived than it started to rain.' },
        { label: { tr: 'Not only', en: 'Not only' }, formula: 'Not only + aux + subject + V, but also…', example: 'Not only is it cheap, but it’s also efficient.' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Resmî yazı ve konuşmalar', en: 'Formal writing and speeches' }, example: 'Under no circumstances should you open this door.' },
        { text: { tr: 'Güçlü vurgu ve drama', en: 'Strong emphasis' }, example: 'Never have I been so embarrassed!' },
        { text: { tr: 'Koşul cümlelerinde “if” yerine', en: 'Instead of “if”' }, example: 'Had I known, I would have come. (= If I had known…)' },
      ],
    },
    {
      kind: 'examples',
      items: [
        { en: 'Seldom does a pioneer get the credit they deserve.', tr: 'Bir öncü, hak ettiği takdiri nadiren görür.' },
        { en: 'Not only did he dodge the question, but he also left the room.', tr: 'Soruyu geçiştirmekle kalmadı, odadan da çıktı.' },
        { en: 'Had we considered the drawbacks, we would have stopped.', tr: 'Dezavantajları düşünmüş olsaydık dururduk.' },
        { en: 'Only later did the data reveal the truth.', tr: 'Gerçeği veriler ancak sonra ortaya çıkardı.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Günlük dilde nadir ama şu kalıplar yaygın:', en: 'Rare in casual speech, except:' }, items: ['Never have I ever… (oyun)', 'So do I! / Neither do I!', 'Little did I know…'] },
    {
      kind: 'media',
      items: [
        { title: 'Never Have I Ever (2020)', line: 'Never Have I Ever', who: 'Netflix series title — also a party game', note: { tr: '“I have never ever…” cümlesinin devrik hali.', en: 'Inverted form of “I have never ever…”.' } },
        { title: 'The Empire Strikes Back (1980)', line: 'Size matters not.', who: 'Yoda', note: { tr: 'Dikkat: Yoda’nın konuşması gerçek inversion DEĞİL, onun tuhaf üslubu! Doğrusu: “Size doesn’t matter.”', en: 'Careful: Yoda’s word order is NOT real inversion!' } },
      ],
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'Never I have seen this.', right: 'Never have I seen this.', why: { tr: 'Olumsuz zarftan sonra yardımcı fiil önce gelir.', en: 'Auxiliary before subject.' } },
        { wrong: 'Rarely he goes out.', right: 'Rarely does he go out.', why: { tr: 'Present Simple’da “do/does” eklenir.', en: 'Add do/does in Present Simple.' } },
      ],
    },
  ],
  quiz: [
    { question: 'Never ___ such a beautiful view.', options: ['I have seen', 'have I seen', 'I saw'], answer: 1 },
    { question: 'Not only ___ late, but he also forgot the tickets.', options: ['he was', 'was he', 'did he'], answer: 1 },
    { question: '___ I known, I would have helped.', options: ['If', 'Had', 'Have'], answer: 1 },
    { question: 'Rarely ___ she complain.', options: ['does', 'is', 'has'], answer: 0 },
  ],
}

const discourse: Lesson = {
  id: 'discourse-markers',
  level: 'B2',
  title: 'Discourse Markers',
  subtitle: { tr: 'Bağlaçlar ve geçiş ifadeleri', en: 'however, moreover, having said that' },
  sections: [
    { kind: 'tip', text: { tr: 'Bu kelimeler konuşmanın trafik işaretleridir: “Dikkat, zıt fikir geliyor” (however), “Ekliyorum” (moreover), “Sonuç” (therefore). Onları kullanınca B2 gibi duyulursun.', en: 'These are the traffic signs of speech and writing.' } },
    {
      kind: 'structure',
      rows: [
        { label: { tr: 'Zıtlık', en: 'Contrast' }, formula: 'however, although, even though,\non the other hand, having said that', example: 'It’s expensive. However, it’s worth it.' },
        { label: { tr: 'Ekleme', en: 'Addition' }, formula: 'moreover, furthermore, in addition, what’s more', example: 'It’s cheap. Moreover, it’s efficient.' },
        { label: { tr: 'Sonuç / Özet', en: 'Result / Summary' }, formula: 'therefore, as a result, so, all in all, to sum up', example: 'Costs rose. As a result, prices went up.' },
      ],
    },
    {
      kind: 'when',
      items: [
        { text: { tr: 'Yazıda (resmî): however, moreover, therefore, nevertheless', en: 'Formal writing' }, example: 'The results were insufficient. Therefore, more data is needed.' },
        { text: { tr: 'Konuşmada (gündelik): anyway, actually, by the way, I mean', en: 'Casual speech' }, example: 'Anyway, what was I saying?' },
        { text: { tr: 'Fikir bildirmek: in my opinion, personally, as far as I’m concerned', en: 'Giving opinions' }, example: 'Personally, I think it’s a good idea.' },
      ],
    },
    { kind: 'tip', text: { tr: 'Noktalama: “However,” cümle başında virgülle; “although” ise iki cümleyi bağlar: “Although it rained, we went out.”', en: '“However,” starts a new sentence; “although” joins two clauses.' } },
    {
      kind: 'examples',
      items: [
        { en: 'The plan has many benefits. On the other hand, there is one big drawback.', tr: 'Planın birçok faydası var. Öte yandan, büyük bir dezavantajı var.' },
        { en: 'When it comes to data, accuracy matters. Moreover, it must be up to date.', tr: 'Veri söz konusu olduğunda doğruluk önemlidir. Üstelik güncel olmalıdır.' },
        { en: 'The topic is controversial. Having said that, we should discuss it.', tr: 'Konu tartışmalı. Yine de konuşmalıyız.' },
        { en: 'All in all, the new system is more efficient.', tr: 'Sonuç olarak yeni sistem daha verimli.' },
      ],
    },
    { kind: 'daily', text: { tr: 'Sohbette doğal duyulanlar:', en: 'Sound natural in conversation:' }, items: ['By the way, did you call her?', 'Actually, I changed my mind.', 'Anyway, let’s go!', 'To be honest, I’m not sure.'] },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'Although it was cold, but we swam.', right: 'Although it was cold, we swam.', why: { tr: '“although” ve “but” birlikte kullanılmaz.', en: 'Not “although” + “but”.' } },
        { wrong: 'However it was late we stayed.', right: 'It was late. However, we stayed.', why: { tr: '“however” iki cümleyi doğrudan bağlamaz.', en: '“however” doesn’t join two clauses.' } },
        { wrong: 'In my opinion, I think…', right: 'In my opinion, … / I think…', why: { tr: 'Aynı şeyi iki kez söylemiş olursun.', en: 'Says the same thing twice.' } },
      ],
    },
  ],
  quiz: [
    { question: 'It was raining. ___, we went for a walk.', options: ['Although', 'However', 'Because'], answer: 1 },
    { question: '___ she was tired, she finished the report.', options: ['Even though', 'Moreover', 'Therefore'], answer: 0 },
    { question: 'The hotel was cheap. ___, the staff were lovely.', options: ['However', 'What’s more', 'As a result'], answer: 1 },
    { question: 'He didn’t study. ___, he failed.', options: ['As a result', 'Although', 'Moreover'], answer: 0 },
  ],
}

export const grammarB2: Lesson[] = [thirdMixed, wish, modalPerfects, causative, inversion, discourse]
