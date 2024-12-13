
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import eslintPlugin from 'vite-plugin-eslint'
import dotenv from 'dotenv'
import { fileURLToPath, URL } from 'node:url'

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    eslintPlugin({
      overrideConfigFile: 'eslint.config.js',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: false,
  },
  server: {
    port: 8080
  },
  define: {
      'import.meta.env.VITE_AUTH_DOMAIN': JSON.stringify(process.env.VITE_AUTH_DOMAIN),
      'import.meta.env.VITE_AUTH_CLIENT_ID': JSON.stringify(process.env.VITE_AUTH_CLIENT_ID),
      'import.meta.env.VITE_AUTH_AUDIENCE': JSON.stringify(process.env.VITE_AUTH_AUDIENCE),
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL),
    },

});

  // NOTE If deploying to gh-pages uncomment the line below (https://vitejs.dev/config/shared-options.html#base)
  // base: '/tower/'


