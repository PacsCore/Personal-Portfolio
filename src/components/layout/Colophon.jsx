import content from '../../data/content.js'

// Minimal colophon. Everything in it is true by construction: the fonts and
// inks come from the design tokens. Home only for now; site-wide in M7.
function Colophon() {
  const { colophon } = content

  return (
    <footer className="colophon">
      <h3 className="colophon-label">{colophon.label}</h3>
      <p className="colophon-type">{colophon.type}</p>
      <p className="colophon-inks">
        <span>{colophon.inksLabel}</span>
        <span className="ink-swatch">
          <span className="ink-chip ink-chip-text" aria-hidden="true" />
          Ink
        </span>
        <span className="ink-swatch">
          <span className="ink-chip ink-chip-steel" aria-hidden="true" />
          Steel #718FA8
        </span>
      </p>
      <p className="colophon-meta">
        {colophon.built} © {new Date().getFullYear()} {content.name}
      </p>
    </footer>
  )
}

export default Colophon
