<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
let revealObserver: IntersectionObserver | null = null
let slideObserver: IntersectionObserver | null = null
let rafId = 0
let reduceMotion = false
let classObserver: MutationObserver | null = null

const isHome = () => {
  const relative = route.data?.relativePath
  if (relative) return /^(en\/)?index\.md$/.test(relative)
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  const path = route.path.startsWith(base) ? route.path.slice(base.length) : route.path
  return path === '/' || path === '' || path === '/en/' || path === '/en'
}

const setup = async () => {
  await nextTick()
  requestAnimationFrame(() => {
    const home = isHome()
    document.documentElement.classList.toggle('pp-home', home)
    document.documentElement.classList.add('rv-ready')

    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 入场渐显
    revealObserver?.disconnect()
    revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('rv-in')
            revealObserver?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    document.querySelectorAll('[data-reveal]:not(.rv-in)').forEach((el) => {
      revealObserver?.observe(el)
    })

    // 分段导航高亮
    slideObserver?.disconnect()
    slideObserver = null
    if (home) {
      const dots = document.querySelectorAll('.pp-rail a')
      const slides = document.querySelectorAll('.pp-slide[id]')
      if (dots.length && slides.length) {
        slideObserver = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue
              const id = entry.target.id
              dots.forEach((dot) => {
                const target = (dot as HTMLAnchorElement).getAttribute('href') || ''
                dot.classList.toggle('on', target === `#${id}`)
              })
            }
          },
          { threshold: 0, rootMargin: '-45% 0px -45% 0px' }
        )
        slides.forEach((slide) => slideObserver?.observe(slide))
      }
    }

    update()
  })
}

/* ---------- 滚动引擎：分层视差 + 导航状态 + 分段圆点 ---------- */

const update = () => {
  const scrollY = window.scrollY
  const vh = window.innerHeight
  const home = document.documentElement.classList.contains('pp-home')

  // 导航玻璃：首页随外观（Apple 式浅色/深色玻璃），文档页按所在分段
  const isDark = document.documentElement.classList.contains('dark')
  let overDark = home ? isDark : false
  let railDark = home ? isDark : false
  document.querySelectorAll('.pp-slide').forEach((slide) => {
    const r = slide.getBoundingClientRect()
    const cinema = slide.classList.contains('pp-slide-cinema')
    if (!home && r.top <= 32 && r.bottom >= 32) overDark = cinema
    if (r.top <= vh * 0.5 && r.bottom >= vh * 0.5) {
      // 圆点轨亮度跟随所在段：cinema 恒深、其余随外观
      railDark = home ? isDark || cinema : cinema
    }
  })
  document.documentElement.classList.toggle('pp-nav-over-dark', overDark)
  document.documentElement.classList.toggle('pp-nav-scrolled', scrollY > 8)
  document.documentElement.style.setProperty(
    '--pp-rail-ink',
    railDark ? 'rgba(238, 241, 248, 0.42)' : 'rgba(29, 29, 31, 0.35)'
  )

  if (reduceMotion) return

  // 分层视差：越靠前的层跟随页面越慢
  document.querySelectorAll<HTMLElement>('.pp-par, .pp-par-fade').forEach((el) => {
    const r = el.getBoundingClientRect()
    // 扣除已施加的视差位移，避免变换后的 rect 反馈进下一轮计算
    const applied = parseFloat(el.style.getPropertyValue('--par-y') || '0') || 0
    const docTop = r.top + scrollY - applied
    // 基准：元素进入视口底部的那一刻（首屏元素以页面顶端为基准）
    const rest = Math.max(0, docTop - vh)
    const dy = scrollY - rest
    const max = vh * 0.5

    if (el.classList.contains('pp-par')) {
      const lag = parseFloat(el.dataset.par || '0')
      const limit = parseFloat(el.dataset.parMax || '0')
      const max = limit ? Math.min(limit, vh * 0.5) : vh * 0.5
      const y = Math.max(-max, Math.min(max, dy * lag))
      el.style.setProperty('--par-y', `${y.toFixed(2)}px`)
    }
    if (el.classList.contains('pp-par-fade')) {
      const fade = parseFloat(el.dataset.parFade || '0')
      const o = Math.max(0, 1 - (Math.min(Math.max(dy, 0), vh) / vh) * fade)
      el.style.setProperty('--par-o', o.toFixed(3))
    }
  })
}

const onScroll = () => {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    rafId = 0
    update()
  })
}

onMounted(() => {
  setup()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  // 外观切换不产生滚动事件：监听 html class 变化重算导航/圆点轨颜色
  classObserver = new MutationObserver(onScroll)
  classObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

watch(
  () => route.path,
  () => {
    setup()
  }
)

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  slideObserver?.disconnect()
  classObserver?.disconnect()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <span hidden aria-hidden="true"></span>
</template>
