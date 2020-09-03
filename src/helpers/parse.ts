import type { Argv } from '../types/types'

export const parseArgv = (argv: typeof process.argv) => {
  if (
    argv[2] === 'production' ||
    argv[2] === 'preview' ||
    argv[2] === 'development'
  ) {
    const [deploymentEnv,...varNameList]: Argv = [argv[2],...argv.slice(3)]

    return { deploymentEnv, varNameList: varNameList.length ? varNameList : null }
  }
  else {
    console.log( 'Usage: deploy-env [production | preview | development] [ENV_VAR]...' )
    process.exit(9)
  }
}
