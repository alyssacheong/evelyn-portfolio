'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { site } from '@/lib/content'

type NavItem = { href: string; label: string; icon: string }

const NAV: NavItem[] = [
  { href: '/', label: 'Home', icon: '/icons/home_icon.png' },
  { href: '/designs', label: 'All the Works', icon: '/icons/design_icon.png' },
  { href: '/about', label: 'About', icon: '/icons/about_icon.png' },
  { href: '/contact', label: 'Contact', icon: '/icons/contact_icon.png' },
]

export default function Nav() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className="site-nav" aria-label="Primary">
      {/* brand wordmark — Didot Bold, two-tone */}
      <Link href="/" className="nav-brand" aria-label={site.name}>
        <span className="nav-brand-first">{site.brand.first}</span>
        <span className="nav-brand-second">{site.brand.second}</span>
      </Link>

      <ul className="nav-links">
        {NAV.map(({ href, label, icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="nav-link"
              aria-label={label}
              aria-current={isActive(href) ? 'page' : undefined}
            >
              <Image
                src={icon}
                alt=""
                width={22}
                height={22}
                className="nav-icon"
                aria-hidden="true"
              />
              <span className="nav-tip">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
