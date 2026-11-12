import ContactSection from '../components/home/ContactSection.jsx'
import IdentitySection from '../components/home/IdentitySection.jsx'
import ProcessSection from '../components/home/ProcessSection.jsx'
import WorkSection from '../components/home/WorkSection.jsx'
import HeroSection from '../components/hero/HeroSection.jsx'
import '../components/home/home.css'

function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <IdentitySection />
      <WorkSection />
      <ProcessSection />
      <ContactSection />
    </div>
  )
}

export default HomePage
