import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { COLS, ROWS, renderScene } from './scene.js'

const FRAME_MS = 110
const REVEAL_SECONDS = 1.3
const STATIC_TIME = 20

// Decorative, so hidden from assistive tech. Text is written imperatively to the
// three <pre> layers — no React renders per frame.
function AsciiLandscape({ className = '', revealSeconds = REVEAL_SECONDS }) {
  const rootRef = useRef(null)
  const skyRef = useRef(null)
  const farRef = useRef(null)
  const nearRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    const layers = { sky: skyRef.current, far: farRef.current, near: nearRef.current }

    function paint(t, options) {
      const frame = renderScene(t, options)
      for (const key of Object.keys(layers)) {
        if (layers[key].textContent !== frame[key]) layers[key].textContent = frame[key]
      }
    }

    if (reduceMotion) {
      paint(STATIC_TIME, {})
      root.style.setProperty('--px', '0')
      root.style.setProperty('--py', '0')
      return undefined
    }

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const parallax = { x: 0, y: 0, targetX: 0, targetY: 0 }
    let lens = null
    let dirty = true
    let frameId = 0
    let running = false
    let lastPaint = 0
    let revealed = false
    const start = performance.now()

    function loop(now) {
      frameId = window.requestAnimationFrame(loop)
      const t = (now - start) / 1000

      if (finePointer) {
        parallax.x += (parallax.targetX - parallax.x) * 0.07
        parallax.y += (parallax.targetY - parallax.y) * 0.07
        root.style.setProperty('--px', parallax.x.toFixed(3))
        root.style.setProperty('--py', parallax.y.toFixed(3))
      }

      // Paint every frame during the reveal so it reads smoothly.
      if (dirty || !revealed || now - lastPaint >= FRAME_MS) {
        dirty = false
        lastPaint = now
        const reveal = Math.min(1, t / revealSeconds)
        paint(STATIC_TIME + t, { lens, reveal })
        revealed = reveal >= 1
      }
    }

    function setRunning(next) {
      if (next === running) return
      running = next
      if (running) frameId = window.requestAnimationFrame(loop)
      else window.cancelAnimationFrame(frameId)
    }

    function handlePointer(event) {
      parallax.targetX = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth) * 2 - 1))
      parallax.targetY = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight) * 2 - 1))

      const rect = root.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * COLS
      const y = ((event.clientY - rect.top) / rect.height) * ROWS
      const inside = x > -4 && x < COLS + 4 && y > -3 && y < ROWS + 3
      const next = inside ? { x: Math.round(x), y: Math.round(y) } : null
      if (next?.x !== lens?.x || next?.y !== lens?.y) {
        lens = next
        dirty = true
      }
    }

    function handleLeave() {
      parallax.targetX = 0
      parallax.targetY = 0
      lens = null
      dirty = true
    }

    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting))
    observer.observe(root)

    if (finePointer) {
      window.addEventListener('pointermove', handlePointer, { passive: true })
      document.documentElement.addEventListener('pointerleave', handleLeave)
    }

    return () => {
      setRunning(false)
      observer.disconnect()
      window.removeEventListener('pointermove', handlePointer)
      document.documentElement.removeEventListener('pointerleave', handleLeave)
    }
  }, [reduceMotion, revealSeconds])

  return (
    <div
      ref={rootRef}
      className={`ascii-landscape ${className}`.trim()}
      // IBM Plex Mono glyphs are 0.6em wide; lines are 1.2em tall.
      style={{ '--cols-em': COLS * 0.6, aspectRatio: `${COLS * 0.6} / ${ROWS * 1.2}` }}
      aria-hidden="true"
    >
      <pre ref={skyRef} className="ascii-layer ascii-sky" />
      <pre ref={farRef} className="ascii-layer ascii-far" />
      <pre ref={nearRef} className="ascii-layer ascii-near" />
    </div>
  )
}

export default AsciiLandscape
