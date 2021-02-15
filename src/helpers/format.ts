export const formatStdout = (stdout: string) =>
  stdout
    .replace(/.*\n/, "")
    .replace(/- Removing|- Saving|- Retrieving project…/, "")
    .trim();
