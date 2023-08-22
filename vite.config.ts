import path from 'path'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

// https:// vitejs.dev/config/
export default defineConfig(({ command }) => {
  let alias: Record<string, string> = {
    '@packages/vue': `${path.resolve(__dirname, 'packages/vue/src')}/`,
    '@packages/core': `${path.resolve(__dirname, 'packages/core/src')}/`,
    '@packages/oruga-wrapper': `${path.resolve(__dirname, 'packages/oruga-wrapper/src')}/`,
    // '@fancy-crud/vue': `${path.resolve(__dirname, 'packages/vue/src')}/`,
    // '@fancy-crud/core': `${path.resolve(__dirname, 'packages/core/src')}/`,
    // '@fancy-crud/oruga-wrapper': `${path.resolve(__dirname, 'packages/oruga-wrapper/src')}/`,
  }

  if (command === 'build') {
    alias = {
      '@packages/vue': `${path.resolve(__dirname, 'packages/vue/src')}/`,
      '@packages/core': `${path.resolve(__dirname, 'packages/core/src')}/`,
      '@packages/oruga-wrapper': `${path.resolve(__dirname, 'packages/oruga-wrapper/src')}/`,
    }
  }

  const dependencies = {}
  return {
    resolve: {
      alias,
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
      vue(),
      AutoImport({
        imports: [
          'vue/macros',
          '@vueuse/core',
          {
            vue: [
              'h',
              'reactive',
              'watch',
              'computed',
              'ref',
              'onMounted',
              'onUnmounted',
              'defineComponent',
              'useSlots',
              ['inject', 'vueInject'],
            ],
          },
        ],
        dts: true,
        dirs: [
          'packages/vue/**/**/*.ts',
        ],
        vueTemplate: true,
      }),
      Components({
        dirs: [
          'node_modules/@oruga-ui/oruga-next/src/components/**',
          'src/**/integration/components',
        ],

        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: true,
      }),
    ],
  }
})
