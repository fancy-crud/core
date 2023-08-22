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
      '@package/oruga-wrapper/': `${path.resolve(__dirname, 'src')}/`,
      // '@fancy-crud/vue': `${path.resolve(__dirname, '../vue/src')}/`,
      // '@fancy-crud/core': `${path.resolve(__dirname, '../core/src')}/`,
    },
  },
  build: {
    lib: {
      name,
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'fancy-crud-oruga-wrapper',
    },
    rollupOptions: {
      external: ['vue', '@oruga-ui/oruga-next', '@fancy-crud/core', '@fancy-crud/vue'],
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name || assetInfo.name === 'style.css')
            return 'fancy-crud-oruga-wrapper.css'
          return assetInfo.name
        },
        exports: 'named',
        globals: {
          vue: 'Vue',
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
        'node_modules/@oruga-ui/oruga-next/src/components/**',
        'src/**/integration/components',
      ],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: true,
    }),
  ],
})
