# 产品介绍

PP Clash 是一款免费的桌面与 Android 代理客户端，用于管理 [mihomo](https://github.com/MetaCubeX/mihomo) 订阅、代理分组和流量路由。

多个代理分组可以分别选择节点，支持规则、全局和直连模式。桌面端通过系统代理或 TUN 接管流量，Android 通过系统 VPN 连接，订阅用量与连接记录随时可查。

## 核心能力

- **订阅与代理分组** — 导入订阅或本地配置，浏览分组、搜索节点、测试延迟、固定常用节点，记住上次的节点选择
- **灵活分流** — 规则、全局、直连模式切换；桌面端使用系统代理或 TUN，Android 使用 VPN
- **连接信息** — 实时流量、活动连接、分流规则、DNS 与内核运行日志
- **快捷操作** — 桌面菜单栏面板可切换订阅、节点和模式；Android 提供悬浮导航、延迟圆环和连接按钮，两端均支持浅色、深色与跟随系统主题
- **桌面进阶工具** — 管理内核版本、编辑配置覆写（见[覆写配置](/guide/override)）、备份与恢复应用数据
- **安全防护** — 默认配置包含加密 DNS、Fake-IP 与规则模式下的 STUN 阻断，桌面端可检测 WebRTC，见[安全防护](/guide/security)

::: danger 请自行准备节点
PP Clash 不提供代理节点或订阅服务。使用前请自行准备订阅链接或配置文件。
:::

## 支持平台

macOS（Intel / Apple 芯片）、Windows（x64 / ARM64）、Linux（.deb / .rpm / .AppImage）。

已完成实机测试：macOS Intel、Windows x64、Android ARM64。Apple 芯片、Windows ARM64、Linux 与 Android x86_64 构建待实机验证。

Android 正式版已随 v0.2.3 发布，支持 Android 7.0+ 的 64 位设备。多数手机选择 `arm64-v8a` APK；`x86_64` 适用于对应架构设备。详见 [Android 使用指南](/guide/android)。

## 技术与许可

- 代理核心：[mihomo](https://github.com/MetaCubeX/mihomo)
- 应用构建：Tauri · Rust · React · TypeScript
- 许可证：[AGPL-3.0-only](https://www.gnu.org/licenses/agpl-3.0.html)

## 下一步

- [下载与安装](/guide/install)
- [快速上手](/guide/quick-start)
