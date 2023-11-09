/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import { name } from './package.json'

export default defineConfig({
  resolve: {
    alias: {
      '@package/bus/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    lib: {
      name,
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'fancy-crud-bus',
    },
    rollupOptions: {
      external: [],
      output: {
        exports: 'named',
        globals: {},
      },
    },
  },
  test: {
    environment: 'happy-dom',
  },
})
