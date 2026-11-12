import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import content from '../../data/content.js'
import PortraitFrame from '../identity/PortraitFrame.jsx'
import Pending from '../ui/Pending.jsx'
import PlateSection from './PlateSection.jsx'

function IdentitySection() {
  const { identity } = content

  return (
    <PlateSection id="identity" number={identity.number} label={identity.label} className="identity">
      <PortraitFrame
        className="identity-portrait"
        src={identity.portrait.src}
        alt={identity.portrait.alt}
        caption={identity.caption}
      />

      <div className="identity-body">
        {identity.intro ? (
          <p className="identity-intro">{identity.intro}</p>
        ) : (
          <Pending as="p" className="identity-intro-pending">
            Introduction pending — 2–3 sentences
          </Pending>
        )}

        <dl className="fact-list">
          {identity.facts.map((fact) => (
            <div className="fact-row" key={fact.term}>
              <dt>{fact.term}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <Link className="text-link" to={identity.link.to}>
          {identity.link.label}
          <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </PlateSection>
  )
}

export default IdentitySection
