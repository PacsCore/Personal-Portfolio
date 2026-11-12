import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import content from '../../data/content.js'
import PlateSection from './PlateSection.jsx'
import ProjectSheet from './ProjectSheet.jsx'

function WorkSection() {
  const { work } = content

  return (
    <PlateSection
      id="work"
      number={work.number}
      label={work.label}
      className="work"
      aside={
        <Link className="text-link" to={work.allLink.to}>
          {work.allLink.label}
          <FiArrowRight aria-hidden="true" />
        </Link>
      }
    >
      <div className="sheet-list">
        {work.projects.map((project, index) => (
          <ProjectSheet project={project} index={index} key={project.title} />
        ))}
      </div>
    </PlateSection>
  )
}

export default WorkSection
