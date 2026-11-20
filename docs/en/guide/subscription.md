# Subscriptions & Groups

Subscriptions and proxy groups are presented exactly as your configuration defines them — nothing hard-coded, nothing guessed.

## Import a subscription

The subscriptions page accepts two sources:

- **Subscription URL**: paste the URL; it updates automatically on the subscription's update cycle;
- **Local file**: pick the path, review it, then confirm the import.

The data layer validates the config structure and core candidates; invalid or duplicate sources are flagged in place, and drafts survive failures. On Android, open Subscriptions in the bottom navigation and use the system file picker for local files. The first import is put into use automatically; adding more subscriptions never displaces the current one.

Android v0.2.3 bundles routing databases, so the first import does not need to download them separately. The interface shows the current import stage. Subscription URLs and external resources referenced by your configuration still need to be reachable.

## Subscription info

Each subscription card shows:

- Name and source;
- Traffic used and remaining (usage progress appears when quota exists; unknown quota never draws a fake bar);
- Expiry date and days remaining;
- Last update time and update action.

Desktop and Android share the same subscription card structure, with update, edit and switch actions at the bottom. Deleting a subscription requires confirmation.

## Browsing groups & nodes

- Group names, structure and order come entirely from the subscription;
- Search nodes, test latency, select and pin favorites;
- "Selected" and "pinned" are shown separately: favoriting or sorting never impersonates a real pin;
- Node names display in full with wrapping; latency keeps its own column.

Your node selections are remembered when you reopen the app.

## Quick switching

The desktop tray/menu bar quick panel (macOS menu bar / Windows system tray) shows the current state and switches subscriptions, nodes and outbound mode; on Windows the speed is shown in the icon tooltip.

On Android, update, edit or switch subscriptions from the subscription page. The overview also offers an action to update the active subscription.

Related: [Takeover & Routing](/en/guide/routing)
