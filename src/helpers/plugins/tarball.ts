import {createIfDoesNotExist} from '../directory'
import * as fs from 'node:fs'
import {writeFile, readFile} from 'node:fs/promises'
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

  const directory = getDirectory(plugin)
  const localTarball = `${directory}/${version}.tar.gz`

  console.log('writing:', localTarball)
  await createIfDoesNotExist(directory)

  console.log('fetching:', tarballUrl)
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
  const localTarball = getTarball(plugin, version)

  const compressedContents = await readFile(localTarball)

  console.log('decompressing tarball')
  const decompressed = await ungzip(compressedContents)

  const extractDirectory: string = getDirectory(plugin)

  console.log('extracting tarball contents')
  const extract = tar.extract()
  .on('entry', async (header, stream, callback) => {
    // remove the top level directory
    header.name = header.name.slice(Math.max(0, header.name.indexOf('/') + 1))

    // only allow addons or cfg directories
    if (header.name.includes('/')) {
      const [directory] = header.name.split('/')

      if (!['addons', 'cfg'].includes(directory)) {
        return callback()
      }
    }

    // call callback() when you're done with this entry
    const path = `${extractDirectory}/${header.name}`
    // let data = ''

    if (header.type === 'directory') {
      console.log('creating directory:', `${extractDirectory}/${header.name}`)
      createIfDoesNotExist(`${extractDirectory}/${header.name}`)
    } else if (header.type === 'file') {
      console.log('writing file:', header.name)
      await writeFile(path, stream)
    }

    return callback()
  })
  .on('finish', () => {
    console.log('done!')
  })

  const stream = Readable.from(decompressed.toString())
  stream.pipe(extract)

  // 2. scan the directories within the decompressed files - i've already written a function to do this in helpers/directory.ts getSubDirectories()

  // 3. copy the `addons/` and `cfg/` directories (if they exist) to the main sourcemod install (the same location as the sourceposer.json)
}
