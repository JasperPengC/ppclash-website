<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const isEn = computed(() => (route.data?.relativePath || '').startsWith('en/'))

const L = computed(() =>
  isEn.value
    ? {
        mode: 'Outbound mode',
        rule: 'Rule',
        global: 'Global',
        direct: 'Direct',
        takeover: 'Takeover',
        sys: 'System proxy',
        sysSub: 'TCP via system proxy',
        tun: 'TUN mode',
        tunSub: 'All traffic incl. UDP',
        readout: 'Live readout',
        rMode: 'mode',
        rNode: 'node',
        rTake: 'takeover',
        demo: 'Illustrative demo data — not a live measurement',
        group: 'Current group',
        groupChip: 'Proxy',
        test: 'Test',
        testing: 'Testing…',
        device: 'This device',
        engine: 'Engine',
        engineSub: 'mihomo',
        directNode: 'Direct',
        directSub: 'no proxy',
        legendProxy: 'proxy',
        legendDirect: 'direct',
        takeTun: 'TUN · all traffic (UDP incl.)',
        takeSys: 'System proxy · TCP only',
        takeNone: 'Not taken over',
        selectHint: 'Tap a node to select it'
      }
    : {
        mode: '出站模式',
        rule: '规则',
        global: '全局',
        direct: '直连',
        takeover: '流量接管',
        sys: '系统代理',
        sysSub: 'TCP 走系统代理',
        tun: 'TUN 模式',
        tunSub: '全部流量，含 UDP',
        readout: '实时读数',
        rMode: '模式',
        rNode: '节点',
        rTake: '接管',
        demo: '演示数据，非实时测量',
        group: '当前分组',
        groupChip: 'Proxy',
        test: '测速',
        testing: '测速中…',
        device: '本机',
        engine: '分流引擎',
        engineSub: 'mihomo',
        directNode: '直连',
        directSub: '不走代理',
        legendProxy: '代理',
        legendDirect: '直连',
        takeTun: 'TUN · 全部流量（含 UDP）',
        takeSys: '系统代理 · 仅 TCP',
        takeNone: '未接管',
        selectHint: '点击节点即可选中'
      }
)

type Mode = 'rule' | 'global' | 'direct'
const mode = ref<Mode>('rule')
const sysProxy = ref(true)
const tun = ref(false)

const nodes = [
  { id: 'tokyo', zh: '东京 02', en: 'Tokyo 02', base: 68, proto: 'Trojan' },
  { id: 'hk', zh: '香港 01', en: 'HK 01', base: 42, proto: 'VMess' },
  { id: 'sg', zh: '新加坡 03', en: 'SG 03', base: 95, proto: 'Trojan' }
]
const lat = reactive<Record<string, number>>({ tokyo: 68, hk: 42, sg: 95 })
const selected = ref('tokyo')
const nodeName = (n: (typeof nodes)[number]) => (isEn.value ? n.en : n.zh)
const selNode = computed(() => nodes.find((n) => n.id === selected.value)!)

/* 测速：环旋转约 900ms 后落回基准附近的抖动值 */
const testing = ref(false)
let testTimer = 0
const retest = () => {
  if (testing.value) return
  testing.value = true
  testTimer = window.setTimeout(() => {
    for (const n of nodes) lat[n.id] = Math.round(n.base + Math.random() * 14 - 6)
    testing.value = false
  }, 900)
}

/* 走线 lane：190×400 拉伸坐标系；槽位按节点列表真实行心测量对齐 */
const slots = reactive<Record<string, number>>({ tokyo: 50, hk: 150, sg: 250, direct: 350 })
const fan = (slot: number) => `M160 200 C 176 200, 176 ${slot}, 190 ${slot}`
const links = computed(() => [
  { id: 'trunk', d: 'M68 200 H96', kind: 'trunk' },
  { id: 'p-tokyo', d: fan(slots.tokyo), kind: 'proxy', node: 'tokyo' },
  { id: 'p-hk', d: fan(slots.hk), kind: 'proxy', node: 'hk' },
  { id: 'p-sg', d: fan(slots.sg), kind: 'proxy', node: 'sg' },
  { id: 'direct', d: fan(slots.direct), kind: 'direct' }
])

const activeSet = computed(() => {
  const s = new Set<string>(['trunk'])
  if (mode.value === 'direct') {
    s.add('direct')
  } else if (mode.value === 'global') {
    s.add(`p-${selected.value}`)
  } else {
    s.add(`p-${selected.value}`)
    s.add('direct')
  }
  return s
})

