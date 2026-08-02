'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Project } from '@/lib/content'
import Lightbox from './Lightbox'

/* Bespoke layout for "Whimsical Fairy Picnic", following the page plan:
   mural-room banner → a second room photo → title + summary → the original
   watercolour, full-width → two room photos side-by-side → a closing
   full-width room photo. Every photo opens the shared lightbox. */

type Photo = { src: string; w: number; h: number; alt: string }

const banner: Photo = { src: '/images/fairy-picnic/02.jpg', w: 2000, h: 739, alt: 'The mural in the meeting room' }
const lead: Photo = { src: '/images/fairy-picnic/05.jpg', w: 2000, h: 1333, alt: 'The mural room, seen past the timber screen' }
const art: Photo = { src: '/images/fairy-picnic/hero.jpg', w: 2400, h: 1124, alt: 'The original watercolour artwork' }
const roomA: Photo = { src: '/images/fairy-picnic/03.jpg', w: 2000, h: 1113, alt: 'The mural room from the doorway' }
const roomB: Photo = { src: '/images/fairy-picnic/04.jpg', w: 2000, h: 1333, alt: 'The mural along the curved wall' }
const bottom: Photo = { src: '/images/fairy-picnic/01.jpg', w: 2000, h: 2000, alt: 'The finished mural above the table' }

// visual order, which is also the order the lightbox steps through
const order = [banner, lead, art, roomA, roomB, bottom]
const sources = order.map((p) => p.src)

export default function FairyPicnicMedia({ project }: { project: Project }) {
  const [index, setIndex] = useState<number | null>(null)
  const open = (p: Photo) => setIndex(sources.indexOf(p.src))

  // full-width, uncropped photo that opens the lightbox
  const Wide = ({ p, priority = false }: { p: Photo; priority?: boolean }) => (
    <button
      type="button"
      className="trailing-figure media-button"
      onClick={() => open(p)}
      aria-label={`View ${p.alt} full size`}
    >
      <Image
        src={p.src}
        alt={p.alt}
        width={p.w}
        height={p.h}
        sizes="100vw"
        className="trailing-img"
        priority={priority}
      />
    </button>
  )

  return (
    <>
      <div className="plan-media">
        <Wide p={banner} priority />
        <Wide p={lead} />
      </div>

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

      <div className="plan-media">
        <Wide p={art} />
        <div className="fp-2up">
          {[roomA, roomB].map((p) => (
            <button
              type="button"
              key={p.src}
              className="group-cell media-button"
              onClick={() => open(p)}
              aria-label={`View ${p.alt} full size`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
                className="group-img"
              />
            </button>
          ))}
        </div>
        <Wide p={bottom} />
      </div>

      <Lightbox images={sources} index={index} setIndex={setIndex} title={project.title} />
    </>
  )
}
