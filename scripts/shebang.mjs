import { readFile, writeFile } from 'fs/promises'

const [,,filename] = process.argv
const shebang = '#!/usr/bin/env node\n'

const contents = await readFile( filename, 'utf-8' )
await writeFile( filename, shebang + contents )
