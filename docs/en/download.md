---
title: Download
---

# Download PP Clash

The desktop and Android installers below are read automatically from the latest GitHub release. Pick the one that matches your operating system and CPU architecture:

<ReleaseDownloads />

<div class="pp-cta-row">
<a class="VPButton medium brand" href="https://github.com/JasperPengC/pp-clash/releases" target="_blank" rel="noopener">All versions (GitHub Releases)</a>
<a class="VPButton medium alt" href="guide/quick-start.html">Quick start guide</a>
</div>

::: danger Bring your own nodes
PP Clash does not provide proxy nodes or subscription services. Please prepare your own subscription or configuration file.
:::

::: tip Tested status
Tested on hardware: macOS Intel, Windows x64 and Android ARM64. Apple silicon, Windows ARM64, Linux and Android x86_64 builds are still pending verification.
:::

::: info Android release
Android is available starting with v0.2.3 for 64-bit Android 7.0+ devices. Most phones use the `arm64-v8a` APK; choose `x86_64` for devices with that architecture. See the [Android Guide](/en/guide/android).
:::

Get the installer and `SHA256SUMS` from the same release; see [Verify a download](/en/guide/install#verify-download). Read about this update in the [v0.2.3 release notes](/en/guide/changelog).

## First launch on macOS

The current macOS build is signed locally and not yet notarized by Apple. If the system blocks the first launch:

1. Open "System Settings → Privacy & Security";
2. Find PP Clash in the security notice and click "Open Anyway".

## Linux dependencies

Linux requires WebKitGTK 4.1 and Ayatana AppIndicator. The AppImage still uses the GTK and WebKitGTK libraries provided by the system.

## Next steps

After installing, follow [Quick Start](/en/guide/quick-start) to import a subscription, pick a node and enable takeover.
