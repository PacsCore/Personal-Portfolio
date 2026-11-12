import { useEffect, useState } from 'react'
import { FiCheck, FiCopy } from 'react-icons/fi'
import content from '../../data/content.js'

function CopyButton({ value }) {
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (!status) return undefined
    const timeoutId = window.setTimeout(() => setStatus(''), 1800)
    return () => window.clearTimeout(timeoutId)
  }, [status])

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setStatus(content.ui.copied)
    } catch {
      setStatus(content.ui.copyUnavailable)
    }
  }

  const copied = status === content.ui.copied

  return (
    <>
      <button type="button" className={`copy-button${copied ? ' is-copied' : ''}`} onClick={copy}>
        {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
        <span>{copied ? 'Copied' : content.ui.copyEmail}</span>
      </button>
      <span className="sr-only" role="status">
        {status}
      </span>
    </>
  )
}

export default CopyButton
