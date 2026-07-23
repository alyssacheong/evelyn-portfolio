import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { site, contact, projects, screens } from '../content'
import ProjectDetail from '../components/ProjectDetail'
import AboutDetail from '../components/AboutDetail'
import GoldFrame, { FRAME } from '../components/GoldFrame'

/* The whole site as one painting hung in a gallery. The four areas (About + 3
   projects) are a 2×2 grid of full-content panels on a canvas, wrapped in an
   ornate gold frame on a museum wall. Clicking a panel "steps into the
   painting": the frame and room leave the view and that panel zooms up to fill
   the width — the SAME DOM, now readable, scrolled through natively (a spacer
   supplies page height, window.scrollY drives the vertical pan). The focused
   panel lives in the URL (#/:slug). */

type Rect = { x: number; y: number; w: number; h: number }

const W = 1100 // panel width (design px)
const GAP = 120 // gap between panels
const COL_X = [0, W + GAP] // left/right column x
const FILL = 0.9 // focused panel fills this fraction of the viewport width
const PAD = 56 // overview padding (px)
const LEFT_REGION = 0.6 // overview painting occupies the left 60%, title on the right

// which panel sits in row 0 of each column (its height sets row 1's y)
const TOP_SLUG_BY_COL: Record<number, string> = {}
for (const s of screens) if (s.row === 0) TOP_SLUG_BY_COL[s.col] = s.slug

