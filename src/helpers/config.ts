import {ConfigType} from '../types/config'
import baseConfig from '../templates/sourceposer.base'

export async function generateBaseConfig(): Promise<ConfigType|void> {
  console.log(JSON.stringify(baseConfig))
}
