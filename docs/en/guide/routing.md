# Takeover & Routing

## Outbound modes

Switch between three modes at the top right of the window (or in the quick panel):

- **Rule**: forward according to the subscription's routing rules (recommended);
- **Global**: send all traffic through the proxy;
- **Direct**: connect everything directly.

## System proxy vs TUN

The two takeover modes have independent switches: with TUN on, the app blocks turning on the system proxy until TUN is turned off.

| | System proxy | TUN |
| --- | --- | --- |
| Scope | System-proxy traffic | All traffic (per the actual interface and stack state) |
| UDP | Not taken over | Taken over |
| Typical case | Everyday browsing | Apps that need UDP, such as WebRTC |

The system proxy shows its real listening port; TUN shows the actual network interface and stack state, and displays "unconfirmed" when reading fails instead of inventing state.

::: tip Need UDP through the proxy?
The system proxy does not take over UDP. To route UDP traffic used by WebRTC and similar protocols, enable TUN.
:::

## A stable exit comes first

- Speed tests never switch nodes; a single site failing or a 403/429 does not trigger an IP change;
- Conservative background failover follows the established rules (two minutes, two sites × three rounds, ten-minute cooldown);
- Pinned nodes always win; confirm the connection state on the overview's current node and latency.

## Boundaries of routing rules

- Groups and rules come from your subscription; the app never guesses business meaning from names and silently rewrites them;
- A selected reference path is not the physical forwarding chain, and an intermediate node is not the final exit;
- When the source or runtime state is insufficient, it shows "unknown" rather than a fabricated global node.
