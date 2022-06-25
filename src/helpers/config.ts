import {access, readFile, writeFile} from 'node:fs/promises'
import {ConfigType} from '../types/config'

export const baseConfig = {
  name: 'sourceposer',
  version: '1.0.0',
  description: 'a sourceposer managed server',
  author: 'server developer',
  type: 'server',
  plugins: {},
} as ConfigType

export async function hasConfigFile(): Promise<boolean> {
  return access(process.cwd() + '/sourceposer.json')
  .then(() => true)
  .catch(() => false)
}

export async function getConfigFile(): Promise<ConfigType> {
  const contents: Buffer = await readFile(process.cwd() + '/sourceposer.json')

  return JSON.parse(contents.toString()) as ConfigType
}

// TODO: ensure this was actually created / handle errors
export async function createConfig(config: ConfigType): Promise<void> {
  await writeFile(process.cwd() + '/sourceposer.json', JSON.stringify(config, null, 4))
}

export function hasPlugin(config: ConfigType, plugin: string): boolean {
  return Object.keys(config.plugins).includes(plugin)
}
