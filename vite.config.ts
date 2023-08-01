import path from 'path'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

import { dependencies, name } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: false,
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    lib: {
      name,
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: [...Object.keys(dependencies)],
    },
  },
  plugins: [
    AutoImport({
      dts: true,
      imports: [
        'vitest',
      ],
      dirs: [
        './src/**/*.ts',
      ],
    }),
  ],
})
