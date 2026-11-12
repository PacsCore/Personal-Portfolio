// Pure ASCII scene math: mountains, stars and a moon on a character grid.
// Rendered as three stacked text layers (sky / far / near) so each can take its
// own ink and parallax depth. Everything is deterministic for a given time `t`.

export const COLS = 64
export const ROWS = 19
const GROUND = 16
// A dotted ring; glyph cells are about twice as tall as they are wide, so 13 x 6 reads as round.
const MOON_SPRITE = [
  '    . . .    ',
  ' .         . ',
 '.           .',
 '.           .',
  ' .         . ',
  '    . . .    ',
]
const MOON = { x: 45, y: 0, w: 13, h: MOON_SPRITE.length }

export function hash(x, y, seed = 0) {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1442695041)) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  h ^= h >>> 16
  return (h >>> 0) / 4294967296
}

function buildRange(peaks, seed, roughness) {
  const top = []
  const height = []
  for (let x = 0; x < COLS; x += 1) {
    let h = 0
    for (const peak of peaks) {
      const t = Math.abs(x - peak.x) / peak.w
      if (t < 1) h = Math.max(h, peak.h * (1 - t) ** 1.2)
    }
    const rough = roughness * (Math.sin(x * 0.9 + seed) * 0.6 + Math.sin(x * 2.3 + seed * 2) * 0.4)
    h = Math.max(0, h + rough * Math.min(1, h / 2.5))
    height.push(h)
    top.push(Math.round(GROUND - h))
  }

  const cells = top.map((row, x) => {
    const left = top[x - 1] ?? row
    const right = top[x + 1] ?? row
    const slope = (left - right) / 2 // > 0 rising towards the right
    return {
      top: row,
      edgeBottom: Math.max(row, left - 1, right - 1),
      slope,
      peak: height[x] > 3.5 && row < left && row <= right && top.slice(Math.max(0, x - 5), x + 6).every((other) => other >= row),
      height: height[x],
    }
  })
  return cells
}

const NEAR = buildRange(
  [
    { x: 28, h: 9.6, w: 16 },
    { x: 46, h: 6.2, w: 12 },
    { x: 10, h: 4.2, w: 10 },
    { x: 60, h: 2.8, w: 7 },
  ],
  1.7,
  0.2,
)

const FAR = buildRange(
  [
    { x: 38, h: 11, w: 13 },
    { x: 17, h: 7.4, w: 12 },
    { x: 55, h: 7, w: 11 },
  ],
  4.2,
  0.15,
)

const NEAR_STYLE = { density: 0.95, falloff: 3.4, band: 1.7, speed: 0.55, dense: '#*+:.', light: '+:..' }
const FAR_STYLE = { density: 0.5, falloff: 2.4, band: 2.2, speed: 0.35, dense: ':..', light: '..' }

function nearMoon(x, y, margin) {
  return x >= MOON.x - margin && x < MOON.x + MOON.w + margin && y < MOON.y + MOON.h + 1
}

const MOON_RING = MOON_SPRITE.flatMap((line, row) =>
  [...line].flatMap((char, col) => (char === ' ' ? [] : [{ x: MOON.x + col, y: MOON.y + row }])),
).sort((a, b) => angleOf(a) - angleOf(b))

function angleOf(point) {
  return Math.atan2((point.y - MOON.y - 2.5) * 2, point.x - MOON.x - 6)
}

const STARS = []
for (let i = 0; STARS.length < 15 && i < 200; i += 1) {
  const x = Math.floor(hash(i, 1, 11) * COLS)
  const y = Math.floor(hash(i, 2, 11) * 9)
  const horizon = Math.min(NEAR[x].top, FAR[x].top) - 2
  const crowded = STARS.some((star) => Math.abs(star.x - x) < 4 && Math.abs(star.y - y) < 2)
  if (y >= horizon || nearMoon(x, y, 3) || crowded) continue
  STARS.push({ x, y, phase: hash(i, 3, 11), period: 2.4 + hash(i, 4, 11) * 4.2 })
}

function lensAt(lens, x, y) {
  if (!lens) return 0
  const distance = Math.hypot((x - lens.x) * 0.5, y - lens.y)
  return Math.max(0, 1 - distance / 4.2)
}

function revealed(reveal, x, y) {
  if (reveal >= 1) return true
  return ((ROWS - y) / ROWS) * 0.72 + hash(x, y, 99) * 0.28 <= reveal
}

