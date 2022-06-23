import {Command} from '@oclif/core'

export class Init extends Command {
  static description = 'description of this example command'

  async run(): Promise<void> {
    console.log('running my command')
  }
}
