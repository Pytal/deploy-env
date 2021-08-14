import { promises as fs } from 'node:fs'
import { extname } from 'node:path'
import { minify } from 'terser'

const terseDir = async (dirPath: string) => {
  const subPaths = await fs.readdir(dirPath)

  for (const subPath of subPaths) await terse(`${dirPath}/${subPath}`)
}

const terseFile = async (filePath: string) => {
  if (extname(filePath) === '.js') {
    const output = await minify(await fs.readFile(filePath, 'utf-8'))
    if (output.code) await fs.writeFile(filePath, output.code)
  }
}

const terse = async (path: string) => {
  const curr = await fs.stat(path)

  if (curr.isFile()) await terseFile(path)
  else await terseDir(path)
}

// CLI
const [, , path] = process.argv
terse(path)
