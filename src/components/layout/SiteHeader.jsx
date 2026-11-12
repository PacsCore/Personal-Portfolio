import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import content from '../../data/content.js'
import { navIndicatorTransition } from '../../lib/motion.js'
import ThemeToggle from '../ui/ThemeToggle.jsx'

function SiteHeader({ theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <NavLink className="site-brand" to="/" end aria-label={`${content.name} — home`}>
          <img
            className="site-avatar"
            src={content.avatar.src}
            alt=""
            width="36"
            height="36"
            decoding="async"
          />
          <span className="site-brand-name">{content.shortName}</span>
        </NavLink>

        <nav className="site-nav" aria-label={content.ui.navigationLabel}>
          <ul className="site-nav-list">
            {content.navigation.map((item) => (
              <li key={item.to}>
                <NavLink className="nav-link" end={item.end} to={item.to}>
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          className="nav-indicator"
                          layoutId="nav-indicator"
                          transition={navIndicatorTransition}
                          aria-hidden="true"
                        />
                      )}
                      <span className="nav-label">{item.label}</span>
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
