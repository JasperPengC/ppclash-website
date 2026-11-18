<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const zh = computed(() => lang.value.startsWith('zh'))
const base = import.meta.env.BASE_URL || '/'
const href = computed(() => base + (zh.value ? '' : 'en/') + 'download.html')
</script>

<template>
  <a class="pp-btn pp-btn-brand pp-nav-cta" :href="href">
    {{ zh ? '免费下载' : 'Download' }}
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m0 0-6-6m6 6-6 6"/></svg>
  </a>
</template>