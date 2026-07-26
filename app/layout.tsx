import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import { site } from '@/lib/content'

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.heroSubtitle,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body>
        <Nav />
        <main className="app-main">{children}</main>
        <footer className="site-foot">
          <span className="label">
            © {new Date().getFullYear()} {site.name}
          </span>
        </footer>
      </body>
    </html>
  )
}
