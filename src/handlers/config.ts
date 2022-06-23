export function processConfigUpdate(old: string, latest: string): string {
  // If our old config file is the same as the new config file, return the newer version
  if (old === latest) {
    return latest
  }

  return ''
}
