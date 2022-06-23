import {Command} from '@oclif/core'

export class Init extends Command {
  static description = 'initialise sourceposer for this sourcemod installation'

  async run(): Promise<void> {
    this.log('implement init command')
  }
}
