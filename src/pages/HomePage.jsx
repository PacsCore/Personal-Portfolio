import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import AsciiLandscape from '../components/ascii/AsciiLandscape.jsx'
import SocialLinks from '../components/ui/SocialLinks.jsx'
import content from '../data/content.js'

const TYPED_KEY = 'portfolio-greeted'

function hasGreeted() {
  try {
    return window.sessionStorage.getItem(TYPED_KEY) === '1'
  } catch {
    return true
  }
}

// Types the greeting once per session; afterwards it is shown in full.
function useTypedGreeting(text) {
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(() => (reduceMotion || hasGreeted() ? text.length : 0))

  useEffect(() => {
    if (count >= text.length) return undefined
    const timeoutId = window.setTimeout(() => setCount((value) => value + 1), count === 0 ? 260 : 55)
    return () => window.clearTimeout(timeoutId)
  }, [count, text.length])

  useEffect(() => {
    if (count < text.length) return
    try {
      window.sessionStorage.setItem(TYPED_KEY, '1')
    } catch {
      // Session storage unavailable: the greeting simply types again next time.
    }
  }, [count, text.length])

  return { typed: text.slice(0, count), done: count >= text.length }
}

function HomePage() {
  const { home } = content
  const { typed, done } = useTypedGreeting(home.greeting)

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-intro">
          <h1 className="home-title">
            <span className="home-greeting">
              <span className="sr-only">{home.greeting} </span>
              <span aria-hidden="true">
                {typed}
                {!done && <span className="type-caret" />}
              </span>
            </span>
            <span className="home-name enter" style={{ '--i': 1 }}>
              {home.firstName}
              <br />
              {home.lastName}
              <span className="name-caret" aria-hidden="true" />
            </span>
          </h1>
          <p className="home-lede enter" style={{ '--i': 2 }}>
            {home.intro}
          </p>
        </div>

        <AsciiLandscape className="home-art enter" />
      </section>

      <div className="home-footer">
        <SocialLinks className="enter" />
        <p className="currently enter" style={{ '--i': 4 }}>
          <span className="currently-dot" aria-hidden="true" />
          <span>{home.currently}</span>
        </p>
      </div>
    </div>
  )
}

export default HomePage
