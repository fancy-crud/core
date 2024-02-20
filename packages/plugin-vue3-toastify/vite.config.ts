import path from 'path'
import { defineConfig } from 'vite'
import { name } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@package/plugin-vue3-toastify/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    lib: {
      name,
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'fancy-crud-plugin-vue3-toastify',
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
