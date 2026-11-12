import HeroCodeWindow from './HeroCodeWindow.jsx'

// Framed photograph with its offset "second ink" plate, a faint contour overlay,
// two registration marks and a caption, plus the code window.
// Without `image.src` the plate shows a neutral tonal stand-in.
function HeroVisual({ image, caption, code }) {
  return (
    <div className="hero-visual">
      <figure className="hero-frame">
        <figcaption className="hero-caption">{caption}</figcaption>
        <div className="hero-plate">
          <span className="hero-ink" aria-hidden="true" />
          <div className="hero-photo" aria-hidden={image.src ? undefined : 'true'}>
            {image.src && (
              <img
                src={image.src}
                alt={image.alt}
                loading="eager"
                decoding="async"
                style={{ objectPosition: image.position }}
              />
            )}
          </div>
          <span className="hero-contours" aria-hidden="true" />
          <span className="hero-mark hero-mark-start" aria-hidden="true" />
          <span className="hero-mark hero-mark-end" aria-hidden="true" />
        </div>
      </figure>

      <HeroCodeWindow {...code} />
    </div>
  )
}

export default HeroVisual
