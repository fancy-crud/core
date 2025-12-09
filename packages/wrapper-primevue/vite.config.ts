/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { name } from './package.json'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@packages/vue': path.resolve(__dirname, '../vue/src'),
      '@packages/core': path.resolve(__dirname, '../core/src'),
    }
  },
  build: {
    sourcemap: false, // Disabled to avoid @tailwindcss/vite warning
    lib: {
      name,
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'fancy-crud-wrapper-primevue',
    },
    rollupOptions: {
      external: ['vue', 'primevue', '@primeuix/themes', '@fancy-crud/core', '@fancy-crud/vue'],
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name || assetInfo.name === 'style.css')
            return 'fancy-crud-wrapper-primevue.css'
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
    tailwindcss(),
    tsconfigPaths(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core'
      ],
      vueTemplate: true,
      dts: true,
      dirs: [
        './src/**/components',
        './src/**/composables',
        './src/**/typings',
      ]
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
