// @ts-check

import fs from 'node:fs'
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

runBuild()
