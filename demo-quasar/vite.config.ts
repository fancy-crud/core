import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@fancy-crud/vue/dist': `${path.resolve(__dirname, '../packages/vue/dist')}/`,
        '@fancy-crud/wrapper-quasar/dist': `${path.resolve(__dirname, '../packages/wrapper-oruga-ui/dist')}/`,

        '@fancy-crud/vue': `${path.resolve(__dirname, '../packages/vue/src')}/`,
        '@fancy-crud/core': `${path.resolve(__dirname, '../packages/core/src')}/`,

        '@fancy-crud/wrapper-quasar': `${path.resolve(__dirname, '../packages/wrapper-quasar/src')}/`,

        '@fancy-crud/plugin-rule-parsers': `${path.resolve(__dirname, '../packages/plugin-rule-parsers/src')}/`,
        '@fancy-crud/plugin-vue3-toastify': `${path.resolve(__dirname, '../packages/plugin-vue3-toastify/src')}/`,

        '@packages/core/': `${path.resolve(__dirname, '../packages/core/src')}/`,
        '@packages/vue/': `${path.resolve(__dirname, '../packages/vue/src')}/`,
      },
    },
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      quasar(),
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
