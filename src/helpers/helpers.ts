import { exec as execCallback } from 'child_process'
import type { Stdout } from '../types/types'

export const exec = (cmd: string): Promise<Stdout> => new Promise( (res,rej) =>
  execCallback( cmd, (_,stdout,stderr) => res({ stdout, stderr }) )
)

const format = (stdout: string) => (
  stdout
    .replace( /.*\n/, '' )
    .replace( /- Removing|- Saving/, '' )
    .trim()
)

export const printStdoutList = async (stdoutList: Promise<Stdout>[]) => {
  for await ( const { stdout, stderr } of stdoutList ) {
    console.log( format(stdout || stderr) )
  }
}
