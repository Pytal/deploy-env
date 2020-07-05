export type DeploymentEnv = 'production' | 'preview' | 'development'
export interface EnvVarMap { [key:string]: string }
export interface Stdout { stdout: string, stderr: string }
