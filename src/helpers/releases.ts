import {default as axios} from 'axios'

function getReleasesUrl(plugin: string): string {
  return `https://api.github.com/repos/${plugin}/tags`
}

export async function getReleases(plugin: string): Promise<Record<string, string> | null> {
  try {
    const response = await axios.get(getReleasesUrl(plugin))
    const releases: Record<string, string> = {}

    response.data.map((value: Record<string, string>) => {
      releases[value.name] = value.tarball_url
    })

    return releases
  } catch {
    return null
  }
}
