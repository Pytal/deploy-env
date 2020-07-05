import { readFile, writeFile } from 'fs/promises'

const filename = process.argv[2]
const shebang = '#!/usr/bin/env node'

const contents = await readFile( filename, 'utf-8' )
await writeFile( filename, shebang + '\n' + contents )
