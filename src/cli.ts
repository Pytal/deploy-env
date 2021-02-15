import { parseArgv } from "./helpers/parse";
import { deployEnv } from "./utils/vercel-env";

const { deploymentEnv, varNameArr } = parseArgv(process.argv);
if (!varNameArr) deployEnv(deploymentEnv);
else deployEnv(deploymentEnv, varNameArr);
