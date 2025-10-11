import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@fancy-crud/vue/dist': `${path.resolve(__dirname, '../packages/vue/dist')}/`,
        '@fancy-crud/wrapper-primevue/dist': `${path.resolve(__dirname, '../packages/wrapper-primevue/dist')}/`,

        '@fancy-crud/vue': `${path.resolve(__dirname, '../packages/vue/src')}/`,
        '@fancy-crud/core': `${path.resolve(__dirname, '../packages/core/src')}/`,

        '@fancy-crud/wrapper-primevue': `${path.resolve(__dirname, '../packages/wrapper-primevue/src')}/`,

        '@fancy-crud/plugin-rule-parsers': `${path.resolve(__dirname, '../packages/plugin-rule-parsers/src')}/`,

        '@packages/core/': `${path.resolve(__dirname, '../packages/core/src')}/`,
        '@packages/vue/': `${path.resolve(__dirname, '../packages/vue/src')}/`,
      },
    },
    plugins: [
      tailwindcss(),
      vue(),
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

        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: true,
      }),
    ],
  }
})


