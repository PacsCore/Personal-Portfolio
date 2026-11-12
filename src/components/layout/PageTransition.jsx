import { useEffect, useLayoutEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useNavigationType, useOutlet } from 'react-router-dom'
import { pageTransition } from '../../lib/motion.js'

const scrollPositions = new Map()

function focusPageHeading() {
  const target = document.querySelector('#main-content h1') ?? document.getElementById('main-content')
  if (!target) return

  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}

// Mounts with each new page, i.e. after the previous page's exit animation has finished.
function RouteEntry({ onEnter }) {
  useLayoutEffect(() => {
    onEnter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

function PageTransition() {
  const outlet = useOutlet()
  const location = useLocation()
  const navigationType = useNavigationType()
  const previousKey = useRef(location.key)
  const hasNavigated = useRef(false)

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    if (previousKey.current === location.key) return

    scrollPositions.set(previousKey.current, window.scrollY)
    previousKey.current = location.key
    hasNavigated.current = true
  }, [location.key])

  function handleEnter() {
    if (!hasNavigated.current) return

    const savedPosition = navigationType === 'POP' ? scrollPositions.get(location.key) : undefined
    window.scrollTo(0, savedPosition ?? 0)
    focusPageHeading()
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        className="page-transition"
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -7 }}
        transition={pageTransition}
      >
        {outlet}
        <RouteEntry onEnter={handleEnter} />
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition
