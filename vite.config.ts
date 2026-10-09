import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages serves the site from /<repo>/ — keep in sync with the repo name.
const base = '/su/'

export default defineConfig({
  base,
  // Lesson content is bundled on purpose (works offline); gzip keeps it small.
  build: { chunkSizeWarningLimit: 900 },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*', 'mascot/su/*'],
      manifest: {
        name: 'Su — English',
        short_name: 'Su',
        description: 'Kelime, gramer ve konuşma pratiği',
        theme_color: '#FFFBF5',
        background_color: '#FFFBF5',
        display: 'standalone',
        orientation: 'portrait',
        start_url: base,
        scope: base,
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts', expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
          {
            urlPattern: /^https:\/\/api\.dictionaryapi\.dev\/.*/,
            handler: 'NetworkFirst',
            options: { cacheName: 'dictionary', expiration: { maxEntries: 300 } },
          },
        ],
      },
    }),
  ],
})
