import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Troisième Chemin — Psychologie Clinique | Guides Pratiques",
  description: "Accompagnement psychologique pratique et basé sur la recherche pour la croissance personnelle et le bien-être. 100% rédigé par des humains.",
  openGraph: {
    title: "Troisième Chemin — Psychologie Clinique",
    description: "Guides de psychologie et protocoles cliniques basés sur la recherche.",
    url: "https://troisiemechemin.fr",
    siteName: "Troisième Chemin",
    images: [{ url: "https://troisiemechemin.fr/og-home.jpg", width: 1200, height: 630 }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Troisième Chemin — Psychologie",
    description: "Guides de psychologie basés sur la recherche.",
    images: ["https://troisiemechemin.fr/og-home.jpg"],
  },
}

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16 flex flex-col gap-12 min-h-screen font-serif w-full bg-transparent">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Troisième Chemin",
            "url": "https://troisiemechemin.fr",
            "description": "Accompagnement psychologique pratique et basé sur la recherche.",
            "publisher": { "@id": "https://troisiemechemin.fr/#organization" }
          })
        }}
      />

      {/* HERO */}
      <section className="text-center mt-8">
        <h1 className="text-4xl md:text-5xl font-medium mb-4 tracking-tight text-slate-900">
          Troisième Chemin — Psychologie
        </h1>
        <p className="text-base md:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-sans opacity-90 mb-6 px-2">
          Accompagnement psychologique pratique et basé sur la recherche pour la croissance personnelle, le bien-être et la compréhension du comportement humain.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 border border-blue-200 text-blue-800 text-xs font-sans font-medium tracking-wide shadow-sm backdrop-blur-sm">
          <span className="text-blue-600">✦</span>
          Intelligence 100% Humaine. Sans IA.
        </div>
      </section>

      {/* CARDS patients */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto w-full">
        <Link
          href="/boutique"
          className="group block border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-400 transition shadow-sm bg-white/80 backdrop-blur-md"
        >
          <div className="h-40 overflow-hidden border-b border-slate-100">
            <img src="/guide.jpg" alt="Guides Cliniques Psychologie" className="w-full h-full object-cover sepia-[0.1] group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-medium mb-2 text-slate-900">Guides complets</h2>
            <p className="text-slate-600 text-sm md:text-xs leading-relaxed font-sans">
              Cadres théoriques et protocoles cliniques pour la compréhension psychologique.
            </p>
          </div>
        </Link>

        <Link
          href="/articles"
          className="group block border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-400 transition shadow-sm bg-white/80 backdrop-blur-md"
        >
          <div className="h-40 overflow-hidden border-b border-slate-100">
            <img src="/articles.jpg" alt="Articles de Psychologie" className="w-full h-full object-cover sepia-[0.1] group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-medium mb-2 text-slate-900">Articles</h2>
            <p className="text-slate-600 text-sm md:text-xs leading-relaxed font-sans">
              Exploration approfondie du comportement humain, de la santé mentale et du développement personnel.
            </p>
          </div>
        </Link>

        <a
          href="https://chat.troisiemechemin.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="group block border border-blue-200 rounded-2xl overflow-hidden hover:border-blue-400 transition bg-blue-50/80 shadow-sm backdrop-blur-md"
        >
          <div className="h-40 overflow-hidden border-b border-blue-100">
            <img src="/humanist-approach.jpg" alt="App Troisième chemin" className="w-full h-full object-cover sepia-[0.1] group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-1 text-blue-900">Troisième chemin</h2>
            <p className="text-blue-800 text-[10px] font-bold mb-3 uppercase tracking-widest font-sans flex items-center gap-1">
              <span className="text-blue-500">✦</span> Application Humaine
            </p>
            <p className="text-slate-700 text-sm md:text-xs leading-relaxed font-sans">
              Un espace dédié à la thérapie quotidienne et à la véritable connexion humaine.
            </p>
          </div>
        </a>
      </section>

      {/* SÉPARATEUR */}
      <div className="max-w-5xl mx-auto w-full border-t border-slate-200/60" />

      {/* BLOC THÉRAPEUTES */}
      <section className="max-w-5xl mx-auto w-full">
        <Link
          href="/pour-les-therapeutes"
          className="group block border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-md"
        >
          <div className="flex flex-col md:flex-row items-center gap-0">
            <div className="w-full md:w-64 h-48 md:h-full shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-slate-100">
              <img
                src="/humanist-approach.jpg"
                alt="Pour les thérapeutes"
                className="w-full h-full object-cover sepia-[0.1] group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex-1 p-8 md:p-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/60 border border-blue-200 text-blue-700 text-[10px] font-sans font-bold uppercase tracking-widest">
                <span className="text-blue-500">✦</span> Pour les Praticiens
              </div>
              <h2 className="text-2xl md:text-3xl font-bold italic tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                Vous êtes thérapeute ?
              </h2>
              <p className="text-slate-500 italic text-sm leading-relaxed max-w-lg">
                Troisième Chemin vous offre un canal de séances quotidiennes avec vos patients, une supervision clinique avec un psychologue diplômé, et un moyen de trouver de nouveaux patients. Un abonnement, trois outils.
              </p>
              <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm font-sans group-hover:gap-3 transition-all">
                Découvrir l'offre praticien
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </Link>
      </section>

    </main>
  )
}
