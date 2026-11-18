---
layout: home
---

<section class="pp-slide pp-slide-hero" id="top">
  <div class="pp-hero">
    <div class="pp-hero-copy" data-reveal>
      <h2 class="pp-display">Every connection, <span class="pp-tone">a route you can trust</span></h2>
      <p class="pp-hero-sub">A desktop client for managing mihomo subscriptions, proxy groups and traffic routing. Rule-based routing, system proxy and TUN as independent switches, connection state always legible.</p>
      <div class="pp-hero-cta">
        <a class="pp-btn pp-btn-brand" href="download.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16"/></svg>Download PP Clash — free</a>
        <a class="pp-btn pp-btn-ghost" href="guide/introduction.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/></svg>Read the docs</a>
      </div>
    </div>
    <div class="pp-macbook pp-par pp-par-fade" data-par="0.16" data-par-fade="0.35">
      <div class="pp-macbook-glow" aria-hidden="true"></div>
      <HeroPreview />
    </div>
  </div>
  <div class="stage-footnote">
    <span>Interface shown with demo data</span>
    <span>Does not provide proxy nodes or subscription services</span>
    <span>Free & open source · AGPL-3.0 · Built on mihomo</span>
  </div>
</section>
<nav class="pp-rail" aria-label="Section navigation">
  <a href="#top" class="on" aria-label="Introduction"></a>
  <a href="#routing" aria-label="Routing engine"></a>
  <a href="#local" aria-label="Local & open source"></a>
  <a href="#download" aria-label="Download & FAQ"></a>
</nav>
<section class="pp-slide pp-slide-cinema" id="routing">
  <div class="pp-section">
    <div class="pp-route-head" data-reveal>
      <h2 class="pp-display">Routing, <span class="pp-tone">made visible</span></h2>
      <p class="pp-lead">Switch between rule, global and direct outbound modes in real time; system proxy and TUN are independent switches, and UDP traffic goes to TUN. Change the mode, tap a node, try it yourself.</p>
      <span class="pp-live"><i aria-hidden="true"></i>INTERACTIVE · demo data</span>
    </div>
    <div data-reveal style="--rv-d: 120ms">
      <RoutingDemo />
    </div>
  </div>
</section>
<section class="pp-slide pp-slide-flow" id="local">
  <div class="pp-section">
    <div class="pp-feat-head" data-reveal>
      <h2 class="pp-display">Config and data <span class="pp-tone">stay on your machine</span></h2>
      <p class="pp-lead">Subscriptions, overrides, core and logs are managed locally; the source is public and auditable, free with no paid tiers.</p>
    </div>
    <div class="pp-feat-grid rev">
      <div class="pp-list-rows" data-reveal>
        <div class="pp-list-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 2 9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5"/></svg>
          <div>
            <h3>Subscriptions &amp; groups</h3>
            <p>Import a subscription or local config; groups render as defined. Search, test and pin nodes.</p>
            <a href="guide/subscription.html">Subscriptions &amp; groups<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg></a>
          </div>
        </div>
        <div class="pp-list-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>
          <div>
            <h3>Overrides &amp; core</h3>
            <p>YAML / JS overrides validated live; mihomo core versions managed locally; back up and restore app data.</p>
            <a href="guide/override.html">Overrides<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg></a>
          </div>
        </div>
        <div class="pp-list-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div>
            <h3>Security &amp; logs</h3>
            <p>Encrypted DNS, Fake-IP, STUN blocking and WebRTC detection on by default; logs one click away.</p>
            <a href="guide/security.html">Security<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg></a>
          </div>
        </div>
      </div>
      <div class="pp-term" data-reveal style="--rv-d: 100ms">
        <div class="pp-term-head">
          <i></i><i></i><i></i>
          <span>override.yaml</span>
          <em>YAML · deep merge</em>
        </div>
        <pre><span class="tk-c"># Override example: replace encrypted DNS servers</span>
<span class="tk-k">dns</span>:
  <span class="tk-k">nameserver</span>:
    - <span class="tk-s">https://dns.alidns.com/dns-query</span>
    - <span class="tk-s">https://doh.pub/dns-query</span>
