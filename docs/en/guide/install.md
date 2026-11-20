# Download & Install

Pick the desktop or Android installer that matches your operating system and CPU architecture. The list below is read automatically from the latest release on [GitHub Releases](https://github.com/JasperPengC/pp-clash/releases).

## Installer list

<ReleaseDownloads />

::: tip Tested status
Tested on hardware: macOS Intel, Windows x64 and Android ARM64. Apple silicon, Windows ARM64, Linux and Android x86_64 builds are still pending verification.
:::

::: info Android release
Android is available starting with v0.2.3 for 64-bit Android 7.0+ devices. Most phones use the `arm64-v8a` APK; choose `x86_64` for devices with that architecture. See the [Android Guide](/en/guide/android).
:::

## macOS

Open the `.dmg` and drag PP Clash into your Applications folder.

::: warning Blocked on first launch?
The current macOS build is signed locally and not yet notarized by Apple. Find PP Clash under "System Settings → Privacy & Security" and click "Open Anyway".
:::

## Windows

Run the `-setup.exe` installer and follow the wizard.

## Linux

Install the `.deb` or `.rpm` package, or run the `.AppImage`.

Linux requires WebKitGTK 4.1 and Ayatana AppIndicator; the AppImage still uses the GTK and WebKitGTK libraries provided by the system.

## Android

Select an APK from the Android group above: most phones use `arm64-v8a`, while x86_64 devices need the matching APK. Android 7.0+ and a 64-bit device are required. The `.aab` is for distribution and cannot be installed directly. Open the APK, allow installation when prompted and approve the VPN request when connecting. Follow the [Android Guide](/en/guide/android) for details.

## Verify a download {#verify-download}

Download the installer and `SHA256SUMS` from the **same release**, calculate the installer's SHA-256 digest and compare it with the **matching filename** in the list. These examples use the v0.2.3 Android ARM64 APK; substitute the actual filename for other installers.

macOS:

```bash
shasum -a 256 "ppclash-android-arm64-v8a-v0.2.3.apk"
```

Linux:

```bash
sha256sum "ppclash-android-arm64-v8a-v0.2.3.apk"
```

Windows PowerShell:

```powershell
Get-FileHash "ppclash-android-arm64-v8a-v0.2.3.apk" -Algorithm SHA256
```

Install only after the digests match. If they differ, download the file again from that release instead of installing a damaged file or one with an uncertain source.

## Next steps

Once installed, head to [Quick Start](/en/guide/quick-start).
