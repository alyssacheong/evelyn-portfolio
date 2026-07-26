import Link from 'next/link'
import Image from 'next/image'
import { getProject } from '@/lib/content'

/* Home project grid — three featured projects shown in a single row as
   equal-size tiles (images cropped to a shared ratio), each with a small
   title + description underneath. `image` overrides the project's own hero for
   the home tile, leaving the project detail page untouched. */
const featured = [
  { slug: 'among-the-lotus', title: 'Among the Lotus and the Light', desc: '3D Visualisation · Unity game', image: '/images/lotus/home.png' },
  { slug: 'fairy-picnic', title: 'Whimsical Fairy Picnic', desc: 'Illustration · Mural', image: '/images/mural/home.png' },
  { slug: 'lolita-tea-party', title: 'Lolita Tea Party Magazine', desc: 'Graphic Design · Publication' },
]

export default function ProjectGrid() {
  return (
    <ul className="project-grid">
      {featured.map((f) => {
        const project = getProject(f.slug)
        if (!project) return null
        return (
          <li key={f.slug} className="grid-item">
            <Link href={`/designs/${f.slug}?from=home`} className="grid-link">
              <Image
                src={f.image ?? project.image}
                alt={f.title}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="grid-img"
              />
              <span className="grid-hover">
                <span className="grid-hover-text">see more</span>
              </span>
            </Link>
            <div className="grid-caption">
              <p className="grid-cap-title">{f.title}</p>
              <p className="grid-cap-desc label">{f.desc}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
