import { defineConfig } from 'vitepress'
import { GITHUB_REPO } from './repo'

// ============================================================================
// ★★★ 部署前必改 / EDIT BEFORE DEPLOY ★★★
//
// 1) 仓库地址：docs/.vitepress/repo.ts 的 GITHUB_REPO —— 全站链接的唯一来源
//
// 2) BASE：用户站点仓库中部署此网站的子路径。
//    - 部署到 https://<用户名>.github.io/ppclash/ → 使用 '/ppclash/'
//    - 部署到用户站点根路径 → 使用 '/'
//
//    也可以不改代码，用环境变量覆盖：VITEPRESS_BASE=/xxx/ npm run build
// ============================================================================

const BASE = process.env.VITEPRESS_BASE || '/ppclash/'

const withBase = (p: string) => BASE + p.replace(/^\//, '')

export default defineConfig({
  base: BASE,
  ignoreDeadLinks: false,
  cleanUrls: false,
  // 与自建三态开关共用存储键，保证首屏脚本与运行时一致。
  appearance: { storageKey: 'pp-appearance' },

  head: [
    ['link', { rel: 'icon', href: withBase('/brand/favicon.ico'), sizes: 'any' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: withBase('/brand/favicon-32.png') }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: withBase('/brand/apple-touch-icon.png') }],
    ['meta', { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#f7f8fa' }],
    ['meta', { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#21252b' }]
  ],

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' }
  },

  // 顶层 themeConfig：本地搜索是构建期开关，必须写在根级。
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '清除查询条件',
            displayDetails: '显示详细列表',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    }
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'PP Clash',
      description: '清晰、精致、紧凑的免费桌面代理客户端。管理 mihomo 订阅、代理分组和流量路由。',
      themeConfig: {
        nav: [
          { text: '文档', link: '/guide/introduction', activeMatch: '/guide/' },
          { text: '下载', link: '/download', activeMatch: '/download' }
        ],
        sidebar: {
          '/guide/': [
            {
              text: '入门',
              items: [
                { text: '产品介绍', link: '/guide/introduction' },
                { text: '下载与安装', link: '/guide/install' },
                { text: '快速上手', link: '/guide/quick-start' }
              ]
            },
            {
              text: '使用',
              items: [
                { text: '订阅与分组', link: '/guide/subscription' },
                { text: '接管与分流', link: '/guide/routing' },
                { text: '覆写配置', link: '/guide/override' },
                { text: '安全防护', link: '/guide/security' }
              ]
            },
            {
              text: '帮助',
              items: [{ text: '常见问题', link: '/guide/faq' }]
            }
          ]
        },
        socialLinks: [{ icon: 'github', link: GITHUB_REPO }],
        outline: { level: [2, 3], label: '本页内容' },
        docFooter: { prev: '上一页', next: '下一页' },
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        langMenuLabel: '切换语言',
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        search: {
          provider: 'local',
          options: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '没有找到结果',
                resetButtonTitle: '清除查询条件',
                displayDetails: '显示详细列表',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
              }
            }
          }
        }
      }
    },

    en: {
      label: 'English',
      lang: 'en-US',
      title: 'PP Clash',
      description:
        'A clear, refined and compact free desktop proxy client. Manage mihomo subscriptions, proxy groups and traffic routing.',
      themeConfig: {
        nav: [
          { text: 'Docs', link: '/en/guide/introduction', activeMatch: '/en/guide/' },
          { text: 'Download', link: '/en/download', activeMatch: '/en/download' }
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Get started',
              items: [
                { text: 'Introduction', link: '/en/guide/introduction' },
                { text: 'Download & Install', link: '/en/guide/install' },
                { text: 'Quick Start', link: '/en/guide/quick-start' }
              ]
            },
            {
              text: 'Usage',
              items: [
                { text: 'Subscriptions & Groups', link: '/en/guide/subscription' },
                { text: 'Takeover & Routing', link: '/en/guide/routing' },
                { text: 'Overrides', link: '/en/guide/override' },
                { text: 'Security', link: '/en/guide/security' }
              ]
            },
            {
              text: 'Help',
              items: [{ text: 'FAQ', link: '/en/guide/faq' }]
            }
          ]
        },
        socialLinks: [{ icon: 'github', link: GITHUB_REPO }],
        outline: { level: [2, 3], label: 'On this page' },
        docFooter: { prev: 'Previous', next: 'Next' },
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        search: {
          provider: 'local',
          options: {
            translations: {
              button: { buttonText: 'Search docs', buttonAriaLabel: 'Search docs' },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear search query',
                displayDetails: 'Show detailed list',
                footer: { selectText: 'Select', navigateText: 'Navigate', closeText: 'Close' }
              }
            }
          }
        }
      }
    }
  }
})
