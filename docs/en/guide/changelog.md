# Release Notes

This page covers changes that affect use and upgrades. The [download page](/en/download) reads installers from the latest stable GitHub release.

## v0.2.3 · Android release

Released November 20, 2026. [Read the full GitHub release notes](https://github.com/JasperPengC/pp-clash/releases/tag/v0.2.3).

### Now on your phone

- Android ARM64 and x86_64 APKs are available for 64-bit Android 7.0+ devices.
- Manage subscriptions, switch nodes and connect through the system VPN. The overview shows your current node, latency and live traffic.
- Routing databases are bundled, fixing the wait for database downloads on first import. Imports now display the current stage.

Most phones use the ARM64 APK. ARM64 has been tested on an Android 13 phone; x86_64 hardware testing is pending. Follow the [Android Guide](/en/guide/android) to install.

### Consistent subscription controls

Desktop and Android subscription cards share an information hierarchy and bottom actions, with revised usage, expiry, update, edit and switch controls, plus deletion confirmation.

### Override merging fixed

Existing entries are preserved, new entries are appended and conflicts use the override's values. New rules go before the first `MATCH` / `FINAL`; rules with matching conditions are replaced by the override. See [Overrides](/en/guide/override) for full behavior and examples.

### Before upgrading

- **Android installers:** use `.apk`; `.aab` is a distribution artifact and cannot be installed directly. The first connection needs system VPN permission.
- **Hardware testing:** macOS Intel, Windows x64 and Android ARM64 have been verified; other published architectures still need hardware testing.
- **Desktop installation:** macOS packages remain locally signed and are not notarized by Apple. Linux needs WebKitGTK 4.1 and Ayatana AppIndicator.
- **File verification:** releases include `SHA256SUMS`. See [Verify a download](/en/guide/install#verify-download).

## Next steps

- [Download the latest release](/en/download)
- [Install and upgrade Android](/en/guide/android)
- [Quick Start](/en/guide/quick-start)
