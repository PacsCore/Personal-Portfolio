import useLocalTime from '../../hooks/useLocalTime.js'

// Small IDE-style window. Decorative: it restates the hero copy, so it is hidden
// from assistive technology. Lines are generated from a plain object in content.js,
// plus a live `localTime` entry for the given time zone.

function formatValue(value) {
  if (Array.isArray(value)) {
    return [
      <span className="tok-punc" key="open">[</span>,
      ...value.flatMap((item, index) => [
        index > 0 && <span className="tok-punc" key={`sep-${item}`}>, </span>,
        <span className="tok-str" key={item}>&quot;{item}&quot;</span>,
      ]),
      <span className="tok-punc" key="close">]</span>,
    ]
  }
  return <span className="tok-str">&quot;{value}&quot;</span>
}

function HeroCodeWindow({ fileName, exportName, value, timeZone }) {
  const localTime = useLocalTime(timeZone)
  const entries = { ...value, localTime }

  const lines = [
    <>
      <span className="tok-kw">export const</span> {exportName} <span className="tok-punc">= {'{'}</span>
    </>,
    ...Object.entries(entries).map(([key, entry]) => (
      <>
        {'  '}
        <span className="tok-key">{key}</span>
        <span className="tok-punc">: </span>
        {formatValue(entry)}
        <span className="tok-punc">,</span>
      </>
    )),
    <span className="tok-punc">{'};'}</span>,
  ]

  return (
    <figure className="hero-code" aria-hidden="true">
      <div className="hero-code-bar">
        <span className="hero-code-dots">
          <span />
          <span />
          <span />
        </span>
        <span className="hero-code-tab">{fileName}</span>
      </div>
      <pre className="hero-code-body">
        {lines.map((line, index) => (
          <span className="hero-code-line" key={index}>
            <span className="hero-code-number">{index + 1}</span>
            <code>{line}</code>
          </span>
        ))}
      </pre>
    </figure>
  )
}

export default HeroCodeWindow
