/* Ornate gilded picture frame, drawn as a scalable SVG so the gold stays crisp
   however far the painting is zoomed. It overlays the outer edge of the canvas
   board (position:absolute; inset:-F) — the hollow centre lets the board show
   through, so the board itself stays at world origin and the zoom maths are
   untouched. Layered mouldings + a beaded course + corner medallions read as a
   baroque gilt frame without any raster asset. */

const F = 116 // frame thickness in design px

export default function GoldFrame({
  boardW,
  boardH,
}: {
  boardW: number
  boardH: number
}) {
  const w = boardW + F * 2
  const h = boardH + F * 2
  // corner-medallion centres
  const c = F / 2
  const corners: [number, number][] = [
    [c, c],
    [w - c, c],
    [c, h - c],
    [w - c, h - c],
  ]

  return (
    <div className="frame" style={{ inset: -F }} aria-hidden="true">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient id="gf-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8a6a2f" />
            <stop offset="0.16" stopColor="#dcb767" />
            <stop offset="0.42" stopColor="#f8e8b0" />
            <stop offset="0.63" stopColor="#cfa652" />
            <stop offset="1" stopColor="#79571f" />
          </linearGradient>
          <radialGradient id="gf-boss" cx="0.38" cy="0.34" r="0.8">
            <stop offset="0" stopColor="#fbeec0" />
            <stop offset="0.5" stopColor="#dcb767" />
            <stop offset="1" stopColor="#7d5b23" />
          </radialGradient>
        </defs>

        {/* the gilt band: outer rect minus inner rect (even-odd → hollow) */}
        <path
          d={`M0 0 H${w} V${h} H0 Z M${F} ${F} V${F + boardH} H${F + boardW} V${F} Z`}
          fill="url(#gf-gold)"
          fillRule="evenodd"
        />

        {/* outer edge + carved mouldings, drawn as concentric rect strokes */}
        <rect x="5" y="5" width={w - 10} height={h - 10} fill="none" stroke="#5e441c" strokeWidth="8" />
        <rect x="13" y="13" width={w - 26} height={h - 26} fill="none" stroke="rgba(255,242,205,0.55)" strokeWidth="3" />
        <rect x={F - 26} y={F - 26} width={boardW + 52} height={boardH + 52} fill="none" stroke="#b58c3c" strokeWidth="11" />
        {/* beaded course (dashes read as beads) */}
        <rect
          x={F - 12}
          y={F - 12}
          width={boardW + 24}
          height={boardH + 24}
          fill="none"
          stroke="#f4de99"
          strokeWidth="7"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
        {/* inner liner (the mat edge against the canvas) */}
        <rect x={F} y={F} width={boardW} height={boardH} fill="none" stroke="#4a3620" strokeWidth="9" />

        {/* corner medallions */}
        {corners.map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={F * 0.46} fill="url(#gf-boss)" stroke="#5e441c" strokeWidth="4" />
            <circle cx={cx} cy={cy} r={F * 0.2} fill="none" stroke="#7d5b23" strokeWidth="3" />
          </g>
        ))}
      </svg>
    </div>
  )
}

export { F as FRAME }
