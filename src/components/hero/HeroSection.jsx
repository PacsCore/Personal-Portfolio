import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import content from '../../data/content.js'
import HeroVisual from './HeroVisual.jsx'
import './hero.css'

function HeroSection() {
  const { hero } = content

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-inner">
        <p className="hero-index" aria-hidden="true">
          {hero.index}
        </p>

        <div className="hero-copy">
          <h1 className="hero-title" id="hero-title">
            <span>{hero.firstName}</span> <span>{hero.lastName}</span>
          </h1>
          <p className="hero-role">{hero.role}</p>
          <p className="hero-intro">
            {hero.intro.lead}
            <strong>{hero.intro.emphasis}</strong>
            {hero.intro.tail}
          </p>
          <div className="hero-actions">
            <Link className="hero-cta" to={hero.actions.primary.to}>
              {hero.actions.primary.label}
              <FiArrowUpRight aria-hidden="true" />
            </Link>
            <Link className="hero-link" to={hero.actions.secondary.to}>
              {hero.actions.secondary.label}
            </Link>
          </div>
        </div>

        <HeroVisual image={hero.image} caption={hero.caption} code={hero.code} />

        <p className="hero-tags">
          <span className="visually-hidden">{hero.tagsLabel}: </span>
          {hero.tags.map((tag, index) => (
            <span key={tag}>
              {index > 0 && <span className="hero-tags-sep" aria-hidden="true">/</span>}
              {tag}
              {index < hero.tags.length - 1 && <span className="visually-hidden">,</span>}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

export default HeroSection
