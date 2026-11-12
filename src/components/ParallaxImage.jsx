import { motion, useReducedMotionConfig, useTransform } from 'framer-motion'

function ParallaxImage({ image, progress, speed = 24, className = '', loading = 'lazy' }) {
  const reduceMotion = useReducedMotionConfig()
  const travel = reduceMotion ? 0 : speed
  const overscan = Math.abs(travel)
  const y = useTransform(progress, [0, 1], [0, travel])

  // Overscan the image by |travel| on both sides so the frame never shows an edge,
  // while keeping the same centered crop at rest.
  return (
    <motion.img
      className={className}
      src={image.src}
      alt={image.alt}
      loading={loading}
      style={{ y, height: `calc(100% + ${overscan * 2}px)`, marginTop: -overscan }}
    />
  )
}

export default ParallaxImage
