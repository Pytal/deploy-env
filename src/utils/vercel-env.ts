import { exec, limit } from '../helpers/helpers'
import { printStdout } from '../helpers/print'
import { getEnvMap } from './get-env'
import type { DeploymentEnv, EnvMap } from '../types/types'

const removeEnv = async (deploymentEnv: DeploymentEnv, envMap: EnvMap) => {
  const stdoutArr: Promise<void>[] = []

  for (const varName in envMap) {
    stdoutArr.push(
      limit(() => exec(`vercel env rm ${varName} ${deploymentEnv} -y`).then(printStdout))
    )
  }

  await Promise.all(stdoutArr)
}

const addEnv = async (deploymentEnv: DeploymentEnv, envMap: EnvMap) => {
  // new syntax: https://github.com/vercel/vercel/pull/6049 released in v22 https://github.com/vercel/vercel/releases/tag/vercel%4022.0.0
  const stdoutArr: Promise<void>[] = []

  for (const varName in envMap) {
    const varValue = envMap[varName]
    stdoutArr.push(
      limit(() => exec(`printf %s "${varValue}" | vercel env add ${varName} ${deploymentEnv}`).then(printStdout)),
    )
  }

  await Promise.all(stdoutArr)
}

export const deployEnv = async (deploymentEnv: DeploymentEnv, varNameArr?: string[]) => {
  const envMap = await getEnvMap(deploymentEnv, varNameArr)

  await removeEnv(deploymentEnv, envMap)
  await addEnv(deploymentEnv, envMap)
}
