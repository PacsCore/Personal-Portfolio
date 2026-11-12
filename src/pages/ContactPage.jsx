import AsciiTwinkle from '../components/ascii/AsciiTwinkle.jsx'
import CopyButton from '../components/ui/CopyButton.jsx'
import { SocialIcon } from '../components/ui/SocialLinks.jsx'
import content from '../data/content.js'
import { getSocialLinks } from '../lib/socials.js'

function ContactPage() {
  const { contact } = content

  return (
    <article className="page contact">
      <header className="page-header enter">
        <p className="eyebrow">Contact</p>
        <h1 className="page-title">{contact.heading}</h1>
        <p className="page-lede">{contact.text}</p>
        <AsciiTwinkle className="page-ornament" cols={16} rows={4} seed={8} />
      </header>

      <ul className="contact-list">
        {getSocialLinks().map((link, index) => (
          <li className="contact-row enter" style={{ '--i': index + 1 }} key={link.network}>
            <span className="contact-label">
              <SocialIcon network={link.network} />
              {link.label}
            </span>
            <span className="contact-value">
              <a
                className="text-link"
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
              >
                {link.value}
                <span className="arrow-ne" aria-hidden="true">
                  ↗
                </span>
              </a>
              {link.network === 'email' && <CopyButton value={link.value} />}
            </span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default ContactPage
