import {writeFile, access} from 'node:fs/promises'
import {ConfigType} from '../types/config'

export const baseConfig = {
  name: 'sourceposer',
  version: '1.0.0',
  description: 'a sourceposer managed server',
  author: 'John Doe <john.doe@johndoe.com>',
  plugins: {},
} as ConfigType

export async function hasConfigFile(): Promise<boolean> {
  return access(process.cwd() + '/sourceposer.json')
  .then(() => true)
  .catch(() => false)
}

export async function generateBaseConfig(config: ConfigType): Promise<void> {
  await writeFile(process.cwd() + '/sourceposer.json', JSON.stringify(config, null, 4))
}
