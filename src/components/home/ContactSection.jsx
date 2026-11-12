import { useEffect, useState } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import content from '../../data/content.js'
import Colophon from '../layout/Colophon.jsx'
import Pending from '../ui/Pending.jsx'
import PlateSection from './PlateSection.jsx'

function ContactSection() {
  const { contact, socials } = content
  const email = socials.email.address
  const profiles = contact.profiles.map((key) => ({ key, ...socials[key] }))
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (!status) return undefined
    const timeoutId = window.setTimeout(() => setStatus(''), 2000)
    return () => window.clearTimeout(timeoutId)
  }, [status])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setStatus(contact.copied)
    } catch {
      setStatus(content.ui.copyUnavailable)
    }
  }

  return (
    <PlateSection id="contact" number={contact.number} label={contact.label} className="contact">
      <p className="contact-heading">
        {contact.heading.lead} <em>{contact.heading.accent}</em>
      </p>

      <div className="contact-row">
        <div className="contact-email-row">
          {email ? (
            <>
              <a className="contact-mail" href={`mailto:${email}`}>
                {email}
                <FiArrowUpRight aria-hidden="true" />
              </a>
              <button className="contact-copy" type="button" onClick={copyEmail}>
                {contact.copyLabel}
              </button>
              <span className="contact-status" role="status">
                {status}
              </span>
            </>
          ) : (
            <Pending>Email address pending</Pending>
          )}
        </div>

        <ul className="contact-profiles">
          {profiles.map((profile) =>
            profile.href ? (
              <li key={profile.key}>
                <a className="text-link" href={profile.href} target="_blank" rel="noreferrer">
                  {profile.label}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                  <FiArrowUpRight aria-hidden="true" />
                </a>
              </li>
            ) : (
              <Pending as="li" key={profile.key}>
                {profile.label} URL pending
              </Pending>
            ),
          )}
        </ul>
      </div>

      <Colophon />
    </PlateSection>
  )
}

export default ContactSection
