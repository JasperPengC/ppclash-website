# Subscriptions & Groups

Subscriptions and proxy groups are presented exactly as your configuration defines them — nothing hard-coded, nothing guessed.

## Import a subscription

The subscriptions page accepts two sources:

- **Subscription URL**: paste the URL; it updates automatically on the subscription's update cycle;
- **Local file**: pick the path, review it, then confirm the import.

The data layer validates the config structure and core candidates; invalid or duplicate sources are flagged in place, and drafts survive failures. The first import is put into use automatically; adding more subscriptions never displaces the current one.

## Subscription info

Each subscription card shows:

- Name and source;
- Traffic used and remaining (usage progress appears when quota exists; unknown quota never draws a fake bar);
- Expiry date and days remaining;
- Last update time and update action.

## Browsing groups & nodes

- Group names, structure and order come entirely from the subscription;
- Search nodes, test latency, select and pin favorites;
- "Selected" and "pinned" are shown separately: favoriting or sorting never impersonates a real pin;
- Node names display in full with wrapping; latency keeps its own column.

## Quick switching

The tray/menu bar quick panel (macOS menu bar / Windows system tray) shows the current state and switches subscriptions, nodes and outbound mode; on Windows the speed is shown in the icon tooltip.

Related: [Takeover & Routing](/en/guide/routing)
