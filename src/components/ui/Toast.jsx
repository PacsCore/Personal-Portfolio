import { AnimatePresence, motion } from 'framer-motion'

// The live region stays mounted so screen readers reliably announce new messages.
function Toast({ message }) {
  return (
    <div role="status" aria-live="polite">
      <AnimatePresence>
        {message && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Toast
