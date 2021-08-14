import * as fs from 'node:fs/promises'

const [, , filePath] = process.argv
const shebang = '#!/usr/bin/env node\n'
const contents = await fs.readFile(filePath, 'utf-8')

await fs.writeFile(filePath, shebang + contents)
