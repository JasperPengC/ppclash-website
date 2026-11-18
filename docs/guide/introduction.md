# 产品介绍

PP Clash 是一款免费、跨平台的桌面代理客户端，用于管理 [mihomo](https://github.com/MetaCubeX/mihomo) 订阅、代理分组和流量路由。

它不是“一个连接按钮加一个服务器”的 VPN 结构：多个代理分组可以分别选择节点，规则、全局、直连三种出站模式随时切换，系统代理与 TUN 独立启用，订阅用量与连接记录都是一等能力。

## 核心能力

- **订阅与代理分组** — 导入订阅或本地配置，浏览分组、搜索节点、测试延迟、固定常用节点
- **灵活分流** — 规则、全局、直连模式切换；系统代理与 TUN 独立启用
- **连接信息** — 实时流量、活动连接、分流规则、DNS 与内核运行日志
- **菜单栏快捷面板** — 查看当前状态，快速切换订阅、节点和出站模式
- **本地管理** — 管理内核版本、编辑配置覆写（见[覆写配置](/guide/override)）、备份与恢复应用数据
- **安全防护** — 加密 DNS、Fake-IP、STUN 阻断与 WebRTC 检测，见[安全防护](/guide/security)

::: danger 请自行准备节点
PP Clash 不提供代理节点或订阅服务。使用前请自行准备订阅链接或配置文件。
:::

## 支持平台

macOS（Intel / Apple 芯片）、Windows（x64 / ARM64）、Linux（.deb / .rpm / .AppImage）。

已完成实机测试：macOS Intel、Windows x64。Apple 芯片、Windows ARM64 与 Linux 构建待实机验证。

## 技术与许可

- 代理核心：[mihomo](https://github.com/MetaCubeX/mihomo)
- 应用构建：Tauri · Rust · React · TypeScript
- 许可证：[AGPL-3.0-only](https://www.gnu.org/licenses/agpl-3.0.html)

## 下一步

- [下载与安装](/guide/install)
- [快速上手](/guide/quick-start)
