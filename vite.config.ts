import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the built site works on any host (GitHub Pages subpath,
// Netlify, Vercel, or a bare static folder) without extra config.
// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
})
