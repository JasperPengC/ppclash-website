import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ThemeImage from './components/ThemeImage.vue'
import RoutingDemo from './components/RoutingDemo.vue'
import RevealOnScroll from './components/RevealOnScroll.vue'
import OverlayScrollbar from './components/OverlayScrollbar.vue'
import AppearanceSwitch from './components/AppearanceSwitch.vue'
import HeroPreview from './components/HeroPreview.vue'
import NavDownload from './components/NavDownload.vue'
import DocChrome from './components/DocChrome.vue'
import ReleaseDownloads from './components/ReleaseDownloads.vue'
import { GITHUB_REPO } from '../repo'
import './custom.css'
import './home.css'

// GitHub 图标（octicon mark，16×16）
const GitHubIcon = () =>
  h(
    'svg',
    { viewBox: '0 0 16 16', fill: 'currentColor', 'aria-hidden': 'true' },
    [
      h('path', {
        d: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z'
      })
    ]
  )

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ThemeImage', ThemeImage)
    app.component('RoutingDemo', RoutingDemo)
    app.component('HeroPreview', HeroPreview)
    app.component('ReleaseDownloads', ReleaseDownloads)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 全局：滚动渐显驱动 + 首页分段判定 + 视差引擎
      'layout-top': () => h(RevealOnScroll),
      // 全局：macOS 式覆盖滚动条
      'layout-bottom': () => h(OverlayScrollbar),
      // 导航右侧控件组：主题开关 + GitHub + 下载 CTA，间距统一
      'nav-bar-content-after': () =>
        h('div', { class: 'pp-nav-extras' }, [
          h(AppearanceSwitch),
          h('a', {
            class: 'pp-gh',
            href: GITHUB_REPO,
            target: '_blank',
            rel: 'noopener',
            'aria-label': 'GitHub',
            title: 'GitHub'
          }, [h(GitHubIcon)]),
          h(NavDownload)
        ]),
      'nav-screen-content-after': () => h(AppearanceSwitch),
      // 文档侧边栏：标题块 / 底部快速上手 / 正文面包屑
      'sidebar-nav-before': () => h(DocChrome, { part: 'side-title' }),
      'sidebar-nav-after': () => h(DocChrome, { part: 'side-cta' }),
      'doc-before': () => h(DocChrome, { part: 'crumbs' }),
      // 导航栏品牌：猫头 logo（明暗两版随主题切换）
      'nav-bar-title-before': () =>
        h(ThemeImage, {
          light: '/brand/logo-light.svg',
          dark: '/brand/logo-dark.svg',
          alt: 'PP Clash',
          width: 28,
          height: 28,
          class: 'pp-nav-logo',
          eager: true
        })
    })
  }
} satisfies Theme
