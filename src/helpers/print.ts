import { formatStdout } from './format'

export const printStdoutList = async (stdoutList: Promise<string>[]) => {
  for await (const stdout of stdoutList) {
    console.log( formatStdout(stdout) )
  }
}
