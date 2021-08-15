module.exports = {
  transform: {
    '^.+\\.ts$': 'esbuild-jest',
  },
  collectCoverage: true,
  coverageProvider: 'babel',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
}
