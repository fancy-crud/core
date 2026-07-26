import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import path from 'node:path'



// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@fancy-crud/vue/dist': `${path.resolve(__dirname, '../packages/vue/dist')}/`,
      '@fancy-crud/wrapper-primevue/dist': `${path.resolve(__dirname, '../packages/wrapper-primevue/dist')}/`,

      '@fancy-crud/vue': `${path.resolve(__dirname, '../packages/vue/src')}/`,
      '@fancy-crud/core': `${path.resolve(__dirname, '../packages/core/src')}/`,

      '@fancy-crud/wrapper-primevue': `${path.resolve(__dirname, '../packages/wrapper-primevue/src')}/`,

      '@fancy-crud/plugin-rule-parsers': `${path.resolve(__dirname, '../packages/plugin-rule-parsers/src')}/`,
      '@fancy-crud/plugin-vue3-toastify': `${path.resolve(__dirname, '../packages/plugin-vue3-toastify/src')}/`,

      '@packages/core/': `${path.resolve(__dirname, '../packages/core/src')}/`,
      '@packages/vue/': `${path.resolve(__dirname, '../packages/vue/src')}/`,
    },
  },
  plugins: [
    tailwindcss(),
    vue(),
    vueDevTools(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './src/**/components',
        './src/**/composables',
        './src/**/typings',
      ],
      vueTemplate: true,
    }),
    Components({
      dirs: [
        'src/**/components',
      ],
      resolvers: [PrimeVueResolver()],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: true,
    }),
  ],
})
