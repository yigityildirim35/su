import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages serves the site from /<repo>/ — keep in sync with the repo name.
const base = '/su/'

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'mascot/**/*'],
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
          { src: 'mascot/placeholder/head.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
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
