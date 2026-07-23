import { useState } from 'react'

/* Lazy Unity WebGL embed. Shows the hero as a poster with a "Play in browser"
   button; only on click does it mount the iframe (so the large Unity build
   isn't downloaded until a visitor opts in). Unity keeps its own index.html +
   loader inside public/games/<slug>/, so this just points an iframe at it. */

type Props = {
  src: string // path under public/, no leading slash, e.g. 'games/among-the-lotus/index.html'
  poster?: string
  title: string
  aspect?: string
}

export default function UnityEmbed({
  src,
  poster,
  title,
  aspect = '16 / 9',
}: Props) {
  const [launched, setLaunched] = useState(false)
  // BASE_URL keeps the path correct at a domain root or a subpath (base: './')
  const url = `${import.meta.env.BASE_URL}${src}`

  return (
    <div className="unity-embed" style={{ aspectRatio: aspect }}>
      {launched ? (
        <iframe
          className="unity-frame"
          src={url}
          title={`${title} — play in browser`}
          allow="fullscreen; autoplay; gamepad; xr-spatial-tracking"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="unity-poster"
          onClick={() => setLaunched(true)}
          aria-label={`Play ${title} in the browser`}
          style={poster ? { backgroundImage: `url(${poster})` } : undefined}
        >
          <span className="unity-play">
            <span className="unity-play-icon" aria-hidden="true">
              ▶
            </span>
            <span className="unity-play-label">Play in browser</span>
            <span className="unity-play-note">
              loads a large file · plays right here
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
