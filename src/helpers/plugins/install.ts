import {getPluginDirectory} from '../directory'
import {readdir} from 'node:fs/promises'

export async function processInstall(plugins: Record<string, string>): Promise<void> {
  // 3. copy the `addons/` and `cfg/` directories (if they exist) to the main sourcemod install (the same location as the sourceposer.json)

  console.log('[DEBUG] copy over contents')

  const pluginNames = Object.keys(plugins)

  pluginNames.map(async (plugin) => {
    const version = plugins[plugin]

    const oldPluginDirectory: string = getPluginDirectory(plugin, false)
    const oldPluginFiles: string[] = await readdir(oldPluginDirectory)

    const newPluginDirectory: string = getPluginDirectory(plugin, true)
    const newPluginFiles: string[] = await readdir(newPluginDirectory)


  })
}
