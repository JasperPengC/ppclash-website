export function nextScrollPosition(current, direction, sceneStarts, pageHeight, limit) {
  const starts = [...new Set([0, ...sceneStarts, limit])]
    .map((position) => Math.max(0, Math.min(limit, position)))
    .sort((a, b) => a - b)
  const epsilon = 2
  const boundary = direction > 0
    ? starts.find((position) => position > current + epsilon) ?? limit
    : starts.findLast((position) => position < current - epsilon) ?? 0
  const candidate = direction > 0
    ? Math.min(current + pageHeight, boundary)
    : Math.max(current - pageHeight, boundary)
  return Math.max(0, Math.min(limit, candidate))
}

export function initHomeMotion({ sceneSelector = '.pp-slide' } = {}) {
  const root = document.documentElement
  const scenes = [...document.querySelectorAll(sceneSelector)]
  if (!scenes.length) return () => {}

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  const desktop = window.matchMedia('(min-width: 941px) and (min-height: 700px) and (pointer: fine)')
  let paged = false
  let frame = 0
  let lastWheel = -Infinity
  let lastDirection = 0
  let consumed = false
  let distance = 0
  let animationUntil = 0
  const gestureGap = 200

  const headerHeight = () => Number.parseFloat(getComputedStyle(root).getPropertyValue('--header-h')) || 0

  function configure() {
    const header = headerHeight()
    const pageHeight = Math.max(1, window.innerHeight)
    const allFit = scenes.every((scene) =>
      scene.offsetHeight <= pageHeight + 2 && scene.scrollHeight <= scene.clientHeight + 2
    )
    paged = !reduced.matches && desktop.matches
    root.dataset.pagedScroll = String(paged)
    root.dataset.naturalScroll = String(!paged || !allFit)
    root.dataset.sceneMotion = String(!reduced.matches && desktop.matches)
    if (!paged) {
      consumed = false
      distance = 0
    }
    schedule()
  }

  function ownsScroll(target) {
    if (document.querySelector('dialog[open], [aria-modal="true"], [data-menu-toggle][aria-expanded="true"]')) return true
    let element = target instanceof Element ? target : null
    while (element && element !== document.body) {
      if (element.matches('input, textarea, select, [contenteditable="true"], [data-scroll-area], .os-scrollbar')) return true
      const style = getComputedStyle(element)
      if (/(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 1) return true
      element = element.parentElement
    }
    return false
  }

  function onWheel(event) {
    if (!paged || event.ctrlKey || event.metaKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY) || ownsScroll(event.target)) return
    const now = performance.now()
    const direction = Math.sign(event.deltaY)
    if (!direction) return
    const freshGesture = now - lastWheel > gestureGap || (direction !== lastDirection && now > animationUntil)
    if (freshGesture) {
      consumed = false
      distance = 0
    }
    lastWheel = now
    lastDirection = direction
    event.preventDefault()
    if (consumed || now < animationUntil) return
    distance += Math.abs(event.deltaY) * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1)
    if (distance < 24) return
    consumed = true

    const pageHeight = Math.max(1, window.innerHeight)
    const limit = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    const starts = scenes.map((scene) => window.scrollY + scene.getBoundingClientRect().top)
    const next = nextScrollPosition(window.scrollY, direction, starts, pageHeight, limit)
    if (Math.abs(next - window.scrollY) < 2) return
    animationUntil = now + 700
    window.scrollTo({ top: next, behavior: 'smooth' })
  }

  function paint() {
    frame = 0
    const enabled = root.dataset.sceneMotion === 'true'
    const header = headerHeight()
    for (const scene of scenes) {
      const rect = scene.getBoundingClientRect()
      const available = Math.max(1, window.innerHeight - header)
      const progress = Math.max(-1, Math.min(1, (header - rect.top) / available))
      scene.style.setProperty('--scene-shift', `${(enabled ? progress * 42 : 0).toFixed(2)}px`)
    }
  }

  function schedule() {
    if (!frame) frame = window.requestAnimationFrame(paint)
  }

  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', configure, { passive: true })
  reduced.addEventListener('change', configure)
  desktop.addEventListener('change', configure)
  void document.fonts?.ready.then(configure)
  const onToggle = (event) => {
    if (event.target instanceof HTMLDetailsElement) configure()
  }
  document.addEventListener('toggle', onToggle, true)
  configure()

  return () => {
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', configure)
    reduced.removeEventListener('change', configure)
    desktop.removeEventListener('change', configure)
    document.removeEventListener('toggle', onToggle, true)
    if (frame) window.cancelAnimationFrame(frame)
    delete root.dataset.pagedScroll
    delete root.dataset.naturalScroll
    delete root.dataset.sceneMotion
  }
}
