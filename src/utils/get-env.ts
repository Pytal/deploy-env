import { readFile } from 'fs/promises'
import { exists } from '../helpers/helpers'
import { GetEnvVars } from 'env-cmd'
import { parse } from 'dotenv'
import type { DeploymentEnv, EnvVarMap } from '../types/types'

export const getEnvVarMap = async (deploymentEnv: DeploymentEnv, varNameList?: string[]) => {
  let envVarMap: EnvVarMap

  if (await exists(`.env.${deploymentEnv}`)) {
    const dotenv = await readFile( `.env.${deploymentEnv}`, 'utf-8' )
    envVarMap = parse(dotenv)
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
