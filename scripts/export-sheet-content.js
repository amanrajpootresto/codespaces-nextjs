const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const content = JSON.parse(fs.readFileSync(path.join(root, 'data/site.json'), 'utf8'))
delete content.contentApi

const rows = [['path', 'value', 'type']]

function addValue(value, currentPath) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => addValue(item, `${currentPath}.${index}`))
    return
  }
  if (value !== null && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => addValue(item, currentPath ? `${currentPath}.${key}` : key))
    return
  }
  const type = typeof value === 'number' ? 'number' : typeof value === 'boolean' ? 'boolean' : 'string'
  rows.push([currentPath, value ?? '', type])
}

addValue(content, '')

function csvCell(value) {
  const text = String(value)
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

const output = rows.map((row) => row.map(csvCell).join(',')).join('\n') + '\n'
const outputFile = path.join(root, 'data/google-sheet-content.csv')
fs.writeFileSync(outputFile, output)
console.log(`Exported ${rows.length - 1} content rows to ${outputFile}`)
