import { useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio-theme'
// Match --color-bg in src/styles/tokens.css and the inline script in index.html.
const THEME_COLORS = { dark: '#121820', light: '#f3f3f0' }
const lightQuery = '(prefers-color-scheme: light)'

function isTheme(value) {
  return value === 'light' || value === 'dark'
}

function readStoredTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return isTheme(stored) ? stored : null
  } catch {
    return null
  }
}

function getSystemTheme() {
  return window.matchMedia(lightQuery).matches ? 'light' : 'dark'
}

function getInitialTheme() {
  const applied = document.documentElement.dataset.theme
  return isTheme(applied) ? applied : readStoredTheme() ?? getSystemTheme()
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [hasExplicitChoice, setHasExplicitChoice] = useState(() => readStoredTheme() !== null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
  }, [theme])

  useEffect(() => {
    if (hasExplicitChoice) return undefined

    const media = window.matchMedia(lightQuery)
    const handleChange = (event) => setTheme(event.matches ? 'light' : 'dark')
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [hasExplicitChoice])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    setHasExplicitChoice(true)

    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch (error) {
      console.error('Unable to save the theme preference.', error)
    }
  }

  return { theme, toggleTheme }
}
