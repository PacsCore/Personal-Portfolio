import { FaGithub, FaXTwitter } from 'react-icons/fa6'
import { FiMail } from 'react-icons/fi'
import content from '../../data/content.js'
import { getSocialLinks } from '../../lib/socials.js'

const icons = { github: FaGithub, x: FaXTwitter, email: FiMail }

export function SocialIcon({ network }) {
  const Icon = icons[network]
  return <Icon className="social-icon" aria-hidden="true" />
}

function SocialLinks({ className = '' }) {
  return (
    <ul className={`social-row ${className}`.trim()} aria-label={content.ui.socialLinksLabel}>
      {getSocialLinks().map((link) => (
        <li key={link.network}>
          <a
            className="social-link"
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noreferrer' : undefined}
          >
            <SocialIcon network={link.network} />
            <span className="social-label">{link.label}</span>
            <span className="arrow-ne" aria-hidden="true">↗</span>
          </a>
        </li>
      ))}
      <li className="social-rule" aria-hidden="true" />
    </ul>
  )
}

export default SocialLinks
