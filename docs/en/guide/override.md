# Overrides

Overrides (覆写) are an advanced desktop feature. The app builds a base config from the **subscription** (nodes, groups, rules) and its **built-in security policy**, applies overrides **in list order**, then passes the result to mihomo. Use them to add rules, update named groups and change configuration fields.

The 配置覆写 (Overrides) page supports multiple override files, each independently enabled or disabled; disabled files are skipped during merging.

## Two modes

| | YAML override | JS override |
| --- | --- | --- |
| Best for | Updating fields and adding rules or array entries | Iteration, conditions and bulk edits |
| Format | A configuration object (key-value pairs) | A function body that mutates `config` or returns an object |
| Merging | Objects merge by key; arrays merge by entry identity | The result uses the same merge rules, with omitted top-level fields removed |
| Execution | Parsed with js-yaml | QuickJS isolated interpreter, 300ms budget |

Both modes support the <span v-pre>{{CURRENT_NODE}}</span> placeholder: it is replaced with the **currently selected node name** (or `DIRECT` when nothing is selected) at generation time — before the script runs, so in JS you receive a literal string.

## YAML override: a deep-merge patch

A YAML override is a "patch" deep-merged into the current config:

- **Objects**: merged key by key, recursively;
- **Arrays**: existing entries are retained and new entries appended. Objects with the same name replace the matching entry; duplicate strings or numbers are deduplicated;
- **Rules**: a rule with the same matching condition replaces the existing rule. Domain matching identities are case-insensitive. New rules are inserted before the first `MATCH` / `FINAL` fallback;
- **Scalars**: overwritten directly;
- **Top level**: use a configuration object, merged by key. An empty array retains the original array entries.

The editor validates syntax live (same parser as the generator) and flags errors in place.

### Example 1: add encrypted DNS servers

Add servers to the existing `nameserver` list. Addresses already present are deduplicated:

```yaml
dns:
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
```

### Example 2: add static host mappings

```yaml
hosts:
  "example.internal": 192.168.1.10
```

### Example 3: add or update a routing rule

```yaml
rules:
  - DOMAIN-SUFFIX,example.com,DIRECT
```

An existing rule for the same domain suffix gets its target updated. Otherwise the new rule is inserted before the fallback, preserving the other subscription rules.

## JS override: a config transform

What you write in the editor is a **function body**; execution is equivalent to:

```js
(function (config) {
  // your code
  return config; // implicit if you omit it
})(config)
```

Key points:

- `config` is the mihomo config object with core-native keys (`proxies`, `proxy-groups`, `rules`, `mixed-port`, …);
- You can mutate `config` in place or `return` an object; it **must be an object** (not an array, no async). The result is then merged with the original configuration;
- It runs in a QuickJS isolated interpreter: no network, no host APIs, no module loading — pure data transformation only;
- Budget: 300ms execution, 64MB memory, 8MB JSON input/output — timeouts or overruns fail with an error and usable data is kept.

JS and YAML use the same array merge rules. The editor validates the function body live. Removing entries with `filter` or returning an empty array retains the original entries during merging. Use the app's routing rules page to delete or reorder subscription rules.

### Example 1: change node options conditionally

```js
// Update matching named nodes while retaining the others
for (const node of config.proxies || []) {
  if (node.type === 'trojan') {
    node.udp = true;
  }
}
```

### Example 2: turn a latency auto-group into manual selection

```js
// The app already manages url-test groups when stable routing is on; this shows field rewriting
for (const g of config['proxy-groups'] || []) {
  if (g.type === 'url-test' && g.name === '自动选择') {
    g.type = 'select';
    delete g.url;
    delete g.interval;
    delete g.tolerance;
  }
}
```

### Example 3: pin a domain to the current node

```js
// {{CURRENT_NODE}} is replaced with the current node name before the script runs
const current = '{{CURRENT_NODE}}';

config.rules = (config.rules || []).filter(
  (rule) => !rule.toLowerCase().startsWith('domain-suffix,openai.com,')
);
config.rules.push(`DOMAIN-SUFFIX,openai.com,${current}`);
```

::: warning Mind the rule order
The `rules` array matches **top to bottom**. Matching rules update in place, and new rules are inserted before the fallback. Earlier rules may still take precedence. This example removes the old matching rule from the script result before adding the new one, so the old target cannot overwrite the new target during merging. Use the app's routing rules page for sorting, toggling or retargeting subscription rules.
:::

## Order & failure handling

- Overrides apply **in list order**; each one receives the previous one's output;
- Disabled files are skipped; a YAML parse failure skips that file with a warning in the log; a JS failure aborts generation and keeps usable data;
- Security-related fields (DNS, TUN, sniffer) are generated by the app; deviations from the default policy are surfaced in 安全防护 → 配置检查 (Security → Config check) in the app.

## Next steps

- For rule-level tweaks, prefer the [routing](/en/guide/routing) page in the app;
- Group and node relationships are covered in [Subscriptions & Groups](/en/guide/subscription).
