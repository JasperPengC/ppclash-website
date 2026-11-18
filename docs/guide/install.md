# 下载与安装

按操作系统与处理器架构选择安装包。下方列表自动取自 [GitHub Releases](https://github.com/JasperPengC/pp-clash/releases) 的最新版本。

## 安装包列表

<ReleaseDownloads />

::: tip 实测状态
已完成实机测试：macOS Intel、Windows x64。Apple 芯片、Windows ARM64 与 Linux 构建仍待实机验证。
:::

## macOS

打开 `.dmg`，将 PP Clash 拖入“应用程序”文件夹。

::: warning 首次打开被阻止？
当前测试包使用本地签名，尚未完成 Apple 公证。在“系统设置 → 隐私与安全性”中找到 PP Clash，选择“仍要打开”。
:::

## Windows

运行 `-setup.exe` 安装程序，按向导完成安装。

## Linux

安装 `.deb` 或 `.rpm` 包，或运行 `.AppImage`。

Linux 需要 WebKitGTK 4.1 和 Ayatana AppIndicator；AppImage 仍使用系统提供的 GTK 与 WebKitGTK 库。

## 下一步

安装完成后进入 [快速上手](/guide/quick-start)。
