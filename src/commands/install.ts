import {Command} from '@oclif/core'

export class Install extends Command {
  static description = 'install a new plugin'

  async run(): Promise<void> {
    // TODO: Implement using the steps below
    // 1. check to make sure we're in a SourceMod directory with an existing sourceposer.json
    // 2. if we are in a SourceMod directory with no sourceposer.json ask the user if they would like to initialise one
    // 3. check the existing sourceposer.json for the plugin we want to install

    // 4. if already installed check the current version against the latest github release version
    // 5. if not on the latest version update the plugin to the latest version
    // 6. if update needed, perform update, then tell the user whether or not the plugin was installed successfully
    // 7. if no update needed, then tell the user they are on the latest version already

    // 8. if no version installed run installation and don't do any checks for existing plugin to prevent overwrites
    //    then tell the user that a new version was installed

    // 9. update the sourceposer.json file with the installed version

    this.log('implement install command')
  }
}
