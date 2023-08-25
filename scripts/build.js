// @ts-check
import fs from 'node:fs'
import semanticRelease from 'semantic-release'
// import { execa } from 'execa'
// import path from 'node:path'
// import { build } from 'vite'

// import typescript from '@rollup/plugin-typescript'
// import corePackage from '../packages/core/package.json' assert { type: 'json' }
// import vuePackage from '../packages/vue/package.json' assert { type: 'json' }
// import orugaWrapperPackage from '../packages/oruga-wrapper/package.json' assert { type: 'json' }

const packages = [
  'core', 'vue', 'oruga-wrapper',
]

function replace_version(filePath, err, data, version) {
  if (err) {
    console.error('Error reading the JSON file:', err)
    return
  }

  try {
    const jsonData = JSON.parse(data)
    jsonData.version = version
    const updatedJson = JSON.stringify(jsonData, null, 2)

    // Write the updated JSON back to the file
    fs.writeFile(filePath, updatedJson, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing the updated JSON:', writeErr)
        return
      }
      console.log('Version updated to', version)
    })
  }
  catch (parseError) {
    console.error('Error parsing JSON:', parseError)
  }
}

async function runBuild() {
  const newVersion = process.argv[2]

  packages.forEach((packageName) => {
    const filePath = `./packages/${packageName}/package.json`
    fs.readFile(filePath, 'utf8', (err, data) => {
      replace_version(filePath, err, data, newVersion)
    })
  })
}

async function release() {
  // const stdoutBuffer = new WritableStream()
  // const stderrBuffer = new WritableStream()

  try {
    const result = await semanticRelease({
      // Core options
      branches: [
        '+([0-9])?(.{+([0-9]),x}).x',
        'main',
        'next',
        'next-major',
        { name: 'beta', prerelease: true },
        { name: 'alpha', prerelease: true },
      ],
      // repositoryUrl: 'https://github.com/fancy-crud/core.git',
      dryRun: true,
      ci: false,
      plugins: [
        '@semantic-release/commit-analyzer',
        // '@semantic-release/release-notes-generator',
      ],
    }, {
      cwd: 'packages/core',
    })

    if (result) {
      const { lastRelease, commits, nextRelease, releases } = result

      console.log(
      `Published ${nextRelease.type} release version ${nextRelease.version} containing ${commits.length} commits.`,
      )

      if (lastRelease.version)
        console.log(`The last release was "${lastRelease.version}".`)

      for (const release of releases)
        console.log(`The release was published with plugin "${release.pluginName}".`)
    }
    else {
      console.log('No release published.')
    }

    // Get stdout and stderr content
    // const logs = stdoutBuffer.getContentsAsString('utf8')
    // const errors = stderrBuffer.getContentsAsString('utf8')
  }
  catch (err) {
    console.error('The automated release failed with %O', err)
  }
}

await release()
