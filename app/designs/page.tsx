import Link from 'next/link'
import Image from 'next/image'
import { projects } from '@/lib/content'

export const metadata = { title: 'Works — Evelyn Tong' }

/* All the Works — a vertical stack of full-bleed, near-full-viewport images,
   one per project. Hover reveals the title; the slab links to /designs/[slug]. */
export default function DesignsPage() {
  return (
    <div className="designs-stack">
      {projects.map((p) => (
        <Link key={p.slug} href={`/designs/${p.slug}`} className="design-slab">
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="100vw"
            className="slab-img"
          />
          <span className="slab-overlay">
            <span className="slab-title">{p.title}</span>
          </span>
        </Link>
      ))}
    </div>
  )
}
