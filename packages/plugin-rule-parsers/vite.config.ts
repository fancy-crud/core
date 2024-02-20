import path from 'path'
import { defineConfig } from 'vite'
import { name } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@package/plugin-rule-parsers/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    lib: {
      name,
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'fancy-crud-plugin-rule-parsers',
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
