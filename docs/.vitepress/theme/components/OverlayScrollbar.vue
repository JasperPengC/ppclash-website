<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'

// macOS 式覆盖滚动条：默认隐藏，滚动时淡入，停止 700ms 后淡出；
// 覆盖层不占布局宽度，支持拖拽。
const track = ref<HTMLElement | null>(null)
const thumb = ref<HTMLElement | null>(null)

const route = useRoute()
let hideTimer: ReturnType<typeof setTimeout> | undefined
let dragging = false
let dragStartY = 0
let dragStartTop = 0
let rafId = 0

const update = () => {
  const el = document.documentElement
  const max = el.scrollHeight - el.clientHeight
  if (max <= 4) {
    track.value?.classList.remove('visible')
    return
  }
  const barHeight = Math.max((el.clientHeight / el.scrollHeight) * el.clientHeight, 36)
  const y = (el.scrollTop / max) * (el.clientHeight - barHeight)
  if (thumb.value) {
    thumb.value.style.height = `${barHeight}px`
    thumb.value.style.transform = `translateY(${y}px)`
  }
  track.value?.classList.add('visible')
  clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    if (!dragging) track.value?.classList.remove('visible')
  }, 650)
}

const onScroll = () => {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    rafId = 0
    update()
  })
}

const onPointerMove = (e: PointerEvent) => {
  const el = document.documentElement
  const max = el.scrollHeight - el.clientHeight
  const barHeight = thumb.value?.offsetHeight || 36
  const travel = Math.max(el.clientHeight - barHeight, 1)
  const dy = ((e.clientY - dragStartY) / travel) * max
  window.scrollTo(0, dragStartTop + dy)
}

const onPointerUp = () => {
  dragging = false
  thumb.value?.classList.remove('dragging')
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  track.value?.classList.add('visible')
  clearTimeout(hideTimer)
  hideTimer = setTimeout(() => track.value?.classList.remove('visible'), 650)
}

const onPointerDown = (e: PointerEvent) => {
  dragging = true
  dragStartY = e.clientY
  dragStartTop = document.documentElement.scrollTop
  thumb.value?.classList.add('dragging')
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  e.preventDefault()
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  thumb.value?.addEventListener('pointerdown', onPointerDown)
  nextTick(update)
})

watch(
  () => route.path,
  () => {
    nextTick(update)
  }
)

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  thumb.value?.removeEventListener('pointerdown', onPointerDown)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  clearTimeout(hideTimer)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div ref="track" class="pp-scrollbar" aria-hidden="true">
    <div ref="thumb" class="pp-scrollbar-thumb"></div>
  </div>
</template>
