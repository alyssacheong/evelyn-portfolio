/* ============================================================
   Single source of content, ported from the old Vite app.
   Evelyn edits this to swap in real copy, images, and links.
   Images live in /public/images.
   ============================================================ */

export type Project = {
  slug: string
  title: string
  titleLines?: string[] // optional forced line breaks for the project-page heading
  altTitle?: string // secondary title, e.g. the original Japanese
  year: string
  discipline: string // short label, e.g. "Editorial · Print"
  caption: string // one-line caption (used in hover overlays)
  summary: string // body copy on the project page
  image: string // hero / thumbnail image (used on the All the Works stack)
  width: number // hero pixel width  — drives the home grid proportions
  height: number // hero pixel height
  gridRatio?: number // optional home-grid display ratio (w/h) if it should differ
                     // from the true image proportions (e.g. to match a neighbour)
  headerImage?: string // optional full-bleed banner shown at the very top of the page
  gallery?: string[] // additional supporting images (single grid)
  galleryGroups?: { label: string; images: string[]; perRow?: number }[] // labelled image grids (perRow columns)
  trailing?: string[] // full-width image(s) shown below the gallery
  youtube?: string // YouTube video id (embedded player)
  videoSrc?: string // self-hosted video file (in /public)
  videoPoster?: string // poster frame for the self-hosted video
  videoControls?: boolean // true → native controls, no autoplay; false/undefined → autoplay + muted + loop
  links?: { label: string; href: string }[]
}

export const site = {
  name: 'Evelyn Tong',
  // two-tone Didot wordmark: "Evelyn" (magenta) + "Tong." (aubergine)
  brand: { first: 'Evelyn', second: 'Tong.' },
  role: 'Design Portfolio',
  heroTitle: 'Among the Lotus and the Light',
  heroSubtitle:
    'An interdisciplinary design portfolio spanning graphic design, 3D and fashion.',
  // hero video: drop a file into /public and point here (see Home page)
  heroVideo: '/hero.mp4',
}

export const about = {
  photo: '/images/about/portrait.jpg' as string | undefined,
  photoCaption: 'Evelyn Tong',
  lead: 'I’m Evelyn Tong,',
  body: [
    'An Interdisciplinary designer that crosses the disciplines of Graphic Design, 3D Visualisations and Fashion together. Working across digital and physical mediums, I conceptualise tailored solutions using the combination of my skills to connect to audiences best.',
    'My practice involves using 3D modelling for object designs, set designs, prototypes, games and art. Graphic design allows me to design publications, posters and typography. My studies of fashion for the past 6 years gives me the knowledge to understand clientele in the fashion industry as well as an awareness for sustainable practices, as a foundation for my main two disciplines.',
  ],
}

