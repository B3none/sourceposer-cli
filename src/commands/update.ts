import {Command} from '@oclif/core'

export class Update extends Command {
  static description = 'update existing plugins'

  async run(): Promise<void> {
    // TODO: Implement using the steps below
    // 1. check to make sure we're in a SourceMod directory with an existing sourceposer.json
    // 2. if we are in a SourceMod directory with no sourceposer.json  suggest that the user initialise one first
    // 3. check the existing sourceposer.json for the plugin we want to update

    // 4. if not already installed then suggest that the user install it instead

    // 5. check the current version against the latest github release version
    // 6. if not on the latest version update the plugin to the latest version
    // 7. if update needed, perform update, then tell the user whether or not the plugin was installed successfully
    // 8. if no update needed, then tell the user they are on the latest version already

    // 9. update the sourceposer.json file with the installed version

    this.log('implement update command')
  }
}
