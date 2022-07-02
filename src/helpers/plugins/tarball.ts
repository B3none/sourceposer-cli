import {createIfDoesNotExist} from '../directory'
import * as fs from 'node:fs'
import {writeFile, readFile, unlink} from 'node:fs/promises'
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

export async function extractTarball(plugin: string, version: string): Promise<void> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    console.log('[DEBUG] process tarball')
    const localTarball = getTarball(plugin, version)

    const compressedContents = await readFile(localTarball)

    console.log('[DEBUG] decompressing tarball')
    const decompressed = await ungzip(compressedContents)

    const extractDirectory: string = getDirectory(plugin)

    console.log('[DEBUG] extracting tarball contents')
    const writePromises: Promise<void>[] = []

    const extract = tar.extract()
    .on('entry', async (header, stream, callback) => {
    // remove the top level directory
      header.name = header.name.slice(Math.max(0, header.name.indexOf('/') + 1))

      // only allow files in addons or cfg directories
      if (header.name.includes('/')) {
        const [directory] = header.name.split('/')

        if (!['addons', 'cfg'].includes(directory)) {
          return callback()
        }
      } else {
        return callback()
      }

      const path = `${extractDirectory}/${header.name}`

      if (header.type === 'directory') {
        console.log('[CREATE]', `directory: ${extractDirectory}/${header.name}`)
        createIfDoesNotExist(`${extractDirectory}/${header.name}`)
      } else if (header.type === 'file') {
        console.log('[CREATE]', `file: ${header.name}`)
        writePromises.push(writeFile(path, stream))
      }

      return callback()
    })
    .on('finish', async () => {
      await Promise.all(writePromises)

      await unlink(localTarball)

      // Resolve outer promise
      resolve()
    })

    const stream = Readable.from(decompressed.toString())
    stream.pipe(extract)

  // 3. copy the `addons/` and `cfg/` directories (if they exist) to the main sourcemod install (the same location as the sourceposer.json)
  })
}
