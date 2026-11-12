import { motion, useReducedMotionConfig, useTransform } from 'framer-motion'

function ParallaxImage({ image, progress, speed = 24, className = '', loading = 'lazy' }) {
  const reduceMotion = useReducedMotionConfig()
  const travel = reduceMotion ? 0 : speed
  // The image is taller than its frame by |travel|, and the range is chosen so the frame stays covered at both ends.
  const y = useTransform(progress, [0, 1], travel > 0 ? [-travel, 0] : [0, travel])

  return (
    <motion.img
      className={className}
      src={image.src}
      alt={image.alt}
      loading={loading}
      style={{ y, height: `calc(100% + ${Math.abs(travel)}px)` }}
    />
  )
}

export default ParallaxImage
