import { exec as execCallback } from 'child_process'

export const exec = (cmd: string): Promise<string> => new Promise( (res,rej) =>
  execCallback( cmd, (_,stdout,stderr) => res(stdout + stderr) )
)
