import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { getProject, projects, site } from '@/lib/content'
import ProjectMedia from '@/components/ProjectMedia'
import FairyPicnicMedia from '@/components/FairyPicnicMedia'
import TeaPartyMedia from '@/components/TeaPartyMedia'

type Params = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ from?: string }>
}

// where the back arrow returns to, based on where the visitor clicked in
const ORIGINS: Record<string, { href: string; label: string }> = {
  home: { href: '/', label: 'Home' },
  designs: { href: '/designs', label: 'Works' },
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params
  const p = getProject(slug)
  return { title: p ? `${p.title} — ${site.name}` : 'Project' }
}

export default async function ProjectPage({ params, searchParams }: Params) {
  const { slug } = await params
  const { from } = await searchParams
  const project = getProject(slug)
  if (!project) notFound()

  const back = ORIGINS[from ?? ''] ?? ORIGINS.designs

  return (
    <article className="content project">
      <Link href={back.href} className="back-link">
        <ArrowLeft size={15} strokeWidth={1.8} aria-hidden="true" />
        <span>{back.label}</span>
      </Link>

      {/* two-column intro + supporting images, with click-to-zoom lightbox.
          Fairy Picnic and Tea Party use bespoke layouts per their page plans. */}
      {project.slug === 'fairy-picnic' ? (
        <FairyPicnicMedia project={project} />
      ) : project.slug === 'lolita-tea-party' ? (
        <TeaPartyMedia project={project} />
      ) : (
        <ProjectMedia project={project} />
      )}
    </article>
  )
}
