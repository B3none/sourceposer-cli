import {Command} from '@oclif/core'
import {isSourceModAndMetaModInstalled, isValidInstallDirectory} from '../helpers/sourcemod'
import {isAlphaNumeric} from '../helpers/validators/string'
import * as inquirer from 'inquirer'
import * as semver from 'semver'
import {createConfig, hasConfigFile, baseConfig} from '../helpers/config'

export class Init extends Command {
  static description = 'initialise sourceposer for this SourceMod installation'

  async run(): Promise<void> {
    if (!await isValidInstallDirectory()) {
      this.log('Please run this command in the server directory.')
      this.exit()
    }

    if (!await isSourceModAndMetaModInstalled()) {
      this.log('You must have installed SourceMod and MetaMod before running this command.')
      this.exit()
    }

    if (await hasConfigFile()) {
      this.log('You have already initialised sourceposer here.')
      this.exit()
    }

    // TODO: notify the user if there's already a sourceposer.json or one close by

    const answers = await inquirer.prompt([
      {
        name: 'name',
        type: 'input',
        message: 'What is the name of this project?',
        default: baseConfig.name,
        validate(input: string): boolean | string {
          if (isAlphaNumeric(input)) {
            return true
          }

          return 'Please enter an alphanumeric name.'
        },
      },
      {
        name: 'version',
        type: 'input',
        message: 'What is the version of this project?',
        default: baseConfig.version,
        validate(input: string): boolean | string {
          if (input.length === 0 || !semver.valid(input)) {
            return 'Please enter a valid version.'
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
        message: 'What is the description of this project?',
        default: baseConfig.description,
      },
      {
        name: 'author',
        type: 'input',
        message: 'Who is the author of this project?',
        default: baseConfig.author,
      },
      {
        name: 'type',
        type: 'list',
        message: 'What type of project is this?',
        choices: ['server', 'plugin'],
        default: baseConfig.type,
      },
    ])

    await createConfig({
      ...baseConfig,
      ...answers,
    })

    // TODO: ask the user if there's any plugins they would like to install to begin

    this.log('sourceposer initialised!')
  }
}
