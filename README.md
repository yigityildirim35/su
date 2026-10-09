# Su 💧

İngilizce çalışma sitesi (A1 → B2): kelimeler, konular, sokak İngilizcesi, günlük video ve konuşma pratiği.
Telefon ve tablet öncelikli bir PWA; ana ekrana eklenince uygulama gibi açılır ve internetsiz de çalışır.

Tüm plan, UI tasarım prompt'u ve çöp adam görsel prompt'ları: [docs/PLAN.md](docs/PLAN.md)

## Geliştirme

```bash
npm install
npm run dev        # http://localhost:5173/su/
npm run build
```

Özel gün temalarını denemek için adrese tarih ekle: `http://localhost:5173/su/?date=2027-08-26#/`

## GitHub Pages'te yayınlama

1. GitHub'da **`su`** adında bir repo aç (başka bir ad seçersen `vite.config.ts` içindeki `base` değerini değiştir).
2. Kodu `main` dalına gönder.
3. Repo → **Settings → Pages → Source: GitHub Actions**.
4. Her push'ta `.github/workflows/deploy.yml` siteyi otomatik yayınlar: `https://<kullanıcı-adın>.github.io/su/`

## Maskot görsellerini ekleme

Animasyonlar kare kare oynatılır (flipbook). Şu an `public/mascot/placeholder/` içinde geçici çizimler var.

1. Gerçek kareleri `public/mascot/su/` klasörüne şu adlarla koy: `walk_01.png`, `walk_02.png`, … (`idle`, `walk`, `explain`, `wave`, `celebrate`, `think`, `read`, `sleep`, `talk`, `listen`; doğum günü için `birthday-celebrate`, `birthday-wave`).
2. [src/mascot/registry.ts](src/mascot/registry.ts) içinde ilgili satırın `set`, `ext` ve `frames` (kare sayısı) değerlerini güncelle.
3. Logo için `head.png` → `HEAD_SRC`, `index.html` ve `vite.config.ts` içindeki ikon yollarını güncelle.

## İçerik ekleme

İçerikler `src/content/` altında, kod bilgisi gerektirmeden düzenlenebilir:

| Dosya | İçerik |
|---|---|
| `words.seed.ts` | İlk açılışta yüklenen kelimeler |
| `lessons.ts` | Gramer konuları (`sections` eklenince "Yakında" yazısı kalkar) |
| `street.ts` | Sokak İngilizcesi |
| `speaking.ts` | Günlük konuşma konuları |
| `tactics.ts` | Kendi kendine konuşma taktikleri |
| `videos.ts` | Video kanalları ve seviyeye göre öneriler |
| `quotes.ts` | Günün sözü |
