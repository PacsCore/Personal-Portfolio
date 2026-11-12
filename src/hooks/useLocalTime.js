import { useEffect, useState } from 'react'

// Current "HH:MM" in a given IANA time zone. Ticks on each minute boundary,
// so only the component that calls it re-renders, once a minute.
export default function useLocalTime(timeZone) {
  const [time, setTime] = useState(() => formatTime(timeZone))

  useEffect(() => {
    let intervalId
    const tick = () => setTime(formatTime(timeZone))
    const timeoutId = window.setTimeout(() => {
      tick()
      intervalId = window.setInterval(tick, 60_000)
    }, 60_000 - (Date.now() % 60_000))

    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [timeZone])

  return time
}

function formatTime(timeZone) {
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(new Date())
}
