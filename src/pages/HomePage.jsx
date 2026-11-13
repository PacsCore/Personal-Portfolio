import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import AsciiLandscape from '../components/ascii/AsciiLandscape.jsx'
import SocialLinks from '../components/ui/SocialLinks.jsx'
import content from '../data/content.js'

const START_DELAY = 200
const GREETING_PAUSE = 320
const between = (min, max) => min + Math.random() * (max - min)

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Types greeting → pause → first name → last name on every mount. `count` is the
// number of characters typed across all three parts.
function useTypedHeading(greeting, firstName, lastName) {
  const total = greeting.length + firstName.length + lastName.length
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(() => (prefersReducedMotion() ? total : 0))
  const shown = reduceMotion ? total : count

  useEffect(() => {
    if (shown >= total) return undefined
    let delay
    if (shown === 0) delay = START_DELAY
    else if (shown < greeting.length) delay = between(56, 67)
    else if (shown === greeting.length) delay = GREETING_PAUSE
    else delay = between(76, 88)

    const timeoutId = window.setTimeout(() => setCount((value) => value + 1), delay)
    return () => window.clearTimeout(timeoutId)
  }, [shown, total, greeting.length])

  const afterGreeting = shown - greeting.length
  return {
    greeting: shown,
    first: Math.max(0, Math.min(firstName.length, afterGreeting)),
    last: Math.max(0, afterGreeting - firstName.length),
    caret: shown <= greeting.length ? 'greeting' : afterGreeting <= firstName.length ? 'first' : 'last',
    done: shown >= total,
  }
}

// Typed characters plus the untyped remainder kept invisible, so the line keeps
// its final size while typing.
function TypedText({ text, count, caret = null }) {
  return (
    <>
      {text.slice(0, count)}
      {caret}
      <span className="type-ghost">{text.slice(count)}</span>
    </>
  )
}

function HomePage() {
  const { home } = content
  const typed = useTypedHeading(home.greeting, home.firstName, home.lastName)
  const nameCaret = <span className={`name-caret${typed.done ? '' : ' is-typing'}`} />

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-intro">
          <h1 className="home-title">
            <span className="sr-only">
              {home.greeting} {home.firstName} {home.lastName}
            </span>
            <span className="home-greeting" aria-hidden="true">
              <TypedText
                text={home.greeting}
                count={typed.greeting}
                caret={typed.caret === 'greeting' && <span className="type-caret" />}
              />
            </span>
            <span className="home-name enter" style={{ '--i': 1 }} aria-hidden="true">
              <TypedText text={home.firstName} count={typed.first} caret={typed.caret === 'first' && nameCaret} />
              <br />
              <TypedText text={home.lastName} count={typed.last} caret={typed.caret === 'last' && nameCaret} />
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
