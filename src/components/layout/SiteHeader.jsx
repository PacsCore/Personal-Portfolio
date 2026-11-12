import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import content from '../../data/content.js'
import { pageTransition } from '../../lib/motion.js'
import ThemeToggle from '../ui/ThemeToggle.jsx'

function SiteHeader({ theme, onToggleTheme }) {
  return (
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
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </nav>
    </header>
  )
}

export default SiteHeader
