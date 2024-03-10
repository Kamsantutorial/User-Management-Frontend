import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
   // other config options...
  // base: process.env.NODE_ENV === 'production' ? '/backong-frontend/' : '/',
  build: {
    target: 'es2022', // Set the target environment to support "Top-level await"
    minify: true,
    terserOptions: {
      compress: {
        // ...other terser options...
        drop_console: true,
      },
    },
    
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
