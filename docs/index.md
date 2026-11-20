---
layout: home
---

<section class="pp-slide pp-slide-hero" id="top">
  <div class="pp-hero">
    <div class="pp-hero-copy" data-reveal>
      <h2 class="pp-display">让每一条连接，<span class="pp-tone">都按你的规则走</span></h2>
      <p class="pp-hero-sub">一个客户端，管理订阅、代理分组与流量路由。规则、全局、直连随时切换；连接状态、延迟和流量一眼掌握。</p>
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
    <span>macOS · Windows · Linux · Android · 界面使用演示数据</span>
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
      <p class="pp-lead">可在规则、全局、直连之间切换。桌面端通过系统代理或 TUN 接管流量，Android 通过系统 VPN 连接。下方演示展示三种模式的流向。</p>
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
      <p class="pp-lead">订阅与连接记录在本机管理；桌面端提供覆写、内核管理和备份工具。免费且不设任何收费层级。</p>
    </div>
    <div class="pp-feat-grid rev">
      <div class="pp-list-rows" data-reveal>
        <div class="pp-list-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 2 9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5"/></svg>
          <div>
            <h3>订阅与分组</h3>
            <p>导入订阅或本地配置，查看用量与到期时间；搜索、测速，记住上次选择的节点。</p>
            <a href="guide/subscription.html">订阅与分组<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg></a>
          </div>
        </div>
        <div class="pp-list-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>
          <div>
            <h3>覆写与内核</h3>
            <p>桌面端支持 YAML / JS 覆写，追加规则与合并冲突条目；管理内核版本、备份与恢复数据。</p>
            <a href="guide/override.html">覆写配置<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg></a>
          </div>
        </div>
        <div class="pp-list-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div>
            <h3>安全与日志</h3>
            <p>默认配置包含加密 DNS、Fake-IP 与规则模式下的 STUN 阻断；桌面端可检查 WebRTC，并在对应页面查看连接与日志。</p>
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
        <pre><span class="tk-c"># 添加规则，放在 MATCH 兜底之前</span>
<span class="tk-k">rules</span>:
  - <span class="tk-s">DOMAIN-SUFFIX,example.com,DIRECT</span>
<span class="tk-c"># 相同匹配条件替换，其他规则保留</span>
<span class="tk-k">hosts</span>:
  <span class="tk-k">example.internal</span>: <span class="tk-s">192.168.1.10</span></pre>
      </div>
    </div>
    <div class="pp-tiles">
      <div class="pp-tile" data-reveal>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 6-6 6 6 6M16 6l6 6-6 6"/></svg>
        <h3>源码开放</h3>
        <p>已发布版本源码公开，支持阅读、审查与复现构建。</p>
        <span class="pp-mono">AGPL-3.0-only</span>
      </div>
      <div class="pp-tile" data-reveal style="--rv-d: 80ms">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
        <h3>本机运行</h3>
        <p>配置与数据保存在本机，桌面端提供备份与恢复。</p>
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
      <p class="pp-lead">桌面与 Android 安装包均可从 GitHub Releases 下载。按系统与架构选择，Android 手机通常使用 ARM64 APK。</p>
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
        <div class="pp-faq-a">桌面版支持 macOS（Intel / Apple 芯片）、Windows（x64 / ARM64）和 Linux（x64 / ARM64），已实机验证 macOS Intel 与 Windows x64。Android 正式版面向 Android 7.0+ 的 64 位设备，ARM64 已在 Android 13 手机上验证，x86_64 待实机验证。详见<a href="guide/android.html">Android 使用指南</a>。</div>
      </details>
      <details>
        <summary>macOS 首次打开被拦截怎么办？</summary>
        <div class="pp-faq-a">安装包为本地签名、尚未公证：前往「系统设置 → 隐私与安全性」，点击「仍要打开」即可。</div>
      </details>
      <details>
        <summary>系统代理和 TUN 有什么区别？</summary>
        <div class="pp-faq-a">桌面端系统代理不接管 UDP；WebRTC 等 UDP 流量需通过 TUN 接管。TUN 开启时需先关闭它，才能开启系统代理。Android 使用系统 VPN 服务，见<a href="guide/routing.html">接管与分流</a>。</div>
      </details>
      <details>
        <summary>我的配置和数据存在哪里？</summary>
        <div class="pp-faq-a">保存在本机应用数据目录，桌面端提供备份与恢复工具。安全防护取决于生效配置与实际流量接管情况，见<a href="guide/security.html">安全防护</a>。</div>
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
