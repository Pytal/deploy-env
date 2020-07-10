import type { DeploymentEnv } from '../types/types'

export const parseArgv = (argv: typeof process.argv) => {
  if (
    argv[2] === 'production' ||
    argv[2] === 'preview' ||
    argv[2] === 'development'
  ) {
    let deploymentEnv: DeploymentEnv
    let varNameList: string[]|null
    ;[,,deploymentEnv,...varNameList] = argv
    if (!varNameList.length) varNameList = null

    return { deploymentEnv, varNameList }
  }
  else {
    console.log( 'Usage: deploy-env [production | preview | development] [ENV_VAR]...' )
    process.exit(9)
  }
}