const isHot = (id: string) => {
  if (id === 'direct') return mode.value !== 'global' && activeSet.value.has('direct')
  return mode.value !== 'direct' && selected.value === id
}

const linkClass = (l: { id: string; kind: string }) => {
  const active = activeSet.value.has(l.id)
  return ['pp-link', l.kind === 'direct' ? 'direct' : '', active ? 'active' : 'idle']
}

const takeState = computed(() => {
  if (tun.value) return { text: L.value.takeTun, cls: 'ok' }
  if (sysProxy.value) return { text: L.value.takeSys, cls: 'warn' }
  return { text: L.value.takeNone, cls: 'warn' }
})

const nodeReadout = computed(() => {
  if (mode.value === 'direct') return `${L.value.directNode} · 0ms`
  return `${nodeName(selNode.value)} · ${lat[selNode.value.id]}ms`
})

const modeText = computed(() => L.value[mode.value])

/* 延迟环：越低越满，颜色按延迟分级 */
const ringFrac = (v: number) => Math.max(0.12, Math.min(1, 1 - v / 200))
const ringColor = (v: number) =>
  v < 60 ? 'var(--c-green)' : v < 90 ? 'var(--c-teal)' : 'var(--c-amber)'
const C = 2 * Math.PI * 14
const ringDash = (v: number) =>
  `${(ringFrac(v) * C).toFixed(1)} ${(C - ringFrac(v) * C).toFixed(1)}`

/* ---------- 数据包动画：单 rAF 循环，离屏 / reduced-motion 暂停 ---------- */

const stageRef = ref<HTMLElement | null>(null)
const pathEls: Record<string, SVGPathElement> = {}
const lenCache: Record<string, number> = {}
const setPath = (id: string) => (el: any) => {
  if (el) pathEls[id] = el as SVGPathElement
}

const packets = reactive(
  links.value.flatMap((l) => {
    const count = l.kind === 'trunk' ? 3 : 2
    return Array.from({ length: count }, (_, i) => ({
      key: `${l.id}-${i}`,
      link: l.id,
      direct: l.kind === 'direct',
      phase: i / count + (l.kind === 'trunk' ? 0 : 0.15),
      el: null as SVGCircleElement | null
    }))
  })
)
const setPacket = (p: (typeof packets)[number]) => (el: any) => {
  p.el = el as SVGCircleElement
}

let raf = 0
let last = 0
let clock = 0
let visible = false
let reduce = false
let io: IntersectionObserver | null = null
const listRef = ref<HTMLElement | null>(null)
let ro: ResizeObserver | null = null

const measure = () => {
  const list = listRef.value
  if (!list) return
  const h = list.clientHeight
  if (!h) return
  list.querySelectorAll<HTMLElement>('.pp-node-row').forEach((row) => {
    const id = row.dataset.node
    if (!id) return
    slots[id] = Math.round(((row.offsetTop + row.offsetHeight / 2) / h) * 400)
  })
}

watch(slots, () => {
  for (const id of Object.keys(lenCache)) delete lenCache[id]
})

const placeStatic = () => {
  for (const p of packets) {
    const path = pathEls[p.link]
    if (!path || !p.el) continue
    const len = lenCache[p.link] || path.getTotalLength()
    const pt = path.getPointAtLength((p.phase % 1) * len)
    p.el.setAttribute('cx', String(pt.x))
    p.el.setAttribute('cy', String(pt.y))
    p.el.style.opacity = activeSet.value.has(p.link) ? '0.9' : '0'
  }
}

const frame = (ts: number) => {
  if (!last) last = ts
  const dt = Math.min(0.05, (ts - last) / 1000)
  last = ts
  clock += dt
  for (const p of packets) {
    const path = pathEls[p.link]
    if (!path || !p.el) continue
    const active = activeSet.value.has(p.link)
    if (!active) {
      p.el.style.opacity = '0'
      continue
    }
    const len = lenCache[p.link] || (lenCache[p.link] = path.getTotalLength())
    const t = (clock * 0.32 + p.phase) % 1
    const pt = path.getPointAtLength(t * len)
    p.el.setAttribute('cx', pt.x.toFixed(1))
    p.el.setAttribute('cy', pt.y.toFixed(1))
    p.el.style.opacity = String(0.35 + 0.6 * Math.sin(Math.PI * t))
  }
  raf = requestAnimationFrame(frame)
}

const start = () => {
  if (reduce || raf || !visible) return
  last = 0
  raf = requestAnimationFrame(frame)
}
const stop = () => {
  if (raf) cancelAnimationFrame(raf)
  raf = 0
}

