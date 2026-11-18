# 覆写配置

覆写（Override）是 PP Clash 的进阶能力：应用先把**订阅内容**（节点、分组、规则）和**内置安全策略**合成基础配置，然后**按列表顺序逐份应用覆写**，最后才交给 mihomo 内核。覆写适合做订阅规则页做不到的事——批量修改分组、清理节点、改写数组字段。

配置覆写页支持多份覆写文件，每份可以单独启用或停用；停用的文件不参与合并。

## 两种模式

| | YAML 覆写 | JS 覆写 |
| --- | --- | --- |
| 适合 | 覆盖个别字段、整体替换数组 | 带逻辑的批量修改（过滤、遍历、条件改写） |
| 写法 | 顶层为对象（键值对）；顶层为数组时整体替换 | 函数体，可就地修改 `config` 或返回新对象 |
| 合并方式 | 深合并进当前配置 | 返回值整体替换当前配置 |
| 执行 | js-yaml 解析 | QuickJS 隔离解释器，300ms 执行预算 |

两种模式都支持占位符 <span v-pre>{{CURRENT_NODE}}</span>：生成配置时会被替换为**当前选中的节点名**（没有选中节点时替换为 `DIRECT`）。替换发生在脚本执行之前，所以在 JS 里拿到的是字面量字符串。

## YAML 覆写：深合并补丁

YAML 覆写是一份“补丁”，按以下规则深合并进当前配置：

- **对象**：逐键递归合并；
- **数组：整体替换**——不是追加！想改数组请整体重写，或改用 JS；
- **标量**：直接覆盖；
- **顶层**：对象深合并进当前配置；顶层是数组时整份替换当前配置；其他类型（如纯标量）该份覆写被忽略。

编辑器会实时校验语法（与生成器使用同一解析器），语法错误会就地标出。

### 例 1：替换加密 DNS 服务器

应用的 DNS 策略默认加密；用整体替换把 nameserver 换成你信任的服务器：

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
- 可以就地修改 `config`，也可以 `return` 一个新对象；**必须返回对象**（不能是数组、不支持异步）；
- 运行在 QuickJS 隔离解释器中：没有网络、没有宿主 API、没有模块加载，只能做纯数据变换；
- 执行预算 300ms、内存 64MB、输入输出 JSON 上限 8MB——超时或超限会报错并保留可用数据。

JS 是修改数组的主场（YAML 数组只能整体替换）。编辑器会实时校验函数体语法。

### 例 1：按关键词过滤节点

```js
// 剔除名称带"官网/流量/到期"的节点，并同步清理分组引用
const keywords = ['官网', '流量', '到期'];
const bad = (name) => keywords.some((k) => name.includes(k));

config.proxies = (config.proxies || []).filter((p) => !bad(p.name));
for (const g of config['proxy-groups'] || []) {
  g.proxies = (g.proxies || []).filter((n) => !bad(n));
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

config.rules = [
  `DOMAIN-SUFFIX,openai.com,${current}`,
  ...config.rules,
];
```

::: warning 注意规则顺序
`rules` 数组**从上到下**匹配。插在数组最前面 = 优先于应用防护规则；插在防护规则之后、订阅规则之前，需要自行定位边界。应用内“分流规则”页提供的排序、启停和目标修改不需要覆写，优先使用。
:::

## 顺序与失败处理

- 多份覆写**按列表顺序**逐份应用，前一份的输出是后一份的输入；
- 停用的文件跳过；YAML 解析失败会忽略该份并在日志中警告；JS 执行失败会中断并保留可用数据；
- DNS、TUN、嗅探等安全相关字段由应用统一生成，覆写偏离默认安全策略时，“安全防护 → 配置检查”会给出提示。

## 下一步

- 规则层面的调整优先使用应用内[分流规则](/guide/routing)页；
- 组与节点的关系见[订阅与分组](/guide/subscription)。
