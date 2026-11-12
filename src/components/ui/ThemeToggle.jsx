import { FiMoon, FiSun } from 'react-icons/fi'
import content from '../../data/content.js'

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

export default ThemeToggle
