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
    default: "Troisième Chemin — Guides de psychologie",
    template: "%s | Troisième Chemin"
  },
  description: "Guides de psychologie clinique et ressources pratiques en ligne.",
  alternates: {
    canonical: "https://troisiemechemin.fr",
    languages: { 
      fr: "https://troisiemechemin.fr", 
      "en-US": "https://thirdpath.cloud" 
    },
  },
  openGraph: {
    title: "Troisième Chemin — Guides de psychologie",
    description: "Accompagnement psychologique pratique et basé sur la recherche pour l'épanouissement et le bien-être.",
    url: "https://troisiemechemin.fr",
    siteName: "Troisième Chemin",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Troisième Chemin — Psychologie",
    description: "Guides de psychologie basés sur la recherche.",
    images: ["https://troisiemechemin.fr/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "votre-code-de-verification",
  },
}

const grainBg = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="overflow-x-hidden w-full" style={{ colorScheme: 'light' }}>
      <body className={`${garamond.variable} font-serif min-h-screen flex flex-col overflow-x-hidden w-full antialiased text-slate-900`}>
        
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
            gtag('config', 'G-QYNZ30WC5X', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Header avec correctifs pour le débordement mobile */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-40" style={grainBg}></div>
          <div className="relative z-10 mx-auto max-w-7xl px-3 md:px-6 py-3 flex items-center justify-between gap-1">
            
            {/* Logo : taille réduite sur mobile (text-sm) pour laisser de la place au menu */}
            <Link
              href="/"
              className="text-sm md:text-lg font-semibold tracking-wide transition hover:text-blue-600 shrink-0 text-slate-900"
            >
              troisiemechemin.fr
            </Link>

            {/* Navigation : texte et espacement réduits pour tenir sur une ligne sans couper le 's' */}
            <nav className="flex items-center gap-0.5 md:gap-2" aria-label="Navigation principale">
              {[
                { href: "/", label: "Accueil" },
                { href: "/boutique", label: "Boutique" },
                { href: "/articles", label: "Articles" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-1.5 md:px-3 py-1.5 rounded-md opacity-90 transition hover:opacity-100 hover:text-blue-700 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 text-[13px] md:text-base text-slate-900 font-medium whitespace-nowrap"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1 w-full max-w-full relative z-0">
          {children}
        </main>

        {/* Footer */}
        <footer className="relative border-t border-slate-200 bg-white overflow-hidden text-slate-900">
          <div className="absolute inset-0 pointer-events-none opacity-40" style={grainBg}></div>
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row md:justify-between items-center gap-8 text-sm text-center md:text-left">
            <div className="flex flex-col md:flex-row gap-6">
              <Link href="/mentions-legales" className="opacity-80 hover:opacity-100 transition hover:text-blue-600 font-medium">Mentions Légales</Link>
              <Link href="/charte-editoriale" className="opacity-80 hover:opacity-100 transition hover:text-blue-600 font-medium">Charte Éditoriale</Link>
              <Link href="/a-propos" className="opacity-80 hover:opacity-100 transition hover:text-blue-600 font-medium">À Propos</Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="mailto:leo.gayrard@gmail.com" className="px-6 py-2 rounded-full bg-slate-900 text-white text-sm font-bold transition hover:bg-blue-600 shadow-sm">
                Contact
              </a>
              <a href="https://thirdpath.cloud" className="px-6 py-2 rounded-full border border-slate-300 bg-slate-50 text-slate-700 text-sm font-medium transition hover:bg-white">
                English version?
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span className="opacity-60 text-[10px] uppercase tracking-widest font-sans">
                © {new Date().getFullYear()} troisiemechemin.fr
              </span>
              <span className="opacity-40 text-[9px] font-sans">
                1184 route de la Maurette, 83520 Roquebrune-sur-Argens, France
              </span>
            </div>
          </div>
        </footer>

        {/* Données structurées */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Troisième Chemin",
              "url": "https://troisiemechemin.fr",
              "logo": "https://troisiemechemin.fr/logo.png",
              "founder": {
                "@type": "Person",
                "name": "Léo Gayrard",
                "jobTitle": "Psychologue Clinicien",
                "sameAs": [
                  "https://thirdpath.cloud",
                  "https://parlaforce.com",
                  "https://linkedin.com/in/leogayrard"
                ]
              },
              "description": "Accompagnement psychologique pratique et ressources basées sur la recherche.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1184 route de la Maurette",
                "addressLocality": "Roquebrune-sur-Argens",
                "postalCode": "83520",
                "addressCountry": "FR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "leo.gayrard@gmail.com",
                "contactType": "service client"
              }
            })
          }}
        />
      </body>
    </html>
  )
}