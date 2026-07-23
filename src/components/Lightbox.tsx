import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

/* Fullscreen image viewer. Translucent-black ground, on-screen prev/next
   arrows and an ✕ (top-left) to exit. Also supports ← → arrow keys and Esc,
   click-background-to-close, and locks body scroll while open. Cycles through
   one project's images. */

type Props = {
  images: string[]
  index: number
  title?: string
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({
  images,
  index,
  title,
  onClose,
  onNavigate,
}: Props) {
  const count = images.length
  const prev = useCallback(
    () => onNavigate((index - 1 + count) % count),
    [index, count, onNavigate],
  )
  const next = useCallback(
    () => onNavigate((index + 1) % count),
    [index, count, onNavigate],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    // lock page scroll behind the overlay
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose, prev, next])

  const stop = (e: React.MouseEvent) => e.stopPropagation()

  // Portal to <body> so the fixed overlay is relative to the viewport and
  // never trapped by an ancestor's transform/filter (e.g. the page-in anim).
  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} — image viewer` : 'Image viewer'}
      onClick={onClose}
    >
      <button
        className="lb-close"
        onClick={onClose}
        aria-label="Close viewer (Esc)"
        autoFocus
      >
        ✕
      </button>

      {count > 1 && (
        <button
          className="lb-arrow lb-prev"
          onClick={(e) => {
            stop(e)
            prev()
          }}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      <figure className="lb-stage" onClick={stop}>
        <img
          className="lb-image"
          src={images[index]}
          alt={title ? `${title} — ${index + 1}` : `Image ${index + 1}`}
        />
      </figure>

      {count > 1 && (
        <button
          className="lb-arrow lb-next"
          onClick={(e) => {
            stop(e)
            next()
          }}
          aria-label="Next image"
        >
          ›
        </button>
      )}

      <div className="lb-meta" onClick={stop}>
        {title && <span className="lb-title">{title}</span>}
        <span className="lb-count">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>
      </div>
    </div>,
    document.body,
  )
}
