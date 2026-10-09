# İngilizce Çalışma Sitesi — Planlama

## Context
Arkadaşın (A1→B2) İngilizce çalışıyor: kelime ezberleme, konu (gramer) öğrenme, günlük dinleme/konuşma pratiği. İstenen: linki olan herkesin açabileceği, telefon/tablet (iOS + Android) öncelikli, sade ve dikkat dağıtmayan, "tatlı" bir site. Maskot = arkadaşının çöp adam hali (logo kafası, yüklenirken yürüyen, ipucu kutularında konuşan). Çalışma klasörü boş: `C:\Users\yyild\Desktop\projeler\dilasu` — sıfırdan kurulacak.

Bu plan 3 çıktı içerir: **(1) yapı + içerik planı, (2) UI tasarım prompt'u, (3) çöp adam görsel prompt'ları, (4) ek fikirler.** Kodlamaya içerik dosyalarını birlikte hazırladıktan sonra geçilecek.

---

**Site adı: "Su"** (logo: maskot kafası + "Su" yazısı). Repo adı `su`, GitHub Pages linki `https://<kullanıcı>.github.io/su/`.

## 1. Teknik Kararlar
| Konu | Karar |
|---|---|
| Altyapı | Vite + React + TypeScript + **PWA** (ana ekrana uygulama gibi eklenir, offline çalışır) |
| Yayın | **GitHub Pages** (GitHub Actions ile her push'ta otomatik deploy). Sunucu gerekmez. |
| Kelime kaydı / senkron | **Supabase ücretsiz katman** (veritabanı + giriş). GitHub Pages'te kalırız, ayrı sunucu kiralamaya gerek yok. Telefon ↔ tablet otomatik senkron. Offline iken localStorage'a yazar, bağlanınca eşitler. Giriş yapmayan ziyaretçi "misafir modu"nda kendi cihazında kullanır. |
| Dil | Arayüz **TR/EN seçilebilir** (`i18n` JSON dosyaları), öğrenme içeriği İngilizce + Türkçe açıklama |
| Telaffuz | Tarayıcının yerleşik sesi (Web Speech `speechSynthesis`, US/UK aksan seçimi) + varsa sözlük ses dosyası |
| Kelime otomatik doldurma | Kelime yazınca **dictionaryapi.dev** (ücretsiz) → IPA okunuş, İngilizce tanım, örnek cümle, ses. Türkçe anlam kullanıcı yazar (öneri için ücretsiz çeviri API'si opsiyonel). |
| Stil | Tailwind CSS + Framer Motion (yumuşak animasyonlar), maskot SVG/PNG |

**Neden Supabase:** GitHub Pages veri yazamaz. Kendi sunucun yerine Supabase hem ücretsiz hem bakım istemez; Row Level Security ile her kullanıcı sadece kendi kelime listesini görür/değiştirir.

---

## 2. Site Haritası ve Özellikler
1. **Ana Sayfa (Bugün)** — günün özeti: tekrar edilecek kelime sayısı, günün videosu, günün konuşma konusu, köşede küçük günün sözü. (Seri/streak ve seviye testi yok.)
2. **Kelimelerim**
   - Liste (arama, etiket/seviye filtresi, "öğrendim / öğreniyorum")
   - Kelime kartı: kelime, IPA okunuş + 🔊 butonu, Türkçe anlam, İngilizce tanım, 2-3 örnek cümle, (varsa) film/dizi referansı, eş/zıt anlam
   - **+ Kelime ekle** (yazınca otomatik doldurur, düzenlenebilir)
   - **Çalış modu:** flashcard (aralıklı tekrar / Leitner kutuları), çoktan seçmeli, yazma, dinleyip yazma
3. **Konular (Gramer & Anlatım)** — A1 / A2 / B1 / B2 sekmeleri; her konu kısa kartlar halinde: *Yapı → Ne zaman? → Örnekler → Günlük hayatta → Film/dizi'de → Mini quiz*. Maskot ipucu balonlarında "anlatıyor".
4. **Sokak İngilizcesi** — yerli konuşmacılar nasıl konuşur: kısaltmalar (gonna, wanna), dolgu kelimeleri (like, you know), deyimler, phrasal verb'ler, kibar/samimi kalıplar, durum diyalogları (kafe, iş, alışveriş).
5. **Günün Videosu** — seçilen seviyeye göre TED-Ed, BBC Learning English, BBC Ideas, Vox, TED'den günlük 1 video (+ yedek 2). İzledim işareti, kısa "izledikten sonra 3 soru".
6. **Konuşma Pratiği** — seviyeye göre günlük konu + yardımcı sorular + kullanılabilecek kalıplar; zamanlayıcı (1-3-5 dk); **sesini kaydet & geri dinle**; "kendi kendine konuşma taktikleri" rehberi.
7. **Ayarlar** — seviye (A1-B2), dil (TR/EN), aksan (US/UK), karanlık mod, veri dışa/içe aktar, giriş/çıkış.
8. **Söz köşesi** — sayfa altında küçük, soluk bir kart; dokununca Türkçe çevirisi açılır.

**Mobil:** alt sekme çubuğu (Bugün · Kelimeler · Konular · Pratik · Daha), büyük dokunma alanları, iOS çentik/safe-area desteği, swipe ile flashcard çevirme, yatay kaydırma yok.

---

## 3. İçerik Planı (birlikte hazırlanacak dosyalar)
Tüm içerik `src/content/` altında JSON/Markdown olacak; kod değişmeden içerik eklenebilir.

### 3.1 Gramer — Zamanlar (her biri: yapı, ne zaman, nasıl, günlük hayattaki yeri, karşılaştırma, film örneği)
- Present: Simple, Continuous, Perfect, Perfect Continuous
- Past: Simple, Continuous, Perfect, Perfect Continuous
- Future: will, be going to, Present Continuous (plan), Future Continuous, Future Perfect, Future Perfect Continuous
- Ek: used to / would, was going to (future in the past)
- Karşılaştırma kartları: Past Simple vs Present Perfect, will vs going to, vb.

### 3.2 Seviyeye göre konu listesi (taslak)
- **A1:** to be, have got, a/an/the, çoğullar, this/that, there is/are, iyelikler, Present Simple, Present Continuous, can, sayılar/saat/tarih, sıklık zarfları, prepositions (in/on/at), basit sorular
- **A2:** Past Simple (düzenli/düzensiz), Past Continuous, going to / will, comparatives & superlatives, countable/uncountable (some/any/much/many), should/must/have to, adverbs, Present Perfect giriş, -ing vs to-infinitive giriş, First Conditional
- **B1:** Present Perfect (Continuous), Past Perfect, used to, Second Conditional, Passive (temel), Reported Speech, Relative Clauses, modals of deduction (must/might/can't), gerund vs infinitive, phrasal verbs, linking words
- **B2:** Third & Mixed Conditionals, wish / if only, ileri Passive, causative (have something done), Future Perfect/Continuous, inversion giriş, ileri reported speech, modal perfects (should have, could have), discourse markers, collocations

### 3.3 Kelime listesi
- Arkadaşının mevcut listesi → `words.seed.json` (sen listeyi gönder, ben anlam/IPA/örnekleri doldururum).
- Şema: `{ word, ipa, pos, tr, definition, examples[], level, tags[], media?: {title, line, source}, synonyms[] }`

### 3.4 Film/dizi referansları
- Sadece **doğrulanabilir**, kısa replikler (ör. Friends, The Office, Harry Potter, Forrest Gump vb.). Uydurma alıntı olmayacak; her biri yapım adı + sezon/bölüm veya sahne ile işaretlenecek. Doğrulayamadıklarımızı eklemeyiz.

### 3.5 Videolar
- `videos.json`: `{ id, channel, title, level, topic, duration }` — kanallar: TED-Ed, BBC Learning English (6 Minute English, The English We Speak), BBC Ideas, Vox, TED.
- Faz 1: elle seçilmiş ~120 video, tarihe + seviyeye göre günlük döngü (API anahtarı gerekmez).
- Faz 2 (opsiyonel): Supabase zamanlanmış fonksiyonu kanalların RSS'inden yeni videoları günlük çeker.

### 3.6 Konuşma konuları
- Seviye başına ~60 konu (A1: "Describe your room", B2: "Is social media making us lonelier?") + her birine 4-5 yardımcı soru ve 5 faydalı kalıp.
- Taktik rehberi: shadowing, kendine sesli anlatma (narrating), ayna/kayıt yöntemi, 1-3-5 kuralı, "bilmediğin kelimeyi etrafından dolaş" (circumlocution), günlük ses günlüğü, düşünme dilini değiştirme.

### 3.7 Sözler
- ~150 söz (filozof, yazar, bilim insanı, ünlü): `{ text, author, tr }` — sadece kaynağı doğru bilinen sözler (yanlış atıf yapılmış meşhur sözler elenecek).

---

## 4. Çöp Adam (Maskot) Varlık Listesi
**Karar:** Animasyonlar kodla çizilmeyecek; **üretilen görseller sırayla oynatılarak (kare kare / flipbook)** animasyon oluşacak. Kodda bir `<MascotAnimation frames={[...]} fps={8} loop />` bileşeni olacak: kareleri önceden yükler, belirlenen hızda sırayla gösterir, "hareketi azalt" ayarında ilk kareyi sabit gösterir. Kareler WebP'ye çevrilip tek bir sprite sheet'te birleştirilecek (hızlı yükleme).

**Kare tutarlılığı için kurallar:** her karede aynı tuval boyutu (ör. 512×512), karakter aynı ölçekte, ayaklar aynı zemin çizgisinde, kafa aynı büyüklükte. Kareler ayrı ayrı üretilirse ben hizalama/ölçek eşitleme yaparım.

Gerekli varlıklar (her animasyon = kare dizisi):
| Animasyon | Kare | Kullanım |
|---|---|---|
| `head.png` (tek) | 1 | Logo, favicon, PWA ikonları (192/512/180) |
| Kafa ifadeleri | 5 tek kare | Bildirim/geri bildirim balonları |
| Yürüme | 8 | Yükleme ekranı (ortada yürür) |
| Anlatma (işaret eder, ağzı açılıp kapanır) | 4 | Konu anlatımı ipucu kutuları |
| El sallama | 4 | İlk açılış / selamlama |
| Kutlama (zıplama) | 6 | Çalışma bitince, doğru cevap serisi |
| Düşünme (kafa kaşıma) | 4 | Yanlış cevap / "tekrar dene" |
| Kitap okuma | 3 | Konular sayfası boş durum |
| Uyuma (z harfi yükselir) | 3 | Boş kelime listesi |
| Mikrofonla konuşma | 4 | Konuşma pratiği |
| Kulaklıkla dinleme (sallanma) | 4 | Günün videosu |

### 4.1 Özel Gün Temaları
Tarihe göre otomatik değişen tema: maskot kıyafeti/aksesuarı + küçük arka plan süsü + o güne özel mesaj ve o temayla ilgili İngilizce mini kelime seti (ör. Yaz → *sunscreen, heatwave, beach*).
| Gün | Tarih | Maskot / tasarım |
|---|---|---|
| **Doğum günü** 🎂 | **26 Ağustos** (2005 doğumlu → yaşı otomatik hesaplanır) | Parti şapkası, pasta üfleme animasyonu, konfeti, "Happy Birthday!" + yaşına özel mesaj |
| Yılbaşı | 31 Ara – 1 Oca | Bere + atkı, havai fişek, kar |
| 23 Nisan | 23 Nisan | Uçurtma |
| 19 Mayıs | 19 Mayıs | Bayrak, koşma |
| Kurban Bayramı | her yıl değişir (2027-2030 tarih tablosu içerikte) | Bayram kıyafeti |
| Yaz başlangıcı | 21 Haziran | Güneş gözlüğü, dondurma |
| 29 Ekim | 29 Ekim | Bayrak |

Her tema için: tema görselleri (yürüme + selamlama animasyonu en az), renk vurgusu, mesaj metni (TR/EN). Tema ayarlardan kapatılabilir; doğum günü teması o gün site ilk açıldığında tam ekran sürpriz olarak görünür.

---

## 5. UI Tasarım Prompt'u (AI tasarım aracına verilecek)
> Not: AI araçları İngilizce prompt ile daha iyi sonuç veriyor.

```
Design a mobile-first Progressive Web App UI for a personal English learning site called "Su". Target: one learner going from A1 to B2, using mostly an iPhone and an Android tablet. Mood: cute, calm, minimal, distraction-free — like a cozy study notebook. No ads, no clutter, no aggressive gamification.

VISUAL STYLE
- Soft pastel palette: warm off-white background (#FFFBF5), primary soft lavender or sage green, accent warm peach/coral for highlights; full dark mode variant (deep navy/charcoal, not pure black).
- Rounded corners (16–24px), gentle shadows, generous whitespace, one clear action per screen.
- Typography: rounded friendly sans-serif (e.g. Nunito or Quicksand) for UI, highly legible (min 16px body). English example sentences visually distinguished from Turkish explanations (e.g. English in primary color, Turkish in muted gray).
- Mascot: a hand-drawn black-line stick figure with a cartoon illustrated head (provided later as PNG). Leave placeholders for it: app logo (head only), loading screen (stick figure walking across the center), tip boxes (stick figure on the left pointing at a speech-bubble card), empty states, success celebration. Mascot animations are frame-by-frame image sequences, so reserve square mascot slots (e.g. 96px in tip boxes, 160px on loading screen).
- Seasonal themes: design one example of a "special day" variant of the Today screen (birthday: party-hat mascot, confetti, soft accent color, full-screen "Happy Birthday!" welcome overlay with a cake). Themes only change accents and decorations, never the layout.

LAYOUT
- Mobile: bottom tab bar with 5 tabs: Today, Words, Lessons, Practice, More. Respect iOS safe areas (notch, home indicator). Thumb-friendly 48px+ touch targets. Tablet: tab bar becomes a left sidebar, content in 2 columns where useful.
- Top bar: mascot head logo, page title, language toggle (TR/EN), level badge (A1/A2/B1/B2).

SCREENS TO DESIGN
1. Loading/splash: stick figure walking in the center, small progress dots.
2. Today (home): greeting with mascot, "words to review today" card with count + Start button, "video of the day" card (YouTube thumbnail, channel name, duration, level tag, watched checkbox), "speaking topic of the day" card, and at the very bottom a tiny, subtle quote card (italic, low contrast, tap to reveal Turkish translation).
3. Words list: search bar, filter chips (level, tags, status: learning/learned), word rows showing word, IPA, Turkish meaning, speaker icon. Floating "+ Add word" button.
4. Word detail: big word, IPA, play-pronunciation button (US/UK toggle), part of speech, Turkish meaning, English definition, 2–3 example sentences each with its own play button, optional "Seen in" card (movie/series name + short line), synonyms chips, edit/delete.
5. Add word sheet (bottom sheet): input field; after typing, auto-filled IPA/definition/examples appear as editable fields with a small "auto-filled" label; Turkish meaning input; level and tags; Save.
6. Flashcard study mode: full-screen card, tap to flip, swipe right = "I knew it", swipe left = "Again", progress bar, other modes as tabs: multiple choice, type the word, listen & type. End screen with mascot celebrating.
7. Lessons: level tabs A1–B2, topic cards with progress ring. Lesson page built from short stacked sections: "Structure" (formula box, e.g. Subject + have/has + V3), "When to use", "Examples", "In daily life", "In movies & series" (film icon card), "Common mistakes", mini quiz at the end. Mascot tip boxes appear between sections.
8. Street English: categories (contractions like gonna/wanna, fillers, idioms, phrasal verbs, situational dialogues shown as chat bubbles with play buttons).
9. Practice: daily speaking topic for the selected level, 4–5 helper questions, "useful phrases" chips, timer selector (1/3/5 min), large circular record button, playback of recording, link to "self-talk tactics" guide (accordion article with mascot).
10. Video of the day page: embedded video, 3 comprehension questions, "new words from this video" quick add.
11. Settings: level, interface language, accent, dark mode, account (sign in for sync), export/import data.

INTERACTIONS
- Subtle micro-animations only (card flip, gentle bounce on success, mascot waving). Respect "reduce motion".
- Accessible contrast (WCAG AA), visible focus states.

Deliver: mobile (390×844) and tablet (820×1180) frames for each screen, light and dark mode, plus a small component library (buttons, cards, chips, bottom sheet, tab bar, tip box with mascot, quote card).
```

---

## 6. Çöp Adam Görsel Prompt'ları
Arkadaşının net, önden çekilmiş, iyi ışıklı bir fotoğrafını referans olarak yükle (ChatGPT görsel / Gemini / Midjourney `--cref`). **Her prompt'ta aynı referansı ve aynı stil cümlesini** kullan ki karakter tutarlı kalsın.

**Ortak stil cümlesi (her prompt'un sonuna ekle):**
```
Style: cute minimalist doodle, clean black hand-drawn lines of uniform thickness, simple flat colors only on the head (skin tone, hair color, no shading), the body is a classic stick figure made of single black lines with round line caps, white/transparent background, no text, no shadows, centered, consistent character design.
```

**1) Kafa / logo**
```
Using the attached photo as reference, draw a cute cartoon head of this person for an app logo. Keep their recognizable features: hairstyle, hair color, face shape, eyes, eyebrows, glasses/accessories if any. Big friendly eyes, small smile, slightly oversized head, front-facing, no neck, no body. 1024x1024, transparent background. [ortak stil]
```

**2) Kafa ifadeleri (aynı karakter)**
```
Same character head as the reference, drawn 5 times in a row with different expressions: happy smile, thinking (eyes looking up), surprised (round mouth), winking, proud/celebrating (eyes closed, big grin). Identical hairstyle and proportions in all five. Transparent background. [ortak stil]
```

**3) Animasyon kareleri — genel şablon**
Önce sprite sheet olarak dene (tek görselde tüm kareler en tutarlı sonucu verir):
```
Animation sprite sheet of this character as a stick figure, [N] frames in one horizontal row, each frame in an equal-size square cell, same scale and same ground line in every frame, the cartoon head identical in every frame (same size, same hairstyle). Action: [EYLEM]. Frames show the action step by step so they loop smoothly when played in order. The body, arms and legs are simple single black lines. Transparent background. [ortak stil]
```
Sprite sheet tutarsız çıkarsa **kare kare** üret — ilk kareyi üret, sonra o görseli de referans vererek:
```
Same character, same size, same position and same ground line as the attached previous frame. Only change: [BU KAREDEKİ HAREKET]. Transparent background. [ortak stil]
```

**4) Animasyonlara göre [N] ve [EYLEM]:**
- Yürüme (8): `walking to the right, side view walk cycle: contact, down, passing, up for each leg; arms swing opposite to legs; head bobs slightly`
- Anlatma (4): `standing turned slightly right, one arm pointing to the upper right like explaining on a board; mouth alternates open/closed, pointing hand moves slightly up and down`
- El sallama (4): `standing facing the viewer, smiling, one hand raised waving left-right`
- Kutlama (6): `crouch, jump up with both arms raised, peak of jump with confetti lines, coming down, landing, standing proud`
- Düşünme (4): `standing, scratching head with one hand, eyes looking up, small question mark appearing and fading`
- Kitap okuma (3): `sitting cross-legged reading an open book, turning a page`
- Uyuma (3): `sleeping curled up on the ground, small "z" doodles rising`
- Mikrofon (4): `holding a microphone, talking with mouth opening and closing, free hand gesturing`
- Dinleme (4): `wearing big headphones, eyes closed, gently swaying left and right to music`

