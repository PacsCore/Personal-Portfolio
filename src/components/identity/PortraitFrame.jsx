import Pending from '../ui/Pending.jsx'

// Portrait with a caption. Layers are kept separate so M3 can add the
// ASCII rendering in `.portrait-ascii` without changing this component's API.
function PortraitFrame({ src, alt, caption, className = '' }) {
  return (
    <figure className={`portrait ${className}`.trim()}>
      <div className="portrait-frame">
        {src ? (
          <img className="portrait-photo" src={src} alt={alt} loading="lazy" decoding="async" />
        ) : (
          <div className="portrait-standin">
            <Pending>Portrait pending</Pending>
          </div>
        )}
      </div>
      {caption && <figcaption className="portrait-caption">{caption}</figcaption>}
    </figure>
  )
}

export default PortraitFrame
