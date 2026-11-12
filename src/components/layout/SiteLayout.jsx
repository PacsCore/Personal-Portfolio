import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import content from '../../data/content.js'
import useTheme from '../../hooks/useTheme.js'
import Toast from '../ui/Toast.jsx'
import PageTransition from './PageTransition.jsx'
import SiteFooter from './SiteFooter.jsx'
import SiteHeader from './SiteHeader.jsx'

function SiteLayout() {
  const reduceMotion = useReducedMotion()
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

  const pageTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }

  return (
    <div className="site-shell">
      <SiteHeader
        theme={theme}
        onToggleTheme={toggleTheme}
        indicatorTransition={pageTransition}
      />

      <main className="page-main">
        <PageTransition transition={pageTransition} />
      </main>

      <SiteFooter onToast={setToast} />
      <Toast message={toast} />
    </div>
  )
}

export default SiteLayout
