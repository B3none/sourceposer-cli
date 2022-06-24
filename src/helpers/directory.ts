import {Dirent, promises} from 'node:fs'
const {readdir} = promises

export async function getSubDirectories(source: string): Promise<string[]> {
  const children: Dirent[] = await readdir(source, {withFileTypes: true})

  return children.filter(dirent => dirent.isDirectory()).map(directory => directory.name)
}
