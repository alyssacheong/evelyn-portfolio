import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import LoadingScreen from './components/LoadingScreen'
import WatercolorFilters from './components/WatercolorFilters'
import WatercolorWash from './components/WatercolorWash'
import { site } from './content'
import './App.css'

const SEEN_KEY = 'evie-loader-seen'

function washVariant(path: string) {
  if (path.startsWith('/about')) return 'about' as const
  if (path.startsWith('/design')) return 'design' as const
  if (path.startsWith('/contact')) return 'contact' as const
  return 'home' as const
}

export default function App() {
  // Loader plays once per session (not on every route change).
  const [loading, setLoading] = useState(
    () =>
      !sessionStorage.getItem(SEEN_KEY) &&
      !new URLSearchParams(window.location.search).has('noloader'),
  )
  const location = useLocation()

  useEffect(() => {
    if (!loading) sessionStorage.setItem(SEEN_KEY, '1')
  }, [loading])

  // Reset scroll when navigating between pages.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <WatercolorFilters />
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      <div className={'app' + (loading ? ' is-hidden' : '')}>
        {/* full-screen background layer — spans the whole viewport + document
            height, behind nav/content/footer. Variant follows the route. */}
        <WatercolorWash key={location.pathname} variant={washVariant(location.pathname)} />
        <Nav />
        <main className="page" key={location.pathname}>
          <Outlet />
        </main>
        <footer className="site-foot">
          <span className="label">
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="label">Made slowly, on paper.</span>
        </footer>
      </div>
    </>
  )
}
