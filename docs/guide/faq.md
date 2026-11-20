# 常见问题

## PP Clash 提供节点或订阅吗？

不提供。PP Clash 不提供代理节点或订阅服务，请自行准备订阅链接或配置文件。

## Android 版怎么下载？

前往[下载页的 Android 安装包](/download#download-android)，多数手机选择 `arm64-v8a` APK。支持 Android 7.0+ 的 64 位设备；ARM64 已实机验证，x86_64 待实机验证。安装和 VPN 授权步骤见 [Android 使用指南](/guide/android)。

## Android 导入订阅一直等待怎么办？

v0.2.3 已内置分流数据库，并显示导入的当前阶段，首次导入不再需要额外下载内置数据库。如果仍失败，先检查订阅 URL 或本地文件是否有效，再根据界面提示和运行日志排查网络或配置问题。

## macOS 打开被阻止怎么办？

当前 macOS 安装包使用本地签名，尚未完成 Apple 公证。在“系统设置 → 隐私与安全性”中找到 PP Clash，选择“仍要打开”。详见[下载与安装](/guide/install#macos)。

## Linux 提示缺少依赖？

Linux 需要 WebKitGTK 4.1 和 Ayatana AppIndicator。AppImage 仍使用系统提供的 GTK 与 WebKitGTK 库。

## 系统代理和 TUN 有什么区别？

桌面端系统代理只接管系统代理流量，不接管 UDP；TUN 接管全部流量（含 WebRTC 等 UDP）。两种接管各自独立开关；TUN 开启时应用会阻止再开启系统代理，需先关闭 TUN。Android 使用系统 VPN 服务接管流量。详见[接管与分流](/guide/routing)。

## 测速后会自动切换到最快的节点吗？

不会。稳定出口优先于最低延迟：测速只报告延迟，不切换节点；单站故障或 403/429 不会触发换 IP。

## 分组名称为什么和说明里不一样？

分组名称、结构和顺序完全由你的订阅配置决定，PP Clash 不写死名称，也不按名称猜测业务含义后自动更改。

## 如何备份和恢复数据？

桌面端在设置中使用备份与恢复功能管理应用数据，内核版本与配置覆写在对应页面管理。Android 使用对应架构的正式 APK 更新，通常可保留订阅与设置。

## PP Clash 是免费的吗？

免费。功能按使用场景组织，不设收费层级。

## 使用了哪些开源组件？

代理核心为 [mihomo](https://github.com/MetaCubeX/mihomo)，应用基于 Tauri、Rust、React 与 TypeScript 构建。项目采用 [AGPL-3.0-only](https://www.gnu.org/licenses/agpl-3.0.html) 许可，第三方组件许可信息见 [THIRD_PARTY_NOTICES.md](https://github.com/JasperPengC/pp-clash/blob/main/THIRD_PARTY_NOTICES.md)。
