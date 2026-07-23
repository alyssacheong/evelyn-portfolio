import { about } from '../content'

export default function About() {
  return (
    <>
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
    </>
  )
}
