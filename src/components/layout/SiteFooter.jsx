import content from '../../data/content.js'
import SocialLinks from '../ui/SocialLinks.jsx'

function SiteFooter({ onToast }) {
  return (
    <footer className="site-footer">
      <SocialLinks onToast={onToast} />
      <p>© {new Date().getFullYear()} {content.name}. {content.copyright}</p>
    </footer>
  )
}

export default SiteFooter
