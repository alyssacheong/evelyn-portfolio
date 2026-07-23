import { useEffect, useState } from 'react'
import { site } from '../content'

/* The one big moment. A magenta watercolour bloom opens outward on a
   paper ground behind a Courier counter (00 → 100). At full bloom the
   loader dissolves and hands control back to App. CSS carries the
   animation; this component only drives the counter + timings. */

const DURATION = 1700 // ms of counting/bloom
const DISSOLVE = 700 // ms fade-out

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduce) {
      onDone()
      return
    }

    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1)
      // ease-out so the numbers slow as the bloom fills
      const eased = 1 - Math.pow(1 - t, 2)
      setCount(Math.round(eased * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setLeaving(true)
        setTimeout(onDone, DISSOLVE)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <div className={'loader' + (leaving ? ' is-leaving' : '')} role="status">
      <div className="loader-bloom" aria-hidden="true" />

      <div className="loader-content">
        <span className="label loader-name">{site.name}</span>
        <span className="mono loader-count">
          {String(count).padStart(3, '0')}
        </span>
        <span className="label loader-word">Loading</span>
      </div>
    </div>
  )
}
