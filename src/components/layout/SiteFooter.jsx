import content from '../../data/content.js'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {content.name}
      </p>
      <p aria-hidden="true" className="site-footer-mark">
        · ˚ ✦ ·
      </p>
    </footer>
  )
}

export default SiteFooter
