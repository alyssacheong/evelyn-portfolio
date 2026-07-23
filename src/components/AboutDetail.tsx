import { about } from '../content'

/* Full About content — the readable panel shown once the About screen has
   been zoomed into. */
export default function AboutDetail() {
  return (
    <section className="about">
      <figure
        className={'plate about-photo' + (about.photo ? '' : ' is-empty')}
        data-label="Portrait"
        style={{ margin: 0 }}
      >
        {about.photo && <img src={about.photo} alt={about.photoCaption} />}
      </figure>

      <div className="about-body">
        <p className="eyebrow">About</p>
        <p className="about-lead">{about.lead}</p>
        {about.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        <p className="caption">{about.photoCaption}</p>
      </div>
    </section>
  )
}
