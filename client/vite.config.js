import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Set to true to listen on all addresses
    port: 5173,
    
    proxy: {
      '/api': {
        target: 'http://localhost:8200',
        changeOrigin: true,
        secure: false,
        // Optionally remove '/api' from the URL if your backend doesn't expect it
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/auth': {
        target: 'http://localhost:8200',
        changeOrigin: true,
        secure: false,
      },
    },// You can also explicitly set the port if needed
  }
})
