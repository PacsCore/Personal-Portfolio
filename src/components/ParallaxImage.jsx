import { motion, useReducedMotionConfig, useTransform } from 'framer-motion'

// `speed` is either pixels (number) or a percentage of the frame height (string, e.g. '-8%').
function getParallaxStyle(speed, reduceMotion) {
  if (reduceMotion) return { range: [0, 0], height: '100%', top: 0 }

  if (typeof speed === 'string') {
    // Overscan once, on the side the image travels toward; % translate is relative to the image's own height.
    const travel = Number.parseFloat(speed)
    const overscan = Math.abs(travel)
    const translate = (travel / (100 + overscan)) * 100
    return {
      range: ['0%', `${translate}%`],
      height: `${100 + overscan}%`,
      top: travel > 0 ? `${-overscan}%` : 0,
    }
  }

  // Pixel travel overscans both sides to keep the centered crop at rest.
  const overscan = Math.abs(speed)
  return {
    range: [0, speed],
    height: `calc(100% + ${overscan * 2}px)`,
    top: -overscan,
  }
}

function ParallaxImage({ image, progress, speed = 24, className = '', loading = 'lazy' }) {
  const reduceMotion = useReducedMotionConfig()
  const { range, height, top } = getParallaxStyle(speed, reduceMotion)
  const y = useTransform(progress, [0, 1], range)

  return (
    <motion.img
      className={className}
      src={image.src}
      alt={image.alt}
      loading={loading}
      style={{ y, height, top, position: 'relative' }}
    />
  )
}

export default ParallaxImage
