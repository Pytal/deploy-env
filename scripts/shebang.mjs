import { readFile, writeFile } from 'fs/promises'

const [,,file] = process.argv

const shebang = '#!/usr/bin/env node\n'
const contents = await readFile( file, 'utf-8' )

await writeFile( file, shebang + contents )
