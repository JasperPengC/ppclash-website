---
title: Download
---

# Download PP Clash

The installers below are read automatically from the latest GitHub release. Pick the one that matches your operating system and CPU architecture:

<ReleaseDownloads />

<div class="pp-cta-row">
<a class="VPButton medium brand" href="https://github.com/JasperPengC/pp-clash/releases" target="_blank" rel="noopener">All versions (GitHub Releases)</a>
<a class="VPButton medium alt" href="guide/quick-start.html">Quick start guide</a>
</div>

::: danger Bring your own nodes
PP Clash does not provide proxy nodes or subscription services. Please prepare your own subscription or configuration file.
:::

::: tip Tested status
macOS Intel and Windows x64 have passed on-device testing so far; the Apple silicon, Windows ARM64 and Linux builds are still pending verification.
:::

## First launch on macOS

The current test build is signed locally and not yet notarized by Apple. If the system blocks the first launch:

1. Open "System Settings → Privacy & Security";
2. Find PP Clash in the security notice and click "Open Anyway".

## Linux dependencies

Linux requires WebKitGTK 4.1 and Ayatana AppIndicator. The AppImage still uses the GTK and WebKitGTK libraries provided by the system.

## Next steps

After installing, follow [Quick Start](/en/guide/quick-start) to import a subscription, pick a node and enable takeover.
