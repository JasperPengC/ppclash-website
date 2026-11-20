# PP Clash 官网与使用文档

PP Clash 的产品官网 + 使用文档，一体站：**VitePress** 构建，中英双语，托管在 [GitHub Pages](https://pages.github.com)。

- 简体中文：根路径 `/`
- English：`/en/`

## 本地开发

```bash
npm install
npm run dev        # 开发服务器（默认 http://localhost:5173/ppclash/）
npm test           # 安装包解析、平台识别与缓存回归检查
npm run build      # 构建到 docs/.vitepress/dist
npm run preview    # 本地预览构建产物
```

> 开发服务器也带着 base 子路径，访问 `http://localhost:5173/ppclash/`。

## 目录结构

```text
docs/
├── .vitepress/
│   ├── config.mts        # 导航、侧栏、搜索、双语、base 路径
│   ├── repo.ts           # 全站 GitHub 链接的唯一来源（已指向 JasperPengC/pp-clash）
│   └── theme/
│       ├── index.ts      # 品牌插槽（导航/Hero 猫头 logo）
│       ├── release.ts    # Release 资源解析（安装包命名 → 平台 / 架构 / 格式）
│       ├── releases.data.ts # 构建时读取最新 Release 作为静态快照
│       ├── custom.css    # 令牌、浏览器表面、导航、文档页样式
│       ├── home.css      # 首页四段布局、桌面与 Android 产品预览、分流演示、终端卡和 FAQ
│       └── components/
│           ├── ThemeImage.vue      # 明暗两版图片切换组件
│           ├── AppearanceSwitch.vue # 三态外观下拉菜单（跟随系统/浅色/深色）
│           ├── OverlayScrollbar.vue # macOS 式覆盖滚动条
│           ├── RoutingDemo.vue      # 首页签名交互：分流模式/接管开关/节点选择
│           ├── ReleaseDownloads.vue # 下载列表：自动解析最新 Release（构建快照 + 访问时刷新）
│           └── RevealOnScroll.vue   # 渐显 + 视差 + 导航状态引擎
├── index.md              # 首页（中文）
├── download.md           # 下载页（中文）
├── guide/                # 使用文档（中文，含 Android 使用指南与版本更新）
├── en/                   # English 镜像（index/download/guide）
└── public/
    ├── brand/            # 猫头 logo（明/暗/favicon）
    └── images/           # 桌面与 Android 同屏产品截图（明/暗两版）

package.json / package-lock.json # 构建依赖与脚本
```

> ⚠️ 首页 `docs/index.md` 与 `docs/en/index.md` 整页是 HTML：**段落内部不要留空行**，否则 Markdown 会把缩进 4 空格以上的 HTML 当成代码块，页面上会直接显示标签源码。

## 部署到 GitHub Pages

源码放在公开仓库 `JasperPengC/ppclash-website`；用户站点仓库 `JasperPengC/JasperPengC.github.io` 负责构建并将产物发布到 `ppclash/`，因此网址为 `https://jasperpengc.github.io/ppclash/`。源码仓库名与网站 URL 路径彼此独立。

首次部署时，在用户站点仓库启用 **Settings → Pages → Build and deployment → Source → GitHub Actions**，然后运行该仓库的 `Deploy PPClash website` 工作流。更新源码后，再手动运行同一工作流发布最新版本。

默认 `BASE` 为 `/ppclash/`。更换网站路径时，更新 `docs/.vitepress/config.mts`、用户站点仓库中的部署工作流 `VITEPRESS_BASE` 以及工作流打包目录。

### ★ 部署前确认

- `docs/.vitepress/repo.ts` 的 `GITHUB_REPO` — 全站 GitHub / Releases 链接与下载列表的唯一来源，当前为 `https://github.com/JasperPengC/pp-clash`；
- 用户站点仓库名称必须是 `<用户名>.github.io`；部署工作流把网站放在其中的 `ppclash/` 路径。

### 下载列表如何更新

下载页与「下载与安装」文档里的安装包列表不手写：构建时读取一次最新 Release 写进静态页面，访客打开页面时再向 GitHub 公开接口刷新一次。浏览器缓存有效期为 30 分钟，且不会用旧缓存覆盖较新的构建快照；两头都取不到时回退为命名规则表。已有平台的新版本安装包通常可自动更新；新增平台、文件命名变更、功能文案与版本说明仍需更新官网源码并重新部署。

下载组件支持 macOS、Windows、Linux 和 Android，Android 仅展示可直接安装的 ARM64 / x86_64 APK，不将 AAB 当作安装包。Android 设备优先显示 Android 分组，实测状态依据产品发布说明维护。

## 内容来源与同步

- 已发布功能、安装包命名、实测状态与迁移注意事项以 `JasperPengC/pp-clash` 的 GitHub Release 为准，并核对同级 `PPClash` 仓库的双语 README 与实现。开发中的能力不能提前标成已发布。
- 本次文档对齐 v0.2.3：Android 正式发布、内置分流数据库、订阅卡片统一，以及覆写合并修正；双语版本说明位于 `docs/guide/changelog.md` 与 `docs/en/guide/changelog.md`。
- 截图（`showcase-*.webp`，演示数据）与猫头 logo 来自上游 `PPClash/assets/readme/`；产品出新截图后替换 `docs/public/images/` 并检查桌面与 Android 同屏展示、明暗两版和移动端适配。
- 双语必须成对修改：`docs/**`（中文）与 `docs/en/**`（English）一一对应。
