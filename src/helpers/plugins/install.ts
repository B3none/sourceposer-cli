import {downloadTarball, extractTarball} from './tarball'

export async function installPlugins(plugins: Record<string, string>): Promise<(string|null)[]> {
  const promises: Promise<string|null>[] = []

  Object.keys(plugins).map(plugin => promises.push(installPlugin(plugin, plugins[plugin])))

  return Promise.all(promises)
}

// TODO: implement
export async function installPlugin(plugin: string, version: string): Promise<string|null> {
  // await downloadTarball(plugin, version)
  await extractTarball(plugin, version)

  console.log('[DEBUG] copy over contents')

  return ''
}
