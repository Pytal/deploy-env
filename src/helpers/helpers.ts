import { promises as fs } from 'fs'
import { exec as execCallback } from 'child_process'
const { access } = fs
import { pRateLimit } from 'p-ratelimit'

// limit to 100 requests per minute (actual limit is 120 per minute)
export const limit = pRateLimit({
  interval: 1000 * 60,
  rate: 100,
  concurrency: 4,
})

export const exists = (path: string): Promise<boolean> =>
  access(path)
    .then(_ => true)
    .catch(_ => false)

export const exec = (cmd: string): Promise<string> =>
  new Promise((res, _rej) =>
    execCallback(cmd, (_, stdout, stderr) => res(stdout + stderr)),
  )
