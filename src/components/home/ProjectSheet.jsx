import { FiArrowUpRight } from 'react-icons/fi'
import Pending from '../ui/Pending.jsx'

// One project as a full-width "specimen sheet". Only confirmed fields render;
// missing ones show dev-only placeholders. Future boundary for the stacked-sheet
// and ink-up motion.
function ProjectSheet({ project, index }) {
  const number = String(index + 1).padStart(2, '0')
  const titleId = `project-${number}-title`
  const specs = [
    { term: 'Role', value: project.role },
    { term: 'Stack', value: Array.isArray(project.stack) ? project.stack.join(', ') : project.stack },
    { term: 'Year', value: project.year },
  ]

  return (
    <article className={`sheet ${index % 2 ? 'sheet-reverse' : ''}`.trim()} aria-labelledby={titleId}>
      <span className="sheet-index" aria-hidden="true">
        {number}
      </span>
      <h3 className="sheet-title" id={titleId}>
        {project.title}
      </h3>

      <div className="sheet-media">
        {project.image?.src ? (
          <img src={project.image.src} alt={project.image.alt} loading="lazy" decoding="async" />
        ) : (
          <div className="sheet-standin">
            <Pending>Image pending — 16:10</Pending>
          </div>
        )}
      </div>

      <div className="sheet-details">
        {project.description ? (
          <p className="sheet-description">{project.description}</p>
        ) : (
          <Pending as="p">Description pending</Pending>
        )}

        <dl className="fact-list sheet-specs">
          {specs.map((spec) =>
            spec.value ? (
              <div className="fact-row" key={spec.term}>
                <dt>{spec.term}</dt>
                <dd>{spec.value}</dd>
              </div>
            ) : (
              <Pending as="div" className="fact-row" key={spec.term}>
                {spec.term} pending
              </Pending>
            ),
          )}
        </dl>

        {project.href && (
          <a className="text-link" href={project.href} target="_blank" rel="noreferrer">
            View project
            <span className="visually-hidden"> {project.title} (opens in a new tab)</span>
            <FiArrowUpRight aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}

export default ProjectSheet
