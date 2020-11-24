import { exists } from '../helpers/helpers'
import { GetEnvVars } from 'env-cmd'
import type { DeploymentEnv, EnvMap } from '../types/types'

export const getEnvMap = async (deploymentEnv: DeploymentEnv, varNameArr?: string[]) => {
  let envMap: EnvMap

  if (await exists(`.env.${deploymentEnv}`)) {
    envMap = await GetEnvVars({ envFile: { filePath: `.env.${deploymentEnv}` } })
  }
  else if (await exists('.env')) {
    envMap = await GetEnvVars({ envFile: { filePath: '.env' } })
  }
  else {
    envMap = await GetEnvVars({ rc: { environments: [deploymentEnv] } })
  }

  if (varNameArr) {
    const filteredEnvMap: EnvMap = {}
    for (const varName of varNameArr) filteredEnvMap[varName] = envMap[varName]
    return filteredEnvMap
  }

  return envMap
}
