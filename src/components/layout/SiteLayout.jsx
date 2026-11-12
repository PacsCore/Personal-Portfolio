import { useEffect, useState } from 'react'
import content from '../../data/content.js'
import useTheme from '../../hooks/useTheme.js'
import Toast from '../ui/Toast.jsx'
import PageTransition from './PageTransition.jsx'
import SiteFooter from './SiteFooter.jsx'
import SiteHeader from './SiteHeader.jsx'

function SiteLayout() {
  const { theme, toggleTheme } = useTheme()
  const [toast, setToast] = useState('')

  useEffect(() => {
    document.title = `${content.name} | Portfolio`
  }, [])

  useEffect(() => {
    if (!toast) return undefined

    const timeoutId = window.setTimeout(() => setToast(''), 1800)
    return () => window.clearTimeout(timeoutId)
  }, [toast])

  return (
    <div className="site-shell">
      <SiteHeader theme={theme} onToggleTheme={toggleTheme} />

      <main className="page-main">
        <PageTransition />
      </main>

      <SiteFooter onToast={setToast} />
      <Toast message={toast} />
    </div>
  )
}

export default SiteLayout
