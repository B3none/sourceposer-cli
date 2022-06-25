import {default as axios} from 'axios'

const URL = 'https://api.github.com/repos/{PLUGIN}/tags'

export async function getReleases(plugin: string): Promise<Record<string, string> | null> {
  try {
    const response = await axios.get(URL.replace('{PLUGIN}', plugin))
    const releases: Record<string, string> = {}

    response.data.map((value: Record<string, string>) => {
      releases[value.name] = value.tarball_url
    })

    return releases
  } catch {
    return null
  }
}
