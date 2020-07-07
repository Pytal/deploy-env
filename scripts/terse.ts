import { readFile, writeFile, readdir, stat } from 'fs/promises'
import { extname } from 'path'
import { minify } from 'terser'

const terseDir = async (dir: string) => {
  const subPaths = await readdir(dir)

  for (const subPath of subPaths) await terse(`${dir}/${subPath}`)
}

const terseFile = async (file: string) => {
  if (extname(file) === '.js') {
    const { code: tersed } = minify( await readFile( file, 'utf-8' ) )
    await writeFile( file, tersed )
  }
}

const terse = async (path: string) => {
  const curr = await stat(path)

  if (curr.isFile()) await terseFile(path)
  else await terseDir(path)
}

// CLI
const [,,path] = process.argv
terse(path)
