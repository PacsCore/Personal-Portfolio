// Motion tokens for Framer Motion. Mirrors --duration-* / --ease-* in
// src/styles/tokens.css — keep both in sync. Durations are seconds.

export const easeOut = [0.22, 1, 0.36, 1]

export const pageTransition = { duration: 0.32, ease: easeOut }

export const navIndicatorTransition = { type: 'spring', stiffness: 420, damping: 36, mass: 0.9 }
