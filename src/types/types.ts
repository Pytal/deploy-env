export type DeploymentEnv = 'production' | 'preview' | 'development'
export type Argv = [DeploymentEnv,...string[]]
export type EnvVarMap = Record<string, string>