const onVis = () => {
  if (document.visibilityState === 'visible') start()
  else stop()
}

const selectNode = (id: string) => {
  selected.value = id
  if (mode.value === 'direct') mode.value = 'rule'
  if (reduce) placeStatic()
}

onMounted(() => {
  reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  measure()
  if (listRef.value) {
    ro = new ResizeObserver(measure)
    ro.observe(listRef.value)
  }
  for (const l of links.value) {
    const p = pathEls[l.id]
    if (p) lenCache[l.id] = p.getTotalLength()
  }
  if (reduce) {
    placeStatic()
  } else {
    io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false
        if (visible) start()
        else stop()
      },
      { threshold: 0.15 }
    )
    if (stageRef.value) io.observe(stageRef.value)
    document.addEventListener('visibilitychange', onVis)
  }
})

onBeforeUnmount(() => {
  stop()
  io?.disconnect()
  ro?.disconnect()
  document.removeEventListener('visibilitychange', onVis)
  if (testTimer) clearTimeout(testTimer)
})
</script>
<template>
  <div class="pp-route">
    <div class="pp-route-panel">
      <div>
        <p class="pp-route-label">{{ L.mode }}</p>
        <div class="pp-seg" role="group" :aria-label="L.mode">
          <button :class="{ on: mode === 'rule' }" @click="mode = 'rule'">{{ L.rule }}</button>
          <button :class="{ on: mode === 'global' }" @click="mode = 'global'">{{ L.global }}</button>
          <button :class="{ on: mode === 'direct' }" @click="mode = 'direct'">{{ L.direct }}</button>
        </div>
      </div>
      <div>
        <p class="pp-route-label">{{ L.takeover }}</p>
        <div class="pp-switch-row">
          <div class="pp-switch-text">
            <strong>{{ L.sys }}</strong>
            <span>{{ L.sysSub }}</span>
          </div>
          <button
            class="pp-toggle"
            role="switch"
            :aria-checked="sysProxy"
            :aria-label="L.sys"
            @click="sysProxy = !sysProxy"
          ></button>
        </div>
        <div class="pp-switch-row">
          <div class="pp-switch-text">
            <strong>{{ L.tun }}</strong>
            <span>{{ L.tunSub }}</span>
          </div>
          <button
            class="pp-toggle"
            role="switch"
            :aria-checked="tun"
            :aria-label="L.tun"
            @click="tun = !tun"
          ></button>
        </div>
      </div>
      <div class="pp-readout" aria-live="polite">
        <div class="pp-r-line">
          <span class="pp-r-key">{{ L.rMode }}</span>
          <span class="pp-r-val blue">{{ modeText }}</span>
        </div>
        <div class="pp-r-line">
          <span class="pp-r-key">{{ L.rNode }}</span>
          <span class="pp-r-val">{{ nodeReadout }}</span>
        </div>
        <div class="pp-r-line">
          <span class="pp-r-key">{{ L.rTake }}</span>
          <span class="pp-r-val" :class="takeState.cls">{{ takeState.text }}</span>
        </div>
        <div class="pp-r-demo">{{ L.demo }}</div>
      </div>
    </div>

    <div class="pp-route-card" ref="stageRef">
      <div class="pp-card-head">
        <span class="pp-card-title">{{ L.group }}</span>
        <span class="pp-card-chip">{{ L.groupChip }}</span>
        <button class="pp-test-btn" type="button" :disabled="testing" @click="retest">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12h4l3-8 4 16 3-8h4"/></svg>
          {{ testing ? L.testing : L.test }}
        </button>
      </div>
      <div class="pp-card-body">
        <div class="pp-lane" aria-hidden="true">
          <svg class="pp-lane-svg" viewBox="0 0 190 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pp-grad-flow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" style="stop-color: var(--c-accent)" />
                <stop offset="1" style="stop-color: var(--c-teal)" />
              </linearGradient>
              <linearGradient id="pp-grad-direct" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" style="stop-color: var(--c-accent)" />
                <stop offset="1" style="stop-color: var(--c-green)" />
              </linearGradient>
            </defs>
            <path
              v-for="l in links"
              :key="l.id"
              :ref="setPath(l.id)"
              :class="linkClass(l)"
              :d="l.d"
            />
            <circle
              v-for="p in packets"
              :key="p.key"
              :ref="setPacket(p)"
              class="pp-packet"
              :class="{ direct: p.direct }"
              r="2.8"
              cx="-10"
              cy="-10"
              style="opacity: 0"
            />
          </svg>
          <div class="pp-lane-chip device">
            <strong>{{ L.device }}</strong>
          </div>
          <div class="pp-lane-chip engine">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8"/></svg>
            <strong>{{ L.engine }}</strong>
            <span>{{ L.engineSub }}</span>
          </div>
        </div>
        <div class="pp-node-list" role="group" :aria-label="L.group" ref="listRef">
          <button
            v-for="n in nodes"
            :key="n.id"
            type="button"
            class="pp-node-row"
            :class="{ on: selected === n.id && mode !== 'direct' }"
            :aria-pressed="selected === n.id"
            :data-node="n.id"
            @click="selectNode(n.id)"
          >
            <svg v-if="n.id === 'tokyo'" class="pp-flag" viewBox="0 0 22 15" aria-hidden="true"><rect width="22" height="15" fill="#fff"/><circle cx="11" cy="7.5" r="4" fill="#bc002d"/></svg>
            <svg v-else-if="n.id === 'hk'" class="pp-flag" viewBox="0 0 22 15" aria-hidden="true"><rect width="22" height="15" fill="#de2910"/><g fill="#fff"><path d="M11 3.4c1.1 1.5 1.1 2.8 0 4.1-1.1-1.3-1.1-2.6 0-4.1z"/><path d="M11 3.4c1.1 1.5 1.1 2.8 0 4.1-1.1-1.3-1.1-2.6 0-4.1z" transform="rotate(72 11 7.5)"/><path d="M11 3.4c1.1 1.5 1.1 2.8 0 4.1-1.1-1.3-1.1-2.6 0-4.1z" transform="rotate(144 11 7.5)"/><path d="M11 3.4c1.1 1.5 1.1 2.8 0 4.1-1.1-1.3-1.1-2.6 0-4.1z" transform="rotate(216 11 7.5)"/><path d="M11 3.4c1.1 1.5 1.1 2.8 0 4.1-1.1-1.3-1.1-2.6 0-4.1z" transform="rotate(288 11 7.5)"/></g></svg>
            <svg v-else class="pp-flag" viewBox="0 0 22 15" aria-hidden="true"><rect width="22" height="7.5" fill="#ed2939"/><rect y="7.5" width="22" height="7.5" fill="#fff"/><circle cx="6" cy="3.8" r="2.5" fill="#fff"/><circle cx="7" cy="3.4" r="2.1" fill="#ed2939"/><g fill="#fff"><circle cx="9.4" cy="2.2" r=".55"/><circle cx="10.6" cy="3.2" r=".55"/><circle cx="10.1" cy="4.7" r=".55"/><circle cx="8.7" cy="4.7" r=".55"/><circle cx="8.2" cy="3.2" r=".55"/></g></svg>
            <span class="pp-node-meta">
              <strong>{{ nodeName(n) }}</strong>
              <span>{{ n.proto }}</span>
            </span>
            <span class="pp-lat" :class="{ testing }">
              <svg viewBox="0 0 34 34" aria-hidden="true">
                <circle class="track" cx="17" cy="17" r="14" />
                <circle
                  class="arc"
                  cx="17"
                  cy="17"
                  r="14"
                  :stroke="ringColor(lat[n.id])"
                  :stroke-dasharray="ringDash(lat[n.id])"
                  transform="rotate(-90 17 17)"
                />
              </svg>
              <b>{{ testing ? '…' : lat[n.id] }}</b>
            </span>
          </button>
          <div class="pp-node-row direct" :class="{ hot: isHot('direct') }" data-node="direct">
            <svg class="pp-flag" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z"/></svg>
            <span class="pp-node-meta">
              <strong>{{ L.directNode }}</strong>
              <span>{{ L.directSub }}</span>
            </span>
            <span class="pp-lat">
              <svg viewBox="0 0 34 34" aria-hidden="true">
                <circle class="track" cx="17" cy="17" r="14" />
                <circle
                  class="arc"
                  cx="17"
                  cy="17"
                  r="14"
                  :stroke="isHot('direct') ? 'var(--c-green)' : 'rgba(255, 255, 255, 0.14)'"
                  :stroke-dasharray="isHot('direct') ? `${C.toFixed(1)} 0` : '0.1 ' + C.toFixed(1)"
                  transform="rotate(-90 17 17)"
                />
              </svg>
              <b>0</b>
            </span>
          </div>
        </div>
      </div>
      <div class="pp-card-foot">
        <span><i class="pp-lg-proxy"></i>{{ L.legendProxy }}</span>
        <span><i class="pp-lg-direct"></i>{{ L.legendDirect }}</span>
        <span class="pp-foot-hint">{{ L.selectHint }}</span>
      </div>
    </div>
  </div>
</template>