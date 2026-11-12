import HeroCodeWindow from './HeroCodeWindow.jsx'

// Right-hand composition: outline circle, steel block, framed landscape and the code window.
function HeroVisual({ image, location, code }) {
  return (
    <div className="hero-visual">
      <div className="hero-art" aria-hidden="true">
        <span className="hero-circle" />
        <span className="hero-block" />
        <div className="hero-photo">
          <img
            src={image.src}
            alt=""
            loading="eager"
            decoding="async"
            style={{ objectPosition: image.framePosition }}
          />
        </div>
        <span className="hero-crosshair hero-crosshair-photo" />
      </div>

      <p className="hero-location">
        <span aria-hidden="true">{'{ '}</span>
        {location}
        <span aria-hidden="true">{' }'}</span>
      </p>

      <HeroCodeWindow {...code} />
    </div>
  )
}

export default HeroVisual
