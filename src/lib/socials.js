import content from '../data/content.js'

// Social links in display order. Email is included only when an address is set.
export function getSocialLinks() {
  return Object.entries(content.socials).flatMap(([network, details]) => {
    if (network === 'email') {
      return details.address
        ? [{ network, label: details.label, value: details.address, href: `mailto:${details.address}` }]
        : []
    }
    return [{ network, label: details.label, value: details.handle, href: details.href, external: true }]
  })
}
