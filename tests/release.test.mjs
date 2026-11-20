import assert from 'node:assert/strict'
import { test } from 'node:test'
import { build } from 'esbuild'

const { outputFiles } = await build({
  entryPoints: [new URL('../docs/.vitepress/theme/release.ts', import.meta.url).pathname],
  bundle: true, write: false, format: 'esm', platform: 'node'
})
const release = await import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString('base64')}`)
const asset = (name) => ({ name, size: 43841697, url: `https://example.com/${name}` })
const snapshot = (tag, publishedAt) => ({ tag, publishedAt, url: 'https://example.com/release', assets: [asset('SHA256SUMS')] })
const old = snapshot('v0.2.2', '2026-11-18T00:00:00Z')
const current = snapshot('v0.2.3', '2026-11-20T15:32:39Z')
const next = snapshot('v0.2.4', '2026-11-21T00:00:00Z')
const now = Date.parse('2026-11-21T01:00:00Z')
const cache = (value, at = now) => JSON.stringify({ at, value })

test('parses both Android APK architectures and preserves download metadata', () => {
  for (const arch of ['arm64-v8a', 'x86_64']) {
    const input = asset(`ppclash-android-${arch}-v0.2.3.apk`)
    assert.deepEqual(release.parseInstaller(input), { ...input, platform: 'android', arch, ext: 'apk' })
  }
})

test('keeps desktop installers compatible', () => {
  for (const [platform, arch, suffix, ext] of [
    ['macos', 'aarch64', '', 'dmg'], ['macos', 'x86_64', '', 'dmg'],
    ['windows', 'amd64', '-setup', 'exe'], ['windows', 'arm64', '-setup', 'exe'],
    ...['amd64', 'arm64'].flatMap(arch => ['deb', 'rpm', 'AppImage'].map(ext => ['linux', arch, '', ext]))
  ]) {
    const input = asset(`PP_Clash-0.2.3-${platform}-${arch}${suffix}.${ext}`)
    assert.deepEqual(release.parseInstaller(input), { ...input, platform, arch, ext })
  }
})

test('excludes AAB, checksums and unsupported Android architectures', () => {
  for (const name of ['ppclash-android-v0.2.3.aab', 'SHA256SUMS', 'source.zip', 'ppclash-android-armeabi-v7a-v0.2.3.apk']) {
    assert.equal(release.parseInstaller(asset(name)), null)
  }
})

test('recognizes Android before Linux and does not recommend desktop installers on iOS', () => {
  assert.equal(release.detectPlatform('Mozilla/5.0 (Linux; Android 13; Pixel 7)'), 'android')
  assert.equal(release.detectPlatform('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)'), null)
  assert.equal(release.detectPlatform('Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)'), null)
  assert.equal(release.detectPlatform('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', 5), null)
  assert.equal(release.detectPlatform('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)'), 'macos')
  assert.equal(release.detectPlatform('Mozilla/5.0 (Windows NT 10.0; Win64; x64)'), 'windows')
  assert.equal(release.detectPlatform('Mozilla/5.0 (X11; Linux x86_64)'), 'linux')
})

test('old browser cache cannot override a newer build snapshot', () => {
  assert.equal(release.getCachedRelease(cache(old), current, now), null)
})

test('accepts a recent cache of the same or newer release, including when offline build has no snapshot', () => {
  assert.deepEqual(release.getCachedRelease(cache(current), current, now), current)
  assert.deepEqual(release.getCachedRelease(cache(next), current, now), next)
  assert.deepEqual(release.getCachedRelease(cache(current), null, now), current)
})

test('expired, future-dated, malformed or incomplete cache falls back to refresh', () => {
  for (const input of [null, 'invalid json', '{}', cache(current, now - 1800000), cache(current, now + 1), cache({ tag: 'v0.2.3', assets: [] }), cache({ ...current, assets: [null] }), cache({ ...current, publishedAt: 'invalid' })]) {
    assert.equal(release.getCachedRelease(input, current, now), null)
  }
})

test('refresh cannot downgrade the rendered release', () => {
  assert.equal(release.preferRelease(current, old), current)
  assert.equal(release.preferRelease(current, next), next)
  assert.equal(release.preferRelease(null, current), current)
})
