# 覆写配置

覆写（Override）是 PP Clash 桌面端的进阶能力：应用先把**订阅内容**（节点、分组、规则）和**内置安全策略**合成基础配置，然后**按列表顺序逐份应用覆写**，最后交给 mihomo 内核。可用于添加规则、更新同名分组和调整配置字段。

配置覆写页支持多份覆写文件，每份可以单独启用或停用；停用的文件不参与合并。

## 两种模式

| | YAML 覆写 | JS 覆写 |
| --- | --- | --- |
| 适合 | 覆盖个别字段、添加规则与数组条目 | 遍历、条件判断与批量修改 |
| 写法 | 顶层为配置对象（键值对） | 函数体，可就地修改 `config` 或返回对象 |
| 合并方式 | 对象逐键合并，数组按条目身份合并 | 执行结果按同样规则合并，删除结果中省略的顶层字段 |
| 执行 | js-yaml 解析 | QuickJS 隔离解释器，300ms 执行预算 |

两种模式都支持占位符 <span v-pre>{{CURRENT_NODE}}</span>：生成配置时会被替换为**当前选中的节点名**（没有选中节点时替换为 `DIRECT`）。替换发生在脚本执行之前，所以在 JS 里拿到的是字面量字符串。

## YAML 覆写：深合并补丁

YAML 覆写是一份“补丁”，按以下规则深合并进当前配置：

- **对象**：逐键递归合并；
- **数组**：保留原有条目，追加新条目；同名对象替换对应对象，重复的字符串或数值保留一份；
- **规则数组**：相同匹配条件的规则替换原项，域名类匹配忽略大小写；新规则插在首条 `MATCH` / `FINAL` 兜底规则之前；
- **标量**：直接覆盖；
- **顶层**：使用配置对象，按键合并。空数组会保留原有数组条目。

编辑器会实时校验语法（与生成器使用同一解析器），语法错误会就地标出。

### 例 1：补充加密 DNS 服务器

在现有 `nameserver` 中补充服务器，已存在的地址会去重：

```yaml
dns:
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
```

### 例 2：添加静态域名映射

```yaml
hosts:
  "example.internal": 192.168.1.10
```

### 例 3：添加或更新分流规则

```yaml
rules:
  - DOMAIN-SUFFIX,example.com,DIRECT
```

同一域名后缀规则已存在时更新其目标；不存在时追加到兜底规则前，保留其他订阅规则。

## JS 覆写：配置变换函数

编辑器里写的是**函数体**，实际执行等价于：

```js
(function (config) {
  // 你写的代码
  return config; // 不写 return 也会自动带上
})(config)
```

要点：

- `config` 是 mihomo 配置对象，键名与内核一致（`proxies`、`proxy-groups`、`rules`、`mixed-port`……）；
- 可以就地修改 `config`，也可以 `return` 一个对象；**必须返回对象**（不能是数组、不支持异步）；执行结果继续与原配置合并；
- 运行在 QuickJS 隔离解释器中：没有网络、没有宿主 API、没有模块加载，只能做纯数据变换；
- 执行预算 300ms、内存 64MB、输入输出 JSON 上限 8MB——超时或超限会报错并保留可用数据。

JS 与 YAML 使用相同的数组合并规则，编辑器会实时校验函数体语法。仅通过 `filter` 从结果数组中移除条目，或返回空数组，会保留原配置中的对应条目；需要删除或排序订阅规则时使用应用内“分流规则”页。

### 例 1：按条件修改节点选项

```js
// 同名节点会替换原项，其他节点保留
for (const node of config.proxies || []) {
  if (node.type === 'trojan') {
    node.udp = true;
  }
}
```

### 例 2：把延迟自动组改成手动选择

```js
// url-test 组交给应用管理时无需此操作；这里演示改写分组字段
for (const g of config['proxy-groups'] || []) {
  if (g.type === 'url-test' && g.name === '自动选择') {
    g.type = 'select';
    delete g.url;
    delete g.interval;
    delete g.tolerance;
  }
}
```

### 例 3：把指定域名固定到当前节点

```js
// {{CURRENT_NODE}} 在脚本执行前已被替换为当前节点名
const current = '{{CURRENT_NODE}}';

config.rules = (config.rules || []).filter(
  (rule) => !rule.toLowerCase().startsWith('domain-suffix,openai.com,')
);
config.rules.push(`DOMAIN-SUFFIX,openai.com,${current}`);
```

::: warning 注意规则顺序
`rules` 数组**从上到下**匹配。合并时同一规则在原位置更新，新规则放在兜底规则前，原有更靠前的规则仍可能优先命中。上例先移除脚本结果中的同条件旧规则，再追加更新项，避免旧目标在后续合并时覆盖新目标。规则排序、启停和目标修改可直接使用应用内“分流规则”页。
:::

## 顺序与失败处理

- 多份覆写**按列表顺序**逐份应用，前一份的输出是后一份的输入；
- 停用的文件跳过；YAML 解析失败会忽略该份并在日志中警告；JS 执行失败会中断并保留可用数据；
- DNS、TUN、嗅探等安全相关字段由应用统一生成，覆写偏离默认安全策略时，“安全防护 → 配置检查”会给出提示。

## 下一步

- 规则层面的调整优先使用应用内[分流规则](/guide/routing)页；
- 组与节点的关系见[订阅与分组](/guide/subscription)。
