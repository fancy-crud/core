import path from 'path'
import { defineConfig } from 'vitest/config'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  resolve: {
    alias: {
      '@packages/core': `${path.resolve(__dirname, 'packages/core/src')}/`,
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
  test: {
    environment: 'happy-dom',
  },
})
