import {Command} from '@oclif/core'
import {isSourceModAndMetaModInstalled, isValidInstallDirectory} from '../helpers/sourcemod'
import {getConfigFile, hasConfigFile, hasPlugin} from '../helpers/config'
import {ConfigType} from '../types/config'
import {isAlphaNumeric} from '../helpers/validators/string'
import {getReleases} from '../helpers/releases'

export class Update extends Command {
  static description = 'update existing plugins'

  static args = [{name: 'plugin', description: 'Plugin to update, example: b3none/retakes-autoplant'}]

  async run(): Promise<void> {
    // TODO: Implement using the steps below

    // 1. check to make sure we're in a SourceMod directory with an existing sourceposer.json
    if (!await isValidInstallDirectory()) {
      this.log('Please run this command in the server directory.')
      this.exit()
    }

    // 2. if we are in a SourceMod directory with no sourceposer.json suggest that the user initialise one first
    if (!await isSourceModAndMetaModInstalled()) {
      this.log('You must have installed SourceMod and MetaMod before running this command.')
      this.exit()
    }

    if (!await hasConfigFile()) {
      this.log('You must initialise sourceposer first.')
      this.exit()
    }

    // 3. check the existing sourceposer.json for the plugin we want to update
    const config: ConfigType = await getConfigFile()

    const {args} = await this.parse(Update)

    if (!args.plugin) {
      this.log('This plugin already exists, did you mean to update?')
      return this.exit()
    }

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
      return this.exit()
    }

    this.log(`plugin ${pluginArg} specified`)

    // 4. if not already installed then suggest that the user install it instead
    if (!hasPlugin(config, pluginArg)) {
      this.log("This plugin isn't installed, did you mean to install it?")
      return this.exit()
    }

    const installedPlugin: string = config.plugins[Object.keys(config.plugins).indexOf(pluginArg)]

    // 5. check the current version against the latest github release version - https://api.github.com/repos/b3none/retakes-autoplant/tags
    const releases = await getReleases(pluginArg)

    if (!releases) {
      this.log(`Couldn't find releases for plugin: ${pluginArg}`)
      return this.exit()
    }

    // 6. if not on the latest version update the plugin to the latest version
    // 7. if update needed, perform update, then tell the user whether or not the plugin was installed successfully
    // 8. if no update needed, then tell the user they are on the latest version already

    // 9. update the sourceposer.json file with the installed version

    this.log('implement update command, ' + args.plugin)
  }
}
