# "Su" — AI Tasarım / Yapım Prompt'u

Site zaten çalışır durumda (bu klasördeki kod). Bu prompt'u iki şekilde kullanabilirsin:

| Kullanım | Araç | Ne olur? |
|---|---|---|
| **A) Sadece tasarım (önerilen)** | Google Stitch, Figma Make, Uizard, v0 | Ekran tasarımlarını üretir. Ekran görüntülerini bana gönderirsin, ben mevcut koda uygularım. Özellikler bozulmaz. |
| **B) Sıfırdan yapım** | Lovable, Bolt.new, v0 | Araç kendi kodunu yazar. Mevcut kodun yerine geçer; içerik dosyalarını (`src/content/`) ona tekrar vermen gerekir. |

Aşağıdaki prompt'un tamamını kopyala. A için en sondaki "OUTPUT" bölümünde **A**'yı, B için **B**'yi bırak.

---

```
You are designing (and, if asked, building) "Su" — a personal English-learning Progressive Web App for ONE Turkish learner going from A1 to B2. She uses it mostly on an iPhone and an Android tablet, a little on desktop. Anyone with the link can open it. The goal is daily, calm, distraction-free study: vocabulary, grammar (all 12 tenses), street English, a daily video, and self-talk speaking practice. Tone: cute, cozy, encouraging — like a study notebook a friend made for you. No ads, no leaderboards, no streak pressure, no level test.

══════════ 1. BRAND & MASCOT ══════════
- Name: "Su" (Turkish for "water"). Logo = a cartoon head of the learner + the word "Su".
- Mascot: the learner drawn as a stick figure (cartoon head with her real hairstyle, black single-line body). Provided later as transparent PNG frame sequences. All mascot animations are FRAME-BY-FRAME flipbooks (images played in order at 2–8 fps), NOT vector/CSS animations. Reserve square slots:
  • Splash/loading: 160px, mascot walking across the center (8 frames)
  • Tip boxes: 84–96px, mascot on the left "explaining" next to a speech bubble (4 frames)
  • Greeting on Today: 88px waving (4 frames)
  • Success/end of study: 160px jumping/celebrating (6 frames)
  • Wrong answer: thinking/scratching head (4 frames)
  • Empty states: sleeping (empty word list), reading (no lessons due) — 140px
  • Speaking practice: holding a microphone (4 frames); Video page: wearing headphones (4 frames)
- Respect "reduce motion": show the first frame only.

══════════ 2. VISUAL SYSTEM ══════════
- Light: background #FFFBF5 (warm paper), surface #FFFFFF, surface-2 #F6F0E8, text #2D2A32, muted #8A8494, border #EDE6DC, primary lavender #7C6FD0 (soft #EEEBFA), accent peach #F08F74 (soft #FDECE6), success #4FA874, danger #D86868.
- Dark: background #1C1B26, surface #252433, text #EDEAF5, primary #A79BEB, accent #F2A890 (never pure black).
- Font: Nunito (rounded), body ≥16px (prevents iOS zoom), headings 800 weight.
- Radius 16–24px, soft 1px borders, very gentle shadows, generous whitespace, one primary action per screen.
- English text in primary color + semibold; Turkish explanations in muted gray — the two languages must always be visually distinct.
- Every English word/sentence has a small round 🔊 button next to it (text-to-speech).
- Special-day themes change ONLY accent color + decorations, never layout:
  • Birthday (26 August, born 2005): pink accent, party-hat mascot, confetti, full-screen "Happy Birthday! / İyi ki doğdun!" overlay with age shown, once per day
  • New Year (31 Dec–1 Jan), 23 Nisan (kite), 19 Mayıs & 29 Ekim (red accent, small Turkish flag), Kurban Bayramı (green), Summer start 21 June (sunglasses, ice cream)
  • Each special day shows a small "Words of the day" card with 4 themed English words.

══════════ 3. LAYOUT & PLATFORM RULES ══════════
- Mobile-first (390×844). Bottom tab bar with 5 tabs: Today ☀️, Words 📚, Lessons 💡, Practice 🎙️, More ✨. Height ≥60px, respects iOS home-indicator safe area.
- Top bar (mobile): mascot head + "Su", language toggle chip (TR/EN), level chip (A1/A2/B1/B2).
- Tablet/desktop (≥768px): tab bar becomes a left sidebar (logo, nav, language + level chips at the bottom); content max 900px, 2 columns where useful.
- Touch targets ≥48px, no horizontal page scroll, bottom sheets instead of modals on mobile, swipe gestures on flashcards.
- Installable PWA (Add to Home Screen on iOS & Android), works offline, light/dark/system theme.
- Interface language switchable Turkish ⇄ English (every label exists in both).

══════════ 4. SCREENS ══════════
1. SPLASH — walking mascot centered, "Su", three bouncing dots (~1.4 s).
2. TODAY — waving mascot + greeting ("Merhaba! Bugün biraz İngilizce?"); [special-day card if any]; "To review today" card (big number of due words + Start button, or "Add your first word"); "Video of the day" card (channel, series, minutes, level); "Speaking topic of the day" card (English topic, Turkish translation, "Start speaking" button); at the very bottom a tiny, low-contrast italic QUOTE of the day with author — tap reveals Turkish translation. The quote must stay subtle.
3. WORDS — title + "Study" button; search; horizontally scrollable filter chips: All / Due / Learning / Learned | A1 A2 B1 B2; list rows: word (primary color), level badge, ✅ if learned, IPA + Turkish meaning in muted text, 🔊 button. Floating round "+" button above the tab bar. Tablet: 2-column list.
4. WORD DETAIL — big word, part of speech, level, IPA, large 🔊, optional 🎧 dictionary audio, US/UK accent toggle, Turkish meaning (large), English definition card, example sentences each with 🔊, "🎬 Seen in" card (movie/book title, short quote, character), synonyms chips, Edit / Delete buttons.
5. ADD / EDIT WORD (bottom sheet) — word input (auto-focus). After typing, fields auto-fill from a dictionary with a small green "auto-filled" badge: IPA, part of speech, English definition, example sentences (one per line), synonyms. User fills the Turkish meaning. Level segmented control A1–B2, tags input, Cancel / Save. States: "Looking it up…", "Not found — fill it yourself", "Already in your list".
6. STUDY — segmented tabs: Cards / Choice / Type / Listen & type. Progress bar + "3 / 12".
   • Cards: big card, tap to flip (front: English + IPA + 🔊, back: Turkish + definition + example), swipe right = "I knew it" (green label), swipe left = "Again" (red label), plus two big buttons.
   • Choice: English word, 4 Turkish options, correct turns green, wrong red.
   • Type: Turkish meaning + example with blank → type the English word → Check → Correct!/Answer.
   • Listen & type: only a big 🔊 button, type what you hear.
   • End: celebrating mascot, "All done for today!", Back / Repeat. Empty: reading mascot + "Practice all words anyway".
   Spaced repetition (Leitner boxes 0–6, intervals 0/1/2/4/8/16/32 days) decides what is due.
7. LESSONS — "🕰️ The 12 Tenses" highlight card; "🗣️ Street English" card; level segmented control A1–B2; lesson cards (title + Turkish subtitle) — unfinished lessons faded with a "Soon" chip.
8. 12 TENSES OVERVIEW — 3×4 grid table (rows: Present / Past / Future; columns: Simple / Continuous / Perfect / Perfect Continuous). Each cell: formula (monospace, primary) + example ("I have worked"), tappable → that lesson. On mobile the table scrolls horizontally inside its own container.
9. LESSON PAGE — stacked short sections, never a wall of text:
   tip box with mascot → 📐 Structure (3 cards: Positive / Negative / Question, each with a formula pill and an example + 🔊) → 🕐 When to use (cards: Turkish rule + English example) → 🔎 Signal words (chips) → ✏️ Examples (English + Turkish rows) → ☕ In daily life → 🎬 In movies & series (peach cards: quote, title, character, short note) → ⚠️ Common mistakes (✗ red strikethrough / ✓ green + why) → 🧠 Mini quiz (chips turn green/red, score with mascot) → "Next lesson →" card.
10. STREET ENGLISH — category chips (Contractions, Fillers, Idioms, Phrasal verbs, At a café, Small talk); tip box; item cards (expression, Turkish, example, 🔊); dialogues shown as chat bubbles (A left gray, B right lavender) each with 🔊.
11. PRACTICE — topic card with microphone mascot (level + English topic + Turkish) and "🔀 Another topic"; helper questions with 🔊; "Useful phrases" chips; timer chips 1 / 3 / 5 min; big monospace countdown; huge round record button (peach → pulsing red while recording); "Listen back" audio player; link card to "Self-talk tactics".
12. SELF-TALK TACTICS — numbered accordion (1-3-5 rule, narrating, shadowing, talk around the word, record & listen, mirror talk, fillers, one minute of thinking in English); each opens a mascot tip box + example sentence with 🔊.
13. VIDEO OF THE DAY — channel + series + minutes + level, big "▶️ Open on YouTube" button, listening-mascot tip ("watch once without subtitles, then with English subtitles, add new words"), channel list (TED-Ed, BBC Learning English, BBC Ideas, Vox, TED) with descriptions.
14. MORE / SETTINGS — links (Video, Street English, Tactics); settings rows with chips: Level, Interface language, Accent (🇺🇸 US / 🇬🇧 UK), Appearance (Light/Dark/System), Special-day themes (On/Off); "My data": Export / Import buttons + note about upcoming cross-device sync.

══════════ 5. DATA & BEHAVIOUR (for building) ══════════
- Word: { id, word, ipa?, audio?, pos?, tr, definition?, examples[], synonyms[], level?, tags[], media?: {title, line, source?}, createdAt, srs: {box, due:"YYYY-MM-DD"} }
- Lesson: { id, level, title, subtitle{tr,en}, sections[], quiz[] } where sections are typed blocks: tip, structure, when, signals, examples, daily, media, mistakes, overview.
- Daily content (video pick, speaking topic, quote) rotates by date; a ?date=YYYY-MM-DD URL parameter previews other days.
- Dictionary auto-fill: api.dictionaryapi.dev first (IPA + audio), Wiktionary REST API as fallback (5 s timeout).
- Pronunciation: Web Speech API speechSynthesis with en-US / en-GB voice; recording: MediaRecorder (webm on Android/Chrome, mp4 on iOS Safari).
- Storage: localStorage now, designed so Supabase (free tier, email magic-link login, row-level security) can sync phone ⇄ tablet later.
- Hosting: static site on GitHub Pages under /su/ → use hash routing (#/words) and Vite base "/su/".
- Tech: React + Vite + TypeScript + Tailwind CSS + vite-plugin-pwa.

══════════ 6. OUTPUT ══════════
A) DESIGN ONLY: Deliver every screen above in mobile (390×844) and tablet (820×1180) frames, light AND dark mode, plus one birthday-theme variant of Today and the birthday overlay, and a component sheet (buttons, chips, cards, segmented control, bottom sheet, tab bar, sidebar, tip box with mascot slot, quote card, 🔊 button, record button, quiz option states).
B) FULL BUILD: Build the complete working app with all screens, behaviour and data rules above. Content lives in separate data files so it can be edited without touching components.
```
