<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as built } from '../releases.data'
import { GITHUB_RELEASES } from '../../repo'
import {
  RELEASE_API,
  detectPlatform,
  getCachedRelease,
  parseInstaller,
  preferRelease,
  slimRelease,
  type Installer,
  type Platform,
  type ReleaseInfo
} from '../release'

// 下载列表：构建时的 Release 快照先渲染，挂载后再向 GitHub 取一次最新版本覆盖。
const { lang } = useData()
const zh = computed(() => lang.value.startsWith('zh'))

const release = ref<ReleaseInfo | null>(built)
const os = ref<Platform | null>(null)

const CACHE_KEY = 'pp-latest-release'

// 实测状态依据 v0.2.3 发布说明；新增构建不等于完成实机验证。
const VERIFIED = new Set(['macos-x86_64', 'windows-amd64', 'android-arm64-v8a'])
const PLATFORMS: Platform[] = ['macos', 'windows', 'linux', 'android']
const PLATFORM_NAME: Record<Platform, string> = { macos: 'macOS', windows: 'Windows', linux: 'Linux', android: 'Android' }
const ARCH_ORDER = ['aarch64', 'arm64-v8a', 'x86_64', 'amd64', 'arm64']
const EXT_ORDER = ['dmg', 'exe', 'deb', 'rpm', 'AppImage', 'apk']

const archName = (platform: Platform, arch: string) => {
  if (platform === 'android' && arch === 'arm64-v8a') return 'ARM64 (arm64-v8a)'
  if (platform === 'android' && arch === 'x86_64') return 'x64 (x86_64)'
  if (platform === 'macos' && arch === 'aarch64') return zh.value ? 'Apple 芯片 (aarch64)' : 'Apple silicon (aarch64)'
  if (platform === 'macos' && arch === 'x86_64') return 'Intel (x86_64)'
  if (arch === 'amd64') return 'x64 (amd64)'
  if (arch === 'arm64') return 'ARM64'
  return arch
}

const sizeText = (bytes: number) => (bytes ? `${(bytes / 1048576).toFixed(1)} MB` : '')

const groups = computed(() => {
  const installers = (release.value?.assets ?? [])
    .map(parseInstaller)
    .filter((a): a is Installer => a !== null)
  const order = os.value ? [os.value, ...PLATFORMS.filter((p) => p !== os.value)] : PLATFORMS
  return order
    .map((platform) => {
      const mine = installers.filter((a) => a.platform === platform)
      const archs = [...new Set(mine.map((a) => a.arch))].sort(
        (a, b) => ARCH_ORDER.indexOf(a) - ARCH_ORDER.indexOf(b)
      )
      return {
        platform,
        rows: archs.map((arch) => ({
          arch,
          verified: VERIFIED.has(`${platform}-${arch}`),
          files: mine
            .filter((a) => a.arch === arch)
            .sort((a, b) => EXT_ORDER.indexOf(a.ext) - EXT_ORDER.indexOf(b.ext))
        }))
      }
    })
    .filter((g) => g.rows.length)
})

const checksum = computed(() => release.value?.assets.find((a) => a.name === 'SHA256SUMS'))

const date = computed(() => {
  const at = release.value?.publishedAt
  if (!at) return ''
  return new Date(at).toLocaleDateString(zh.value ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  })
})

onMounted(async () => {
  os.value = detectPlatform(navigator.userAgent, navigator.maxTouchPoints)

  try {
    const cached = getCachedRelease(sessionStorage.getItem(CACHE_KEY), built)
    if (cached) {
      release.value = cached
      return
    }
  } catch {
    // 缓存不可读或损坏时仍向 GitHub 刷新。
  }

  try {
    const res = await fetch(RELEASE_API, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: AbortSignal.timeout(10000)
    })
    if (!res.ok) return
    const fresh = slimRelease(await res.json())
    if (!fresh) return
    release.value = preferRelease(release.value, fresh)
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), value: release.value }))
  } catch {
    // 取不到最新版本时保留构建时快照（或命名规则表）
  }
})
</script>

