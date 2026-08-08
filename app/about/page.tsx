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
          <a
            className="about-resume"
            href={about.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>

        {about.photo ? (
          <figure className="about-figure">
            <Image
              src={about.photo}
              alt={about.photoCaption}
              width={2730}
              height={4095}
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

      <hr className="about-rule" />

      <div className="about-info">
        {about.sections.map((section) => (
          <section key={section.title} className="about-info-row">
            <h2 className="about-info-title">{section.title}</h2>
            <div className="about-info-entries">
              {section.entries.map((entry) => (
                <div key={entry.place} className="about-info-entry">
                  <p className="about-info-place">{entry.place}</p>
                  <p className="about-info-detail">{entry.detail}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
