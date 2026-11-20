import test from 'node:test'
import assert from 'node:assert/strict'

test('paged scrolling advances one viewport at a time and stops at scene boundaries', async () => {
  const { nextScrollPosition } = await import('../docs/.vitepress/theme/home-motion.mjs')

  assert.equal(nextScrollPosition(0, 1, [0, 900, 1800], 900, 2700), 900)
  assert.equal(nextScrollPosition(900, 1, [0, 1500, 2400], 900, 2700), 1500)
  assert.equal(nextScrollPosition(1500, -1, [0, 1500, 2400], 900, 2700), 600)
  assert.equal(nextScrollPosition(2700, 1, [0, 900, 1800], 900, 2700), 2700)
})
