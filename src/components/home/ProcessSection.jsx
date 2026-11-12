import content from '../../data/content.js'
import ElevationProfile from './ElevationProfile.jsx'
import PlateSection from './PlateSection.jsx'

function ProcessSection() {
  const { process } = content

  return (
    <PlateSection id="process" number={process.number} label={process.label} className="process">
      <ElevationProfile steps={process.steps} />
    </PlateSection>
  )
}

export default ProcessSection
