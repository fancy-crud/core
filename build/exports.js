const path = require('path')
const fs = require('fs')

const rootDir = path.resolve(__dirname, '..')
const entry = path.resolve(rootDir, 'src')
const entryFile = path.resolve(entry, 'index.ts')

async function autoExport() {
  const START = '// START_EXPORTS'
  const END = '// END_EXPORTS'
  const regex = new RegExp(`${START}[\\s\\S]*?${END}`, 'im')

  const exports = []

  const code = fs.readFileSync(entryFile, 'utf8')
  const target = exports ? `${START}\n${exports}\n${END}` : `${START}${END}`

  fs.writeFileSync(entryFile, code.replace(regex, target))
}

autoExport()
