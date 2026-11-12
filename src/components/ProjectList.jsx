import { FiArrowUpRight } from 'react-icons/fi'
import content from '../data/content.js'
import { StaggerGroup, StaggerItem } from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'

function ProjectList({ projects = content.projects }) {
  return (
    <StaggerGroup className="project-list" role="list">
      {projects.map((project, index) => (
        <StaggerItem className="project-list-item" role="listitem" key={`${project.title}-${index}`}>
          <TiltCard className="project-card">
            <div className="project-card-copy">
              <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul className="project-tags" aria-label={content.ui.technologyTagsLabel}>
                {project.tags.map((tag, tagIndex) => (
                  <li className="tag" key={`${tag}-${tagIndex}`}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <a
              className="project-link"
              href={project.href || '#'}
              aria-label={`${content.ui.projectLinkLabel} ${project.title}`}
              aria-disabled={project.href ? undefined : 'true'}
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
