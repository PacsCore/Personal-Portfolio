import { AnimatePresence, motion } from 'framer-motion'
import { FiMoon, FiSun } from 'react-icons/fi'
import content from '../../data/content.js'

function ThemeToggle({ theme, onToggle }) {
  const Icon = theme === 'dark' ? FiMoon : FiSun
  const label = theme === 'dark' ? content.ui.themeToLight : content.ui.themeToDark

  return (
    <button className="theme-toggle" type="button" aria-label={label} title={label} onClick={onToggle}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={theme}
          className="theme-toggle-icon"
          initial={{ opacity: 0, rotate: -60, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.7 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <Icon aria-hidden="true" />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default ThemeToggle
