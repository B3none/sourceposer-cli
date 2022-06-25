import {Command} from '@oclif/core'
import {getConfigFile, hasConfigFile, hasPlugin} from '../helpers/config'
import {isSourceModAndMetaModInstalled, isValidInstallDirectory} from '../helpers/sourcemod'
import {ConfigType} from '../types/config'

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
      this.log('Plugin passed')
      const [plugin, version] = args.plugin.split('@')

      if (hasPlugin(config, plugin)) {
        this.log('This plugin already exists, did you meant to update?')
        this.exit()
      }

      if (version) {
        this.log(`version ${version} specified`)
      }
    }

    // perform install
    this.log('perform install')

    // TODO: Implement using the steps below

    // 1. check to make sure we're in a SourceMod directory with an existing sourceposer.json
    // 2. if we are in a SourceMod directory with no sourceposer.json suggest that the user initialise one first

    // if plugin passed:
    // 3. check the existing sourceposer.json for the plugin we want to install
    // 4. if already installed then suggest that the user update it instead

    // 5. if no version installed run installation and don't do any checks for existing plugin to prevent overwrites
    //    then tell the user that a new version was installed

    // 6. update the sourceposer.json file with the installed version

    // if no plugin passed:
    // 1. compare current sourceposer.json against sourceposer.lock
    // 2. if no changes detected do nothing
    // 3. if changes detected install all plugins that have changed

    this.log('implement install command')
  }
}
