import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"
import { EB_Garamond } from "next/font/google"
import Script from "next/script"

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-garamond",
  display: "swap", // FIX performance : évite le FOUT
})

export const metadata: Metadata = {
  metadataBase: new URL("https://troisiemechemin.fr"),
  title: {
    default: "Troisième Chemin — Guides de psychologie",
    template: "%s | Troisième Chemin"
  },
  description: "Guides de psychologie clinique et ressources pratiques. Rédigés par un psychologue diplômé d'État.",
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
    images: [{ url: "https://troisiemechemin.fr/og-image.jpg", width: 1200, height: 630 }],
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
  // FIX : remplace par ton vrai code Google Search Console
  // verification: { google: "TON_CODE_ICI" },
}

const grainBg = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // FIX JSON-LD : @graph avec @id cross-références
  // sameAs relie troisiemechemin.fr à thirdpath.cloud et parlaforce.com
  // → Google comprend que c'est le même auteur = boost E-E-A-T cross-domain
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://troisiemechemin.fr/#organization",
        "name": "Troisième Chemin",
        "url": "https://troisiemechemin.fr",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://troisiemechemin.fr/#logo",
          "url": "https://troisiemechemin.fr/logo.png",
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
        },
        "sameAs": [
          "https://thirdpath.cloud",
          "https://parlaforce.com",
          "https://chat.troisiemechemin.fr"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://troisiemechemin.fr/#website",
        "url": "https://troisiemechemin.fr",
        "name": "Troisième Chemin",
        "description": "Guides de psychologie clinique et ressources pratiques.",
        "publisher": { "@id": "https://troisiemechemin.fr/#organization" },
        "inLanguage": "fr-FR",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://troisiemechemin.fr/articles?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Person",
        "@id": "https://troisiemechemin.fr/#author",
        "name": "Léo Gayrard",
        "jobTitle": "Psychologue Clinicien",
        "url": "https://troisiemechemin.fr",
        "worksFor": { "@id": "https://troisiemechemin.fr/#organization" },
        "knowsAbout": ["Psychologie", "Thérapie clinique", "Estime de soi", "Anxiété", "Dépression", "TDAH"],
        "sameAs": [
          "https://thirdpath.cloud/#author",
          "https://parlaforce.com/#author"
        ]
      }
    ]
  }

  return (
    <html lang="fr" className="overflow-x-hidden w-full" style={{ colorScheme: 'light' }}>
      <body className={`${garamond.variable} font-serif min-h-screen flex flex-col overflow-x-hidden w-full antialiased text-slate-900`}>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-90Q63XZ1TC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-90Q63XZ1TC', { page_path: window.location.pathname });
          `}
        </Script>

        {/* HEADER */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-40" style={grainBg} aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-7xl px-3 md:px-6 py-3 flex items-center justify-between gap-1">
            <Link
              href="/"
              className="text-sm md:text-lg font-semibold tracking-wide transition hover:text-blue-600 shrink-0 text-slate-900"
            >
              troisiemechemin.fr
            </Link>

            <nav aria-label="Navigation principale" className="flex items-center gap-0.5 md:gap-2">
              {[
                { href: "/", label: "Accueil" },
                { href: "/boutique", label: "Boutique" },
                { href: "/articles", label: "Articles" },
                { href: "/pour-les-therapeutes", label: "Thérapeutes" },
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

        <div className="flex-1 w-full max-w-full relative z-0">
          {children}
        </div>

        {/* FOOTER */}
        <footer className="relative border-t border-slate-200 bg-white overflow-hidden text-slate-900" role="contentinfo">
          <div className="absolute inset-0 pointer-events-none opacity-40" style={grainBg} aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row md:justify-between items-center gap-8 text-sm text-center md:text-left">

            <nav aria-label="Navigation légale">
              <ul className="flex flex-col md:flex-row gap-4 md:gap-6 list-none p-0">
                <li><Link href="/mentions-legales" className="opacity-80 hover:opacity-100 transition hover:text-blue-600 font-medium">Mentions Légales</Link></li>
                <li><Link href="/charte-editoriale" className="opacity-80 hover:opacity-100 transition hover:text-blue-600 font-medium">Charte Éditoriale</Link></li>
                <li><Link href="/a-propos" className="opacity-80 hover:opacity-100 transition hover:text-blue-600 font-medium">À Propos</Link></li>
              </ul>
            </nav>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:leo.gayrard@gmail.com"
                className="px-6 py-2 rounded-full bg-slate-900 text-white text-sm font-bold transition hover:bg-blue-600 shadow-sm"
              >
                Contact
              </a>
              <a
                href="https://thirdpath.cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full border border-slate-300 bg-slate-50 text-slate-700 text-sm font-medium transition hover:bg-white"
              >
                English version?
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span className="opacity-60 text-[10px] uppercase tracking-widest font-sans">
                © {new Date().getFullYear()} troisiemechemin.fr
              </span>
              <span className="opacity-40 text-[9px] font-sans">
                Léo Gayrard · Psychologue Clinicien · Roquebrune-sur-Argens, France
              </span>
            </div>
          </div>
        </footer>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