function mountainChar(range, style, x, y, t, lens) {
  const cell = range[x]
  if (y < cell.top || y >= GROUND) return ' '

  if (y <= cell.edgeBottom) {
    if (cell.peak && y === cell.top) return '^'
    if (cell.slope > 0.25) return '/'
    if (cell.slope < -0.25) return '\\'
    return cell.height < 1.5 ? '.' : '-'
  }

  const depth = y - (GROUND - cell.height)
  const shaded = cell.slope >= 0
  const glow = lensAt(lens, x, y)
  const tick = Math.floor(t * style.speed + hash(x, y, 7) * 8)
  const noise = hash(x, y, tick)
  const density = style.density * Math.exp(-depth / style.falloff) * (shaded ? 1 : 0.6) + glow * 0.5
  if (noise > density) return ' '

  const palette = shaded || glow > 0.3 ? style.dense : style.light
  const index = Math.floor(depth / style.band + hash(x, y, 3) * 0.9 - glow * 2)
  return palette[Math.max(0, Math.min(palette.length - 1, index))]
}

function farChar(x, y, t, lens) {
  if (y >= NEAR[x].top && y < GROUND) return ' '
  if (y === GROUND) return x % 2 === 0 ? '.' : ' '
  if (y > GROUND) {
    const tick = Math.floor(t * 0.4 + hash(x, y, 5) * 6)
    const chance = y === GROUND + 1 ? 0.32 : 0.14
    return hash(x, y, tick) < chance ? '.' : ' '
  }
  return mountainChar(FAR, FAR_STYLE, x, y, t, lens)
}

function shootingStar(t) {
  const period = 11
  const cycle = Math.floor(t / period)
  const progress = (t - cycle * period - 4) / 1.1
  if (cycle < 1 || progress < 0 || progress > 1) return null
  const x0 = 34 + hash(cycle, 1, 21) * 22
  const y0 = hash(cycle, 2, 21) * 2
  return { x: x0 - progress * 24, y: y0 + progress * 4 }
}

function skyChar(x, y, t, lens, meteor) {
  if (nearMoon(x, y, 0)) {
    const index = MOON_RING.findIndex((point) => point.x === x && point.y === y)
    if (index === -1) return ' '
    const head = Math.floor(t * 1.4) % MOON_RING.length
    const behind = (head - index + MOON_RING.length) % MOON_RING.length
    return behind === 0 ? '*' : behind < 3 ? ':' : '.'
  }

  if (meteor) {
    const dx = x - meteor.x
    const dy = y - meteor.y
    if (Math.abs(dy - dx / 6) < 0.5) {
      if (Math.abs(dx) < 0.5) return '*'
      if (dx > 0 && dx < 2.5) return '-'
      if (dx >= 2.5 && dx < 4.5) return '.'
    }
  }

  for (const star of STARS) {
    if (star.x !== x || star.y !== y) continue
    const wave = (Math.sin((t / star.period + star.phase) * Math.PI * 2) + 1) / 2
    const value = wave + lensAt(lens, x, y) * 0.8
    if (value > 0.86) return '*'
    if (value > 0.42) return '+'
    return '.'
  }
  return ' '
}

// `lens` is the pointer position in grid units (or null); `reveal` runs 0 → 1 on entry.
export function renderScene(t, { lens = null, reveal = 1 } = {}) {
  const meteor = shootingStar(t)
  let sky = ''
  let far = ''
  let near = ''

  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLS; x += 1) {
      const visible = revealed(reveal, x, y)
      sky += visible ? skyChar(x, y, t, lens, meteor) : ' '
      far += visible ? farChar(x, y, t, lens) : ' '
      near += visible ? mountainChar(NEAR, NEAR_STYLE, x, y, t, lens) : ' '
    }
    if (y < ROWS - 1) {
      sky += '\n'
      far += '\n'
      near += '\n'
    }
  }

  return { sky, far, near }
}

// A small field of twinkling stars, for ornaments elsewhere on the site.
export function renderTwinkle(t, cols, rows, seed = 1) {
  let out = ''
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      if (hash(x, y, seed) > 0.16) {
        out += ' '
        continue
      }
      const period = 2 + hash(x, y, seed + 1) * 3.5
      const wave = (Math.sin((t / period + hash(x, y, seed + 2)) * Math.PI * 2) + 1) / 2
      out += wave > 0.82 ? '*' : wave > 0.45 ? '+' : '.'
    }
    if (y < rows - 1) out += '\n'
  }
  return out
}
