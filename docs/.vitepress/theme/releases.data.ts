import { defineLoader } from 'vitepress'
import { RELEASE_API, slimRelease, type ReleaseInfo } from './release'

declare const data: ReleaseInfo | null
export { data }

// 构建时取一次最新 Release 作为静态兜底；取不到（离线 / 限流）不让构建失败，页面回退到命名规则表。
export default defineLoader({
  async load(): Promise<ReleaseInfo | null> {
    try {
      const token = process.env.GITHUB_TOKEN
      const res = await fetch(RELEASE_API, {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        signal: AbortSignal.timeout(10000)
      })
      return res.ok ? slimRelease(await res.json()) : null
    } catch {
      return null
    }
  }
})
