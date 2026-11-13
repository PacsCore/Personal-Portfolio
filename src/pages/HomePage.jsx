import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import AsciiLandscape from '../components/ascii/AsciiLandscape.jsx'
import SocialLinks from '../components/ui/SocialLinks.jsx'
import content from '../data/content.js'

// ~120 WPM (600 chars/min ≈ 100ms per char), jittered so it reads as hand-typed.
const CHAR_MIN = 85
const CHAR_MAX = 114
const GREETING_PAUSE = 253
const between = (min, max) => min + Math.random() * (max - min)

// Intro plays once per page load; later visits to Home render the final state.
let introPlayed = false

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Types greeting → pause → first name → last name. `count` is the number of
// characters typed across all three parts.
function useTypedHeading(greeting, firstName, lastName, skip) {
  const total = greeting.length + firstName.length + lastName.length
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(() => (skip ? total : 0))
  const shown = reduceMotion ? total : count

  useEffect(() => {
    if (shown >= total) return undefined
    const delay = shown === greeting.length && shown > 0 ? GREETING_PAUSE : between(CHAR_MIN, CHAR_MAX)
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
  const [playsIntro] = useState(() => !introPlayed && !prefersReducedMotion())
  const typed = useTypedHeading(home.greeting, home.firstName, home.lastName, !playsIntro)
  const typingChars = home.greeting.length + home.firstName.length + home.lastName.length
  // ASCII reveal is stretched to the expected typing time so both land together.
  const revealSeconds = (typingChars * ((CHAR_MIN + CHAR_MAX) / 2) + GREETING_PAUSE) / 1000
  useEffect(() => {
    introPlayed = true
  }, [])
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
            <span className="home-name" aria-hidden="true">
              <TypedText text={home.firstName} count={typed.first} caret={typed.caret === 'first' && nameCaret} />
              <br />
              <TypedText text={home.lastName} count={typed.last} caret={typed.caret === 'last' && nameCaret} />
            </span>
          </h1>
          <p className="home-lede">{home.intro}</p>
        </div>

        <AsciiLandscape className="home-art" revealSeconds={playsIntro ? revealSeconds : undefined} />
      </section>

      <div className="home-footer">
        <SocialLinks />
        <p className="currently">
          <span className="currently-dot" aria-hidden="true" />
          <span>{home.currently}</span>
        </p>
      </div>
    </div>
  )
}

export default HomePage
