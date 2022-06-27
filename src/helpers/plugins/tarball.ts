import * as decompress from 'decompress'
import * as fs from 'node:fs'
import {createIfDoesNotExist} from '../directory'
import * as request from 'request'

function getTarballUrl(plugin: string, version: string): string {
  return `https://api.github.com/repos/${plugin}/tarball/refs/tags/${version}`
}

export async function downloadTarball(plugin: string, version: string): Promise<void> {
  console.log('download tarball')

  const tarballUrl = getTarballUrl(plugin, version)

  const directory = `${process.cwd()}/tmp/${plugin}/`
  const localTarball = `${directory}${version}.tar.gz`
  await createIfDoesNotExist(directory)

  const response = await request({
    url: tarballUrl,
    headers: {
      'User-Agent': 'sourceposer',
    },
    followAllRedirects: true,
  })

  response.pipe(fs.createWriteStream(localTarball))
}

export async function processTarball(plugin: string, version: string): Promise<void> {
  // TODO: implement the following
  // 1. decompress the downloaded tar.gz
  // 2. scan the directories within the decompressed files - i've already written a function to do this in helpers/directory.ts getSubDirectories()
  // 3. copy the `addons/` and `cfg/` directories to the main sourcemod install (the same location as the sourceposer.json)
}