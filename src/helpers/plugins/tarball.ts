import * as decompress from 'decompress'
import * as https from 'https'
import * as fs from 'fs'

function getTarballUrl(plugin: string, version: string): string {
  return `https://api.github.com/repos/${plugin}/tarball/refs/tags/${version}`
}

export async function processTarball(tempDirectory: string, plugin: string, version: string): Promise<boolean> {
  console.log("process tarball")
  const tarballUrl = getTarballUrl(plugin, version)
  console.log(tarballUrl)

  https.get(tarballUrl, (res) => {
    const path = tempDirectory + plugin + "-" + version + ".tar.gz";
    const writeStream = fs.createWriteStream(path);
  
    res.pipe(writeStream);
  
    writeStream.on("finish", () => {
      writeStream.close();
      console.log("Download Completed");
    });
  })
  
  return true
}
