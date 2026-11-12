import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import ParallaxImage from '../components/ParallaxImage.jsx'
import { Reveal, StaggerGroup, StaggerItem } from '../components/Reveal.jsx'
import content from '../data/content.js'

function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

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

        <div className="hero-image-frame">
          <ParallaxImage
            image={content.images.hero}
            progress={scrollYProgress}
            speed={38}
            loading="eager"
          />
        </div>

        <StaggerGroup className="image-gallery" role="group" aria-label={content.ui.galleryLabel}>
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
