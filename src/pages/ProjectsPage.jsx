import ProjectList from '../components/ProjectList.jsx'
import { Reveal } from '../components/Reveal.jsx'
import content from '../data/content.js'

function ProjectsPage() {
  return (
    <div className="content-page projects-page">
      <section className="page-heading">
        <Reveal>
          <span className="eyebrow">{content.ui.pageLabels.projects}</span>
          <h1>{content.sectionTitles.projects}</h1>
          <p>{content.intro}</p>
        </Reveal>
      </section>
      <ProjectList />
    </div>
  )
}

export default ProjectsPage
