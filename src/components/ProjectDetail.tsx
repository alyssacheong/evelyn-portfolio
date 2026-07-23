import { useState } from 'react'
import { type Project } from '../content'
import Lightbox from './Lightbox'
import UnityEmbed from './UnityEmbed'

type LbState = { images: string[]; index: number; title: string } | null

// hero first, then the gallery — the full set the lightbox cycles through
function projectImages(p: Project): string[] {
  return [p.image, ...(p.gallery ?? [])].filter(Boolean) as string[]
}

/* Lazy YouTube embed. Shows the video's own thumbnail as a poster; only mounts
   the iframe on click, and only while the artboard is active — so the zoomed-out
   canvas never loads a stack of iframes, and leaving a project stops playback. */
function LazyVideo({
  id,
  title,
  active,
}: {
  id: string
  title: string
  active: boolean
}) {
  const [play, setPlay] = useState(false)
  return (
    <div className="unity-embed project-video-embed" style={{ aspectRatio: '16 / 9' }}>
      {play && active ? (
        <iframe
          className="unity-frame"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="unity-poster"
          onClick={() => setPlay(true)}
          aria-label={`Play the ${title} video`}
          style={{
            backgroundImage: `url(https://img.youtube.com/vi/${id}/hqdefault.jpg)`,
          }}
        >
          <span className="unity-play">
            <span className="unity-play-icon" aria-hidden="true">
              ▶
            </span>
            <span className="unity-play-label">Play video</span>
          </span>
        </button>
      )}
    </div>
  )
}

/* One project's full content, laid out as a self-contained artboard. The same
   markup reads as a miniature on the zoomed-out canvas and as the readable page
   once zoomed in — `active` is true only for the focused artboard, gating the
   heavy embeds. */
export default function ProjectDetail({
  project: p,
  index,
  active = true,
}: {
  project: Project
  index: number
  active?: boolean
}) {
  const [lb, setLb] = useState<LbState>(null)

  const open = (i: number) =>
    setLb({ images: projectImages(p), index: i, title: p.title })

  return (
    <article className="project">
      <div className="project-head">
        <figure
          className={'plate project-media' + (p.image ? '' : ' is-empty')}
          data-label={p.title}
          style={{ margin: 0 }}
        >
          {p.image && (
            <button
              type="button"
              className="plate-btn"
              onClick={() => open(0)}
              aria-label={`View images for ${p.title}`}
            >
              <img src={p.image} alt={p.title} loading="lazy" />
            </button>
          )}
        </figure>

        <div className="project-text">
          <span className="project-index">
            {String(index + 1).padStart(2, '0')} / {p.year}
          </span>
          <h2 className="project-title">{p.title}</h2>
          {p.altTitle && <p className="project-alt">{p.altTitle}</p>}
          <p className="project-meta">{p.discipline}</p>
          <p className="project-summary">{p.summary}</p>
          {p.links && p.links.length > 0 && (
            <p className="project-links">
              {p.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {l.label} ↗
                </a>
              ))}
            </p>
          )}
        </div>
      </div>

      {p.webgl && (
        <UnityEmbed
          src={p.webgl}
          poster={p.image}
          title={p.title}
          aspect={p.webglAspect}
        />
      )}

      {p.video && <LazyVideo id={p.video} title={p.title} active={active} />}

      {p.gallery && p.gallery.length > 0 && (
        <div className="project-gallery">
          {p.gallery.map((src, gi) => (
            <figure
              className="plate gallery-item"
              key={src}
              style={{ margin: 0 }}
            >
              <button
                type="button"
                className="plate-btn"
                onClick={() => open(gi + 1)}
                aria-label={`View ${p.title} image ${gi + 1}`}
              >
                <img src={src} alt={`${p.title} — ${gi + 1}`} loading="lazy" />
              </button>
            </figure>
          ))}
        </div>
      )}

      {lb && (
        <Lightbox
          images={lb.images}
          index={lb.index}
          title={lb.title}
          onClose={() => setLb(null)}
          onNavigate={(index) => setLb((s) => (s ? { ...s, index } : s))}
        />
      )}
    </article>
  )
}
