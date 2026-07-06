// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Salida estática: el HTML se genera en build. Las funciones de `api/`
// (create-checkout, mp-webhook) son Vercel Functions y se deployan aparte,
// independientes del framework.
export default defineConfig({
  site: 'https://if-pos-landing.vercel.app',
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
})
