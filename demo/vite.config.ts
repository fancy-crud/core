import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@fancy-crud/vue': `${path.resolve(__dirname, '../packages/vue/src')}/`,
        '@fancy-crud/core': `${path.resolve(__dirname, '../packages/core/src')}/`,
        '@fancy-crud/oruga-wrapper': `${path.resolve(__dirname, '../packages/oruga-wrapper/src')}/`,
        '@fancy-crud/rules-processors': `${path.resolve(__dirname, '../packages/rules-processors/src')}/`,

        '@packages/core/': `${path.resolve(__dirname, '../packages/core/src')}/`,
        '@packages/vue/': `${path.resolve(__dirname, '../packages/vue/src')}/`,
      },
    },
    plugins: [
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
          'node_modules/@oruga-ui/oruga-next/src/components/**',
        ],

        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: true,
      }),
    ],
  }
})
