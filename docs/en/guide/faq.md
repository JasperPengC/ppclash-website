# FAQ

## Does PP Clash provide nodes or subscriptions?

No. PP Clash does not provide proxy nodes or subscription services. Please prepare your own subscription link or configuration file.

## Where can I download Android?

Open the [Android downloads](/en/download#download-android); most phones use the `arm64-v8a` APK. Android 7.0+ and a 64-bit device are required. ARM64 has been tested on hardware; x86_64 testing is pending. See the [Android Guide](/en/guide/android) for installation and VPN permission.

## What if Android subscription import keeps waiting?

v0.2.3 bundles routing databases and shows the current import stage, so the first import no longer needs to download the bundled databases separately. If it still fails, check the subscription URL or local file, then use the on-screen message and logs to investigate network or configuration errors.

## macOS blocks the first launch

The current macOS build is signed locally and not yet notarized by Apple. Find PP Clash under "System Settings → Privacy & Security" and click "Open Anyway". See [Download & Install](/en/guide/install#macos).

## Linux reports missing dependencies?

Linux requires WebKitGTK 4.1 and Ayatana AppIndicator. The AppImage still uses the GTK and WebKitGTK libraries provided by the system.

## System proxy vs TUN?

On desktop, the system proxy takes over system-proxy traffic only and never UDP; TUN takes over all traffic (including WebRTC UDP). The two takeovers have independent switches: with TUN on, the app blocks turning on the system proxy until TUN is turned off. Android uses the system VPN service to capture traffic. See [Takeover & Routing](/en/guide/routing).

## Does a speed test switch me to the fastest node?

No. A stable exit beats the lowest latency: speed tests only report latency and never switch nodes, and a single site failing or a 403/429 does not trigger an IP change.

## Why do group names differ from the docs?

Group names, structure and order come entirely from your subscription. PP Clash hard-codes no names and never rewrites them by guessing their business meaning.

## How do I back up and restore data?

On desktop, use backup and restore in Settings; core versions and overrides have their own pages. Android updates use the matching official APK for the device architecture and normally retain subscriptions and settings.

## Is PP Clash free?

Yes — free, with features organized by scenario and no paid tiers.

## Which open-source components does it use?

The proxy core is [mihomo](https://github.com/MetaCubeX/mihomo); the app is built with Tauri, Rust, React and TypeScript. The project is licensed under [AGPL-3.0-only](https://www.gnu.org/licenses/agpl-3.0.html); third-party licenses are listed in [THIRD_PARTY_NOTICES.md](https://github.com/JasperPengC/pp-clash/blob/main/THIRD_PARTY_NOTICES.md).
