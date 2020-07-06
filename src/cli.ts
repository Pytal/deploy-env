import { parseArgv } from './helpers/parse'
import { deployEnv } from './utils/vercel-env'

const { deploymentEnv, varNameList } = parseArgv(process.argv)
if (!varNameList) deployEnv(deploymentEnv)
else deployEnv(deploymentEnv, varNameList)
