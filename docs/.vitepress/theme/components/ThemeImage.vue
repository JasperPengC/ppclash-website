<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = withDefaults(
  defineProps<{
    light: string
    dark?: string
    alt?: string
    width?: string | number
    height?: string | number
    eager?: boolean
  }>(),
  { alt: '', eager: false }
)

const lightSrc = computed(() => withBase(props.light))
const darkSrc = computed(() => (props.dark ? withBase(props.dark) : ''))
</script>

<template>
  <span class="pp-theme-img">
    <img
      class="pp-img-light"
      :src="lightSrc"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="eager ? 'eager' : 'lazy'"
    />
    <img
      v-if="dark"
      class="pp-img-dark"
      :src="darkSrc"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="eager ? 'eager' : 'lazy'"
    />
  </span>
</template>
