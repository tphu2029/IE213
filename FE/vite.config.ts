import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// __dirname không tồn tại trong ESM — phải dùng import.meta.url
const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Tách React core
          'vendor-react': ['react', 'react-dom', 'react-router'],
          // Tách icon library (lucide nặng nhất)
          'vendor-lucide': ['lucide-react'],
          // Tách i18n
          'vendor-i18n': ['i18next', 'react-i18next'],
          // Tách charting/UI libraries
          'vendor-ui': ['sonner', 'axios'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})

