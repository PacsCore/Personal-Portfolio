// Visible marker for content that has not been supplied yet (fields set to
// `null` in src/data/content.js). Intentionally obvious so it is never mistaken
// for real copy.
function Placeholder({ children, as: Tag = 'span', className = '' }) {
  return <Tag className={`placeholder ${className}`.trim()}>[ {children} ]</Tag>
}

export default Placeholder