<span class="tk-c"># objects merge key by key; arrays replace wholly</span>
<span class="tk-k">tun</span>:
  <span class="tk-k">enable</span>: <span class="tk-p">true</span>
  <span class="tk-k">stack</span>: <span class="tk-s">mixed</span></pre>
      </div>
    </div>
    <div class="pp-tiles">
      <div class="pp-tile" data-reveal>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 6-6 6 6 6M16 6l6 6-6 6"/></svg>
        <h3>Open source</h3>
        <p>The full source is public; anyone can read, review and reproduce the build.</p>
        <span class="pp-mono">AGPL-3.0-only</span>
      </div>
      <div class="pp-tile" data-reveal style="--rv-d: 80ms">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
        <h3>Runs locally</h3>
        <p>Config and data stay on your machine, backed up and restored by you.</p>
        <span class="pp-mono">mihomo core</span>
      </div>
      <div class="pp-tile" data-reveal style="--rv-d: 160ms">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
        <h3>Free, no tiers</h3>
        <p>Every feature equally open — no paywall, no subscription.</p>
        <span class="pp-mono">free forever</span>
      </div>
    </div>
  </div>
</section>
<section class="pp-slide" id="download">
  <div class="pp-section pp-close-grid">
    <div class="pp-close-head" data-reveal>
      <h2 class="pp-display">Start using<br /><span class="pp-tone">PP Clash.</span></h2>
      <p class="pp-lead">Installers ship with every release on GitHub Releases — pick your system and architecture. Test status is labeled honestly.</p>
      <div class="pp-close-cta">
        <a class="pp-btn pp-btn-brand" href="download.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16"/></svg>Go to downloads</a>
        <a class="pp-btn pp-btn-ghost" href="guide/quick-start.html">Quick start</a>
      </div>
      <p class="pp-close-note">macOS builds are locally signed but not yet notarized; on first open use System Settings → Privacy &amp; Security → Open Anyway.</p>
    </div>
    <div class="pp-faq" data-reveal style="--rv-d: 100ms">
      <details>
        <summary>Does PP Clash provide free nodes or subscriptions?</summary>
        <div class="pp-faq-a">No. PP Clash is a management tool for subscriptions and routing; it ships no proxy nodes or subscription services. Prepare your own subscription link or config before use.</div>
      </details>
      <details>
        <summary>Which platforms and architectures are supported?</summary>
        <div class="pp-faq-a">macOS (Intel / Apple silicon), Windows (x64 / ARM64), Linux (x64 / ARM64). Device-tested: macOS Intel and Windows x64; the rest pending verification. Linux requires WebKitGTK 4.1 and Ayatana AppIndicator.</div>
      </details>
      <details>
        <summary>macOS blocks the first open — what now?</summary>
        <div class="pp-faq-a">Builds are locally signed, not yet notarized: open System Settings → Privacy &amp; Security and click Open Anyway.</div>
      </details>
      <details>
        <summary>System proxy vs TUN — what's the difference?</summary>
        <div class="pp-faq-a">The system proxy takes over TCP only; UDP (including some WebRTC / STUN paths) needs TUN mode. Both are independent switches, see <a href="guide/routing.html">Takeover &amp; routing</a>.</div>
      </details>
      <details>
        <summary>Where do my config and data live?</summary>
        <div class="pp-faq-a">Entirely in the local app data directory, backed up and restored by you; the source is public under AGPL-3.0-only so data handling is auditable, see <a href="guide/security.html">Security</a>.</div>
      </details>
    </div>
  </div>
  <footer class="pp-footer">
    <div class="pp-footer-inner">
      <span class="pp-footer-copy">© 2026 PP Clash · AGPL-3.0-only</span>
      <div class="pp-footer-links">
        <a href="download.html">Download</a>
        <a href="guide/introduction.html">Docs</a>
        <a href="https://github.com/JasperPengC/pp-clash" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <p class="pp-footer-note">PP Clash does not provide proxy nodes or subscription services · Built on <a href="https://github.com/MetaCubeX/mihomo" target="_blank" rel="noopener">mihomo</a></p>
  </footer>
</section>
