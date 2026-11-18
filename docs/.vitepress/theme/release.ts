import { GITHUB_REPO } from '../repo'

export interface ReleaseAsset {
  name: string
  size: number
  url: string
}

export interface ReleaseInfo {
  tag: string
  publishedAt: string
  url: string
  assets: ReleaseAsset[]
}

export type Platform = 'macos' | 'windows' | 'linux'

export interface Installer extends ReleaseAsset {
  platform: Platform
  arch: string
  ext: string
}

export const RELEASE_API =
  GITHUB_REPO.replace('https://github.com/', 'https://api.github.com/repos/') + '/releases/latest'

export function slimRelease(raw: any): ReleaseInfo | null {
  if (!raw || typeof raw.tag_name !== 'string' || !Array.isArray(raw.assets)) return null
  return {
    tag: raw.tag_name,
    publishedAt: raw.published_at ?? '',
    url: raw.html_url ?? `${GITHUB_REPO}/releases`,
    assets: raw.assets.map((a: any) => ({
      name: String(a.name),
      size: Number(a.size) || 0,
      url: String(a.browser_download_url)
    }))
  }
}

// 安装包命名：PP_Clash-<版本>-<平台>-<架构>[-setup].<扩展名>
const INSTALLER = /^PP_Clash-.+-(macos|windows|linux)-([a-z0-9_]+?)(?:-setup)?\.(dmg|exe|deb|rpm|AppImage)$/

export function parseInstaller(asset: ReleaseAsset): Installer | null {
  const m = INSTALLER.exec(asset.name)
  if (!m) return null
  return { ...asset, platform: m[1] as Platform, arch: m[2], ext: m[3] }
}
