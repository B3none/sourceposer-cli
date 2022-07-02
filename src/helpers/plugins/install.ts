import {downloadTarball, extractTarball} from './tarball'
import {getPluginDirectory} from '../directory'

export async function installPlugins(plugins: Record<string, string>): Promise<(string|true)[]> {
  const promises: Promise<string|true>[] = []

  Object.keys(plugins).map(plugin => promises.push(installPlugin(plugin, plugins[plugin])))

  return Promise.all(promises)
}

async function processInstall(plugin: string, version: string): Promise<void> {
  // 3. copy the `addons/` and `cfg/` directories (if they exist) to the main sourcemod install (the same location as the sourceposer.json)

  console.log('[DEBUG] copy over contents')

  const oldPluginDirectory = getPluginDirectory(plugin, false)
  const newPluginDirectory = getPluginDirectory(plugin, true)
}

// TODO: implement
export async function installPlugin(plugin: string, version: string): Promise<string|true> {
  // await downloadTarball(plugin, version)
  await extractTarball(plugin, version)
  await processInstall(plugin, version)

  return true
}
