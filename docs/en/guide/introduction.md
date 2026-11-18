# Introduction

PP Clash is a free, cross-platform desktop proxy client for managing [mihomo](https://github.com/MetaCubeX/mihomo) subscriptions, proxy groups and traffic routing.

It is not the "one connect button plus one server" VPN shape: multiple proxy groups can each select their own node, Rule / Global / Direct outbound modes switch at any time, system proxy and TUN enable independently, and subscription usage and connection records are first-class capabilities.

## Core features

- **Subscriptions & proxy groups** — import a subscription or local config, browse groups, search nodes, test latency, pin favorites
- **Flexible routing** — Rule / Global / Direct modes; system proxy and TUN enable independently
- **Connection info** — live traffic, active connections, routing rules, DNS and core logs
- **Menu bar quick panel** — check the current state and switch subscriptions, nodes and outbound mode
- **Local management** — manage core versions, edit config overrides (see [Overrides](/en/guide/override)), back up and restore app data
- **Security** — encrypted DNS, Fake-IP, STUN blocking and WebRTC detection, see [Security](/en/guide/security)

::: danger Bring your own nodes
PP Clash does not provide proxy nodes or subscription services. Prepare your own subscription link or configuration file before use.
:::

## Platforms

macOS (Intel / Apple silicon), Windows (x64 / ARM64), Linux (.deb / .rpm / .AppImage).

Tested on-device so far: macOS Intel and Windows x64. The Apple silicon, Windows ARM64 and Linux builds are pending verification.

## Tech & license

- Proxy core: [mihomo](https://github.com/MetaCubeX/mihomo)
- Built with: Tauri · Rust · React · TypeScript
- License: [AGPL-3.0-only](https://www.gnu.org/licenses/agpl-3.0.html)

## Next steps

- [Download & Install](/en/guide/install)
- [Quick Start](/en/guide/quick-start)
