import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProject, projects, site } from '@/lib/content'
import ProjectMedia from '@/components/ProjectMedia'
import FairyPicnicMedia from '@/components/FairyPicnicMedia'
import TeaPartyMedia from '@/components/TeaPartyMedia'

type Params = {
  params: Promise<{ slug: string }>
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

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <article className="content project">
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
