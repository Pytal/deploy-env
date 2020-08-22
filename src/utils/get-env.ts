import { exists } from '../helpers/helpers'
import { GetEnvVars } from 'env-cmd'
import type { DeploymentEnv, EnvVarMap } from '../types/types'

export const getEnvVarMap = async (deploymentEnv: DeploymentEnv, varNameList?: string[]) => {
  let envVarMap: EnvVarMap

  if (await exists(`.env.${deploymentEnv}`) ?? await exists('.env')) {
    envVarMap = await GetEnvVars({ envFile: { filePath: `.env.${deploymentEnv}`, fallback: true } })
  }
  else {
    envVarMap = await GetEnvVars({ rc: { environments: [deploymentEnv] } })
  }

  if (varNameList) {
    const filteredEnvVarMap: EnvVarMap = {}
    for (const varName of varNameList) filteredEnvVarMap[varName] = envVarMap[varName]
    return filteredEnvVarMap
  }

  return envVarMap
}
