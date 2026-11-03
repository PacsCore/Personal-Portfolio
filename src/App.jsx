import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion'
import { NavLink, Navigate, RouterProvider, createBrowserRouter, useLocation, useOutlet } from 'react-router-dom'
import { FaDiscord, FaGithub, FaXTwitter } from 'react-icons/fa6'
import { FiMail, FiMoon, FiSun } from 'react-icons/fi'
import TiltCard from './components/TiltCard.jsx'
import content from './data/content.js'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import './App.css'

const socialIcons = {
  x: FaXTwitter,
  email: FiMail,
  github: FaGithub,
  discord: FaDiscord,
}

function getInitialTheme() {
  try {
    const savedTheme = window.localStorage.getItem('portfolio-theme')
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark'
  } catch (error) {
    console.error('Unable to read the saved theme preference.', error)
    return 'dark'
  }
}

function ThemeToggle({ theme, onToggle }) {
  const ThemeIcon = theme === 'dark' ? FiSun : FiMoon
  const label = theme === 'dark' ? content.ui.themeToLight : content.ui.themeToDark

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={label}
      title={label}
      onClick={onToggle}
    >
      <ThemeIcon aria-hidden="true" />
    </button>
  )
}

function SocialLinks({ onToast }) {
  const socials = Object.entries(content.socials)

  async function copyDiscord(username) {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard access is unavailable in this browser.')
      }

      await navigator.clipboard.writeText(username)
      onToast(content.ui.copySuccess)
    } catch (error) {
      console.error('Unable to copy the Discord username.', error)
      onToast(content.ui.copyUnavailable)
    }
  }

  return (
    <div className="social-links" aria-label={content.ui.socialLinksLabel}>
      {socials.map(([network, details]) => {
        const Icon = socialIcons[network]

        if (network === 'discord') {
          return (
            <TiltCard className="social-tilt" key={network}>
              <button
                type="button"
                className="social-link"
                aria-label={details.ariaLabel}
                title={details.ariaLabel}
                onClick={() => copyDiscord(details.username)}
              >
                <Icon aria-hidden="true" />
              </button>
            </TiltCard>
          )
        }

        const isEmail = network === 'email'
        const href = isEmail ? `mailto:${details.address}` : details.href || '#'
        const label = details.label

        return (
          <TiltCard className="social-tilt" key={network}>
            <a
              className="social-link"
              href={href}
              aria-label={label}
              title={label}
              onClick={(event) => {
                if (!isEmail && !details.href) event.preventDefault()
              }}
              target={!isEmail && details.href ? '_blank' : undefined}
              rel={!isEmail && details.href ? 'noreferrer' : undefined}
            >
              <Icon aria-hidden="true" />
            </a>
          </TiltCard>
        )
      })}
    </div>
  )
}

function SiteLayout() {
  const outlet = useOutlet()
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const [theme, setTheme] = useState(getInitialTheme)
  const [toast, setToast] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    try {
      window.localStorage.setItem('portfolio-theme', theme)
    } catch (error) {
      console.error('Unable to save the theme preference.', error)
    }
  }, [theme])

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
      <header className="site-header">
        <nav className="nav-pill" aria-label={content.ui.navigationLabel}>
          <NavLink className="site-name" to="/" end>
            {content.name}
          </NavLink>
          <div className="nav-links">
            {content.navigation.map((item) => (
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
                end={item.end}
                key={item.to}
                to={item.to}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        className="nav-active-indicator"
                        layoutId="active-nav-pill"
                        transition={pageTransition}
                      />
                    )}
                    <span className="nav-link-label">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
          <ThemeToggle
            theme={theme}
            onToggle={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          />
        </nav>
      </header>

      <main className="page-main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="page-transition"
            key={location.pathname}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -7 }}
            transition={pageTransition}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="site-footer">
        <SocialLinks onToast={setToast} />
        <p>© {new Date().getFullYear()} {content.name}. {content.copyright}</p>
      </footer>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            role="status"
            aria-live="polite"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
