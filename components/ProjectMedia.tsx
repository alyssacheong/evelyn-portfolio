'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { Project } from '@/lib/content'
import Lightbox from './Lightbox'

/* Project media + copy.
   - An optional `headerImage` banner runs full-width at the very top.
   - Top media is a self-hosted video (`videoSrc`, with native controls or
     autoplay+loop) or an embedded YouTube player (`youtube`). When a project
     has both, the file plays up top and the YouTube embed sits below the copy.
   - Projects with no top media show a two-column hero image + intro instead.
   - Gallery images render as labelled grids (galleryGroups) or a single grid,
     then any full-width `trailing` images. Clicking any photo opens a lightbox
     that steps through every gallery/trailing/hero image. */
export default function ProjectMedia({ project }: { project: Project }) {
  const groups = project.galleryGroups
  const groupImages = groups?.flatMap((g) => g.images) ?? []
  const galleryImages = groups ? groupImages : project.gallery ?? []
  const trailing = project.trailing ?? []

  const hasVideoFile = !!project.videoSrc
  const hasYoutube = !!project.youtube
  const hasTopMedia = hasVideoFile || hasYoutube || !!project.headerImage
  // primary top media is the video file if present, otherwise a YouTube embed
  const primaryYoutube = hasYoutube && !hasVideoFile
  // a YouTube embed shown *after* the copy (when a file plays up top)
  const secondaryYoutube = hasYoutube && hasVideoFile

  // the hero figure is only shown when there's no top media at all
  const showHeroFigure = !hasTopMedia
  const heroImgs = showHeroFigure ? [project.image] : []
  const images = [...heroImgs, ...galleryImages, ...trailing]
  const galleryBase = heroImgs.length
  const trailingBase = heroImgs.length + galleryImages.length

  const [index, setIndex] = useState<number | null>(null)

  const youtubeEmbed = (id: string) => (
    <div className="project-video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={project.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )

  const head = (
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
  )

  return (
    <>
      {project.headerImage && (
        <div className="project-banner">
          <Image
            src={project.headerImage}
            alt={project.title}
            fill
            sizes="100vw"
            className="project-banner-img"
            priority
          />
        </div>
      )}

      {hasTopMedia ? (
        <>
          {hasVideoFile ? (
            <div className="project-video is-file">
              <video
                className="project-video-el"
                src={project.videoSrc}
                poster={project.videoPoster}
                controls={project.videoControls}
                autoPlay={!project.videoControls}
                muted={!project.videoControls}
                loop={!project.videoControls}
                playsInline
                preload="metadata"
              />
            </div>
          ) : primaryYoutube ? (
            youtubeEmbed(project.youtube!)
          ) : null}

          {head}

          {secondaryYoutube ? youtubeEmbed(project.youtube!) : null}
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
      )}

      {groups?.length ? (
        <div className="project-groups">
          {groups.map((g, gi) => {
            const base =
              galleryBase +
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
              onClick={() => setIndex(galleryBase + i)}
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

      {trailing.length ? (
        <div className="project-trailing">
          {trailing.map((src, i) => (
            <button
              type="button"
              key={src}
              className="trailing-figure media-button"
              onClick={() => setIndex(trailingBase + i)}
              aria-label={`View ${project.title} image full size`}
            >
              <Image
                src={src}
                alt={`${project.title} — image`}
                width={project.width}
                height={project.height}
                sizes="100vw"
                className="trailing-img"
              />
            </button>
          ))}
        </div>
      ) : null}

      <Lightbox images={images} index={index} setIndex={setIndex} title={project.title} />
    </>
  )
}
