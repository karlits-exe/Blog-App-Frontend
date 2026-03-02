import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

process.env.BROWSER = 'google chrome'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true
  }
})
