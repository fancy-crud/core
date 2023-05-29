import path from 'path'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import { dependencies, name } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    lib: {
      name,
      entry: path.resolve(__dirname, 'src/index.ts'),
    },
    rollupOptions: {
      external: [...Object.keys(dependencies)],
    },
  },
  plugins: [
    AutoImport({
      dts: true,
      dirs: [
        './src/**/*.ts',
      ],
    }),
  ],
})
