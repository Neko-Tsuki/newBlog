/* This is a script to create a new diary entry markdown file with front-matter */

import fs from "fs"
import path from "path"

function getDateTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const seconds = String(now.getSeconds()).padStart(2, "0")

  return {
    date: `${year}-${month}-${day}`,
    datetime: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
    timestamp: `${hours}${minutes}${seconds}`
  }
}

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error(`Error: No filename argument provided
Usage: pnpm new-diary <filename>`)
  process.exit(1)
}

let fileName = args[0]

// Add .md extension if not present
const fileExtensionRegex = /\.(md)$/i
if (!fileExtensionRegex.test(fileName)) {
  fileName += ".md"
}

const { date, timestamp } = getDateTime()
const timestampedFileName = `${date}-${timestamp}-${fileName}`
const targetDir = "./src/content/diary/"
const fullPath = path.join(targetDir, timestampedFileName)

if (fs.existsSync(fullPath)) {
  console.error(`Error: File ${fullPath} already exists`)
  process.exit(1)
}

const content = `---
published: ${getDateTime().datetime}
tags: []
mood: ""
---

`

fs.writeFileSync(fullPath, content)

console.log(`Diary entry created: ${fullPath}`)