export const contact = {
  email: 'evelyntong.designs@gmail.com',
  links: [
    { label: 'Instagram', href: 'https://instagram.com/evelyntong.design', handle: '@evelyntong.design' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/evelyn-tong-535a24354', handle: 'evelyn-tong-535a24354' },
  ],
}

export const projects: Project[] = [
  {
    slug: 'among-the-lotus',
    title: 'Among the Lotus and the Light',
    titleLines: ['Among the Lotus', 'and the Light'],
    year: '2025',
    discipline: 'Unity game',
    caption: 'A quiet 3D experience set in a lily pond at dusk.',
    summary:
      'Among the Lotus and the Light is a concept driven 3D interactive environment, a walkthrough experience built in Unity. Creating a narrative through environmental clues, a world was created based on a series of what-if questions. What if the moon grew big and it rose the sea level and the caused lotus flowers to grow ginormous. What would human civilisation look like? Clues of the past are carved into the stones, scattered along the path. They depict high-rise buildings crumbling, the moon and flowers rising and lastly, a boat civilisation inspired by floating villages in Vietnam. By imagining what materials would be available, the boat was designed with driftwood and lotus leaves. Sound design, game design and 3D design combined all together allows me to tell a story in an incredibly unique way.',
    image: '/images/lotus/heroc.jpg',
    width: 1800,
    height: 1125,
    // Self-hosted walkthrough with native playback controls.
    // NOTE: drop the exported file at public/videos/lotus.mp4 (Google Drive
    // source in the brief); until then the poster frame is shown.
    videoSrc: '/videos/lotus.mp4',
    videoPoster: '/images/lotus/heroc.jpg',
    videoControls: true,
    galleryGroups: [
      {
        label: '',
        perRow: 2,
        images: [
          '/images/lotus/g1.jpg', // wide mountain / lake, pink mist
          '/images/lotus/g2.jpg', // sunset over the water
          '/images/lotus/g3.jpg', // boat-deck interior, warm light
          '/images/lotus/g4.jpg', // carved stone close-up
        ],
      },
    ],
    trailing: ['/images/lotus/g5.jpg'], // full-width lotus close-up
  },
  {
    slug: 'lolita-tea-party',
    title: 'Lolita Tea Party Magazine',
    year: '2025',
    discipline: 'Publication',
    caption: 'A print zine on hosting Lolita tea parties.',
    summary:
      '"DRESSUP" is publication about lolita fashion culture, with each issue of the magazine diving into a certain part. Aimed at aspiring young people that want to know more about the community. This specific edition is about tea parties. Going into topics like the history behind them, what do to at them and how to host one as well. This was inspired by Japanese gift magazines where there is a physical item sold inside the magazine. There is a sticker set where the viewer can set dress a tea party to match their concept. As a designer, this idea fits perfectly with my interests and aesthetics, so it pushed me to develop what I would call "my style".',
    // thumbnail on the Works stack
    image: '/images/tea-party/works.png',
    width: 894,
    height: 1072,
    // slideshow reel — autoplays + loops like the home hero (muted, no controls)
    videoSrc: '/videos/tea-party.mp4',
    videoPoster: '/images/tea-party/cover.jpg',
    // The page uses a bespoke layout (see TeaPartyMedia): a decorative sweets
    // strip followed by two magazine spreads (cover.jpg + spread.jpg).
  },
  {
    slug: 'hibikase',
    title: 'Hibikase Music Video',
    year: '2024',
    discipline: 'Motion Graphics Animation',
    caption: 'A song cover with motion typography and 3D camera layers.',
    summary:
      'Hibikase is a song cover for a competition called Reflective Duet Battle 2024. My roles within the team were singer, storyboard artist, outfit designer and motion graphics animator. This was animated in Adobe After Effects, it showcases motion typography, 3D camera layers and scene composition. This was a valuable leadership experience for me as it was the first time I led a creative group project, working alongside audio engineers, singers, artists and animators. It taught me how to communicate with other creatives effectively and how to share my creative vision with others. There were lots of stressful but also good moments. This project taught me how to use After Effects and it has elevated how I design with typography now.',
    // two-character key art — used as the stack thumbnail (no page banner)
    image: '/images/hibikase/02.jpg',
    width: 960,
    height: 453,
    // the showcase cut — autoplays + loops, muted
    videoSrc: '/videos/hibikase-showcase.mp4',
    videoPoster: '/images/hibikase/02.jpg',
    // the full music video on YouTube, embedded below the description
    youtube: 'uH5DJXdLumo',
    // two stills beneath the video, stacked full-width
    galleryGroups: [
      {
        label: '',
        perRow: 1,
        images: [
          '/images/hibikase/hero.jpg', // 午前零時 scene
          '/images/hibikase/01.jpg', // を集がれる dance shot
        ],
      },
    ],
  },
  {
    slug: 'fairy-picnic',
    title: 'Whimsical Fairy Picnic',
    year: '2025',
    discipline: 'Mural Illustration',
    caption: 'A watercolour of flower-fairies gathered for a picnic.',
    summary:
      'This is the Whimsical Fairy Garden which is an artwork that won UNSW’s Student Artwork Competition in 2025. It resides in the Rupert Myers building, with the purpose of creating a lively environment which encourages students to hang out and use the space. This painting was made on the idea of combining NSW native flora and childlike wonder, resulting in a picture book-esque look. Capturing the fun inside little fairies, encouraging the viewer to peel back the scene by seeing the interactions between them all. I wanted to tell a story that became immersive as it feels like you art part of the picnic too. The use of watercolour in the artwork was inspired by old Australian picture books. Transferring this idea from digital sketches to a physical artwork added challenges abd happy accidents but it created an artwork with a soul.',
    // the installed mural in situ — used as the stack thumbnail.
    // The page itself uses a bespoke layout (see FairyPicnicMedia).
    image: '/images/fairy-picnic/01.jpg',
    width: 2400,
    height: 1124,
  },
  {
    slug: 'coral-garden',
    title: 'Miniature Coral Garden MV',
    altTitle: '箱庭のコーラル',
    year: '2026',
    discipline: 'Character Illustration',
    caption: 'An illustrated music video — Hakoniwa no Coral.',
    summary:
      'Miniature Coral’s Garden is a collaboration with many talented people, creating a song cover for the 6 Day Chorus Challenge. This was led and organised by me as I recruited the roster, conceptualised the idea for the music video and illustrated the character sprites. I also sang and worked on the audio tuning as well. This was drawn in procreate, creating poses that fit the personality of the singers behind them. As a designer, I felt that this project was able to push me to create highly resolved work in a compressed timeframe. When time is short, perfectionism is a killer of projects but getting over that and creating with one’s current best of abilities creates awesome work.',
    image: '/images/coral/hero.jpg',
    width: 1800,
    height: 1012,
    // the music video (embedded up top, as there's no self-hosted file)
    youtube: 'Etf7vLxaUu4',
    galleryGroups: [
      {
        // finished character sprites, then the sunset beach scene — full-width
        label: '',
        perRow: 1,
        images: ['/images/coral/05.jpg', '/images/coral/beach.jpg'],
      },
      {
        // process sketches
        label: '',
        perRow: 4,
        images: [
          '/images/coral/01.jpg',
          '/images/coral/03.jpg',
          '/images/coral/02.jpg',
          '/images/coral/04.jpg',
        ],
      },
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
