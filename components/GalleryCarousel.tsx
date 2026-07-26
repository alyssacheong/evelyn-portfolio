'use client'

import { useState } from 'react'
import Image from 'next/image'

/* A single labelled carousel: shows one image at a time with prev/next controls
   and a counter. Clicking the image opens the shared lightbox at its global
   index (baseIndex + local position). */
export default function GalleryCarousel({
  label,
  images,
  title,
  baseIndex,
  onOpen,
}: {
  label: string
  images: string[]
  title: string
  baseIndex: number
  onOpen: (globalIndex: number) => void
}) {
  const [cur, setCur] = useState(0)
  const step = (dir: number) =>
    setCur((c) => (c + dir + images.length) % images.length)

  return (
    <section className="carousel">
      <p className="carousel-label label">{label}</p>

      <div className="carousel-frame">
        <button
          type="button"
          className="carousel-stage media-button"
          onClick={() => onOpen(baseIndex + cur)}
          aria-label={`View ${title} — ${label} image ${cur + 1} full size`}
        >
          <Image
            src={images[cur]}
            alt={`${title} — ${label} ${cur + 1}`}
            fill
            sizes="(max-width: 800px) 100vw, 70vw"
            className="carousel-img"
          />
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="carousel-nav prev"
              onClick={() => step(-1)}
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              className="carousel-nav next"
              onClick={() => step(1)}
              aria-label="Next"
            >
              ›
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="carousel-dots">
          {images.map((src, i) => (
            <button
              type="button"
              key={src}
              className={`carousel-dot${i === cur ? ' is-active' : ''}`}
              onClick={() => setCur(i)}
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === cur ? 'true' : undefined}
            />
          ))}
        </div>
      )}
    </section>
  )
}
