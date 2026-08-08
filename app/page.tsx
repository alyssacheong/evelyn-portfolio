import Link from 'next/link'
import { site, home } from '@/lib/content'
import ProjectGrid from '@/components/ProjectGrid'

export default function HomePage() {
  return (
    <div className="content home">
      {/* Hero video — full width of the padded column, ~66vh. Uses a project
          still as the poster so it looks intentional until /hero.mp4 exists. */}
      <section className="home-hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/lotus/heroc.jpg"
        >
          <source src={site.heroVideo} type="video/mp4" />
        </video>
      </section>

      {/* Pull-quote beneath the hero */}
      <figure className="home-quote">
        <blockquote>&ldquo;{home.quote.text}&rdquo;</blockquote>
        <figcaption>&ndash; {home.quote.attribution}</figcaption>
      </figure>

      {/* Introduction — title/subtitle on the left, blurb on the right */}
      <section className="home-intro">
        <div className="home-intro-head">
          <h2 className="home-intro-title">{home.intro.title}</h2>
          <p className="home-intro-sub">{home.intro.subtitle}</p>
        </div>
        <p className="home-intro-body">{home.intro.body}</p>
      </section>

      <ProjectGrid />

      <div className="home-more">
        <Link href="/designs" className="home-more-link">
          See more works
        </Link>
      </div>
    </div>
  )
}
