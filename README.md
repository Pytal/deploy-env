# deploy-env

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Pytal/deploy-env/Publish?label=CI&style=for-the-badge)](https://github.com/Pytal/deploy-env/actions) [![npm](https://img.shields.io/npm/v/deploy-env?style=for-the-badge)](https://www.npmjs.com/package/deploy-env)

Deploy environment variables from `.env` and `.env-cmdrc.json` files to Vercel.

## Installation

```bash
npm add -g deploy-env
```

> `deploy-env` expects the Vercel CLI to be installed globally with `npm add -g vercel`

## Usage

In your Vercel project directory:

Make at least one `.env`, `.env.production`, `.env.preview`, or `.env.development` file with your environment variables in the following format:

```env
API_KEY=top_secret_api_key
TOKEN=some_secret_token
...
```

You can also make a `.env-cmdrc.json` file with the following format:

```jsonc
{
  "development": {
    "API_KEY": "development value"
    // development environment variables
  },
  "preview": {
    "API_KEY": "preview value"
    // preview environment variables
  },
  "production": {
    "API_KEY": "production value"
    // production environment variables
  }
}
```

Run the command:

```bash
deploy-env [production | preview | development] [ENV_VAR]...
```

> `dpl-env` can be used as an alias for `deploy-env`

> If a `.env.[environment]` file doesn't exist when running: `deploy-env [environment]`, the `.env` file will be used and deployed to the environment specified in the command

## Examples

Deploy all `preview` environment variables to the Preview deployment

```bash
deploy-env preview
```

Deploy only the `API_KEY` environment variable to the Preview deployment

```bash
deploy-env preview API_KEY
```

Deploy only the `API_KEY`, `TOKEN`, and `GRAPHQL_ENDPOINT` environment variables to Production

```bash
deploy-env production API_KEY TOKEN GRAPHQL_ENDPOINT
```

## Programmatic API

### `deployEnv`

A function which deploys environment variables from `.env` and `.env-cmdrc.json` files:

- `deploymentEnv` { `'production' | 'preview' | 'development'` }: Deployment environment to be deployed to
- `varNameList` { `string[]` }: (optional) List of environment variables to be deployed
- **Returns** { `Promise<void>` }: Promise which resolves when deployment completes

## Related Projects

[`env-cmd`](https://github.com/toddbluhm/env-cmd) - simple node program for executing commands using an environment from an env file

[`dotenv`](https://github.com/motdotla/dotenv) - module that loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env)
