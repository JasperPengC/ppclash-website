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

export type Platform = 'macos' | 'windows' | 'linux' | 'android'

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
const ANDROID_INSTALLER = /^ppclash-android-(arm64-v8a|x86_64)-v\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?\.apk$/

export function parseInstaller(asset: ReleaseAsset): Installer | null {
  const android = ANDROID_INSTALLER.exec(asset.name)
  if (android) return { ...asset, platform: 'android', arch: android[1], ext: 'apk' }
  const m = INSTALLER.exec(asset.name)
  if (!m) return null
  return { ...asset, platform: m[1] as Platform, arch: m[2], ext: m[3] }
}

export function detectPlatform(ua: string, maxTouchPoints = 0): Platform | null {
  if (/Android/i.test(ua)) return 'android'
  if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && maxTouchPoints > 1)) return null
  return /Mac/i.test(ua) ? 'macos' : /Win/i.test(ua) ? 'windows' : /Linux|X11/i.test(ua) ? 'linux' : null
}

// 新构建不应被旧缓存或滞后的接口响应降级。
export function preferRelease(current: ReleaseInfo | null, candidate: ReleaseInfo): ReleaseInfo {
  if (!current) return candidate
  return Date.parse(candidate.publishedAt) >= Date.parse(current.publishedAt) ? candidate : current
}

export function getCachedRelease(raw: string | null, built: ReleaseInfo | null, now = Date.now()): ReleaseInfo | null {
  if (!raw) return null
  try {
    const { at, value } = JSON.parse(raw)
    if (typeof at !== 'number' || now - at < 0 || now - at >= 30 * 60 * 1000 ||
        typeof value?.tag !== 'string' || typeof value.url !== 'string' ||
        typeof value.publishedAt !== 'string' || !Number.isFinite(Date.parse(value.publishedAt)) ||
        !Array.isArray(value.assets) || !value.assets.every((a: any) =>
          a && typeof a.name === 'string' && typeof a.url === 'string' && typeof a.size === 'number')) return null
    return preferRelease(built, value) === value ? value : null
  } catch {
    return null
  }
}
