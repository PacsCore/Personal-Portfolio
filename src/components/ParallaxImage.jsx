import { motion, useReducedMotion, useTransform } from 'framer-motion'

function ParallaxImage({ image, progress, speed = 24, className = '' }) {
  const reduceMotion = useReducedMotion()
  const y = useTransform(progress, [0, 1], [0, reduceMotion ? 0 : speed])

  return (
    <motion.img
      className={className}
      src={image.src}
      alt={image.alt}
      loading="lazy"
      style={{ y }}
    />
  )
}

export default ParallaxImage
