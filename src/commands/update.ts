import {Command} from '@oclif/core'

export class Update extends Command {
  static description = 'update existing plugins'

  async run(): Promise<void> {
    this.log('implement update command')
  }
}
