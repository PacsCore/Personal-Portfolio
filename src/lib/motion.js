// Motion tokens for Framer Motion. Mirrors the --duration-* / --ease-* custom
// properties in src/styles/tokens.css — keep both in sync. Durations are seconds.

export const durations = {
  instant: 0.1,
  fast: 0.18,
  base: 0.24,
  moderate: 0.32,
  slow: 0.48,
  page: 0.6,
  slower: 0.8,
}

export const eases = {
  out: [0.22, 1, 0.36, 1],
  outExpo: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  in: [0.5, 0, 0.75, 0],
}

export const stagger = 0.06
export const revealDistance = 24
export const parallaxDepth = [0.04, 0.08, 0.14]

// Existing exports — unchanged values.
export const easeOut = eases.out

export const pageTransition = { duration: durations.moderate, ease: easeOut }