**5) Özel gün varyantları** — aynı şablon, eyleme kıyafet ekle:
```
... Action: [EYLEM], wearing [AKSESUAR]. ...
```
- Doğum günü: `wearing a party hat, blowing out candles on a small birthday cake (frames: inhale, blow, candles go out, cheering with confetti)` + yürüme kareleri `wearing a party hat holding a balloon`
- Yılbaşı: `wearing a beanie and scarf, small fireworks doodles` · Kurban Bayramı: `wearing nice festive clothes` · Yaz: `wearing sunglasses holding an ice cream` · 23 Nisan: `flying a kite` · 19 Mayıs/29 Ekim: `holding a small Turkish flag`

**İpuçları:** Çıktıları şeffaf `.png` ver (değilse remove.bg). Dosya adlarını `walk_01.png … walk_08.png` şeklinde sıralı koy; hizalama, boyut eşitleme ve WebP dönüştürmeyi ben yaparım.

---

## 7. Benim Ek Önerilerim
1. **Aralıklı tekrar (spaced repetition)** — kelimeler unutulmaya yakın gün yeniden sorulur; ezber için en etkili yöntem.
3. **Videodan kelime yakala** — video izlerken bilmediği kelimeyi tek dokunuşla listeye ekleme.
4. **Ses günlüğü** — konuşma kayıtları tarih sırasıyla saklanır; 1 ay önceki kaydıyla bugünkünü karşılaştırabilir (ilerlemeyi duymak çok motive eder).
6. **Haftalık mini sınav** — o hafta eklenen kelimeler + çalışılan konudan 10 soru.
7. **Günlük hatırlatma** — PWA bildirimleri (Android tam destek; iOS 16.4+ sadece ana ekrana eklenmişse).
8. **Doğum günü & özel gün sürprizleri** — bkz. §4.1 (26 Ağustos tam ekran pasta animasyonu).
9. **Gölgeleme (shadowing) modu** — örnek cümleyi dinle → kendin söyle → kaydını orijinalle art arda dinle.
10. **Offline mod** — metroda/internetsizken kelime çalışması çalışmaya devam eder.

