<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'

// Hero 产品预览：浅色 / 深色两版真实界面，默认跟随站点主题，可用胶囊切换。
const { lang } = useData()
const zh = computed(() => lang.value.startsWith('zh'))

type Variant = 'light' | 'dark'
const override = ref<Variant | null>(null)
const { isDark } = useData()
const shown = computed<Variant>(() => override.value ?? (isDark.value ? 'dark' : 'light'))

const alt = computed(() =>
  zh.value
    ? 'PP Clash 桌面与 Android 同屏展示：当前节点、实时流量与连接控制，界面使用演示数据'
    : 'PP Clash on desktop and Android: current node, live traffic and connection controls, shown with sample data'
)

</script>

<template>
  <div class="pp-preview">
    <div class="pp-preview-stage">
      <img
        v-show="shown === 'light'"
        class="pp-preview-img"
        :src="withBase('/images/showcase-light.webp')"
        :alt="alt"
        width="2980"
        height="1640"
        loading="eager"
        decoding="async"
      />
      <img
        v-show="shown === 'dark'"
        class="pp-preview-img"
        :src="withBase('/images/showcase-dark.webp')"
        :alt="alt"
        width="2980"
        height="1640"
        loading="eager"
        decoding="async"
      />
    </div>
    <div class="product-switch" role="tablist" :aria-label="zh ? '产品界面预览' : 'Product previews'">
      <button
        role="tab"
        :aria-selected="shown === 'light'"
        :class="['preview-tab', { active: shown === 'light' }]"
        type="button"
        @click="override = 'light'"
      >
        {{ zh ? '浅色界面' : 'Light' }}
      </button>
      <button
        role="tab"
        :aria-selected="shown === 'dark'"
        :class="['preview-tab', { active: shown === 'dark' }]"
        type="button"
        @click="override = 'dark'"
      >
        {{ zh ? '深色界面' : 'Dark' }}
      </button>
    </div>
  </div>
</template>
