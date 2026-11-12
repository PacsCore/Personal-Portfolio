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

function getHref(network, details) {
  if (network === 'email') return details.address ? `mailto:${details.address}` : ''
  return details.href
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
    <ul className="social-links" aria-label={content.ui.socialLinksLabel}>
      {socials.map(([network, details]) => {
        const Icon = socialIcons[network]

        if (network === 'discord') {
          return (
            <li key={network}>
              <TiltCard className="social-tilt">
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
            </li>
          )
        }

        const href = getHref(network, details)
        const isExternal = Boolean(href) && network !== 'email'

        return (
          <li key={network}>
            <TiltCard className="social-tilt">
              <a
                className="social-link"
                href={href || '#'}
                aria-label={details.label}
                aria-disabled={href ? undefined : 'true'}
                title={details.label}
                onClick={(event) => {
                  if (!href) event.preventDefault()
                }}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
              >
                <Icon aria-hidden="true" />
              </a>
            </TiltCard>
          </li>
        )
      })}
    </ul>
  )
}

export default SocialLinks
