import { formatStdout } from './format'

export const printStdout = (stdout: string) => console.log( formatStdout(stdout) )
