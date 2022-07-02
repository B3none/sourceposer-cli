import {Dirent} from 'node:fs'
import {readdir} from 'node:fs/promises'
import {existsSync, mkdirSync} from 'node:fs'

export async function getSubDirectories(source: string): Promise<string[]> {
  const children: Dirent[] = await readdir(source, {withFileTypes: true})

  return children.filter(dirent => dirent.isDirectory()).map(directory => directory.name)
}

export function doesDirectoryExist(directory: string): boolean {
  return existsSync(directory)
}

export function createIfDoesNotExist(directory: string, recursive = true): void {
  if (!doesDirectoryExist(directory)) {
    mkdirSync(directory, {
      recursive,
    })
  }
}

export function getInstallDirectory(): string {
  return process.cwd()
}

export function getPluginDirectory(plugin: string, isTemp = false): string {
  return `${getInstallDirectory()}/${isTemp ? 'tmp/' : ''}${plugin}`
}
