import { FiArrowUpRight } from 'react-icons/fi'
import content from '../data/content.js'
import { StaggerGroup, StaggerItem } from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'

function ProjectList({ projects = content.projects }) {
  return (
    <StaggerGroup className="project-list">
      {projects.map((project, index) => (
        <StaggerItem className="project-list-item" key={`${project.title}-${index}`}>
          <TiltCard className="project-card">
            <div className="project-card-copy">
              <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags" aria-label={content.ui.technologyTagsLabel}>
                {project.tags.map((tag, tagIndex) => (
                  <span className="tag" key={`${tag}-${tagIndex}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <a
              className="project-link"
              href={project.href || '#'}
              aria-label={`${content.ui.projectLinkLabel} ${project.title}`}
              onClick={(event) => {
                if (!project.href) event.preventDefault()
              }}
              target={project.href ? '_blank' : undefined}
              rel={project.href ? 'noreferrer' : undefined}
            >
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </TiltCard>
        </StaggerItem>
      ))}
    </StaggerGroup>
  )
}

export default ProjectList
