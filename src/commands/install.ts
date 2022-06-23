import {Command} from '@oclif/core'

export class Install extends Command {
  static description = 'install a new plugin'

  async run(): Promise<void> {
    this.log('implement init command')
  }
}
