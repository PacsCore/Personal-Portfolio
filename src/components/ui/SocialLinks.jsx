import { FaDiscord, FaGithub, FaXTwitter } from 'react-icons/fa6'
import { FiMail } from 'react-icons/fi'
import content from '../../data/content.js'
import TiltCard from '../TiltCard.jsx'

const socialIcons = {
  x: FaXTwitter,
  email: FiMail,
  github: FaGithub,
  discord: FaDiscord,
}

function SocialLinks({ onToast }) {
  const socials = Object.entries(content.socials)

  async function copyDiscord(username) {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard access is unavailable in this browser.')
      }

      await navigator.clipboard.writeText(username)
      onToast(content.ui.copySuccess)
    } catch (error) {
      console.error('Unable to copy the Discord username.', error)
      onToast(content.ui.copyUnavailable)
    }
  }

  return (
    <div className="social-links" aria-label={content.ui.socialLinksLabel}>
      {socials.map(([network, details]) => {
        const Icon = socialIcons[network]

        if (network === 'discord') {
          return (
            <TiltCard className="social-tilt" key={network}>
              <button
                type="button"
                className="social-link"
                aria-label={details.ariaLabel}
                title={details.ariaLabel}
                onClick={() => copyDiscord(details.username)}
              >
                <Icon aria-hidden="true" />
              </button>
            </TiltCard>
          )
        }

        const isEmail = network === 'email'
        const href = isEmail ? `mailto:${details.address}` : details.href || '#'
        const label = details.label

        return (
          <TiltCard className="social-tilt" key={network}>
            <a
              className="social-link"
              href={href}
              aria-label={label}
              title={label}
              onClick={(event) => {
                if (!isEmail && !details.href) event.preventDefault()
              }}
              target={!isEmail && details.href ? '_blank' : undefined}
              rel={!isEmail && details.href ? 'noreferrer' : undefined}
            >
              <Icon aria-hidden="true" />
            </a>
          </TiltCard>
        )
      })}
    </div>
  )
}

export default SocialLinks
