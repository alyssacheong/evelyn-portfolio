'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { Project } from '@/lib/content'

/* Project media + copy.
   - If the project has a `video`, it plays full-width up top and the intro is a
     two-column title / summary block (no hero image).
   - Gallery images render as labelled grids (galleryGroups, `perRow` columns)
     or a single support grid. Clicking any photo opens a lightbox that steps
     through every image. */
export default function ProjectMedia({ project }: { project: Project }) {
  const hasVideo = !!project.video
  const groups = project.galleryGroups
  const groupImages = groups?.flatMap((g) => g.images) ?? []
  const galleryImages = groups ? groupImages : project.gallery ?? []

  // the hero image is only shown (and lightbox-indexed) when there's no top video
  const showHeroFigure = !hasVideo
  const images = showHeroFigure ? [project.image, ...galleryImages] : galleryImages
  const baseOffset = showHeroFigure ? 1 : 0

  const [index, setIndex] = useState<number | null>(null)
  const isOpen = index !== null

  const close = useCallback(() => setIndex(null), [])
  const step = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
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

  const copy = (
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
  )

  return (
    <>
      {hasVideo ? (
        <>
          <div className="project-video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${project.video}`}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="project-head">
            <div className="project-head-title">
              <h1 className="project-title">
                {project.titleLines
                  ? project.titleLines.map((line, i) => (
                      <span key={i} className="title-line">
                        {line}
                      </span>
                    ))
                  : project.title}
              </h1>
              <p className="project-meta label">
                {project.discipline} · {project.year}
              </p>
              {project.altTitle && <p className="project-alt">{project.altTitle}</p>}
            </div>
            <div className="project-head-body">
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
        </>
      ) : (
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
          {copy}
        </div>
      )}

      {groups?.length ? (
        <div className="project-groups">
          {groups.map((g, gi) => {
            const base =
              baseOffset +
              groups.slice(0, gi).reduce((n, prev) => n + prev.images.length, 0)
            return (
              <section className="project-group" key={g.label || gi}>
                {g.label ? <p className="group-label label">{g.label}</p> : null}
                <div
                  className="group-grid"
                  style={{ '--cols': g.perRow ?? 2 } as CSSProperties}
                >
                  {g.images.map((src, i) => (
                    <button
                      type="button"
                      key={src}
                      className="group-cell media-button"
                      onClick={() => setIndex(base + i)}
                      aria-label={`View image ${i + 1} full size`}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} — ${g.label || 'image'} ${i + 1}`}
                        fill
                        sizes={g.perRow === 3 ? '(max-width: 800px) 50vw, 33vw' : '(max-width: 800px) 100vw, 50vw'}
                        className="group-img"
                      />
                    </button>
                  ))}
                </div>
              </section>
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
              onClick={() => setIndex(baseOffset + i)}
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
