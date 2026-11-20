---
title: 下载
---

# 下载 PP Clash

以下桌面与 Android 安装包自动取自 GitHub Releases 的最新版本，按操作系统与处理器架构选择：

<ReleaseDownloads />

<div class="pp-cta-row">
<a class="VPButton medium brand" href="https://github.com/JasperPengC/pp-clash/releases" target="_blank" rel="noopener">全部版本（GitHub Releases）</a>
<a class="VPButton medium alt" href="guide/quick-start.html">快速上手文档</a>
</div>

::: danger 请自行准备节点
PP Clash 不提供代理节点或订阅服务，请自行准备订阅或配置文件。
:::

::: tip 实测状态
已完成实机测试：macOS Intel、Windows x64、Android ARM64。Apple 芯片、Windows ARM64、Linux 与 Android x86_64 构建仍待实机验证。
:::

::: info Android 正式版
Android 正式版已随 v0.2.3 发布，支持 Android 7.0+ 的 64 位设备。多数手机选择 `arm64-v8a` APK；`x86_64` 适用于对应架构设备。详见 [Android 使用指南](/guide/android)。
:::

安装包与 `SHA256SUMS` 应来自同一 Release，校验方法见[下载校验](/guide/install#verify-download)。本次变化见 [v0.2.3 版本更新](/guide/changelog)。

## macOS 首次打开

当前 macOS 安装包使用本地签名，尚未完成 Apple 公证。如果系统阻止打开：

1. 打开“系统设置 → 隐私与安全性”；
2. 在安全提示中找到 PP Clash，选择“仍要打开”。

## Linux 依赖

Linux 需要 WebKitGTK 4.1 和 Ayatana AppIndicator。AppImage 仍使用系统提供的 GTK 和 WebKitGTK 库。

## 下一步

安装完成后，按 [快速上手](/guide/quick-start) 导入订阅、选择节点并开启接管。
