<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

// 三态主题按钮：跟随系统 → 浅色 → 深色 循环切换。
// 与 VitePress 首屏脚本及运行时共用默认存储键，
// 切换时写入共享偏好并通知同页中的其他主题按钮。
type Mode = 'auto' | 'light' | 'dark'

const STORAGE_KEY = 'pp-appearance'
const mode = ref<Mode>('auto')
let media: MediaQueryList | null = null

const { lang } = useData()
const zh = computed(() => lang.value.startsWith('zh'))
const L = computed(() =>
  zh.value
    ? { auto: '主题：跟随系统', light: '主题：浅色', dark: '主题：深色' }
    : { auto: 'Theme: system', light: 'Theme: light', dark: 'Theme: dark' }
)

const systemDark = () => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false

const apply = (m: Mode) => {
  const dark = m === 'dark' || (m === 'auto' && systemDark())
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.classList.toggle('light', !dark)
}

const set = (m: Mode) => {
  mode.value = m
  let storage: Storage | null = null
  let persisted = false
  try {
    storage = window.localStorage
    storage.setItem(STORAGE_KEY, m)
    persisted = true
  } catch {
    /* 隐私模式下不可写，忽略 */
  }
  if (persisted) {
    // 让 VitePress 内部的 useDark 读到这个值，避免系统主题变化时被覆盖。
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: STORAGE_KEY,
        newValue: m,
        storageArea: storage
      })
    )
  }
  // 同页顶栏和菜单实例同步；存储不可写时也可继续切换外观。
  window.dispatchEvent(new CustomEvent('pp-appearance-change', { detail: m }))
  apply(m)
}

const onModeChange = (event: Event) => {
  const next = (event as CustomEvent<Mode>).detail
  if (next !== 'auto' && next !== 'light' && next !== 'dark') return
  mode.value = next
}

// 顶栏和移动菜单各有一个实例；同页 storage 事件让两处显示同一状态。
const onStorageChange = (event: StorageEvent) => {
  if (event.key !== STORAGE_KEY && event.key !== null) return
  const stored = event.newValue
  mode.value = stored === 'light' || stored === 'dark' ? stored : 'auto'
  apply(mode.value)
}

const cycle = () => {
  const next: Mode = mode.value === 'auto' ? 'light' : mode.value === 'light' ? 'dark' : 'auto'
  set(next)
}

const onMediaChange = () => {
  if (mode.value === 'auto') apply('auto')
}

onMounted(() => {
  let stored: string | null = null
  try {
    stored = localStorage.getItem(STORAGE_KEY)
  } catch {
    /* 浏览器禁用存储时仍可使用系统主题及本页切换 */
  }
  mode.value = stored === 'light' || stored === 'dark' ? stored : 'auto'
  media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', onMediaChange)
  window.addEventListener('storage', onStorageChange)
  window.addEventListener('pp-appearance-change', onModeChange)
  apply(mode.value)
})

onBeforeUnmount(() => {
  media?.removeEventListener('change', onMediaChange)
  window.removeEventListener('storage', onStorageChange)
  window.removeEventListener('pp-appearance-change', onModeChange)
})
</script>

<template>
  <button
    class="pp-theme-btn"
    type="button"
    :aria-label="L[mode]"
    :title="L[mode]"
    @click="cycle"
  >
    <svg v-if="mode === 'auto'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
    <svg v-else-if="mode === 'light'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
  </button>
</template>
