import { useEffect } from 'react'
import { useMatches } from 'react-router-dom'
import content from '../../data/content.js'
import useTheme from '../../hooks/useTheme.js'
import PageTransition from './PageTransition.jsx'
import SiteFooter from './SiteFooter.jsx'
import SiteHeader from './SiteHeader.jsx'

function SkipLink() {
  return (
    <a
      className="skip-link"
      href="#main-content"
      onClick={(event) => {
        event.preventDefault()
        document.getElementById('main-content')?.focus()
      }}
    >
      {content.ui.skipToContent}
    </a>
  )
}

function SiteLayout() {
  const { theme, toggleTheme } = useTheme()
  const matches = useMatches()
  const match = matches.at(-1)
  const title = match?.handle?.title
  const pageTitle = typeof title === 'function' ? title(match.params) : title
  const showFooter = match?.handle?.footer !== false

  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} — ${content.name}` : content.name
  }, [pageTitle])

  return (
    <div className="site-shell">
      <SkipLink />
      <SiteHeader theme={theme} onToggleTheme={toggleTheme} />

      <main className="page-main" id="main-content" tabIndex={-1}>
        <PageTransition />
      </main>

      {showFooter && <SiteFooter />}
    </div>
  )
}

export default SiteLayout
