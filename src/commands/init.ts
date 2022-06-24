import {Command} from '@oclif/core'
import {isSourceModAndMetaModInstalled, isValidInstallDirectory} from '../helpers/sourcemod'

export class Init extends Command {
  static description = 'initialise sourceposer for this SourceMod installation'

  async run(): Promise<void> {
    if (!await isValidInstallDirectory()) {
      this.log('Please run this command at the server directory.')
      this.exit(0)
    }

    if (!await isSourceModAndMetaModInstalled()) {
      this.log('You must have installed SourceMod and MetaMod before running this command.')
      this.exit(0)
    }

    // 1. check to make sure we're in a SourceMod directory
    // 2. notify the user if there's already a sourceposer.json or one close by
    // 3. ask the user for the name (default sourceposer)
    // 4. ask the user for the version (default 0.0.0)
    // 5. ask the user for the description (default a sourceposer managed server)
    // 6. put those values into the sourceposer.base.json and then save it to ./sourceposer.json
    //    relative to where the command was run

    // Nice to have
    // 6. ask the user if there's any plugins they would like to install to begin

    this.log('implement init command')
  }
}
