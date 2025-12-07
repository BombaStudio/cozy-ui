import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    // CSS dosyasının adını sabitlemek için:
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'cozy-ui.css';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
})