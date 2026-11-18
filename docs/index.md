---
layout: home
---

<section class="pp-slide pp-slide-hero" id="top">
  <div class="pp-hero">
    <div class="pp-hero-copy" data-reveal>
      <h2 class="pp-display">每一次连接，<span class="pp-tone">都走确定的路</span></h2>
      <p class="pp-hero-sub">管理 mihomo 订阅、代理分组与流量路由的桌面客户端。规则分流、系统代理与 TUN 独立接管，连接状态实时可见。</p>
      <div class="pp-hero-cta">
        <a class="pp-btn pp-btn-brand" href="download.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16"/></svg>免费下载 PP Clash</a>
        <a class="pp-btn pp-btn-ghost" href="guide/introduction.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/></svg>阅读使用文档</a>
      </div>
    </div>
    <div class="pp-macbook pp-par pp-par-fade" data-par="0.16" data-par-fade="0.35">
      <div class="pp-macbook-glow" aria-hidden="true"></div>
      <HeroPreview />
    </div>
  </div>
  <div class="stage-footnote">
    <span>界面使用演示数据</span>
    <span>不提供代理节点或订阅服务，请自行准备订阅</span>
    <span>免费开源 · AGPL-3.0 · 基于 mihomo</span>
  </div>
</section>
<nav class="pp-rail" aria-label="首页分段导航">
  <a href="#top" class="on" aria-label="产品介绍"></a>
  <a href="#routing" aria-label="分流引擎"></a>
  <a href="#local" aria-label="本机与开源"></a>
  <a href="#download" aria-label="下载与常见问题"></a>
</nav>
<section class="pp-slide pp-slide-cinema" id="routing">
  <div class="pp-section">
    <div class="pp-route-head" data-reveal>
      <h2 class="pp-display">分流，<span class="pp-tone">看得见</span></h2>
      <p class="pp-lead">规则、全局、直连三种出站模式实时切换；系统代理与 TUN 各自独立开关，UDP 流量交给 TUN。切换模式、点开关节点，亲自试试。</p>
      <span class="pp-live"><i aria-hidden="true"></i>INTERACTIVE · 演示数据</span>
    </div>
    <div data-reveal style="--rv-d: 120ms">
      <RoutingDemo />
    </div>
  </div>
</section>
<section class="pp-slide pp-slide-flow" id="local">
  <div class="pp-section">
    <div class="pp-feat-head" data-reveal>
      <h2 class="pp-display">配置与数据，<span class="pp-tone">留在本机</span></h2>
      <p class="pp-lead">订阅、覆写、内核与日志都在本机管理；源码公开可审计，免费且不设任何收费层级。</p>
    </div>
    <div class="pp-feat-grid rev">
      <div class="pp-list-rows" data-reveal>
        <div class="pp-list-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 2 9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5"/></svg>
          <div>
            <h3>订阅与分组</h3>
            <p>导入订阅或本地配置，分组按原样呈现；搜索、测速、固定常用节点。</p>
            <a href="guide/subscription.html">订阅与分组<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg></a>
          </div>
        </div>
        <div class="pp-list-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>
          <div>
            <h3>覆写与内核</h3>
            <p>YAML / JS 覆写实时校验，mihomo 内核版本本机管理，备份与恢复应用数据。</p>
            <a href="guide/override.html">覆写配置<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg></a>
          </div>
        </div>
        <div class="pp-list-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div>
            <h3>安全与日志</h3>
            <p>加密 DNS、Fake-IP、STUN 阻断与 WebRTC 检测默认开启；运行日志按需进入。</p>
            <a href="guide/security.html">安全防护<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg></a>
          </div>
        </div>
      </div>
      <div class="pp-term" data-reveal style="--rv-d: 100ms">
        <div class="pp-term-head">
          <i></i><i></i><i></i>
          <span>override.yaml</span>
          <em>YAML · 深合并</em>
        </div>
        <pre><span class="tk-c"># 覆写示例：替换加密 DNS 服务器</span>
<span class="tk-k">dns</span>:
  <span class="tk-k">nameserver</span>:
    - <span class="tk-s">https://dns.alidns.com/dns-query</span>
    - <span class="tk-s">https://doh.pub/dns-query</span>
