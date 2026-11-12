import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { renderTwinkle } from './scene.js'

// A small decorative star field. Updates a few times a second, only while visible.
function AsciiTwinkle({ cols = 14, rows = 4, seed = 1, className = '' }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    node.textContent = renderTwinkle(3, cols, rows, seed)
    if (reduceMotion) return undefined

    let intervalId = 0
    const start = performance.now()
    const tick = () => {
      node.textContent = renderTwinkle(3 + (performance.now() - start) / 1000, cols, rows, seed)
    }
    const observer = new IntersectionObserver(([entry]) => {
      window.clearInterval(intervalId)
      if (entry.isIntersecting) intervalId = window.setInterval(tick, 240)
    })
    observer.observe(node)

    return () => {
      observer.disconnect()
      window.clearInterval(intervalId)
    }
  }, [cols, rows, seed, reduceMotion])

  return <pre ref={ref} className={`ascii-twinkle ${className}`.trim()} aria-hidden="true" />
}

export default AsciiTwinkle
