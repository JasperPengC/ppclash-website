<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
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
        rMode: 'mode',
        rNode: 'node',
        rTake: 'takeover',
        demo: 'Illustrative demo data — not a live measurement',
        topology: 'Traffic topology',
        group: 'Proxy nodes',
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
        rMode: '模式',
        rNode: '节点',
        rTake: '接管',
        demo: '演示数据，非实时测量',
        topology: '流量拓扑',
        group: '代理节点',
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
const sysProxy = ref(false)
const tun = ref(true)

const nodes = [
  { id: 'tokyo', zh: '东京 02', en: 'Tokyo 02', base: 68, proto: 'Trojan' },
  { id: 'hk', zh: '香港 01', en: 'HK 01', base: 42, proto: 'VMess' },
  { id: 'sg', zh: '新加坡 03', en: 'SG 03', base: 95, proto: 'Trojan' }
]
const lat = reactive<Record<string, number>>({ tokyo: 68, hk: 42, sg: 95 })
const selected = ref('tokyo')
const nodeName = (n: (typeof nodes)[number]) => (isEn.value ? n.en : n.zh)
const selNode = computed(() => nodes.find((n) => n.id === selected.value)!)

/* 测速演示：约 900ms 后更新为基准附近的模拟值。 */
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

const isHot = (id: string) => {
  if (id === 'trunk') return true
  if (id === 'direct') return mode.value !== 'global'
  return mode.value !== 'direct' && selected.value === id
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

const latencyClass = (value: number) =>
  value < 60 ? 'fast' : value < 90 ? 'normal' : 'slow'

const graphRef = ref<HTMLElement | null>(null)
const paths = ref<{ id: string; d: string }[]>([])
const visible = ref(false)
let resizeObserver: ResizeObserver | undefined
let visibilityObserver: IntersectionObserver | undefined

// 端口随卡片排版，走线直接连接端口中心。
const measure = () => {
  const graph = graphRef.value
  if (!graph) return
  const graphRect = graph.getBoundingClientRect()
  const ports = new Map<string, { x: number; y: number }>()
  for (const port of graph.querySelectorAll<HTMLElement>('[data-port]')) {
    const { left, top, width, height } = port.getBoundingClientRect()
    ports.set(port.dataset.port!, {
      x: left - graphRect.left + width / 2,
      y: top - graphRect.top + height / 2
    })
  }

  const device = ports.get('device')!
  const engineIn = ports.get('engine-in')!
  const engineOut = ports.get('engine-out')!
  paths.value = [
    { id: 'trunk', d: `M ${device.x} ${device.y} L ${engineIn.x} ${engineIn.y}` },
    ...[...nodes.map((node) => node.id), 'direct'].map((id) => {
      const end = ports.get(id)!
      const bend = (end.x - engineOut.x) * 0.56
      return {
        id,
        d: `M ${engineOut.x} ${engineOut.y} C ${engineOut.x + bend} ${engineOut.y}, ${end.x - bend} ${end.y}, ${end.x} ${end.y}`
      }
    })
  ]
}

const orderedPaths = computed(() => [
  ...paths.value.filter((path) => !isHot(path.id)),
  ...paths.value.filter((path) => isHot(path.id))
])

const selectNode = (id: string) => {
  selected.value = id
  if (mode.value === 'direct') mode.value = 'rule'
}

onMounted(() => {
  const graph = graphRef.value
  if (!graph) return
  measure()
  resizeObserver = new ResizeObserver(measure)
  resizeObserver.observe(graph)
  graph.querySelectorAll<HTMLElement>('.pp-topology-block, .pp-node-row').forEach((node) => {
    resizeObserver?.observe(node)
  })

  visibilityObserver = new IntersectionObserver(([entry]) => {
    visible.value = entry.isIntersecting
  })
  visibilityObserver.observe(graph)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  visibilityObserver?.disconnect()
  if (testTimer) clearTimeout(testTimer)
})
</script>
<template>
  <div class="pp-route">
    <div class="pp-route-panel">
      <div>
        <p class="pp-route-label">{{ L.mode }}</p>
        <div class="pp-seg" role="group" :aria-label="L.mode">
          <button type="button" :class="{ on: mode === 'rule' }" :aria-pressed="mode === 'rule'" @click="mode = 'rule'">{{ L.rule }}</button>
          <button type="button" :class="{ on: mode === 'global' }" :aria-pressed="mode === 'global'" @click="mode = 'global'">{{ L.global }}</button>
          <button type="button" :class="{ on: mode === 'direct' }" :aria-pressed="mode === 'direct'" @click="mode = 'direct'">{{ L.direct }}</button>
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

    <div class="pp-route-card">
      <div class="pp-card-head">
        <span class="pp-card-title">{{ L.topology }}</span>
        <span class="pp-card-chip">{{ L.groupChip }}</span>
        <button class="pp-test-btn" type="button" :disabled="testing" @click="retest">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12h4l3-8 4 16 3-8h4"/></svg>
          {{ testing ? L.testing : L.test }}
        </button>
      </div>
      <div class="pp-card-body">
        <div ref="graphRef" class="pp-topology" :class="{ visible }">
          <svg class="pp-topology-lines" aria-hidden="true">
            <g
              v-for="path in orderedPaths"
              :key="path.id"
              class="pp-link"
              :class="{ active: isHot(path.id), direct: path.id === 'direct' }"
            >
              <path class="pp-link-track" :d="path.d" />
              <path v-if="isHot(path.id)" class="pp-link-flow" :d="path.d" />
            </g>
          </svg>
          <div class="pp-topology-input">
            <div class="pp-topology-block pp-device">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="13" rx="2" />
                <path d="M12 17v4m-4 0h8" />
              </svg>
              <strong>{{ L.device }}</strong>
              <i class="pp-port output" data-port="device" aria-hidden="true"></i>
            </div>
            <div class="pp-topology-block pp-engine">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
                <rect x="6" y="6" width="12" height="12" rx="2" />
                <rect x="10" y="10" width="4" height="4" rx=".5" />
                <path d="M9 3v3m6-3v3m3 3h3m-3 6h3m-6 3v3m-6-3v3m-6-6h3m-3-6h3" />
              </svg>
              <strong>{{ L.engine }}</strong>
              <span>{{ L.engineSub }}</span>
              <i class="pp-port input" data-port="engine-in" aria-hidden="true"></i>
              <i class="pp-port output" data-port="engine-out" aria-hidden="true"></i>
            </div>
          </div>
          <div class="pp-node-list" role="group" :aria-label="L.group">
            <button
              v-for="n in nodes"
              :key="n.id"
              type="button"
              class="pp-node-row"
              :class="{ on: isHot(n.id) }"
              :aria-pressed="isHot(n.id)"
              @click="selectNode(n.id)"
            >
              <i class="pp-port input" :data-port="n.id" aria-hidden="true"></i>
              <svg v-if="n.id === 'tokyo'" class="pp-flag" viewBox="0 0 22 15" aria-hidden="true"><rect width="22" height="15" fill="#fff"/><circle cx="11" cy="7.5" r="4" fill="#bc002d"/></svg>
              <svg v-else-if="n.id === 'hk'" class="pp-flag" viewBox="0 0 22 15" aria-hidden="true"><rect width="22" height="15" fill="#de2910"/><g fill="#fff"><path d="M11 3.4c1.1 1.5 1.1 2.8 0 4.1-1.1-1.3-1.1-2.6 0-4.1z"/><path d="M11 3.4c1.1 1.5 1.1 2.8 0 4.1-1.1-1.3-1.1-2.6 0-4.1z" transform="rotate(72 11 7.5)"/><path d="M11 3.4c1.1 1.5 1.1 2.8 0 4.1-1.1-1.3-1.1-2.6 0-4.1z" transform="rotate(144 11 7.5)"/><path d="M11 3.4c1.1 1.5 1.1 2.8 0 4.1-1.1-1.3-1.1-2.6 0-4.1z" transform="rotate(216 11 7.5)"/><path d="M11 3.4c1.1 1.5 1.1 2.8 0 4.1-1.1-1.3-1.1-2.6 0-4.1z" transform="rotate(288 11 7.5)"/></g></svg>
              <svg v-else class="pp-flag" viewBox="0 0 22 15" aria-hidden="true"><rect width="22" height="7.5" fill="#ed2939"/><rect y="7.5" width="22" height="7.5" fill="#fff"/><circle cx="6" cy="3.8" r="2.5" fill="#fff"/><circle cx="7" cy="3.4" r="2.1" fill="#ed2939"/><g fill="#fff"><circle cx="9.4" cy="2.2" r=".55"/><circle cx="10.6" cy="3.2" r=".55"/><circle cx="10.1" cy="4.7" r=".55"/><circle cx="8.7" cy="4.7" r=".55"/><circle cx="8.2" cy="3.2" r=".55"/></g></svg>
              <span class="pp-node-meta">
                <strong>{{ nodeName(n) }}</strong>
                <span>{{ n.proto }}</span>
              </span>
              <span class="pp-lat" :class="latencyClass(lat[n.id])">
                <b>{{ testing ? '…' : lat[n.id] }}</b><small v-if="!testing">ms</small>
              </span>
            </button>
            <div class="pp-node-row direct" :class="{ on: isHot('direct') }">
              <i class="pp-port input" data-port="direct" aria-hidden="true"></i>
              <svg class="pp-flag" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z"/></svg>
              <span class="pp-node-meta">
                <strong>{{ L.directNode }}</strong>
                <span>{{ L.directSub }}</span>
              </span>
              <span class="pp-lat"><b>0</b><small>ms</small></span>
            </div>
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