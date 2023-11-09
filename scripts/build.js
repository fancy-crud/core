// @ts-check
import fs from 'node:fs'

const packages = [
  'bus',
  'core',
  'vue',
  'plugin-rule-parsers',
  'plugin-vue3-toastify',
  'wrapper-oruga-ui',
  'wrapper-vuetify',
]

function replace_version({ filePath, err, data, version, packageName }) {
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
      // eslint-disable-next-line no-console
      console.log(`@fancy-crud/${packageName} version updated to`, version)
    })
  }
  catch (parseError) {
    console.error('Error parsing JSON:', parseError)
  }
}

async function runBuild() {
  const version = process.argv[2]

  packages.forEach((packageName) => {
    const filePath = `./packages/${packageName}/package.json`
    fs.readFile(filePath, 'utf8', (err, data) => {
      replace_version({
        filePath,
        err,
        data,
        version,
        packageName,
      })
    })
  })
}

await runBuild()
