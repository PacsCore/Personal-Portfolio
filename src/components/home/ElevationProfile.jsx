// Static elevation profile for the process steps.
// The steps are a real ordered list; the line, area and nodes are decorative.
// Coordinates are shared percentages, so nodes stay on the line at any width.
// The path uses pathLength="1" so a later milestone can draw it on scroll.

const VIEW_W = 1000
const VIEW_H = 240

// Each station starts a column (20% wide); elevation rises toward the summit.
function stationPoints(count) {
  return Array.from({ length: count }, (_, i) => ({
    x: 2 + i * (100 / count),
    y: 86 - i * (72 / (count - 1)),
  }))
}

function toView({ x, y }) {
  return [(x / 100) * VIEW_W, (y / 100) * VIEW_H]
}

function buildPath(points) {
  const coords = [[0, (90 / 100) * VIEW_H], ...points.map(toView), [VIEW_W, (points.at(-1).y / 100) * VIEW_H]]
  let d = `M${coords[0][0]} ${coords[0][1]}`
  for (let i = 1; i < coords.length; i++) {
    const [x0, y0] = coords[i - 1]
    const [x1, y1] = coords[i]
    const dx = (x1 - x0) * 0.5
    d += ` C${x0 + dx} ${y0} ${x1 - dx} ${y1} ${x1} ${y1}`
  }
  return d
}

function ElevationProfile({ steps }) {
  const points = stationPoints(steps.length)
  const line = buildPath(points)
  const area = `${line} L${VIEW_W} ${VIEW_H} L0 ${VIEW_H} Z`

  return (
    <div className="profile" style={{ '--steps': steps.length }}>
      <div className="profile-chart" aria-hidden="true">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="none" focusable="false">
          <path className="profile-area" d={area} />
          <path className="profile-line" d={line} pathLength="1" />
        </svg>
        {points.map((point, index) => (
          <span
            className={`profile-node${index === points.length - 1 ? ' is-summit' : ''}`}
            key={steps[index].name}
            style={{ '--x': `${point.x}%`, '--y': `${point.y}%` }}
          />
        ))}
      </div>

      <ol className="profile-steps">
        {steps.map((step, index) => (
          <li className="profile-step" key={step.name}>
            <span className="profile-step-number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="profile-step-name">{step.name}</h3>
            <p className="profile-step-text">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default ElevationProfile