export default function Canvas() {
  const { screen: focused } = useParams()
  const navigate = useNavigate()

  const viewportRef = useRef<HTMLDivElement>(null)
  const artRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const [vp, setVp] = useState({ w: 0, h: 0 })
  const [rects, setRects] = useState<Record<string, Rect>>({})
  const [scrollY, setScrollY] = useState(0)
  const [scrolling, setScrolling] = useState(false)

  // Reset scroll/pan state the instant the focused screen changes (render-phase
  // convergence via state — resets before paint, no effect/ref needed).
  const [prevFocused, setPrevFocused] = useState(focused)
  if (prevFocused !== focused) {
    setPrevFocused(focused)
    setScrollY(0)
    setScrolling(false)
  }

  // Enable the zoom transition only after the first painted frame.
  const [painted, setPainted] = useState(false)

  // Track the viewport's pixel size (drives all the transform maths).
  useLayoutEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const read = () => setVp({ w: el.clientWidth, h: el.clientHeight })
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Measure each panel's natural height, then derive the 2×2 world positions
  // (row 1 sits below its column's row-0 panel). offsetHeight is untransformed,
  // so the zoom scale never skews it.
  useLayoutEffect(() => {
    const measure = () => {
      const h: Record<string, number> = {}
      for (const s of screens) {
        const el = artRefs.current[s.slug]
        h[s.slug] = el ? el.offsetHeight : 0
      }
      setRects(() => {
        const next: Record<string, Rect> = {}
        for (const s of screens) {
          const x = COL_X[s.col]
          const y = s.row === 0 ? 0 : (h[TOP_SLUG_BY_COL[s.col]] ?? 0) + GAP
          next[s.slug] = { x, y, w: W, h: h[s.slug] }
        }
        return next
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    for (const s of screens) {
      const el = artRefs.current[s.slug]
      if (el) ro.observe(el)
    }
    if (document.fonts) document.fonts.ready.then(measure).catch(() => {})
    return () => ro.disconnect()
  }, [])

  // On focus change, jump the page back to the top (DOM side effect only).
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [focused])

  // While focused, map native page scroll onto the world's vertical pan.
  useEffect(() => {
    if (!focused) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setScrolling(true) // 1:1 panning, no easing
        setScrollY(window.scrollY)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [focused])

  const ready = vp.w > 0 && screens.every((s) => rects[s.slug])
  const focusedRect = focused ? rects[focused] : null

  // Enable the zoom transition one frame after the canvas is first measured.
  useEffect(() => {
    if (!ready || painted) return
    const id = requestAnimationFrame(() => setPainted(true))
    return () => cancelAnimationFrame(id)
  }, [ready, painted])

  // The canvas board's design size (bounding box of the 2×2 panels).
  let boardW = 0
  let boardH = 0
  if (ready) {
    for (const s of screens) {
      const r = rects[s.slug]
      boardW = Math.max(boardW, r.x + r.w)
      boardH = Math.max(boardH, r.y + r.h)
    }
  }

  let transform = 'none'
  let spacerH = 0
  if (ready) {
    if (focusedRect) {
      const s = (vp.w * FILL) / focusedRect.w
      const mx = (vp.w - focusedRect.w * s) / 2
      transform = `translate(${mx - focusedRect.x * s}px, ${
        -focusedRect.y * s - scrollY
      }px) scale(${s})`
      spacerH = focusedRect.h * s
    } else {
      // fit the framed painting (board + gold frame + a little wall around it)
      // into the left region; title sits to the right on the wall.
      const exX = FRAME + boardW * 0.05
      const exTop = FRAME + boardH * 0.04
      const exBot = FRAME + boardH * 0.08
      const ebw = boardW + exX * 2
      const ebh = boardH + exTop + exBot
      const regionW = vp.w > 900 ? vp.w * LEFT_REGION : vp.w
      const s = Math.min((regionW - PAD * 2) / ebw, (vp.h - PAD * 2) / ebh)
      const cx = -exX + ebw / 2
      const cy = -exTop + ebh / 2
      transform = `translate(${regionW / 2 - cx * s}px, ${
        vp.h / 2 - cy * s
      }px) scale(${s})`
    }
  }

  const animate = painted && !scrolling
  const paintingStyle: CSSProperties = {
    transform,
    transition: animate ? 'transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
    opacity: ready ? 1 : 0,
  }
  const boardStyle: CSSProperties = { width: boardW || W, height: boardH || W }

  return (
    <div className={'canvas-stage' + (focused ? ' is-focused' : '')}>
      <div
        ref={viewportRef}
        className={'canvas-viewport' + (focused ? ' is-focused' : '')}
      >
        <div className="painting" style={paintingStyle}>
          <div className="canvas-board" style={boardStyle}>
            {ready && <GoldFrame boardW={boardW} boardH={boardH} />}
            {screens.map((sc) => {
              const isFocused = focused === sc.slug
              const r = rects[sc.slug]
              return (
                <div
                  key={sc.slug}
                  ref={(el) => {
                    artRefs.current[sc.slug] = el
                  }}
                  className={
                    'artboard' +
                    (isFocused ? ' is-focused' : '') +
                    (focused && !isFocused ? ' is-dimmed' : '')
                  }
                  style={{ left: r?.x ?? 0, top: r?.y ?? 0, width: W }}
                >
                  <div className="artboard-inner">
                    {sc.kind === 'about' ? (
                      <AboutDetail />
                    ) : (
                      <ProjectDetail
                        project={projects.find((p) => p.slug === sc.slug)!}
                        index={projects.findIndex((p) => p.slug === sc.slug)}
                        active={isFocused}
                      />
                    )}
                  </div>
                  {!focused && (
                    <button
                      type="button"
                      className="artboard-hit"
                      aria-label={`Step into ${sc.title}`}
                      onClick={() => navigate('/' + sc.slug)}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

      </div>

      {/* real document height so the focused panel can be scrolled through */}
      {focused && (
        <div className="canvas-spacer" style={{ height: spacerH }} aria-hidden="true" />
      )}

      {focused && (
        <button
          type="button"
          className="screen-back"
          onClick={() => navigate('/')}
          aria-label="Back to the painting"
        >
          ← Back
        </button>
      )}

      <aside className={'canvas-title' + (focused ? ' is-hidden' : '')}>
        <div className="canvas-title-head">
          <span className="role">{site.role}</span>
          <span className="name">{site.name}</span>
        </div>
        <h1 className="canvas-hero">{site.heroTitle}</h1>
        <p className="canvas-sub">{site.heroSubtitle}</p>
        <p className="canvas-hint label">Step into the painting</p>

        <div className="canvas-contact">
          <a className="canvas-email" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <ul className="canvas-links">
            {contact.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer noopener">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
