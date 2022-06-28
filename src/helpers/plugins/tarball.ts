import {createIfDoesNotExist} from '../directory'
import * as fs from 'node:fs'
import * as request from 'request'
import * as tar from 'tar-stream'
import {ungzip} from 'node-gzip'
import {Readable} from 'node:stream'

function getTarballUrl(plugin: string, version: string): string {
  return `https://api.github.com/repos/${plugin}/tarball/refs/tags/${version}`
}

function getDirectory(plugin: string): string {
  return `${process.cwd()}/tmp/${plugin}`
}

function getTarball(plugin: string, version: string): string {
  return `${getDirectory(plugin)}/${version}.tar.gz`
}

export async function downloadTarball(plugin: string, version: string): Promise<void> {
  console.log('download tarball')

  const tarballUrl = getTarballUrl(plugin, version)

  const directory = `${process.cwd()}/tmp/${plugin}`
  const localTarball = `${directory}/${version}.tar.gz`
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
  console.log('process tarball')
  // TODO: implement the following
  const localTarball = getTarball(plugin, version)

  const compressedContents = fs.readFileSync(localTarball)

  const decompressed = await ungzip(compressedContents)

  console.log(decompressed.toJSON())

  const extract = tar.extract()
  .on('entry', (header, stream, callback) => {
    // make directories or files depending on the header here...
    // call callback() when you're done with this entry

    console.log('file', header, stream, callback)
  })
  .on('finish', () => {
    console.log('done!')
  })

  const stream = Readable.from(decompressed.toString())
  stream.pipe(extract)

  // 2. scan the directories within the decompressed files - i've already written a function to do this in helpers/directory.ts getSubDirectories()

  // 3. copy the `addons/` and `cfg/` directories (if they exist) to the main sourcemod install (the same location as the sourceposer.json)
}
