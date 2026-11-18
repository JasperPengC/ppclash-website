# FAQ

## Does PP Clash provide nodes or subscriptions?

No. PP Clash does not provide proxy nodes or subscription services. Please prepare your own subscription link or configuration file.

## macOS blocks the first launch

The current test build is signed locally and not yet notarized by Apple. Find PP Clash under "System Settings → Privacy & Security" and click "Open Anyway". See [Download & Install](/en/guide/install#macos).

## Linux reports missing dependencies?

Linux requires WebKitGTK 4.1 and Ayatana AppIndicator. The AppImage still uses the GTK and WebKitGTK libraries provided by the system.

## System proxy vs TUN?

The system proxy takes over system-proxy traffic only and never UDP; TUN takes over all traffic (including WebRTC UDP). The two takeovers have independent switches: with TUN on, the app blocks turning on the system proxy until TUN is turned off. See [Takeover & Routing](/en/guide/routing).

## Does a speed test switch me to the fastest node?

No. A stable exit beats the lowest latency: speed tests only report latency and never switch nodes, and a single site failing or a 403/429 does not trigger an IP change.

## Why do group names differ from the docs?

Group names, structure and order come entirely from your subscription. PP Clash hard-codes no names and never rewrites them by guessing their business meaning.

## How do I back up and restore data?

Use backup and restore in Settings to manage app data; core versions and config overrides are managed on their own pages in the app.

## Is PP Clash free?

Yes — free, with features organized by scenario and no paid tiers.

## Which open-source components does it use?

The proxy core is [mihomo](https://github.com/MetaCubeX/mihomo); the app is built with Tauri, Rust, React and TypeScript. The project is licensed under [AGPL-3.0-only](https://www.gnu.org/licenses/agpl-3.0.html); third-party licenses are listed in [THIRD_PARTY_NOTICES.md](https://github.com/JasperPengC/pp-clash/blob/main/THIRD_PARTY_NOTICES.md).
