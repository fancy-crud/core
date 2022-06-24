import path from 'path'
import { dependencies } from './package.json'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
// import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    lib: {
      name: 'fancy-crud',
      entry: path.resolve(__dirname, 'src/index.ts'),
    },
    rollupOptions: {
      external: [...Object.keys(dependencies)],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue(),
    // WindiCSS({
    //   preflight: false,
    // }),
    Components({
      dirs: [
        'src/components',
        'src/apps'
      ],
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
  
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),
  ],
})
