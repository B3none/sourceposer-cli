import {getSubDirectories} from './directory'

export async function isValidInstallDirectory(directory: string|null = null): Promise<boolean> {
  if (!directory) {
    directory = process.cwd()
  }

  const subDirectories: string[] = await getSubDirectories(directory)

  if (!subDirectories.includes('addons') && !subDirectories.includes('cfg')) {
    return false
  }

  return true
}

export async function isSourceModAndMetaModInstalled(installDirectory: string|null = null): Promise<boolean> {
  if (!installDirectory) {
    installDirectory = process.cwd()
  }

  const subDirectories: string[] = await getSubDirectories(`${installDirectory}/addons`)

  if (!subDirectories.includes('metamod') && !subDirectories.includes('sourcemod')) {
    return false
  }

  return true
}
