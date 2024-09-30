import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  build: {
    target: ['es2015'],
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
