// src/app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"
import { EB_Garamond } from "next/font/google"
import Script from "next/script"

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-garamond",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://troisiemechemin.fr"),
  title: {
    default: "Troisième Chemin — Guides de Psychologie",
    template: "%s | Troisième Chemin"
  },
  description: "Guides de psychologie clinique et ressources pratiques pour thérapeutes et patients.",
  alternates: {
    canonical: "https://troisiemechemin.fr",
    languages: { 
      en: "https://thirdpath.cloud", 
      fr: "https://troisiemechemin.fr" 
    },
  },
  openGraph: {
    title: "Troisième Chemin — Guides de Psychologie",
    description: "Un accompagnement psychologique basé sur la recherche pour le développement personnel et le bien-être.",
    url: "https://troisiemechemin.fr",
    siteName: "Troisième Chemin",
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${garamond.variable} font-serif min-h-screen flex flex-col`}>
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QYNZ30WC5X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QYNZ30WC5X');
          `}
        </Script>

        {/* Header - Version FR */}
        <header className="sticky top-0 z-50 bg-header/95 backdrop-blur border-b border-muted shadow-sm">
          <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-semibold tracking-wide transition hover:text-accent hover:drop-shadow-[0_1px_0_rgba(124,58,237,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              troisiemechemin.fr
            </Link>

            <nav className="flex gap-2 text-base" aria-label="Navigation principale">
              {[
                { href: "/", label: "Accueil" },
                { href: "/boutique", label: "Boutique" },
                { href: "/articles", label: "Articles" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-3 py-1.5 rounded-md opacity-90 transition hover:opacity-100 hover:text-accent hover:bg-accent/15 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transform-gpu"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-muted bg-background">
          <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row md:justify-between items-center gap-4 text-sm text-center md:text-left">
            <div className="flex flex-col md:flex-row gap-4">
              <Link href="/mentions-legales" className="opacity-80 hover:opacity-100 transition">Mentions Légales</Link>
              <Link href="/charte-editoriale" className="opacity-80 hover:opacity-100 transition">Charte Éditoriale</Link>
              <Link href="/a-propos" className="opacity-80 hover:opacity-100 transition">À Propos</Link>
            </div>

            <div className="flex gap-2">
              <a href="mailto:leo.gayrard@gmail.com" className="px-4 py-2 rounded bg-accent text-white text-sm font-medium transition hover:opacity-90">Contact</a>
              <a href="https://www.thirdpath.cloud" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded border border-accent text-sm font-medium transition hover:bg-accent/10">English version?</a>
            </div>

            <span className="opacity-60 text-sm mt-2 md:mt-0">
              © {new Date().getFullYear()} troisiemechemin.fr — 1184 route de la Maurette, 83520 Roquebrune-sur-Argens, France
            </span>
          </div>
        </footer>

        {/* Données structurées JSON-LD pour l'autorité (E-E-A-T) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Troisième Chemin",
              "url": "https://troisiemechemin.fr",
              "founder": {
                "@type": "Person",
                "name": "Leo Gayrard",
                "jobTitle": "Psychologue Clinicien",
                "sameAs": [
                  "https://www.thirdpath.cloud",
                  "https://parlaforce.com"
                ]
              },
              "description": "Accompagnement et guides psychologiques basés sur les preuves.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1184 route de la Maurette",
                "addressLocality": "Roquebrune-sur-Argens",
                "postalCode": "83520",
                "addressCountry": "FR"
              }
            })
          }}
        />
      </body>
    </html>
  )
}