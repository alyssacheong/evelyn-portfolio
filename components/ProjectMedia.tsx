'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import type { Project } from '@/lib/content'
import GalleryCarousel from '@/components/GalleryCarousel'

/* Renders the project hero + supporting images. Clicking any photo opens a
   lightbox that steps through every image (hero first, then the gallery/groups). */
export default function ProjectMedia({ project }: { project: Project }) {
  const groups = project.galleryGroups
  const groupImages = groups?.flatMap((g) => g.images) ?? []
  const images = [
    project.image,
    ...(groups ? groupImages : project.gallery ?? []),
  ]
  const [index, setIndex] = useState<number | null>(null)
  const isOpen = index !== null

  const close = useCallback(() => setIndex(null), [])
  const step = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  )

  // keyboard controls + scroll lock while the lightbox is open
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

  return (
    <>
      <div className="project-intro">
        <button
          type="button"
          className="project-figure media-button"
          onClick={() => setIndex(0)}
          aria-label={`View ${project.title} full size`}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 800px) 100vw, 45vw"
            className="project-figure-img"
            priority
          />
        </button>

        <div className="project-copy">
          <p className="project-meta label">
            {project.discipline} · {project.year}
          </p>
          <h1 className="project-title">{project.title}</h1>
          {project.altTitle && <p className="project-alt">{project.altTitle}</p>}
          <p className="project-summary">{project.summary}</p>

          {project.links?.length ? (
            <div className="project-links">
              {project.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {groups?.length ? (
        <div className="project-carousels">
          {groups.map((g, gi) => {
            // global lightbox index = 1 (hero) + images in earlier groups
            const baseIndex =
              1 + groups.slice(0, gi).reduce((n, prev) => n + prev.images.length, 0)
            return (
              <GalleryCarousel
                key={g.label}
                label={g.label}
                images={g.images}
                title={project.title}
                baseIndex={baseIndex}
                onOpen={setIndex}
              />
            )
          })}
        </div>
      ) : project.gallery?.length ? (
        <div className="project-support">
          {project.gallery.map((src, i) => (
            <button
              type="button"
              key={src}
              className="support-figure media-button"
              onClick={() => setIndex(i + 1)}
              aria-label={`View ${project.title} image ${i + 1} full size`}
            >
              <Image
                src={src}
                alt={`${project.title} — image ${i + 1}`}
                fill
                sizes="(max-width: 800px) 100vw, 33vw"
                className="support-img"
              />
            </button>
          ))}
        </div>
      ) : null}

      {isOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} images`}
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
              alt={`${project.title} — image ${index + 1}`}
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
      )}
    </>
  )
}
