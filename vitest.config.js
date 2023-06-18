import path from 'path'
import { defineConfig } from 'vitest/config'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    AutoImport({
      dts: false,
      imports: [
        'vitest',
      ],
      dirs: [
        './src/**/*.ts',
      ],
    }),
  ],
  test: {},
})
