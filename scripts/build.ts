// @ts-check

// import { execa } from 'execa'
import path from 'node:path'
import { build } from 'vite'

import typescript from '@rollup/plugin-typescript'
import corePackage from '../packages/core/package.json' assert { type: 'json' }
import vuePackage from '../packages/vue/package.json' assert { type: 'json' }
import orugaWrapperPackage from '../packages/oruga-wrapper/package.json' assert { type: 'json' }

runBuild()

export async function runBuild() {
  const packages: [string, any][] = [
    ['core', corePackage.dependencies],
    ['vue', vuePackage.dependencies],
    ['oruga-wrapper', orugaWrapperPackage.dependencies],
  ]

  packages.forEach(async ([packageName, dependencies]) => {
    const packagePath = `packages/${packageName}`

    const __dirname = path.resolve('./')
    const exclude = packages
      .filter(([excludePackageName]) => excludePackageName !== packageName)
      .map(([excludePackageName]) => excludePackageName)

    await build({
      build: {
        lib: {
          name: `@fancy-crud/${packageName}`,
          entry: path.resolve(__dirname, `${packagePath}/src/index.ts`),
          formats: ['es', 'cjs', 'umd'],
          fileName: `fancy-crud-${packageName}`,
        },
        rollupOptions: {
          external: [...Object.keys(dependencies)],
          plugins: [
            typescript({
              compilerOptions: {
                baseUrl: '.',
                target: 'ES2022',
                module: 'ESNext',
                lib: ['DOM', 'ES2022'],
                declaration: true,
                sourceMap: true,
                strict: true,
                esModuleInterop: true,
                jsx: 'preserve',
                skipLibCheck: true,
                moduleResolution: 'node',
                resolveJsonModule: true,
                noUnusedLocals: true,
                strictNullChecks: true,
                forceConsistentCasingInFileNames: true,
                experimentalDecorators: true,
                emitDecoratorMetadata: true,
                outDir: './dist',
                paths: {
                  [`@${packageName}/*`]: [`${packagePath}/src/*`],
                },
              },
              exclude: [
                'dist/**',
                'scripts/**',
                'node_modules/**',
                '**/**/*.spec.ts',
                '**/dist',
                'packages/oruga-wrapper/**',
                'packages/vue/**',
                'demo/**',
                'vitest.config.ts',
                'tests/**',
                ...exclude,
              ],
            }),
          ],
        },
        // watch: {
        //   buildDelay: 1000,
        //   include: ['scripts/build.js'],
        // },
      },
    })
    // execa('yarn', ['build-tsc'])
  })
}
