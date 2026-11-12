import content from '../../data/content.js'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>
          © {new Date().getFullYear()} {content.name}. All rights reserved.
        </p>
        <p>{content.footer.note}</p>
      </div>
    </footer>
  )
}

export default SiteFooter
