import type { DeploymentEnv } from '../types/shared'

export const parseArgv = (
  argv: typeof process.argv,
): {
  deploymentEnv: DeploymentEnv
  varNameArr: string[] | null
} => {
  if (
    argv[2] === 'production' ||
    argv[2] === 'preview' ||
    argv[2] === 'development'
  ) {
    const [deploymentEnv, ...varNameArr]: [DeploymentEnv, ...string[]] = [
      argv[2],
      ...argv.slice(3),
    ]

    return { deploymentEnv, varNameArr: varNameArr.length ? varNameArr : null }
  } else {
    console.log(
      'Usage: deploy-env [production | preview | development] [ENV_VAR]...',
    )
    process.exit(9)
  }
}
