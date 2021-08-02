import * as fs from 'node:fs/promises'

const [,,filepath] = process.argv
const shebang = '#!/usr/bin/env node\n'
const contents = await fs.readFile(filepath, 'utf-8')

await fs.writeFile(filepath, shebang + contents)
