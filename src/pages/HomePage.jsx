import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import ParallaxImage from '../components/ParallaxImage.jsx'
import { Reveal, StaggerGroup, StaggerItem } from '../components/Reveal.jsx'
import content from '../data/content.js'

function HomePage() {
  const heroRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 38])

  return (
    <div className="home-page">
      <section className="home-intro" ref={heroRef}>
        <Reveal className="home-intro-copy">
          <span className="eyebrow">{content.ui.pageLabels.home}</span>
          <h1>
            {content.greeting} <span>{content.name}</span>
          </h1>
          <p className="home-tagline">{content.tagline}</p>
          <p className="home-intro-text">{content.intro}</p>
        </Reveal>

        <motion.div className="hero-image-frame" style={{ y: heroY }}>
          <img src={content.images.hero.src} alt={content.images.hero.alt} />
        </motion.div>

        <StaggerGroup className="image-gallery" aria-label={content.ui.galleryLabel}>
          {content.images.gallery.map((image, index) => (
            <StaggerItem className={`gallery-image gallery-image-${index + 1}`} key={image.alt}>
              <ParallaxImage
                image={image}
                progress={scrollYProgress}
                speed={index % 2 === 0 ? -18 : 20}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="home-note">
        <Reveal>
          <p className="eyebrow">{content.ui.pageLabels.aboutNote}</p>
          <p>{content.aboutText}</p>
        </Reveal>
      </section>
    </div>
  )
}

export default HomePage
