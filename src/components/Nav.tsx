import { NavLink } from 'react-router-dom'
import { site } from '../content'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/design', label: 'Design' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <header className="site-head">
      <NavLink to="/" className="site-mark" end>
        <span className="site-mark-name">{site.name}</span>
        <span className="label site-mark-role">{site.role}</span>
      </NavLink>

      <nav className="site-nav" aria-label="Primary">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              'nav-link' + (isActive ? ' is-active' : '')
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
