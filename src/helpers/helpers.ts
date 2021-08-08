import { promises as fs } from 'fs'
import { exec as execCallback } from 'child_process'
import pLimit = require('p-limit')
const { access } = fs

export const exists = (path: string): Promise<boolean> =>
  access(path)
    .then(_ => true)
    .catch(_ => false)

export const exec = (cmd: string): Promise<string> =>
  new Promise((res, _rej) =>
    execCallback(cmd, (_, stdout, stderr) => res(stdout + stderr)),
  )

export const limit = pLimit(8)
