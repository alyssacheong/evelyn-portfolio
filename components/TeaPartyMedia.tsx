'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Project } from '@/lib/content'
import Lightbox from './Lightbox'

/* Bespoke layout for "Lolita Tea Party Magazine", following the page plan:
   sweets banner → autoplay slideshow reel → title + summary → a decorative
   sweets strip → two magazine spreads side-by-side (click to zoom). */

const spreads = [
  {
    src: '/images/tea-party/cover.jpg',
    w: 4843,
    h: 2906,
    alt: 'Cover and contents spread',
  },
  {
    src: '/images/tea-party/spread.jpg',
    w: 4843,
    h: 2906,
    alt: 'History of Events and Keeping Guests Entertained spread',
  },
]
const sources = spreads.map((s) => s.src)

export default function TeaPartyMedia({ project }: { project: Project }) {
  const [index, setIndex] = useState<number | null>(null)

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

      {project.videoSrc && (
        <div className="project-video is-file">
          <video
            className="project-video-el"
            src={project.videoSrc}
            poster={project.videoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
      )}

      <div className="project-head">
        <div className="project-head-title">
          <h1 className="project-title">{project.title}</h1>
          <p className="project-meta label">
            {project.discipline} · {project.year}
          </p>
        </div>
        <div className="project-head-body">
          <p className="project-summary">{project.summary}</p>
        </div>
      </div>

      {/* decorative sweets strip */}
      <div className="tea-strip">
        <Image
          src="/images/tea-party/sweets-strip.jpg"
          alt=""
          width={1920}
          height={504}
          sizes="100vw"
          className="tea-strip-img"
        />
      </div>

      {/* two magazine spreads, side-by-side */}
      <div className="tea-spreads">
        {spreads.map((s, i) => (
          <button
            type="button"
            key={s.src}
            className="tea-spread media-button"
            onClick={() => setIndex(i)}
            aria-label={`View ${s.alt} full size`}
          >
            <Image
              src={s.src}
              alt={`${project.title} — ${s.alt}`}
              width={s.w}
              height={s.h}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="tea-spread-img"
            />
          </button>
        ))}
      </div>

      <Lightbox images={sources} index={index} setIndex={setIndex} title={project.title} />
    </>
  )
}
