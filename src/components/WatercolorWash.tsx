/* Layered watercolour washes.

   Each blob is an irregular, hand-drawn-feeling PATH (not a circle) filled
   with an edge-pooling gradient and pushed through a turbulence-displacement
   filter so its boundary bleeds. Blobs are grouped into 2–3 CLUSTERS spread
   down the full scroll height of the page (top %), each cluster stacking
   2–3 blobs at slight offsets in mixed hues. `mix-blend-mode: multiply`
   (set in CSS) makes the overlaps read as richer, layered pigment. Each
   page gets a distinct arrangement so navigating feels like a new spread. */

type Variant = 'home' | 'about' | 'design' | 'contact'
type Color = 'accent' | 'secondary' | 'tertiary'

type Blob = {
  top: number // % of page height
  left?: number // % (may be negative to bleed off-edge)
  right?: number
  size: number // px, square
  color: Color
  path: 0 | 1 | 2
  filter?: '2'
  rot?: number
}

// organic, lumpy closed shapes (viewBox 0 0 200 200)
const PATHS = [
  'M103 24C143 20 179 50 183 92 186 128 168 168 128 181 90 193 40 176 25 137 11 99 24 52 60 32 73 25 88 25 103 24Z',
  'M118 20C165 24 190 66 180 108 172 146 194 166 152 184 112 201 55 190 32 151 11 116 19 68 52 42 77 22 92 17 118 20Z',
  'M96 26C136 15 178 42 182 84 185 118 158 148 160 176 162 197 118 187 84 181 43 173 20 148 19 106 18 64 55 36 96 26Z',
]

const VARIANTS: Record<Variant, Blob[]> = {
  home: [
    // top-right cluster
    { top: 1, right: -8, size: 460, color: 'accent', path: 0, rot: 12 },
    { top: 7, right: 6, size: 300, color: 'secondary', path: 2, filter: '2', rot: -10 },
    // mid-left cluster
    { top: 40, left: -12, size: 520, color: 'secondary', path: 1, rot: 6 },
    { top: 49, left: 4, size: 290, color: 'tertiary', path: 2, filter: '2', rot: -16 },
    // lower-right cluster
    { top: 78, right: -6, size: 400, color: 'tertiary', path: 2, rot: 4 },
    { top: 85, right: 12, size: 250, color: 'accent', path: 1, filter: '2', rot: 14 },
  ],
  about: [
    { top: 2, left: -10, size: 440, color: 'secondary', path: 2, rot: -8 },
    { top: 6, left: 8, size: 260, color: 'accent', path: 1, filter: '2', rot: 10 },
    { top: 46, right: -12, size: 500, color: 'tertiary', path: 0, rot: 6 },
    { top: 54, right: 6, size: 280, color: 'secondary', path: 1, filter: '2', rot: -12 },
    { top: 88, left: -4, size: 360, color: 'accent', path: 2, rot: 8 },
  ],
  design: [
    { top: 1, right: -6, size: 420, color: 'secondary', path: 1, rot: 8 },
    { top: 5, right: 8, size: 250, color: 'tertiary', path: 2, filter: '2', rot: -12 },
    { top: 32, left: -12, size: 470, color: 'accent', path: 2, rot: 6 },
    { top: 40, left: 4, size: 260, color: 'secondary', path: 0, filter: '2', rot: -10 },
    { top: 64, right: -10, size: 440, color: 'tertiary', path: 1, rot: 5 },
    { top: 72, right: 8, size: 240, color: 'accent', path: 2, filter: '2', rot: 12 },
    { top: 92, left: -6, size: 380, color: 'secondary', path: 2, rot: -6 },
  ],
  contact: [
    { top: 2, left: -8, size: 380, color: 'secondary', path: 0, rot: -6 },
    { top: 8, left: 6, size: 240, color: 'tertiary', path: 1, filter: '2', rot: 12 },
    { top: 58, right: -10, size: 540, color: 'accent', path: 2, rot: 6 },
    { top: 66, right: 4, size: 300, color: 'tertiary', path: 1, filter: '2', rot: -12 },
    { top: 70, right: 22, size: 220, color: 'secondary', path: 0, rot: 8 },
  ],
}

export default function WatercolorWash({ variant }: { variant: Variant }) {
  return (
    <div className="wash" aria-hidden="true">
      {VARIANTS[variant].map((b, i) => (
        <svg
          key={i}
          className="wash-blob"
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: b.size,
            height: b.size,
            top: `${b.top}%`,
            left: b.left != null ? `${b.left}%` : undefined,
            right: b.right != null ? `${b.right}%` : undefined,
            transform: `rotate(${b.rot ?? 0}deg)`,
          }}
        >
          <path
            d={PATHS[b.path]}
            fill={`url(#pool-${b.color})`}
            filter={`url(#wc-paint${b.filter === '2' ? '-2' : ''})`}
          />
        </svg>
      ))}
    </div>
  )
}
