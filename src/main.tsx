import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Canvas from './pages/Canvas.tsx'

// Hash routing keeps deep links working on any static host (GitHub Pages
// subpaths, Netlify, Vercel, bare folder) with zero server config.
//
// One optional-param route renders the canvas for both '/' (overview) and
// '/:slug' (a screen zoomed in). Because it's the SAME element across param
// changes, React keeps Canvas mounted — so the zoom transform animates
// continuously instead of remounting.
const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [{ path: ':screen?', element: <Canvas /> }],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
