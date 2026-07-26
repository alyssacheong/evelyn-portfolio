/* ============================================================
   Single source of content, ported from the old Vite app.
   Evelyn edits this to swap in real copy, images, and links.
   Images live in /public/images.
   ============================================================ */

export type Project = {
  slug: string
  title: string
  altTitle?: string // secondary title, e.g. the original Japanese
  year: string
  discipline: string // short label, e.g. "Editorial · Print"
  caption: string // one-line caption (used in hover overlays)
  summary: string // body copy on the project page
  image: string // hero / thumbnail image
  width: number // hero pixel width  — drives the home grid proportions
  height: number // hero pixel height
  gridRatio?: number // optional home-grid display ratio (w/h) if it should differ
                     // from the true image proportions (e.g. to match a neighbour)
  gallery?: string[] // additional supporting images (single grid)
  galleryGroups?: { label: string; images: string[]; perRow?: number }[] // labelled image grids (perRow columns)
  video?: string // YouTube video id (optional)
  links?: { label: string; href: string }[]
}

export const site = {
  name: 'Evelyn Tong',
  role: 'Design Portfolio',
  heroTitle: 'Among the Lotus and the Light',
  heroSubtitle:
    'A quiet collection of editorial, branding and print work — made slowly, on paper.',
  // hero video: drop a file into /public and point here (see Home page)
  heroVideo: '/portfolio-video-2.mp4',
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
  intro: 'For commissions or collaborations',
  email: 'evelyntong.designs@gmail.com',
  links: [
    { label: 'Instagram', href: 'https://instagram.com/evelyntong.design', handle: '@evelyntong.design' },
    { label: 'LinkedIn', href: 'https://linkedin.com/evelyn-tong-535a24354', handle: 'evelyn-tong-535a24354' },
  ],
}

export const projects: Project[] = [
  {
    slug: 'among-the-lotus',
    title: 'Among the Lotus and the Light',
    year: '2025',
    discipline: 'Unity game',
    caption: 'A quiet 3D experience set in a lily pond at dusk.',
    summary:
      'Communication — communicated ideas based on trends and further developed them. Collaboration — worked together to meet deadlines and with other parts to produce satisfactory results. Organisational — shifted around schedules to fit others and made sure to confirm deadlines to produce them at a reasonable degree.',
    image: '/images/lotus/heroc.jpg',
    width: 1800,
    height: 1125,
    galleryGroups: [
      {
        // the render pictures — larger, two per row
        label: '',
        perRow: 2,
        images: [
          '/images/lotus/04c.jpg',
          '/images/lotus/05c.jpg',
          '/images/lotus/06c.jpg',
          '/images/lotus/07c.jpg',
          '/images/lotus/08c.jpg',
          '/images/lotus/09c.jpg',
        ],
      },
      {
        // Unity editor screenshots — smaller, three per row
        label: 'Work in progress',
        perRow: 3,
        images: [
          '/images/lotus/01.jpg',
          '/images/lotus/02.jpg',
          '/images/lotus/03.jpg',
          '/images/lotus/10.png',
        ],
      },
    ],
    video: 'OkA0fB94ttY',
  },
  {
    slug: 'coral-garden',
    title: 'Miniature Coral Garden Music Video',
    altTitle: '箱庭のコーラル',
    year: '2024',
    discipline: 'Music Video · Illustration',
    caption: 'An illustrated music video — Hakoniwa no Coral.',
    summary:
      'An illustrated music video for 箱庭のコーラル (Hakoniwa no Coral) — a summer song about five friends and a shrinking seaside afternoon. I designed the cast and key visuals in a soft anime style, then built the sequence around a bright beach palette and a hand-lettered Japanese title. The work moved between character design, background painting and editing to keep the whole thing light on its feet, matching the buoyancy of the track. It was an exercise in warmth and restraint — letting a few confident colours and a clear line carry the mood rather than busy motion.',
    image: '/images/coral/hero.jpg',
    width: 1800,
    height: 1012,
    gallery: [
      '/images/coral/01.jpg',
      '/images/coral/02.jpg',
      '/images/coral/03.jpg',
      '/images/coral/04.jpg',
      '/images/coral/05.jpg',
    ],
    video: 'Etf7vLxaUu4',
  },
  {
    slug: 'lolita-tea-party',
    title: 'Lolita Tea Party Magazine',
    year: '2025',
    discipline: 'Editorial · Print',
    caption: 'A print zine on hosting Lolita tea parties.',
    summary:
      'A print magazine and identity built around the ritual of the Lolita tea party. Set on a soft gingham system with hand-placed labels and illustrated china, each spread — Contents, choosing a theme, keeping guests entertained, activities to do — reads like a place setting rather than a page. I wrote and art-directed the whole issue, pairing a warm display serif with tidy body copy and photographing friends in coordinate to ground the styling in something real. Printed on uncoated stock that takes ink like a tea stain, it is equal parts guide and keepsake.',
    image: '/images/tea-party/05.jpg',
    width: 1434,
    height: 1078,
    gallery: [
      '/images/tea-party/01.jpg',
      '/images/tea-party/02.jpg',
      '/images/tea-party/03.jpg',
      '/images/tea-party/04.jpg',
      '/images/tea-party/hero.jpg',
    ],
    links: [
      {
        label: 'Read the magazine (PDF)',
        href: '/files/lolita-tea-party-magazine.pdf',
      },
    ],
  },
  {
    slug: 'botanical-mural',
    title: 'Botanical Mural Installation',
    year: '2025',
    discipline: 'Mural · Illustration',
    caption: 'A hand-painted watercolour mural for a UNSW common room.',
    summary:
      'A large-scale watercolour mural installed in a common room of the UNSW Science & Engineering building. The wall is given over to a cast of wildflowers drawn as small luminous characters — petals lit from within, stems arching like limbs — so that a working meeting space is quietly turned into a garden. I illustrated the piece by hand in soft washes of yellow, violet and green, then scaled it to run the full length of the wall, keeping the linework loose and the colour translucent so the mural reads as painting rather than print even at architectural size. Wrapping around joinery, glazing and the curve of the room, it holds its warmth against the clean timber and grey of the fit-out.',
    image: '/images/mural/hero.jpg',
    width: 2000,
    height: 2000,
    gridRatio: 1800 / 1169, // match the lotus tile it sits beside on the home grid
    gallery: [
      '/images/mural/01.jpg',
      '/images/mural/02.jpg',
      '/images/mural/03.jpg',
      '/images/mural/04.jpg',
    ],
  },
  {
    slug: 'fairy-picnic',
    title: 'Whimsical Fairy Picnic',
    year: '2025',
    discipline: 'Illustration · Watercolour',
    caption: 'A watercolour of flower-fairies gathered for a picnic.',
    summary:
      'A wide watercolour of a picnic held among the flowers, where each guest is a bloom come to life — petals worn like skirts and wings, stamens glowing like little lanterns. A pair take tea at a table set on an upturned blossom while others drift in on beams of pollen-gold light. I painted it in loose, translucent washes of green, violet and yellow, letting the paper breathe between figures and keeping the linework soft so the whole scene stays gentle and dreamlike. It is a companion piece to the botanical mural — the same cast of flower-fairies, gathered here for something quieter.',
    image: '/images/fairy-picnic/hero.jpg',
    width: 2400,
    height: 1124,
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