---

## 8. Yol Haritası
Yapım hemen başlar; içerik ve görseller paralel ilerler. Görseller/tasarım gelene kadar yer tutucu (placeholder) maskot ve varsayılan pastel tema kullanılır, sonra değiştirilir.
- **Faz 0 – İçerik (paralel):** kelime listeni gönder; gramer konularını sırayla (önce zamanlar) JSON olarak hazırlayalım; video listesi, konuşma konuları, sözler. Sen bu sırada UI tasarımını ve çöp adam görsellerini üret.
- **Faz 1 – İskelet (ilk iş):** Vite+React+PWA kurulumu, tema, alt menü, i18n, maskot bileşenleri (`MascotAnimation` kare oynatıcı, yürüyen yükleme, ipucu kutusu), özel gün tema motoru (tarih → tema), GitHub repo + Pages deploy.
- **Faz 2 – Kelimeler:** liste, ekleme (otomatik doldurma), detay, telaffuz, flashcard + aralıklı tekrar, Supabase giriş & senkron.
- **Faz 3 – Konular & Sokak İngilizcesi:** içerik renderer, mini quizler.
- **Faz 4 – Pratik & Video:** günlük konu, zamanlayıcı, ses kaydı, günün videosu, söz köşesi.
- **Faz 5 – Cilalama:** offline, bildirim, seviye testi, performans, erişilebilirlik.

**Senden gerekenler:** mevcut kelime listesi, maskot görselleri, UI tasarım çıktıları (ekran görüntüsü yeterli), GitHub hesabı, (Faz 2'de) ücretsiz Supabase hesabı.

---

## 9. Doğrulama
- `npm run dev` + tarayıcı panelinde mobil (375×812) ve tablet (768×1024) görünümde her ekranı test.
- `npm run build` hatasız; Lighthouse PWA/erişilebilirlik ≥ 90.
- iPhone Safari ve Android Chrome'da: ana ekrana ekle, offline aç, telaffuz sesi, ses kaydı, kelime ekle → diğer cihazda görünüyor mu (senkron).
- GitHub Pages linki gizli pencerede açılıyor mu.
- Tema testi: tarihi `?date=2026-08-26` gibi bir geliştirme parametresiyle taklit edip doğum günü ve her özel gün temasının doğru göründüğünü kontrol.
- Maskot animasyonları: karelerin titremeden (hizalı) oynadığı, "hareketi azalt" açıkken durduğu kontrol.