<span class="tk-c"># 对象逐键深合并，数组整体替换</span>
<span class="tk-k">tun</span>:
  <span class="tk-k">enable</span>: <span class="tk-p">true</span>
  <span class="tk-k">stack</span>: <span class="tk-s">mixed</span></pre>
      </div>
    </div>
    <div class="pp-tiles">
      <div class="pp-tile" data-reveal>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 6-6 6 6 6M16 6l6 6-6 6"/></svg>
        <h3>源码开放</h3>
        <p>完整源码公开，任何人可阅读、审查与复现构建。</p>
        <span class="pp-mono">AGPL-3.0-only</span>
      </div>
      <div class="pp-tile" data-reveal style="--rv-d: 80ms">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
        <h3>本机运行</h3>
        <p>配置与数据留在本机，由你自行备份和恢复。</p>
        <span class="pp-mono">mihomo core</span>
      </div>
      <div class="pp-tile" data-reveal style="--rv-d: 160ms">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
        <h3>免费无层级</h3>
        <p>全部功能平等开放，没有付费墙与订阅制。</p>
        <span class="pp-mono">free forever</span>
      </div>
    </div>
  </div>
</section>
<section class="pp-slide" id="download">
  <div class="pp-section pp-close-grid">
    <div class="pp-close-head" data-reveal>
      <h2 class="pp-display">开始使用<br /><span class="pp-tone">PP Clash。</span></h2>
      <p class="pp-lead">安装包随版本发布在 GitHub Releases，按系统与架构选择；实测状态如实标注。</p>
      <div class="pp-close-cta">
        <a class="pp-btn pp-btn-brand" href="download.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16"/></svg>前往下载页</a>
        <a class="pp-btn pp-btn-ghost" href="guide/quick-start.html">快速上手</a>
      </div>
      <p class="pp-close-note">macOS 安装包本地签名、尚未公证，首次打开需「系统设置 → 隐私与安全性 → 仍要打开」。</p>
    </div>
    <div class="pp-faq" data-reveal style="--rv-d: 100ms">
      <details>
        <summary>PP Clash 提供免费节点或订阅吗？</summary>
        <div class="pp-faq-a">不提供。PP Clash 是订阅与路由的管理工具，不含任何代理节点或订阅服务；使用前请自行准备订阅链接或配置文件。</div>
      </details>
      <details>
        <summary>支持哪些平台与架构？</summary>
        <div class="pp-faq-a">macOS（Intel / Apple 芯片）、Windows（x64 / ARM64）、Linux（x64 / ARM64）。已实机验证 macOS Intel 与 Windows x64，其余待实机验证；Linux 需 WebKitGTK 4.1 与 Ayatana AppIndicator。</div>
      </details>
      <details>
        <summary>macOS 首次打开被拦截怎么办？</summary>
        <div class="pp-faq-a">安装包为本地签名、尚未公证：前往「系统设置 → 隐私与安全性」，点击「仍要打开」即可。</div>
      </details>
      <details>
        <summary>系统代理和 TUN 有什么区别？</summary>
        <div class="pp-faq-a">系统代理只接管 TCP 流量；UDP（含部分 WebRTC / STUN 路径）需要 TUN 模式。两者独立开关，可单独或同时启用，见<a href="guide/routing.html">接管与分流</a>。</div>
      </details>
      <details>
        <summary>我的配置和数据存在哪里？</summary>
        <div class="pp-faq-a">全部留在本机应用数据目录，由你自行备份与恢复；源码以 AGPL-3.0-only 公开，可审计数据去向，见<a href="guide/security.html">安全防护</a>。</div>
      </details>
    </div>
  </div>
  <footer class="pp-footer">
    <div class="pp-footer-inner">
      <span class="pp-footer-copy">© 2026 PP Clash · AGPL-3.0-only</span>
      <div class="pp-footer-links">
        <a href="download.html">下载</a>
        <a href="guide/introduction.html">文档</a>
        <a href="https://github.com/JasperPengC/pp-clash" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <p class="pp-footer-note">PP Clash 不提供代理节点或订阅服务 · 基于 <a href="https://github.com/MetaCubeX/mihomo" target="_blank" rel="noopener">mihomo</a> 构建</p>
  </footer>
</section>
