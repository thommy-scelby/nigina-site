import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE_BASE is the address path of the site.
//  - Own domain, or Vercel/Netlify: '/' (the default).
//  - GitHub Pages without a domain: '/repository-name/'. The deploy workflow sets this by itself.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
})
