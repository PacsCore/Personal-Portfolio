import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotionConfig, useScroll, useTransform } from 'framer-motion'
import content from '../data/content.js'

const rotations = [-8, 5, -3]

function CollagePhoto({ image, index, pointerX, pointerY, progress }) {
  const reduceMotion = useReducedMotionConfig()
  const x = useTransform([pointerX, progress], ([pointer, scroll]) => (
    reduceMotion ? 0 : pointer * (12 + index * 3) + (scroll - 0.5) * (index - 1) * 10
  ))
  const y = useTransform([pointerY, progress], ([pointer, scroll]) => (
    reduceMotion ? 0 : pointer * (10 + index * 2) + (scroll - 0.5) * (index - 1) * 14
  ))

  return (
    <motion.div
      className={`collage-photo collage-photo-${index + 1}`}
      style={{ x, y, rotate: rotations[index] }}
    >
      <img src={image.src} alt={image.alt} loading="lazy" />
    </motion.div>
  )
}

function PhotoCollage() {
  const collageRef = useRef(null)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const { scrollYProgress } = useScroll({
    target: collageRef,
    offset: ['start end', 'end start'],
  })

  function handlePointerMove(event) {
    if (event.pointerType !== 'mouse') return

    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5)
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  return (
    <div
      className="photo-collage"
      ref={collageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        pointerX.set(0)
        pointerY.set(0)
      }}
      aria-label={content.ui.collageLabel}
    >
      {content.images.collage.map((image, index) => (
        <CollagePhoto
          image={image}
          index={index}
          key={image.alt}
          pointerX={pointerX}
          pointerY={pointerY}
          progress={scrollYProgress}
        />
      ))}
    </div>
  )
}

export default PhotoCollage
