import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import content from '../../data/content.js'
import { pageTransition } from '../../lib/motion.js'
import ThemeToggle from '../ui/ThemeToggle.jsx'

function SiteHeader({ theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <NavLink className="site-brand" to="/" end>
          <span className="site-brand-mark" aria-hidden="true" />
          <span>{content.shortName}</span>
        </NavLink>

        <nav className="site-nav" aria-label={content.ui.navigationLabel}>
          <ul className="site-nav-list">
            {content.navigation.map((item) => (
              <li className="site-nav-item" key={item.to}>
                <NavLink
                  className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
                  end={item.end}
                  to={item.to}
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.span
                          className="nav-active-indicator"
                          layoutId="active-nav-indicator"
                          transition={pageTransition}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}

export default SiteHeader
