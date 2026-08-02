'use client'

import { useCallback, useEffect } from 'react'
import Image from 'next/image'
import type { Dispatch, SetStateAction } from 'react'

/* Click-to-zoom image overlay, shared by the project media layouts.
   `index` points into `images`; set it to null to close. Steps with the
   arrow keys / on-screen chevrons and wraps around. */
export default function Lightbox({
  images,
  index,
  setIndex,
  title,
}: {
  images: string[]
  index: number | null
  setIndex: Dispatch<SetStateAction<number | null>>
  title: string
}) {
  const isOpen = index !== null
  const close = useCallback(() => setIndex(null), [setIndex])
  const step = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length, setIndex],
  )

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, close, step])

  if (index === null) return null

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} images`}
      onClick={close}
    >
      <button type="button" className="lightbox-close" onClick={close} aria-label="Close">
        ×
      </button>
      {images.length > 1 && (
        <button
          type="button"
          className="lightbox-nav prev"
          onClick={(e) => {
            e.stopPropagation()
            step(-1)
          }}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}
      <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <Image
          src={images[index]}
          alt={`${title} — image ${index + 1}`}
          fill
          sizes="100vw"
          className="lightbox-img"
          priority
        />
      </div>
      {images.length > 1 && (
        <button
          type="button"
          className="lightbox-nav next"
          onClick={(e) => {
            e.stopPropagation()
            step(1)
          }}
          aria-label="Next image"
        >
          ›
        </button>
      )}
      <span className="lightbox-count">
        {index + 1} / {images.length}
      </span>
    </div>
  )
}
