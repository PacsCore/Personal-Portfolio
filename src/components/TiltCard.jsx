import { motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'

function TiltCard({ children, className = '' }) {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const reduceMotion = useReducedMotion()
  const rotateX = useTransform(pointerY, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(pointerX, [-0.5, 0.5], [-5, 5])

  function handlePointerMove(event) {
    if (event.pointerType !== 'mouse' || reduceMotion) return

    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5)
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  function resetTilt() {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.div
      className={className}
      style={{
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 720,
        transformStyle: 'preserve-3d',
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      {children}
    </motion.div>
  )
}

export default TiltCard
