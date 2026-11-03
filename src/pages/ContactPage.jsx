import { FiArrowUpRight } from 'react-icons/fi'
import { Reveal } from '../components/Reveal.jsx'
import content from '../data/content.js'

function ContactPage() {
  const email = content.socials.email.address

  return (
    <div className="content-page contact-page">
      <section className="page-heading">
        <Reveal>
          <span className="eyebrow">{content.ui.pageLabels.contact}</span>
          <h1>{content.sectionTitles.contact}</h1>
          <p>{content.intro}</p>
        </Reveal>
      </section>
      <Reveal className="contact-action">
        <a className="contact-email" href={`mailto:${email}`}>
          <span>{email || content.placeholders.email}</span>
          <FiArrowUpRight aria-hidden="true" />
        </a>
      </Reveal>
    </div>
  )
}

export default ContactPage
