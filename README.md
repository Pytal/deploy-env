# deploy-env
A CLI tool for deploying environment variables from an `.env-cmdrc.json` file to Vercel

## Installation
``` bash
npm add -g deploy-env
```
> Note: `deploy-env` expects the Vercel CLI to be installed globally with `npm add -g vercel`

## Usage
In your Vercel project directory:

Make an `.env-cmdrc.json` file with the following format:
``` jsonc
{
  "development": {
    "API_KEY": "development value"
    // development environment variables here
  },
  "preview": {
    "API_KEY": "preview value"
    // preview environment variables here
  },
  "production": {
    "API_KEY": "production value"
    // production environment variables here
  }
}
```

Run the command:
``` bash
deploy-env [production|preview|development] [ENV_VAR]...
```
> You can also use `dpl-env` as an alias for `deploy-env`

## Examples
Deploy all `preview` environment variables to the Preview deployment
``` bash
deploy-env preview
```

Deploy only the `API_KEY` environment variable to the Preview deployment
``` bash
deploy-env preview API_KEY
```

Deploy only the `API_KEY`, `SECRET`, and `GRAPHQL_ENDPOINT` environment variables to Production
``` bash
deploy-env production API_KEY SECRET GRAPHQL_ENDPOINT
```
