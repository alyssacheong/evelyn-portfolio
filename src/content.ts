/* ============================================================
   Single source of content. Evelyn edits this file to swap in
   real copy, images, and links — the components read from it.

   Images: drop files into /public/images and set `image` to
   e.g. '/images/tea-parties.jpg'. Leave `image` undefined to
   show a painted placeholder tile with the caption.
   ============================================================ */

export type Project = {
  slug: string
  title: string
  altTitle?: string // secondary title, e.g. the original Japanese
  year: string
  discipline: string // short Courier label, e.g. "Editorial · Branding"
  caption: string // one-line caption under the image
  summary: string // ~100 words
  image?: string // hero image
  gallery?: string[] // additional shots shown as a thumbnail grid
  video?: string // YouTube video id (embedded)
  webgl?: string // path under public/ to a Unity WebGL index.html (playable)
  webglAspect?: string // optional canvas ratio, default '16 / 9'
  links?: { label: string; href: string }[] // e.g. PDF, external
}

export const site = {
  name: 'Evelyn Tong',
  role: 'Design Portfolio',
  heroTitle: 'Among the Lotus and the Light',
  heroSubtitle:
    'A quiet collection of editorial, branding and print work — made slowly, on paper.',
}

export const about = {
  photo: undefined as string | undefined, // e.g. '/images/evelyn.jpg'
  photoCaption: 'Evelyn Tong — studio, 2026',
  lead: 'I’m Evelyn, a designer working across print, editorial and identity.',
  body: [
    'I make work that prefers texture over polish — the grain of paper, the bleed of a wash, the weight of a well-set line. My practice sits somewhere between the couture of a display serif and the honesty of a typewriter, and I like keeping both in the room.',
    'Most projects start with material: a swatch, a photograph, a colour mixed one more time with water. From there I build systems that stay calm and legible, letting one deliberate moment of colour carry the personality rather than a dozen competing effects.',
    'When I’m not designing I’m usually reading, brewing tea, or photographing light through leaves.',
  ],
}

export const contact = {
  intro: 'For commissions, collaborations, or a slow cup of tea —',
  email: 'hello@evelyntong.com',
  links: [
    { label: 'Instagram', href: 'https://instagram.com/', handle: '@evelyntong' },
    { label: 'Are.na', href: 'https://are.na/', handle: 'evelyn-tong' },
    { label: 'LinkedIn', href: 'https://linkedin.com/', handle: 'in/evelyntong' },
  ],
}

/* ------------------------------------------------------------
   Canvas layout — the four areas (About + 3 projects) sit as a
   2×2 grid of panels on a single canvas, mounted on a 3D easel.
   Each screen declares only its grid cell (col/row); Canvas.tsx
   measures each panel's content height and computes the world
   pixel positions (so the two rows stack cleanly) plus the zoom. */
export type Screen = {
  slug: string
  kind: 'project' | 'about'
  title: string
  col: 0 | 1
  row: 0 | 1
}

export const screens: Screen[] = [
  {
    slug: 'among-the-lotus',
    kind: 'project',
    title: 'Among the Lotus and the Light',
    col: 0,
    row: 0,
  },
  {
    slug: 'coral-garden',
    kind: 'project',
    title: 'Miniature Coral Garden Music Video',
    col: 1,
    row: 0,
  },
  {
    slug: 'about',
    kind: 'about',
    title: 'About',
    col: 0,
    row: 1,
  },
  {
    slug: 'lolita-tea-party',
    kind: 'project',
    title: 'Lolita Tea Party Magazine',
    col: 1,
    row: 1,
  },
]

export const projects: Project[] = [
  {
    slug: 'among-the-lotus',
    title: 'Among the Lotus and the Light',
    year: '2025',
    discipline: 'Interactive · 3D',
    caption: 'A quiet 3D experience set in a lily pond at dusk.',
    summary:
      'A small interactive world you wander rather than watch — a lotus pond modelled in 3D and lit for the last minutes of dusk. There is no goal beyond being there: pushing through the leaves, following the fireflies, letting the low sun catch the water. I built the pads, blooms and stones loosely and leaned on lighting, fog and grain to pull the render toward painting rather than realism. Released as a downloadable Mac and Windows build, it became the anchor of this portfolio — patient, tactile, and unafraid of stillness. The video below is a walk-through of the space.',
    image: '/images/lotus/hero.jpg',
    gallery: [
      '/images/lotus/01.jpg',
      '/images/lotus/02.jpg',
      '/images/lotus/03.jpg',
      '/images/lotus/04.jpg',
      '/images/lotus/05.jpg',
      '/images/lotus/06.jpg',
      '/images/lotus/07.jpg',
      '/images/lotus/08.jpg',
      '/images/lotus/09.jpg',
    ],
    video: 'OkA0fB94ttY',
    // Playable Unity WebGL build. Replace the contents of
    // public/games/among-the-lotus/ with a WebGL export (see the README there).
    webgl: 'games/among-the-lotus/index.html',
    webglAspect: '16 / 9',
  },
  {
    slug: 'lolita-tea-party',
    title: 'Lolita Tea Party Magazine',
    year: '2025',
    discipline: 'Editorial · Print',
    caption: 'A print zine on hosting Lolita tea parties.',
    summary:
      'A print magazine and identity built around the ritual of the Lolita tea party. Set on a soft gingham system with hand-placed labels and illustrated china, each spread — Contents, choosing a theme, keeping guests entertained, activities to do — reads like a place setting rather than a page. I wrote and art-directed the whole issue, pairing a warm display serif with tidy body copy and photographing friends in coordinate to ground the styling in something real. Printed on uncoated stock that takes ink like a tea stain, it is equal parts guide and keepsake. The full issue is linked below as a PDF.',
    image: '/images/tea-party/hero.jpg',
    gallery: [
      '/images/tea-party/01.jpg',
      '/images/tea-party/02.jpg',
      '/images/tea-party/03.jpg',
      '/images/tea-party/04.jpg',
    ],
    links: [
      {
        label: 'Read the magazine (PDF)',
        href: '/files/lolita-tea-party-magazine.pdf',
      },
    ],
  },
  {
    slug: 'coral-garden',
    title: 'Miniature Coral Garden Music Video',
    altTitle: '箱庭のコーラル',
    year: '2024',
    discipline: 'Music Video · Illustration',
    caption: 'An illustrated music video — Hakoniwa no Coral.',
    summary:
      'An illustrated music video for 箱庭のコーラル (Hakoniwa no Coral) — a summer song about five friends and a shrinking seaside afternoon. I designed the cast and key visuals in a soft anime style, then built the sequence around a bright beach palette and a hand-lettered Japanese title. The work moved between character design, background painting and editing to keep the whole thing light on its feet, matching the buoyancy of the track. It was an exercise in warmth and restraint — letting a few confident colours and a clear line carry the mood rather than busy motion. Watch the full video below.',
    image: '/images/coral/hero.jpg',
    gallery: [
      '/images/coral/01.jpg',
      '/images/coral/02.jpg',
      '/images/coral/03.jpg',
      '/images/coral/04.jpg',
      '/images/coral/05.jpg',
    ],
    video: 'Etf7vLxaUu4',
  },
]
