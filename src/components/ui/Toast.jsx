import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

function Toast({ message }) {
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="toast"
          role="status"
          aria-live="polite"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
