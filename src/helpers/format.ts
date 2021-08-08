export const formatStdout = (stdout: string): string =>
  stdout
    .replace(/.*\n/, '')
    .replace(/- Removing|- Saving|- Retrieving project…/, '')
    .trim()
