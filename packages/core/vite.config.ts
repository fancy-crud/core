import path from 'path'
import type { LibraryFormats } from 'vite'
import { defineConfig } from 'vite'
import { dependencies, name } from './package.json'

// https:// vitejs.dev/config/
export default defineConfig(() => {
  const libFormats: LibraryFormats[] = ['es', 'cjs', 'umd']

  return {
    resolve: {
      alias: {
        '@packages/core/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    build: {
      lib: {
        name,
        entry: path.resolve(__dirname, 'src/index.ts'),
        formats: libFormats,
      },
      rollupOptions: {
        external: [...Object.keys(dependencies)],
      },
    },
  }
})
