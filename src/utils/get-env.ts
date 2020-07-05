import { GetEnvVars } from 'env-cmd'
import type { DeploymentEnv, EnvVarMap } from '../types/types'

export const getEnvVarMap = async (deploymentEnv: DeploymentEnv, varNameList: string[]|null) => {
  const envVarMap: EnvVarMap = await GetEnvVars({ rc: { environments: [deploymentEnv] } })

  if (varNameList) {
    const filteredEnvVarMap: EnvVarMap = {}
    for (const varName of varNameList) filteredEnvVarMap[varName] = envVarMap[varName]
    return filteredEnvVarMap
  }

  return envVarMap
}
