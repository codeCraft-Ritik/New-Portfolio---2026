import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    cssTarget: 'chrome61',
  },
  plugins: [
    legacy({
      targets: ['defaults', 'Android >= 8', 'iOS >= 12'],
      modernPolyfills: true,
    }),
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
