import { promises as fs } from 'fs'
import { exec as execCallback } from 'child_process'
const { access } = fs
import { pRateLimit } from 'p-ratelimit'

export const limit = pRateLimit({
  interval: 1000 * 10,
  rate: 9,
  concurrency: 3,
})

export const exists = (path: string): Promise<boolean> =>
  access(path)
    .then(_ => true)
    .catch(_ => false)

export const exec = (cmd: string): Promise<string> =>
  new Promise((res, _rej) =>
    execCallback(cmd, (_, stdout, stderr) => res(stdout + stderr)),
  )
