<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{ part: 'side-title' | 'side-cta' | 'crumbs' }>()
const { lang, page } = useData()
const zh = computed(() => lang.value.startsWith('zh'))
const base = import.meta.env.BASE_URL || '/'
const quickHref = computed(() => base + (zh.value ? '' : 'en/') + 'guide/quick-start.html')
const docsHref = computed(() => base + (zh.value ? '' : 'en/') + 'guide/introduction.html')
</script>

<template>
  <div v-if="props.part === 'side-title'" class="pp-side-title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z"/></svg>
    <span>{{ zh ? '使用文档' : 'Documentation' }}</span>
  </div>
  <a v-else-if="props.part === 'side-cta'" class="pp-side-cta" :href="quickHref">
    {{ zh ? '快速上手' : 'Quick start' }}
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m0 0-6-6m6 6-6 6"/></svg>
  </a>
  <nav v-else class="pp-crumbs" aria-label="Breadcrumb">
    <a :href="docsHref">{{ zh ? '使用文档' : 'Docs' }}</a>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>
    <span>{{ page.title }}</span>
  </nav>
</template>