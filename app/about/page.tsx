import Image from 'next/image'
import { about } from '@/lib/content'

export default function AboutPage() {
  return (
    <div className="content about">
      <p className="label">About</p>
      <div className="about-grid">
        <div className="about-copy">
          <p className="about-lead">{about.lead}</p>
          <div className="about-body">
            {about.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {about.photo ? (
          <figure className="about-figure">
            <Image
              src={about.photo}
              alt={about.photoCaption}
              fill
              sizes="(max-width: 800px) 100vw, 33vw"
              className="about-photo"
            />
            <figcaption className="caption">{about.photoCaption}</figcaption>
          </figure>
        ) : (
          <div className="about-figure is-empty" aria-hidden="true">
            <span className="label">Portrait</span>
          </div>
        )}
      </div>
    </div>
  )
}
