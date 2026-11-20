# 下载与安装

按操作系统与处理器架构选择桌面或 Android 安装包。下方列表自动取自 [GitHub Releases](https://github.com/JasperPengC/pp-clash/releases) 的最新版本。

## 安装包列表

<ReleaseDownloads />

::: tip 实测状态
已完成实机测试：macOS Intel、Windows x64、Android ARM64。Apple 芯片、Windows ARM64、Linux 与 Android x86_64 构建仍待实机验证。
:::

::: info Android 正式版
Android 正式版已随 v0.2.3 发布，支持 Android 7.0+ 的 64 位设备。多数手机选择 `arm64-v8a` APK；`x86_64` 适用于对应架构设备。详见 [Android 使用指南](/guide/android)。
:::

## macOS

打开 `.dmg`，将 PP Clash 拖入“应用程序”文件夹。

::: warning 首次打开被阻止？
当前 macOS 安装包使用本地签名，尚未完成 Apple 公证。在“系统设置 → 隐私与安全性”中找到 PP Clash，选择“仍要打开”。
:::

## Windows

运行 `-setup.exe` 安装程序，按向导完成安装。

## Linux

安装 `.deb` 或 `.rpm` 包，或运行 `.AppImage`。

Linux 需要 WebKitGTK 4.1 和 Ayatana AppIndicator；AppImage 仍使用系统提供的 GTK 与 WebKitGTK 库。

## Android

从上方 Android 分组选择 APK，多数手机使用 `arm64-v8a`，x86_64 设备选择对应包。支持 Android 7.0+，仅限 64 位设备；`.aab` 用于应用分发，不能直接安装。打开 APK 并按系统提示允许安装，连接时允许 VPN 请求。完整操作见 [Android 使用指南](/guide/android)。

## 校验下载文件 {#verify-download}

从**同一个 Release** 获取安装包与 `SHA256SUMS`，计算安装包的 SHA-256，并与清单中**同名文件**的值比较。以下以 v0.2.3 的 Android ARM64 APK 为例；其他安装包请替换为实际文件名。

macOS：

```bash
shasum -a 256 "ppclash-android-arm64-v8a-v0.2.3.apk"
```

Linux：

```bash
sha256sum "ppclash-android-arm64-v8a-v0.2.3.apk"
```

Windows PowerShell：

```powershell
Get-FileHash "ppclash-android-arm64-v8a-v0.2.3.apk" -Algorithm SHA256
```

确认摘要完全一致后再安装。如果不一致，请重新从该 Release 下载，不要继续安装损坏或来源不明的文件。

## 下一步

安装完成后进入 [快速上手](/guide/quick-start)。
