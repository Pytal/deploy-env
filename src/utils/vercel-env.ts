import { exec, limit } from '../helpers/helpers'
import { printStdout } from '../helpers/print'
import { getEnvVarMap } from './get-env'
import type { DeploymentEnv, EnvVarMap } from '../types/types'

const removeEnv = async (deploymentEnv: DeploymentEnv, envVarMap: EnvVarMap) => {
  const stdoutList: Promise<void>[] = []
  for (const varName in envVarMap) {
    stdoutList.push(
      limit(() => exec( `vercel env rm ${varName} ${deploymentEnv} -y` ).then(printStdout))
    )
  }

  await Promise.all(stdoutList)
}

const addEnv = async (deploymentEnv: DeploymentEnv, envVarMap: EnvVarMap) => {
  const stdoutList: Promise<void>[] = []
  for (const varName in envVarMap) {
    const varValue = envVarMap[varName]
    stdoutList.push(
      limit(() => exec( `printf %s ${varValue} | vercel env add ${varName} ${deploymentEnv}` ).then(printStdout))
    )
  }

  await Promise.all(stdoutList)
}

export const deployEnv = async (deploymentEnv: DeploymentEnv, varNameList?: string[]) => {
  const envVarMap = await getEnvVarMap(deploymentEnv, varNameList)

  await removeEnv(deploymentEnv, envVarMap)
  await addEnv(deploymentEnv, envVarMap)
}
