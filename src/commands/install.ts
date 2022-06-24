import {Command} from '@oclif/core'

export class Install extends Command {
  static description = 'install a new plugin'

  static args = [{name: 'plugin', description: 'Plugin to install, example: b3none/retakes-autoplant'}]

  async run(): Promise<void> {
    // TODO: Implement using the steps below

    // if plugin passed:
    // 1. check to make sure we're in a SourceMod directory with an existing sourceposer.json
    // 2. if we are in a SourceMod directory with no sourceposer.json suggest that the user initialise one first
    // 3. check the existing sourceposer.json for the plugin we want to install

    // 4. if already installed then suggest that the user update it instead

    // 5. if no version installed run installation and don't do any checks for existing plugin to prevent overwrites
    //    then tell the user that a new version was installed

    // 6. update the sourceposer.json file with the installed version

    // if no plugin passed:
    // 1. compare current sourceposer.json against sourceposer.lock
    // 2. if no changes detected do nothing
    // 3. if changes detected install all plugins that have changed

    const {args} = await this.parse(Install)

    this.log('implement install command, ' + args.plugin)
  }
}
