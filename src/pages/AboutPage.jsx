import AsciiTwinkle from '../components/ascii/AsciiTwinkle.jsx'
import Placeholder from '../components/ui/Placeholder.jsx'
import content from '../data/content.js'

const PHOTO_TEXTURE = Array.from({ length: 9 }, (_, row) =>
  Array.from({ length: 22 }, (_, col) => ((row + col) % 4 === 0 ? '·' : ' ')).join(''),
).join('\n')

function Photo({ photo, index }) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <figure className="photo" style={{ '--tilt': `${[-1.2, 0.8, -0.4][index % 3]}deg` }}>
      <div className="photo-frame">
        {photo.src ? (
          <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
        ) : (
          <div className="photo-empty">
            <pre aria-hidden="true">{PHOTO_TEXTURE}</pre>
            <Placeholder>photo {number}</Placeholder>
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
