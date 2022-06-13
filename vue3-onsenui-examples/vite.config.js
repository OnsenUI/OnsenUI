import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },

  // uncomment this when using the UMD build of vue-onsenui
  //optimizeDeps: {
  //  include: ['vue-onsenui']
  //},
  //build: {
  //  commonJsOptions: {
  //    include: [/vue-onsenui/]
  //  }
  //}
})
