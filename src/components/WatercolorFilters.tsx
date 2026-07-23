/* Shared, document-global SVG defs used by every wash blob.

   1. Pooling gradients — NOT a flat fill. Diluted, light centre; a darker,
      more saturated band at ~72% of the radius (the ring real watercolour
      leaves as water evaporates outward); then fade to nothing. Off-centre
      so it never looks like a mechanical radial. objectBoundingBox units so
      one gradient auto-fits any blob path that references it.

   2. Paint filters — feTurbulence + feDisplacementMap feather/bleed the
      vector edge (the single biggest "this is paint, not a gradient" cue),
      plus a fine turbulence multiplied back in for granulation (mottled
      pigment). Two seeds so adjacent blobs don't repeat. */

function Pool({ id, color }: { id: string; color: string }) {
  return (
    <radialGradient id={id} cx="45%" cy="41%" r="62%">
      <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.12 }} />
      <stop offset="46%" style={{ stopColor: color, stopOpacity: 0.16 }} />
      <stop offset="72%" style={{ stopColor: color, stopOpacity: 0.44 }} />
      <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
    </radialGradient>
  )
}

function Paint({
  id,
  edgeFreq,
  scale,
  granFreq,
  seed,
}: {
  id: string
  edgeFreq: string
  scale: number
  granFreq: number
  seed: number
}) {
  return (
    <filter
      id={id}
      x="-35%"
      y="-35%"
      width="170%"
      height="170%"
      colorInterpolationFilters="sRGB"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency={edgeFreq}
        numOctaves={4}
        seed={seed}
        result="edge"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="edge"
        scale={scale}
        xChannelSelector="R"
        yChannelSelector="G"
        result="disp"
      />
      <feTurbulence
        type="fractalNoise"
        baseFrequency={granFreq}
        numOctaves={3}
        seed={seed + 5}
        result="gran"
      />
      <feColorMatrix
        in="gran"
        type="matrix"
        values="0.33 0.33 0.33 0 0
                0.33 0.33 0.33 0 0
                0.33 0.33 0.33 0 0
                0    0    0    0 1"
        result="granGray"
      />
      <feComponentTransfer in="granGray" result="granSoft">
        <feFuncR type="linear" slope="0.22" intercept="0.78" />
        <feFuncG type="linear" slope="0.22" intercept="0.78" />
        <feFuncB type="linear" slope="0.22" intercept="0.78" />
      </feComponentTransfer>
      <feComposite in="granSoft" in2="disp" operator="in" result="granMask" />
      <feBlend in="disp" in2="granMask" mode="multiply" />
    </filter>
  )
}

export default function WatercolorFilters() {
  return (
    <svg className="wc-defs" aria-hidden="true" focusable="false">
      <defs>
        <Pool id="pool-accent" color="var(--accent)" />
        <Pool id="pool-secondary" color="var(--wash-secondary)" />
        <Pool id="pool-tertiary" color="var(--wash-tertiary)" />
        <Paint id="wc-paint" edgeFreq="0.018 0.022" scale={17} granFreq={0.7} seed={7} />
        <Paint id="wc-paint-2" edgeFreq="0.024 0.016" scale={13} granFreq={0.9} seed={3} />
      </defs>
    </svg>
  )
}
