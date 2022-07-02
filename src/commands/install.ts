import {Command} from '@oclif/core'
import {getConfigFile, hasConfigFile, hasPlugin, saveConfig} from '../helpers/config'
import {isSourceModAndMetaModInstalled, isValidInstallDirectory} from '../helpers/sourcemod'
import {ConfigType} from '../types/config'
import {getReleases} from '../helpers/releases'
import {isAlphaNumeric} from '../helpers/validators/string'
import {fetchPluginData, fetchPlugins} from '../helpers/plugins/fetch'
import {processInstall} from '../helpers/plugins/install'

export class Install extends Command {
  static aliases = ['i']

  static description = 'install a new plugin'

  static args = [{name: 'plugin', description: 'Plugin to install, example: b3none/retakes-autoplant'}]

  async run(): Promise<void> {
    if (!await isValidInstallDirectory()) {
      this.log('Please run this command in the server directory.')
      this.exit()
    }

    if (!await isSourceModAndMetaModInstalled()) {
      this.log('You must have installed SourceMod and MetaMod before running this command.')
      this.exit()
    }

    if (!await hasConfigFile()) {
      this.log('You must initialise sourceposer first.')
      this.exit()
    }

    const config: ConfigType = await getConfigFile()

    const {args} = await this.parse(Install)

    if (args.plugin) {
      if (typeof args.plugin !== 'string') {
        this.log('Invalid plugin string')
        return this.exit()
      }

      const pluginArg: string = args.plugin.trim()

      if (
        pluginArg.length === 0 ||
        pluginArg.includes(' ') ||
        !pluginArg.includes('/') ||
        pluginArg.split('/').filter((i: string) => i).length !== 2 ||
        !isAlphaNumeric(pluginArg, '-_/')
      ) {
        this.log('Invalid plugin string')
        this.exit()
      }

      const [plugin, version] = args.plugin.split('@')

      this.log(`plugin ${plugin} specified`)

      if (hasPlugin(config, plugin)) {
        this.log('This plugin already exists, did you mean to update?')
        this.exit()
      }

      const releases: Record<string, string>|null = await getReleases(plugin)

      if (!releases) {
        this.log(`${plugin} does not exist and cannot be installed`)
        return this.exit() // this is for the type guard
      }

      const releaseVersions: string[] = Object.keys(releases)

      if (releaseVersions.length === 0) {
        this.log(`${plugin} does not have any releases and cannot be installed`)
        this.exit()
      }

      if (version) {
        this.log(`version ${version} specified`)

        if (!releaseVersions.includes(version)) {
          this.log(`${plugin} does not have a release version ${version}`)
          this.exit()
        }

        config.plugins[plugin] = version
      } else {
        const latestVersion: string = releaseVersions[0]

        this.log('version not specified')
        this.log(`adding version ${latestVersion}`)

        config.plugins[plugin] = latestVersion
      }

      await saveConfig(config)
    }

    // perform install
    console.log('[DEBUG] perform install')

    await fetchPlugins(config.plugins)
    await processInstall(config.plugins)
    // TODO: Implement using the steps below

    // 5. if no version installed run installation and don't do any checks for existing plugin to prevent overwrites
    //    then tell the user that a new version was installed

    // 6. update the sourceposer.json file with the installed version

    // if no plugin passed:
    // 1. compare current sourceposer.json against sourceposer.lock
    // 2. if no changes detected do nothing
    // 3. if changes detected install all plugins that have changed
  }
}
