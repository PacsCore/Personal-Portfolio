import { Link, Navigate, useParams } from 'react-router-dom'
import Placeholder from '../components/ui/Placeholder.jsx'
import content, { getProject } from '../data/content.js'

const DETAILS = [
  { key: 'role', label: 'Role' },
  { key: 'stack', label: 'Stack' },
  { key: 'year', label: 'Year' },
]

function formatValue(value) {
  return Array.isArray(value) ? value.join(', ') : value
}

function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <Navigate to="/work" replace />

  const { projects } = content.work
  const next = projects[(projects.indexOf(project) + 1) % projects.length]

  return (
    <article className="page project">
      <Link className="back-link enter" to="/work">
        <span aria-hidden="true">←</span> Work
      </Link>

      <header className="page-header enter" style={{ '--i': 1 }}>
        <h1 className="page-title">{project.title}</h1>
        {project.description ? (
          <p className="page-lede">{project.description}</p>
        ) : (
          <Placeholder as="p" className="page-lede">
            project description
          </Placeholder>
        )}
      </header>

      <dl className="project-details enter" style={{ '--i': 2 }}>
        {DETAILS.map(({ key, label }) => (
          <div key={key}>
            <dt>{label}</dt>
            <dd>{project[key] ? formatValue(project[key]) : <Placeholder>{label.toLowerCase()}</Placeholder>}</dd>
          </div>
        ))}
        <div>
          <dt>Link</dt>
          <dd>
            {project.href ? (
              <a className="text-link" href={project.href} target="_blank" rel="noreferrer">
                Visit <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <Placeholder>link</Placeholder>
            )}
          </dd>
        </div>
      </dl>

      {project.images?.length > 0 && (
        <div className="project-images enter" style={{ '--i': 3 }}>
          {project.images.map((image) => (
            <img key={image.src} src={image.src} alt={image.alt} loading="lazy" decoding="async" />
          ))}
        </div>
      )}

      {next !== project && (
        <Link className="next-link enter" style={{ '--i': 3 }} to={`/work/${next.slug}`}>
          <span className="eyebrow">Next</span>
          <span className="next-title">
            {next.title} <span aria-hidden="true">→</span>
          </span>
        </Link>
      )}
    </article>
  )
}

export default ProjectPage
