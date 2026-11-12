import { useEffect, useState } from 'react'
import { useMatches } from 'react-router-dom'
import content from '../../data/content.js'
import useTheme from '../../hooks/useTheme.js'
import Toast from '../ui/Toast.jsx'
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
  const [toast, setToast] = useState('')
  const matches = useMatches()
  const pageTitle = matches.at(-1)?.handle?.title

  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${content.name}` : `${content.name} | Portfolio`
  }, [pageTitle])

  useEffect(() => {
    if (!toast) return undefined

    const timeoutId = window.setTimeout(() => setToast(''), 1800)
    return () => window.clearTimeout(timeoutId)
  }, [toast])

  return (
    <div className="site-shell">
      <SkipLink />
      <SiteHeader theme={theme} onToggleTheme={toggleTheme} />

      <main className="page-main" id="main-content" tabIndex={-1}>
        <PageTransition />
      </main>

      <SiteFooter onToast={setToast} />
      <Toast message={toast} />
    </div>
  )
}

export default SiteLayout
