import { useState } from 'react'
import AsciiTwinkle from '../components/ascii/AsciiTwinkle.jsx'
import Placeholder from '../components/ui/Placeholder.jsx'
import content from '../data/content.js'

const PHOTO_TEXTURE = Array.from({ length: 9 }, (_, row) =>
  Array.from({ length: 22 }, (_, col) => ((row + col) % 4 === 0 ? '·' : ' ')).join(''),
).join('\n')

// Frames of a tiny ASCII hourglass; CSS steps through them while a photo loads.
const HOURGLASS = [
  ' ___\n \\:/\n /.\\\n ‾‾‾',
  ' ___\n \\ /\n /:\\\n ‾‾‾',
  ' ___\n \\ /\n / \\\n ‾:‾',
]
const SEGMENTS = 8
// The frame is 4:5. A wider photo is cropped by `object-fit: cover`, so it
// renders wider than the frame; scale `sizes` so the browser picks a sharp file.
const FRAME_RATIO = 4 / 5

function photoSizes(photo) {
  const scale = photo.width && photo.height ? Math.max(1, photo.width / photo.height / FRAME_RATIO) : 1
  const mobile = Math.ceil(64 * scale)
  const desktop = Math.ceil(320 * scale)
  return `(max-width: 640px) ${mobile}vw, ${desktop}px`
}

function PhotoImage({ photo, eager, filename }) {
  const [status, setStatus] = useState('loading')

  const handleLoad = (event) => {
    const img = event.currentTarget
    const reveal = () => setStatus('loaded')
    if (img.decode) img.decode().then(reveal, reveal)
    else reveal()
  }

  const sizes = photoSizes(photo)
  const srcSet = photo.sources?.map((source) => `${source.src} ${source.width}w`).join(', ')

  return (
    <div className="photo-frame" data-status={status}>
      <picture>
        {srcSet && <source type="image/webp" srcSet={srcSet} sizes={sizes} />}
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={() => setStatus('error')}
        />
      </picture>

      {status === 'loading' && (
        <div className="photo-loading" role="status">
          <span className="hourglass" aria-hidden="true">
            {HOURGLASS.map((frame) => (
              <span key={frame}>{frame}</span>
            ))}
          </span>
          <span className="photo-loading-label">Loading...</span>
          <span className="photo-progress" aria-hidden="true">
            {Array.from({ length: SEGMENTS }, (_, i) => (
              <span key={i} style={{ '--seg': i }} />
            ))}
          </span>
        </div>
      )}

      {status === 'error' && (
        <div className="photo-loading photo-error" role="status">
          <span aria-hidden="true">[ × ]</span>
          <span className="photo-loading-label">couldn’t open {filename}</span>
        </div>
      )}
    </div>
  )
}

function Photo({ photo, index }) {
  const number = String(index + 1).padStart(2, '0')
  const filename = `photo_${number}.jpg`

  return (
    <figure className="photo">
      <div className="window">
        <div className="window-bar" aria-hidden="true">
          <span className="window-menu">...</span>
          <span className="window-title">{filename}</span>
          <span className="window-controls">
            <span>—</span>
            <span>□</span>
          </span>
        </div>
        {photo.src ? (
          // On narrow screens the gallery scrolls sideways and the third photo starts offscreen.
          <PhotoImage photo={photo} eager={index < 2} filename={filename} />
        ) : (
          <div className="photo-frame">
            <div className="photo-empty">
              <pre aria-hidden="true">{PHOTO_TEXTURE}</pre>
              <Placeholder>photo {number}</Placeholder>
            </div>
          </div>
        )}
      </div>
      <figcaption>
        <span className="photo-number">{number}</span>
        {photo.caption ?? <Placeholder>caption</Placeholder>}
      </figcaption>
    </figure>
  )
}

function AboutPage() {
  const { about } = content

  return (
    <article className="page about">
      <header className="page-header enter">
        <p className="eyebrow">About</p>
        <h1 className="page-title">A little about me.</h1>
        <AsciiTwinkle className="page-ornament" cols={16} rows={4} seed={3} />
      </header>

      <div className="prose enter" style={{ '--i': 1 }}>
        {about.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <section className="about-photos enter" style={{ '--i': 2 }} aria-label="Photographs">
        {about.photos.map((photo, index) => (
          <Photo key={index} photo={photo} index={index} />
        ))}
      </section>

      <section className="section enter" style={{ '--i': 3 }} aria-labelledby="interests-heading">
        <h2 className="section-title" id="interests-heading">
          <span aria-hidden="true">+</span> What I enjoy
        </h2>
        <dl className="interests">
          {about.interests.map((interest) => (
            <div className="interest" key={interest.title}>
              <dt>{interest.title}</dt>
              <dd>{interest.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section enter" style={{ '--i': 4 }} aria-labelledby="background-heading">
        <h2 className="section-title" id="background-heading">
          <span aria-hidden="true">+</span> Background
        </h2>
        <ol className="timeline">
          {about.timeline.map((entry, index) => (
            <li className="timeline-item" key={index}>
              <span className="timeline-year">{entry.year ?? <Placeholder>year</Placeholder>}</span>
              <div>
                <p className="timeline-title">{entry.title ?? <Placeholder>milestone</Placeholder>}</p>
                {entry.text ? (
                  <p className="timeline-text">{entry.text}</p>
                ) : (
                  <Placeholder as="p" className="timeline-text">
                    a sentence about it
                  </Placeholder>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  )
}

export default AboutPage
