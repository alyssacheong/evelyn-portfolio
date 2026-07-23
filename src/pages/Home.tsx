import { site, projects } from '../content'

export default function Home() {
  const featured = projects.slice(0, 2)

  return (
    <>
      <section className="home">
        <div className="home-plates">
          {featured.map((p) => (
            <figure
              key={p.slug}
              className={'plate' + (p.image ? '' : ' is-empty')}
              data-label={p.title}
              style={{ margin: 0 }}
            >
              {p.image && <img src={p.image} alt={p.title} />}
            </figure>
          ))}
        </div>

        <div className="home-intro">
          <div className="home-byline">
            <span className="role">{site.role}</span>
            <span className="name">{site.name}</span>
          </div>
          <p className="caption" style={{ margin: 0 }}>
            Selected work, {featured[0]?.year}–{new Date().getFullYear()}
          </p>
        </div>

        <div className="home-hero">
          <h1>{site.heroTitle}</h1>
          <p className="sub">{site.heroSubtitle}</p>
        </div>
      </section>
    </>
  )
}
