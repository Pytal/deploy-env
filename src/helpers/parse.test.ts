import { parseArgv } from './parse'

test('deploymentEnv arg is parsed into same deploymentEnv string', () => {
  const argv = ['', '', 'production']

  expect(parseArgv(argv)).toMatchObject({
    deploymentEnv: 'production',
  })
})

test('No ENV_VAR arg is parsed as null', () => {
  const argv = ['', '', 'production']

  expect(parseArgv(argv)).toMatchObject({
    varNameArr: null,
  })
})

test('Single ENV_VAR arg is parsed into [string]', () => {
  const argv = ['', '', 'production', 'API_KEY']

  expect(parseArgv(argv)).toMatchObject({
    varNameArr: ['API_KEY'],
  })
})

test('Multiple ENV_VAR args are parsed into string[]', () => {
  const argv = ['', '', 'production', 'API_KEY', 'SECRET', 'GRAPHQL_ENDPOINT']

  expect(parseArgv(argv)).toMatchObject({
    varNameArr: ['API_KEY', 'SECRET', 'GRAPHQL_ENDPOINT'],
  })
})

test('Invalid arg shoud print help message to stdout', () => {
  const argv = ['', '', 'basilisk']

  jest.spyOn(console, 'log')
  // handle process.exit so test doesn't error
  jest.spyOn(process, 'exit').mockImplementation()

  parseArgv(argv)

  const stdout =
    'Usage: deploy-env [production | preview | development] [ENV_VAR]...'
  expect(console.log).toHaveBeenCalledWith(stdout)
})

test('Invalid arg should exit process with code 9', () => {
  const argv = ['', '', 'basilisk']

  parseArgv(argv)

  const exitCode = 9
  expect(process.exit).toHaveBeenCalledWith(exitCode)
})
