import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import { pageTransition } from '../../lib/motion.js'

function PageTransition() {
  const outlet = useOutlet()
  const location = useLocation()

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
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition
