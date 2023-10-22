import path from 'path'
import { defineConfig } from 'vite'
import { name } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@package/vue-toastify-plugin/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    lib: {
      name,
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'fancy-crud-vue-toastify-plugin',
    },
    rollupOptions: {
      external: ['vue3-toastify'],
      output: {
        exports: 'named',
        globals: {},
      },
    },
  },
})
