// One homepage "plate": a labelled section on the shared 12-column grid.
// It is also the boundary future scroll reveals will attach to.
function PlateSection({ id, number, label, aside, className = '', children }) {
  const headingId = `${id}-title`

  return (
    <section id={id} className={`plate ${className}`.trim()} aria-labelledby={headingId}>
      <div className="plate-inner">
        <header className="plate-header">
          <span className="plate-number" aria-hidden="true">
            {number}
          </span>
          <h2 className="plate-label" id={headingId}>
            {label}
          </h2>
          {aside && <div className="plate-aside">{aside}</div>}
        </header>
        {children}
      </div>
    </section>
  )
}

export default PlateSection
