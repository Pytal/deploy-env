export type DeploymentEnv = "production" | "preview" | "development";
export type Argv = [DeploymentEnv, ...string[]];
export type EnvMap = Record<string, string>;
