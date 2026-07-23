import { useState } from 'react'
import { projects, type Project } from '../content'
import Lightbox from '../components/Lightbox'
import UnityEmbed from '../components/UnityEmbed'

type LbState = { images: string[]; index: number; title: string } | null

// hero first, then the gallery — the full set the lightbox cycles through
function projectImages(p: Project): string[] {
  return [p.image, ...(p.gallery ?? [])].filter(Boolean) as string[]
}

export default function Design() {
  const [lb, setLb] = useState<LbState>(null)

  const open = (p: Project, index: number) =>
    setLb({ images: projectImages(p), index, title: p.title })

  return (
    <>
      <div className="design-head">
        <p className="eyebrow">Design</p>
        <h1 className="page-title">Selected work</h1>
        <p className="lede" style={{ maxWidth: '46ch' }}>
          Three recent projects across interactive, editorial and illustration
          — each with a short note, a few more frames, and where to see the
          whole thing.
        </p>
      </div>

      <div className="projects">
        {projects.map((p, i) => (
          <article className="project" key={p.slug}>
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
                    onClick={() => open(p, 0)}
                    aria-label={`View images for ${p.title}`}
                  >
                    <img src={p.image} alt={p.title} loading="lazy" />
                  </button>
                )}
              </figure>

              <div className="project-text">
                <span className="project-index">
                  {String(i + 1).padStart(2, '0')} / {p.year}
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

            {p.video && (
              <div className="project-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${p.video}`}
                  title={p.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

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
                      onClick={() => open(p, gi + 1)}
                      aria-label={`View ${p.title} image ${gi + 1}`}
                    >
                      <img
                        src={src}
                        alt={`${p.title} — ${gi + 1}`}
                        loading="lazy"
                      />
                    </button>
                  </figure>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      {lb && (
        <Lightbox
          images={lb.images}
          index={lb.index}
          title={lb.title}
          onClose={() => setLb(null)}
          onNavigate={(index) => setLb((s) => (s ? { ...s, index } : s))}
        />
      )}
    </>
  )
}
