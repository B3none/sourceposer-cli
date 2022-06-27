import * as decompress from 'decompress'

function getTarballUrl(plugin: string, version: string): string {
  return `https://api.github.com/repos/${plugin}/tarball/refs/tags/${version}`
}

async function downloadTarball(plugin: string, version: string) {
  const tarballUrl = getTarballUrl(plugin, version)


}

export async function processTarball(plugin: string, version: string): Promise<boolean> {
  console.log("process tarball")
  return true
}
