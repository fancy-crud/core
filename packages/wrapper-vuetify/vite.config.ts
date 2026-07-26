/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { name } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@packages/vue': path.resolve(__dirname, '../vue/src'),
      '@packages/core': path.resolve(__dirname, '../core/src'),
    },
  },
  build: {
    sourcemap: false,
    lib: {
      name,
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'fancy-crud-wrapper-vuetify',
    },
    rollupOptions: {
      external: (id) => {
        return id === 'vue' 
          || id.startsWith('vuetify') 
          || id === '@fancy-crud/core' 
          || id === '@fancy-crud/vue'
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name || assetInfo.name === 'style.css')
            return 'fancy-crud-wrapper-vuetify.css'
          return assetInfo.name
        },
        exports: 'named',
        globals: {
          'vue': 'Vue',
          '@fancy-crud/core': 'fancyCrudCore',
          '@fancy-crud/vue': 'fancyCrudVue',
          'vuetify': 'vuetify',
        },
      },
    },
  },
  plugins: [
    vue(),
    tailwindcss(),
    tsconfigPaths(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      vueTemplate: true,
      dts: true,
      dirs: [
        './src/**/components',
        './src/**/composables',
        './src/**/typings',
      ],
    }),
    Components({
      dirs: [
        'src/**',
      ],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: true,
    }),
  ],
})
