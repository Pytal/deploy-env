import { access } from 'fs/promises'
import { exec as execCallback } from 'child_process'
import pLimit = require('p-limit')

export const exists = (path: string) => access(path).then(_ => true).catch(_ => false)

export const exec = (cmd: string): Promise<string> => new Promise( (res,rej) =>
  execCallback( cmd, (_,stdout,stderr) => res(stdout + stderr) )
)

export const limit = pLimit(8)
