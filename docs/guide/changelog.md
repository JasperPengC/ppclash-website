# 版本更新

这里记录与使用和升级相关的变化。安装包始终以[下载页](/download)读取的 GitHub 最新正式 Release 为准。

## v0.2.3 · Android 正式发布

发布于 2026 年 11 月 20 日。[查看 GitHub 完整发布说明](https://github.com/JasperPengC/pp-clash/releases/tag/v0.2.3)。

### 手机端加入

- 发布 Android ARM64 与 x86_64 APK，支持 Android 7.0+ 的 64 位设备。
- 在手机上管理订阅、切换节点，通过系统 VPN 连接；概览页显示当前节点、延迟与实时流量。
- 分流数据库随应用内置，修复首次导入等待数据库下载的问题；导入过程显示当前阶段。

多数手机选择 ARM64 APK。ARM64 已在 Android 13 手机上验证，x86_64 待实机验证。安装步骤见 [Android 使用指南](/guide/android)。

### 桌面与手机操作统一

订阅卡片统一信息层次与底部操作，调整用量、到期信息和更新、编辑、切换入口，并加入删除确认。

### 覆写合并修正

保留原有条目、追加新条目，冲突按覆写内容处理。规则中的新条目插入首条 `MATCH` / `FINAL` 之前，同条件规则由覆写替换。完整行为与示例见[覆写配置](/guide/override)。

### 升级前注意

- **Android 安装包：**下载 `.apk`；`.aab` 是分发产物，不能直接安装。首次连接需要系统 VPN 授权。
- **实测范围：**macOS Intel、Windows x64、Android ARM64；其他已发布架构仍待实机验证。
- **桌面安装：**macOS 安装包仍为本地签名、未完成 Apple 公证；Linux 需要 WebKitGTK 4.1 与 Ayatana AppIndicator。
- **文件校验：**Release 提供 `SHA256SUMS`，参照[下载校验](/guide/install#verify-download)核对安装包。

## 下一步

- [下载最新版本](/download)
- [Android 安装与升级](/guide/android)
- [快速上手](/guide/quick-start)
