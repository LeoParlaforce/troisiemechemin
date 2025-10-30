// src/app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import { EB_Garamond } from "next/font/google"

const garamond = EB_Garamond({ subsets: ["latin"], variable: "--font-garamond" })

export const metadata: Metadata = {
  title: "troisiemechemin.fr",
  description: "Psychologie, désir et force d’agir",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${garamond.variable} font-serif min-h-screen flex flex-col`}>
        <header className="sticky top-0 z-50 bg-header/95 backdrop-blur border-b border-muted shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              {/* left: title + social icons */}
              <div className="flex items-center gap-4 min-w-0">
                {/* title */}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a
                  href="/"
                  className="text-lg font-semibold tracking-wide shrink-0 transition
                             hover:text-accent hover:drop-shadow-[0_1px_0_rgba(124,58,237,0.7)]
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  troisiemechemin.fr
                </a>

                {/* social icons: don't cause overflow, fixed size, won't shrink below */}
                <div className="flex gap-3 items-center ml-2 flex-shrink-0">
                  <a aria-label="YouTube" href="https://www.youtube.com/@TroisiemeChemin" target="_blank" rel="noopener noreferrer" className="transition hover:opacity-80">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path fill="#FF0000" d="M23.498 6.186a2.997 2.997 0 0 0-2.113-2.12C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.385.566a2.997 2.997 0 0 0-2.113 2.12A31.358 31.358 0 0 0 0 12a31.358 31.358 0 0 0 .502 5.814 2.997 2.997 0 0 0 2.113 2.12C4.495 20.5 12 20.5 12 20.5s7.505 0 9.385-.566a2.997 2.997 0 0 0 2.113-2.12A31.358 31.358 0 0 0 24 12a31.358 31.358 0 0 0-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>

                  <a aria-label="Instagram" href="https://www.instagram.com/troisiemechemin/" target="_blank" rel="noopener noreferrer" className="transition hover:opacity-80">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path fill="#E4405F" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0 5.527a4.31 4.31 0 1 0 0 8.62 4.31 4.31 0 0 0 0-8.62zm6.456-2.622a1.386 1.386 0 1 0 0 2.772 1.386 1.386 0 0 0 0-2.772z"/>
                    </svg>
                  </a>

                  <a aria-label="TikTok" href="https://www.tiktok.com/@troisieme_chemin" target="_blank" rel="noopener noreferrer" className="transition hover:opacity-80">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path fill="#010101" d="M12.831 0h4.286a8.369 8.369 0 0 0 .053.962 4.835 4.835 0 0 0 1.146 2.618 4.899 4.899 0 0 0 3.277 1.613v4.27a9.658 9.658 0 0 1-3.644-.744c-.503-.21-.983-.467-1.433-.767v7.795a7.76 7.76 0 1 1-7.76-7.76 7.1 7.1 0 0 1 1.094.083v4.354a3.49 3.49 0 1 0 2.466 3.33V0z"/>
                    </svg>
                  </a>

                  <a aria-label="Facebook" href="https://www.facebook.com/profile.php?id=61582137873180" target="_blank" rel="noopener noreferrer" className="transition hover:opacity-80">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path fill="#1877F2" d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.314h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.676V1.325C24 .6 23.4 0 22.675 0z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* right: navigation
                  - on md+ show inline nav
                  - on small screens use <details> as a toggle (no JS)
              */}
              <nav className="flex items-center">
                {/* desktop nav */}
                <div className="hidden md:flex gap-2 text-base">
                  <a href="/" className="px-3 py-1.5 rounded-md opacity-90 transition hover:opacity-100 hover:text-accent hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    Accueil
                  </a>
                  <a href="/boutique" className="px-3 py-1.5 rounded-md opacity-90 transition hover:opacity-100 hover:text-accent hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    Boutique
                  </a>
                  <a href="/therapies-groupe" className="px-3 py-1.5 rounded-md opacity-90 transition hover:opacity-100 hover:text-accent hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    Groupes de parole
                  </a>
                </div>

                {/* mobile: details-based menu (no JS). summary shows icon */}
                <details className="md:hidden relative">
                  <summary className="list-none cursor-pointer px-2 py-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </summary>
                  <div className="absolute right-0 mt-2 w-48 bg-background border border-muted rounded-md shadow-sm py-2 z-50">
                    <a href="/" className="block px-4 py-2 text-sm hover:bg-accent/10">Accueil</a>
                    <a href="/boutique" className="block px-4 py-2 text-sm hover:bg-accent/10">Boutique</a>
                    <a href="/therapies-groupe" className="block px-4 py-2 text-sm hover:bg-accent/10">Groupes de parole</a>
                  </div>
                </details>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-muted bg-background">
          <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm opacity-80">
            © {new Date().getFullYear()} troisiemechemin.fr
          </div>
        </footer>
      </body>
    </html>
  )
}
