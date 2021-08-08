import { formatStdout } from './format'

export const printStdout = (stdout: string): void =>
  console.log(formatStdout(stdout))
