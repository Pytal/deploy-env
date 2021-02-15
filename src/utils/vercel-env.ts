import { exec, limit } from "../helpers/helpers";
import { printStdout } from "../helpers/print";
import { getEnvMap } from "./get-env";
import type { DeploymentEnv, EnvMap } from "../types/types";

const removeEnv = async (deploymentEnv: DeploymentEnv, envMap: EnvMap) => {
  const stdoutArr: Promise<void>[] = [];

  for (const varName in envMap) {
    stdoutArr.push(
      limit(() =>
        exec(`vercel env rm ${varName} ${deploymentEnv} -y`).then(printStdout)
      )
    );
  }

  await Promise.all(stdoutArr);
};

const addEnv = async (deploymentEnv: DeploymentEnv, envMap: EnvMap) => {
  // new syntax: https://github.com/vercel/vercel/pull/5413 released in v21 https://github.com/vercel/vercel/releases/tag/vercel%4021.0.0
  // ref: https://github.com/vercel/vercel/blob/vercel%4021.0.0/packages/now-cli/src/types.ts#L206
  const varType = "plain";
  const stdoutArr: Promise<void>[] = [];

  for (const varName in envMap) {
    const varValue = envMap[varName];
    stdoutArr.push(
      limit(() =>
        exec(
          `printf %s "${varValue}" | vercel env add ${varType} ${varName} ${deploymentEnv}`
        ).then(printStdout)
      )
    );
  }

  await Promise.all(stdoutArr);
};

export const deployEnv = async (
  deploymentEnv: DeploymentEnv,
  varNameArr?: string[]
) => {
  const envMap = await getEnvMap(deploymentEnv, varNameArr);

  await sleep(1000);
  await removeEnv(deploymentEnv, envMap);
  await sleep(1000);
  await addEnv(deploymentEnv, envMap);
};

async function sleep(msec: number): Promise<any> {
  return new Promise((resolve) => setTimeout(resolve, msec));
}
