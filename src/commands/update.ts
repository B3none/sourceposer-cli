import {Command} from '@oclif/core'

export class Update extends Command {
  static description = 'find and update existing plugins'

  async run(): Promise<void> {
    this.log('implement update command')
  }
}
