import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "L'app — Troisième Chemin",
  description: "Une messagerie individuelle avec un psychologue clinicien. Pour la thérapie ou pour la supervision.",
  alternates: { canonical: "https://troisiemechemin.fr/app" },
  openGraph: {
    title: "L'app — Troisième Chemin",
    description: "Une messagerie individuelle avec un psychologue clinicien.",
    url: "https://troisiemechemin.fr/app",
    type: "website",
  },
}

export default function AppPage() {
  return (
    <main className="font-serif text-slate-900 bg-transparent min-h-screen">

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 pb-12 text-center">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/60 border border-blue-200 text-blue-700 text-xs font-sans font-bold uppercase tracking-widest">
          <span className="text-blue-500">✦</span> Messagerie individuelle · Humain · Sans IA
        </div>

        <h1 className="text-5xl md:text-7xl font-bold italic tracking-tighter leading-none mb-8">
          Un chat privé.<br />
          <span className="text-blue-600">Pour vous.</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 italic font-light leading-relaxed max-w-2xl mx-auto mb-4">
          Écrivez quand vous voulez. De ce que vous voulez. Avec un psychologue clinicien diplômé d'État.
        </p>

        <p className="text-base text-slate-500 italic font-sans max-w-xl mx-auto">
          Avant d'aller plus loin — qui êtes-vous ?
        </p>
      </section>

      {/* DEUX CHOIX */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

          {/* PATIENT */}
          <Link
            href="/therapie"
            className="group block relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-md hover:border-blue-300 hover:shadow-xl transition-all duration-300 p-10 md:p-12"
          >
            <div className="space-y-6">
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500">
                Patient
              </div>
              <h2 className="text-3xl md:text-4xl font-bold italic tracking-tight leading-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Je cherche une thérapie.
              </h2>
              <p className="text-slate-600 italic leading-relaxed">
                Je veux mettre au travail ce qui me travaille, à mon rythme, par écrit, sans rendez-vous figé.
              </p>
              <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm font-sans group-hover:gap-3 transition-all pt-2">
                Découvrir la thérapie
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>

          {/* THÉRAPEUTE */}
          <Link
            href="/supervision"
            className="group block relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-md hover:border-blue-300 hover:shadow-xl transition-all duration-300 p-10 md:p-12"
          >
            <div className="space-y-6">
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500">
                Thérapeute
              </div>
              <h2 className="text-3xl md:text-4xl font-bold italic tracking-tight leading-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Je cherche une supervision.
              </h2>
              <p className="text-slate-600 italic leading-relaxed">
                Je suis thérapeute et je cherche à ne plus pratiquer seul·e. Mes patients me mobilisent et je veux pouvoir travailler ce que ça fait en moi sans avoir à polluer leur thérapie.
              </p>
              <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm font-sans group-hover:gap-3 transition-all pt-2">
                Découvrir la supervision
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>

        </div>

        {/* PETIT MOT EN BAS */}
        <p className="text-center text-slate-400 italic text-sm mt-12 max-w-xl mx-auto leading-relaxed">
          Le service est strictement identique dans les deux cas — c'est le même chat, le même psychologue, le même cadre. Seul le motif de la rencontre change.
        </p>
      </section>

    </main>
  )
}
