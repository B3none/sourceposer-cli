import {downloadTarball, extractTarball} from './tarball'
import {getPluginDirectory} from '../directory'

export async function fetchPlugins(plugins: Record<string, string>): Promise<(string|true)[]> {
  const promises: Promise<string|true>[] = []

  Object.keys(plugins).map(plugin => promises.push(fetchPluginData(plugin, plugins[plugin])))

  return Promise.all(promises)
}

// TODO: implement
export async function fetchPluginData(plugin: string, version: string): Promise<string|true> {
  // await downloadTarball(plugin, version)
  await extractTarball(plugin, version)

  return true
}
