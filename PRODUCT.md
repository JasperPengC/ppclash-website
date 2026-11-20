# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: VitePress 静态站点（官网 + 使用文档一体：Markdown 文档、内置双语 i18n、GitHub Pages 官方部署支持、本地搜索与明暗主题）。用户已确认：中英双语、源码仓库 ppclash-website，由用户站点仓库部署到 jasperpengc.github.io/ppclash/。本环境无图像生成能力，视觉工作按 code-first 执行。

## Users

PP Clash（桌面与 Android 代理客户端）的潜在与现有个人用户：需要长期稳定出口、快速确认连接状态的普通人，不是运维人员。网站访客分两类：决定是否下载的评估者（官网首页），以及已完成安装、需要照做指引的使用者（文档）。

## Product Purpose

PP Clash 是免费、跨平台（macOS / Windows / Linux / Android）、面向个人用户的 C 端通用代理客户端，管理 mihomo 订阅、代理分组和流量路由。本网站是它的官网与使用文档：让访客在几秒内理解产品是什么、能做什么、如何下载，并让新用户完成安装、导入订阅、开启接管与故障自查。成功 = 下载转化 + 文档自助解决率。

## Positioning

不止"一个连接按钮的 VPN"：多代理分组分别选节点、规则/全局/直连分流、桌面系统代理与 TUN 独立接管、Android 系统 VPN、订阅用量与连接记录是一等能力；免费且不设收费层级。产品结构参照 FlClash、Clash Party、Surge，但 PP Clash 以"精密而安静的桌面工作界面"与猫头品牌自我呈现。

## Operating Context

- 官网托管于 GitHub Pages（用户站点下的 /ppclash/ 路径），源码为本仓库（VitePress）。
- 下载入口指向 GitHub Releases；安装包命名 `PP_Clash-<版本>-<平台>-<架构>.*`。
- 真实产品源码、双语 README、产品截图位于同级仓库 `/Users/cuiyupeng/Documents/WorkSpaces/PPClash`。
- 界面截图使用演示数据，站内展示必须标注。

## Capabilities and Constraints

- 站点双语：简体中文（根路径）与 English（`/en/`），内容一一对应。
- **PP Clash 不提供代理节点或订阅服务**——该事实必须在官网显著位置呈现。
- 已完成实机测试：macOS Intel、Windows x64、Android ARM64；Apple 芯片、Windows ARM64、Linux 与 Android x86_64 构建待实机验证。文档与下载页必须如实标注，不得宣称全部平台已验证。
- macOS 安装包本地签名、尚未公证；首次打开需"系统设置 → 隐私与安全性 → 仍要打开"。
- Linux 需要 WebKitGTK 4.1 与 Ayatana AppIndicator。
- 底层 mihomo；应用 Tauri / Rust / React / TypeScript；AGPL-3.0-only。
- 桌面系统代理不接管 UDP；UDP（如 WebRTC）流量需 TUN。Android 使用系统 VPN，连接时需要用户授权。
- Android 自 v0.2.3 正式发布，要求 Android 7.0+、64 位设备；APK 架构为 arm64-v8a / x86_64。AAB 用于分发，不作为直接安装入口。
- Android 内置分流数据库。
- 稳定出口优先于最低延迟：测速不切节点；后台保守故障切换（两分钟、两站三轮、十分钟冷却）。
- GitHub 仓库地址：<https://github.com/JasperPengC/pp-clash>，集中定义在 `docs/.vitepress/repo.ts` 的 `GITHUB_REPO`。下载页与安装文档的安装包列表由 `ReleaseDownloads.vue` 自动解析最新 Release（构建时快照 + 访问时刷新），不再手写文件名。

## Brand Commitments

- 名称 PP Clash；猫头标志（矢量，明暗两版）为品牌资产。
- 视觉世界继承 `DESIGN.md`（2026-11-15 用户确认的 Liquid Glass 与胶囊桌面方向）：柔白/石墨双主题、蓝色强调 #3568e8（暗色 #78a0ff）、系统字体栈（不加载远程字体）、胶囊控件、16px 卡片圆角、克制玻璃。
- 语气：轻松、清楚、克制；免费功能平等，无营销大字。

## Evidence on Hand

- `assets/brand/`：logo-light.svg、logo-dark.svg（猫头 logo）、favicon.svg
- `assets/images/`：showcase-light.webp、showcase-dark.webp（2980×1640 桌面与 Android 同屏截图，演示数据）、特征裁片明暗成对
- 上游 `README.zh-CN.md` / `README.md`（官方功能与安装事实）
- 上游 `PRODUCT.md` / `DESIGN.md`（产品与视觉权威，已复制到本仓库）

## Product Principles

- 诚实优先：实测状态、演示数据、"不提供节点"，全部如实标注。
- 继承而非再发明：官网是 PP Clash 品牌世界的延伸，不引入新配色、新字体。
- 文档照做即达：每个任务（安装 / 导入 / 接管 / 排查）按顺序可执行，状态可验证。
- 轻松克制：C 端构图，直接的主要动作，克制的辅助信息。

## Accessibility & Inclusion

- 明暗双主题同构；语义色必须伴随可读文字。
- 系统字体栈保证中英文（PingFang SC / Microsoft YaHei）与系统字号偏好兼容。
