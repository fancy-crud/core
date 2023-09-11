import path from 'path'
import { defineConfig } from 'vite'
import { name } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@package/rules-processors/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    lib: {
      name,
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'fancy-crud-rules-processors',
    },
    rollupOptions: {
      external: ['zod'],
      output: {
        exports: 'named',
        globals: {
          zod: 'Zod',
        },
      },
    },
  },
})
