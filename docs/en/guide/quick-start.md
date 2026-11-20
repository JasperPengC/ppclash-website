# Quick Start

From install to a stable exit in four steps. Android requirements and navigation are covered in the [Android Guide](/en/guide/android).

## 1. Import a subscription or local config

Open PP Clash and go to the subscriptions page:

- **Subscription URL**: paste the subscription link from your provider or self-hosted service;
- **Local file**: pick a local Clash configuration file to import.

Imports validate the configuration and preserve usable data on failure. On Android, open Subscriptions in the bottom navigation; local files are selected through the system file picker.

::: danger No subscription?
PP Clash does not provide proxy nodes or subscription services. Please prepare your own subscription link or configuration file.
:::

::: tip First launch on macOS
macOS may require you to allow the app under "System Settings → Privacy & Security" before it opens. See [Download & Install](/en/guide/install#macos).
:::

## 2. Pick a node

Go to the proxies page (代理节点):

- Group names and structure come from your subscription — browse by their real names;
- Search nodes and tap the lightning icon to test latency;
- Select a node, then pin it if you like. A stable exit beats the lowest latency — speed tests never switch nodes automatically.

Your node selection is remembered between sessions. On Android, tap the current node name on the overview to open Nodes, or tap the latency ring to test it.

## 3. Enable takeover

### Desktop

Back on the overview, enable what you need:

- **System proxy**: takes over system-proxy traffic and shows the real listening port; UDP is not taken over;
- **TUN**: takes over all traffic based on the actual network interface and stack state; enable it when UDP traffic like WebRTC needs the proxy.

The two takeovers have independent switches: with TUN on, the app blocks turning on the system proxy until TUN is turned off. Starting either takeover launches the mihomo core automatically; stopping the last one stops the core.

### Android

On Overview, tap the connection button and allow the system VPN request. Confirm the Connected status; tap again to disconnect. Rule, Global and Direct modes are at the top of the overview.

## 4. Confirm the state

The desktop overview's first screen shows:

- The current node with its latency ring (tap to re-test);
- Upload and download rates with recent peaks;
- Service connectivity results;
- Current subscription usage and expiry.

The Android overview shows your current node, latency, uptime and live upload/download rates. Usage and expiry are available in Subscriptions.

## Daily use

- Tray/menu bar quick panel (macOS menu bar / Windows system tray): switch subscriptions, nodes and outbound mode without returning to the main window;
- Android bottom navigation opens Nodes, Subscriptions, Connections and More; traffic statistics, routing rules, DNS and logs are under More;
- Config and subscription changes stay explainable and revertible: failures keep usable data, and success notices match the stage actually completed.

Next: details on [Takeover & Routing](/en/guide/routing), or see [Security](/en/guide/security).
