/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { name } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@packages/wrapper-element-plus/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    lib: {
      name,
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'fancy-crud-wrapper-element-plus',
    },
    rollupOptions: {
      external: ['vue', 'element-plus', '@fancy-crud/core', '@fancy-crud/vue'],
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name || assetInfo.name === 'style.css')
            return 'fancy-crud-wrapper-element-plus.css'
          return assetInfo.name
        },
        exports: 'named',
        globals: {
          'vue': 'Vue',
          '@fancy-crud/core': 'fancyCrudCore',
          '@fancy-crud/vue': 'fancyCrudVue',
        },
      },
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
        'src/**',
      ],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: true,
    }),
  ],
})
