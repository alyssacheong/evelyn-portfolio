import { site } from '@/lib/content'
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

      <ProjectGrid />
    </div>
  )
}
