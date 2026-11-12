// Development-only marker for content that is not confirmed yet.
// Renders nothing in production builds, so placeholder text can never ship.
// Set VITE_SHOW_PENDING=true to preview the markers in a production build.

const showPending =import.meta.env.DEV || import.meta.env.VITE_SHOW_PENDING === 'true'

function Pending({ children, as: Tag = 'span', className = '' }) {
  if (!showPending) return null
  return <Tag className={`pending ${className}`.trim()}>{children}</Tag>
}

export default Pending
