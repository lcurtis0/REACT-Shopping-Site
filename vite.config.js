import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3022,
    open: true,
   // This splists the information to go in two routes to which ever reaches the remote server fastest
    proxy: {
      '/api': {
        target: 'http://localhost:3011',
        secure: false,
        changeOrigin: true
      }
    }
  }
})
