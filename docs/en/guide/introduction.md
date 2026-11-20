# Introduction

PP Clash is a free proxy client for desktop and Android, managing [mihomo](https://github.com/MetaCubeX/mihomo) subscriptions, proxy groups and traffic routing.

Multiple proxy groups can each select their own node, with Rule, Global and Direct modes. Desktop captures traffic through System Proxy or TUN, while Android uses the system VPN. Subscription usage and connection records are always available.

## Core features

- **Subscriptions & proxy groups** — import a subscription or local config, browse groups, search nodes, test latency, pin nodes and remember node selections
- **Flexible routing** — Rule / Global / Direct modes; System Proxy or TUN on desktop, VPN on Android
- **Connection info** — live traffic, active connections, routing rules, DNS and core logs
- **Quick controls** — the desktop tray panel switches subscriptions, nodes and modes; Android offers floating navigation, a latency ring and a connection button. Both support Light, Dark and System themes
- **Desktop tools** — manage core versions, edit config overrides (see [Overrides](/en/guide/override)), back up and restore app data
- **Security** — default encrypted DNS, Fake-IP and STUN blocking in Rule mode, with WebRTC checks on desktop, see [Security](/en/guide/security)

::: danger Bring your own nodes
PP Clash does not provide proxy nodes or subscription services. Prepare your own subscription link or configuration file before use.
:::

## Platforms

macOS (Intel / Apple silicon), Windows (x64 / ARM64), Linux (.deb / .rpm / .AppImage).

Tested on hardware: macOS Intel, Windows x64 and Android ARM64. Apple silicon, Windows ARM64, Linux and Android x86_64 builds are pending verification.

Android is available starting with v0.2.3 for 64-bit Android 7.0+ devices. Most phones use the `arm64-v8a` APK; choose `x86_64` for devices with that architecture. See the [Android Guide](/en/guide/android).

## Tech & license

- Proxy core: [mihomo](https://github.com/MetaCubeX/mihomo)
- Built with: Tauri · Rust · React · TypeScript
- License: [AGPL-3.0-only](https://www.gnu.org/licenses/agpl-3.0.html)

## Next steps

- [Download & Install](/en/guide/install)
- [Quick Start](/en/guide/quick-start)
