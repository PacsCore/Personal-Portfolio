import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import HeroSection from '../components/hero/HeroSection.jsx'
import ParallaxImage from '../components/ParallaxImage.jsx'
import { Reveal, StaggerGroup, StaggerItem } from '../components/Reveal.jsx'
import content from '../data/content.js'

function HomePage() {
  const galleryRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ['start start', 'end start'],
  })

  return (
    <div className="home-page">
      <HeroSection />

      <section className="home-gallery" ref={galleryRef} aria-label={content.ui.galleryLabel}>
        <StaggerGroup className="image-gallery">
          {content.images.gallery.map((image, index) => (
            <StaggerItem className={`gallery-image gallery-image-${index + 1}`} key={image.alt}>
              <ParallaxImage
                image={image}
                progress={scrollYProgress}
                speed={index % 2 === 0 ? '-8%' : '8%'}
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
