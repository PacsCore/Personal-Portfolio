import { Link } from 'react-router-dom'
import Placeholder from '../components/ui/Placeholder.jsx'
import content from '../data/content.js'

function WorkPage() {
  const { work } = content

  return (
    <article className="page work">
      <header className="page-header enter">
        <p className="eyebrow">Work</p>
        <h1 className="page-title">Things I&apos;ve made.</h1>
        <p className="page-lede">{work.intro}</p>
      </header>

      <ol className="work-list">
        {work.projects.map((project, index) => (
          <li className="enter" style={{ '--i': index + 1 }} key={project.slug}>
            <Link className="work-row" to={`/work/${project.slug}`}>
              <span className="work-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="work-title">
                <span className="work-spark" aria-hidden="true">
                  *
                </span>
                {project.title}
                <span className="arrow-ne" aria-hidden="true">
                  ↗
                </span>
              </span>
              <span className="work-description">
                {project.description ?? <Placeholder>short description</Placeholder>}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </article>
  )
}

export default WorkPage
