import {Command} from '@oclif/core'
import {isSourceModAndMetaModInstalled, isValidInstallDirectory} from '../helpers/sourcemod'
import {isAlphaNumeric} from '../validators/string'
import * as inquirer from 'inquirer'
import * as semver from 'semver'

export class Init extends Command {
  static description = 'initialise sourceposer for this SourceMod installation'

  async run(): Promise<void> {
    if (!await isValidInstallDirectory()) {
      this.log('Please run this command at the server directory.')
      this.exit()
    }

    // 1. check to make sure we're in a SourceMod directory
    if (!await isSourceModAndMetaModInstalled()) {
      this.log('You must have installed SourceMod and MetaMod before running this command.')
      this.exit()
    }

    // TODO: notify the user if there's already a sourceposer.json or one close by

    const answers = await inquirer.prompt([
      {
        name: 'name',
        type: 'input',
        message: 'What is the name of this server?',
        default: 'sourceposer',
        validate(input: string): boolean | string {
          if (isAlphaNumeric(input)) {
            return true
          }

          return 'Please enter an alphanumeric name'
        },
      },
      {
        name: 'version',
        type: 'input',
        message: 'What is the version of this server?',
        default: '1.0.0',
        validate(input: string): boolean | string {
          if (input.length === 0 || !semver.valid(input)) {
            return 'Please enter a valid version'
          }

          return true
        },
        filter(input: string): string {
          return semver.clean(input) || ''
        },
      },
      {
        name: 'description',
        type: 'input',
        message: 'What is the description of this server?',
        default: 'A sourceposer managed server',
      },
    ])

    console.log(answers)

    // 6. put those values into the sourceposer.base.json and then save it to ./sourceposer.json
    //    relative to where the command was run

    // TODO: ask the user if there's any plugins they would like to install to begin

    this.log('implement init command')
  }
}
