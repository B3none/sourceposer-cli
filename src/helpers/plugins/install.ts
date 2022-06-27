import { processTarball } from "./tarball"
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';

export async function installPlugins(plugins: Record<string, string>): Promise<(string|null)[]> {
  const promises: Promise<string|null>[] = []

  Object.keys(plugins).map(plugin => {
    promises.push(installPlugin(plugin, plugins[plugin]))
  })

  return Promise.all(promises)
}

// TODO: implement
export async function installPlugin(plugin: string, version: string): Promise<string|null> {
  const tempDirectory: string = process.cwd() + "/tmp/";
  console.log("I'M HERE");
  fsPromises.access(tempDirectory, fs.constants.F_OK)
   .catch(async() => {
    console.log("making directory", tempDirectory);
    await fs.mkdir(tempDirectory, { recursive: true }, function(err) {
        if (err) {
          console.log(err)
        }
      })
    });

  await processTarball(tempDirectory, plugin, version,) 

  return ''
}
