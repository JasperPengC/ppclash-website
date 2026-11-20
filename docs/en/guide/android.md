# Android Guide

PP Clash for Android includes Overview, Nodes, Subscriptions, Connections and More. Overview shows the current node, latency and live traffic; the connection button starts the system VPN.

::: tip Now available
Android is available starting with v0.2.3. Get an APK from [Android downloads](/en/download#download-android), or read the [release notes](/en/guide/changelog).
:::

## Requirements and test status

| Device | Requirements and status |
| --- | --- |
| ARM64 phone | Android 7.0 or later, `arm64-v8a` APK; tested on an Android 13 phone |
| x86_64 device | Android 7.0 or later, `x86_64` APK; installer released, hardware testing pending |

Only 64-bit devices are supported. Most Android phones use `arm64-v8a`. The `.aab` release asset is for app distribution and cannot be installed directly like an APK.

## Install and connect

1. Get the APK for your device architecture from [Downloads](/en/download#download-android), open it and allow this installation when prompted. If Android requests permission, allow “Install unknown apps” only for the browser or file manager used to open the APK.
2. Open Subscriptions (订阅) in the bottom navigation and import your own subscription URL or local Clash / mihomo configuration file.
3. Open Nodes (节点) and select a proxy node.
4. Return to Overview (概览), choose Rule, Global or Direct, tap the connection button, and allow the system VPN request.
5. Confirm the Connected (已连接) status, then check your current node, uptime and upload/download rates.

Tap the connection button again to disconnect. Tap the current node's name on the overview to open the node selection page.

v0.2.3 bundles routing databases, so the first import no longer needs to download them separately; the interface shows the current import stage. Importing a subscription URL still requires a network connection, and external resources referenced by your configuration may still need downloading.

::: danger Bring your own subscription
PP Clash does not provide proxy nodes or subscription services. Import your own subscription or configuration before connecting.
:::

## Everyday controls

- **Latency** — tap the overview's latency ring or test button to measure the current node.
- **Subscriptions** — update, edit and switch subscriptions, and check usage and expiry. You can also update the active subscription from the overview.
- **Connections and traffic** — view active connections in Connections, and traffic history in More → Traffic statistics.
- **Network tools** — open routing rules, DNS configuration and logs from More.
- **Appearance** — choose Light, Dark or System in Settings.

Android captures traffic through the system VPN service. The outbound mode still determines how traffic is routed. See [Takeover & Routing](/en/guide/routing). Core version management, overrides, backup and restore, and WebRTC checks are available through their desktop pages.

## Upgrades and migration {#upgrade}

Settings includes update checks, a check-on-launch option, and a download action that opens the system installer after verification. Updates come from GitHub Releases and require an APK for your architecture with valid SHA-256 information.

**Official release → later official release:** install the APK for your architecture with the same signature over the existing app to retain subscriptions and settings. If Android reports a signature conflict, check the original installation source before uninstalling and losing data.

For manual verification, download the APK and `SHA256SUMS` from the same release, calculate the APK's SHA-256 digest and compare it with the matching filename in the list. See [Download & Install](/en/guide/install#verify-download) for commands.

## Next steps

- [Subscriptions & Groups](/en/guide/subscription)
- [Security](/en/guide/security)
