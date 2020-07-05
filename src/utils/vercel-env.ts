import { exec, printStdoutList } from '../helpers/helpers'
import { getEnvVarMap } from './get-env'
import type { DeploymentEnv, EnvVarMap, Stdout } from '../types/types'

const removeEnv = async (deploymentEnv: DeploymentEnv, envVarMap: EnvVarMap) => {
  const stdoutList: Promise<Stdout>[] = []
  for (const varName in envVarMap) {
    stdoutList.push(
      exec( `vercel env rm ${varName} ${deploymentEnv} -y` )
    )
  }

  await printStdoutList(stdoutList)
}

const addEnv = async (deploymentEnv: DeploymentEnv, envVarMap: EnvVarMap) => {
  const stdoutList: Promise<Stdout>[] = []
  for (const varName in envVarMap) {
    const varValue = envVarMap[varName]
    stdoutList.push(
      exec( `echo -n ${varValue} | vercel env add ${varName} ${deploymentEnv}` )
    )
  }

  await printStdoutList(stdoutList)
}

export const deployEnv = async (deploymentEnv: DeploymentEnv, varNameList: string[]|null) => {
  const envVarMap = await getEnvVarMap(deploymentEnv, varNameList)

  await removeEnv(deploymentEnv, envVarMap)
  await addEnv(deploymentEnv, envVarMap)
}
