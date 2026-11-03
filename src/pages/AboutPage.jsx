import PhotoCollage from '../components/PhotoCollage.jsx'
import ProjectList from '../components/ProjectList.jsx'
import { Reveal } from '../components/Reveal.jsx'
import Timeline from '../components/Timeline.jsx'
import content from '../data/content.js'

function AboutPage() {
  return (
    <div className="content-page about-page">
      <section className="page-heading">
        <Reveal>
          <span className="eyebrow">{content.ui.pageLabels.about}</span>
          <h1>{content.sectionTitles.about}</h1>
          <p>{content.aboutText}</p>
        </Reveal>
      </section>

      <Reveal className="collage-reveal">
        <PhotoCollage />
      </Reveal>

      <section className="content-section">
        <Reveal>
          <span className="eyebrow">{content.ui.pageLabels.timeline}</span>
          <h2>{content.sectionTitles.timeline}</h2>
        </Reveal>
        <Timeline />
      </section>

      <section className="content-section about-projects">
        <Reveal>
          <span className="eyebrow">{content.ui.pageLabels.work}</span>
          <h2>{content.sectionTitles.selectedProjects}</h2>
        </Reveal>
        <ProjectList />
      </section>
    </div>
  )
}

export default AboutPage
