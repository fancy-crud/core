import path from 'path'
import { defineConfig } from 'vite'
import { dependencies, name } from './package.json'

// https:// vitejs.dev/config/
export default defineConfig(() => {
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
        formats: ['es', 'cjs', 'umd'],
      },
      rollupOptions: {
        external: [...Object.keys(dependencies)],
      },
    },
  }
})
