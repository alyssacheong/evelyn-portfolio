import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import WatercolorFilters from './components/WatercolorFilters'
import WatercolorWash from './components/WatercolorWash'
import { site } from './content'
import './App.css'

const SEEN_KEY = 'evie-loader-seen'

export default function App() {
  // Loader plays once per session (not on every route change).
  const [loading, setLoading] = useState(
    () =>
      !sessionStorage.getItem(SEEN_KEY) &&
      !new URLSearchParams(window.location.search).has('noloader'),
  )

  useEffect(() => {
    if (!loading) sessionStorage.setItem(SEEN_KEY, '1')
  }, [loading])

  return (
    <>
      <WatercolorFilters />
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      <div className={'app' + (loading ? ' is-hidden' : '')}>
        {/* watercolour-on-paper backdrop the framed painting hangs on */}
        <WatercolorWash variant="home" />
        {/* The canvas is the whole site; it stays mounted across zoom so the
            transform animates continuously. */}
        <main className="page">
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