<template>
  <div class="pp-dl">
    <template v-if="release && groups.length">
      <div class="pp-dl-meta">
        <strong>{{ release.tag }}</strong>
        <span v-if="date">{{ zh ? '发布于' : 'Released' }} {{ date }}</span>
        <a :href="release.url" target="_blank" rel="noopener">{{ zh ? '发布说明' : 'Release notes' }}</a>
        <a v-if="checksum" :href="checksum.url">SHA256SUMS</a>
      </div>
      <div v-for="g in groups" :id="`download-${g.platform}`" :key="g.platform" class="pp-dl-group" :class="{ current: g.platform === os }">
        <div class="pp-dl-platform">
          {{ PLATFORM_NAME[g.platform] }}
          <span v-if="g.platform === os" class="pp-dl-here">{{ zh ? '当前系统' : 'Your system' }}</span>
        </div>
        <p v-if="g.platform === 'android'" class="pp-dl-note">
          {{ zh ? 'Android 7.0+ · 仅限 64 位设备；多数手机选择 ARM64 APK。' : 'Android 7.0+ · 64-bit devices only; most phones use the ARM64 APK.' }}
          <a :href="withBase(zh ? '/guide/android.html' : '/en/guide/android.html')">{{ zh ? '安装与升级说明' : 'Install & upgrade guide' }}</a>
        </p>
        <div v-for="row in g.rows" :key="row.arch" class="pp-dl-row">
          <div class="pp-dl-arch">
            <strong>{{ archName(g.platform, row.arch) }}</strong>
            <span class="pp-dl-status" :class="{ ok: row.verified }">
              {{ row.verified ? (zh ? '已实机验证' : 'Tested on hardware') : zh ? '待实机验证' : 'Not yet tested on hardware' }}
            </span>
          </div>
          <div class="pp-dl-files">
            <a v-for="f in row.files" :key="f.name" class="pp-dl-btn" :href="f.url" :title="f.name">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16" /></svg>
              .{{ f.ext }}
              <small>{{ sizeText(f.size) }}</small>
            </a>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="pp-dl-meta">
        <span>{{ zh ? '暂时无法读取最新版本，请前往 GitHub Releases 按下表命名选择安装包：' : 'Could not load the latest release. Pick an installer on GitHub Releases using the naming below:' }}</span>
        <a :href="GITHUB_RELEASES" target="_blank" rel="noopener">GitHub Releases</a>
      </div>
      <div class="pp-dl-group">
        <div class="pp-dl-row"><div class="pp-dl-arch"><strong>macOS · Intel (x86_64)</strong></div><code>PP_Clash-&lt;version&gt;-macos-x86_64.dmg</code></div>
        <div class="pp-dl-row"><div class="pp-dl-arch"><strong>macOS · {{ zh ? 'Apple 芯片' : 'Apple silicon' }} (aarch64)</strong></div><code>PP_Clash-&lt;version&gt;-macos-aarch64.dmg</code></div>
        <div class="pp-dl-row"><div class="pp-dl-arch"><strong>Windows · x64 (amd64)</strong></div><code>PP_Clash-&lt;version&gt;-windows-amd64-setup.exe</code></div>
        <div class="pp-dl-row"><div class="pp-dl-arch"><strong>Windows · ARM64</strong></div><code>PP_Clash-&lt;version&gt;-windows-arm64-setup.exe</code></div>
        <div class="pp-dl-row"><div class="pp-dl-arch"><strong>Linux · x64 / ARM64</strong></div><code>.deb / .rpm / .AppImage</code></div>
        <div class="pp-dl-row"><div class="pp-dl-arch"><strong>Android · ARM64</strong></div><code>ppclash-android-arm64-v8a-v&lt;version&gt;.apk</code></div>
        <div class="pp-dl-row"><div class="pp-dl-arch"><strong>Android · x64</strong></div><code>ppclash-android-x86_64-v&lt;version&gt;.apk</code></div>
      </div>
    </template>
  </div>
</template>
