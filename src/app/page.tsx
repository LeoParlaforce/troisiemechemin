// src/app/page.tsx
import Link from "next/link"

export const metadata = {
  title: "Troisième Chemin — Psychologie Humaine & Pratique Clinique",
  description: "Explorez des guides de psychologie basés sur la recherche et rejoignez Troisième Chemin.",
}

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-2 flex flex-col min-h-screen font-serif text-slate-900">

      {/* Header - Collé en haut */}
      <header className="text-center mt-2 mb-4">
        <h1 className="text-5xl md:text-6xl font-medium tracking-tight italic">
          Troisième Chemin
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-sans italic opacity-80">
          Guidance psychologique pratique et rigoureuse.
        </p>
      </header>

      {/* SECTION PRINCIPALE - BANDEAU HORIZONTAL (Hauteur fixe h-56 = 224px) */}
      <section className="w-full mb-6">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 p-1.5 bg-white">
          <div className="relative rounded-2xl overflow-hidden h-56 md:h-60 flex items-center px-8 md:px-16">
            <div 
              className="absolute inset-0 bg-cover bg-[center_top_25%] sepia-[0.1]" 
              style={{ backgroundImage: "url('/hero.jpg')" }}
            />
            <div className="absolute inset-0 bg-slate-900/60" />

            <div className="relative w-full">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <li>
                  <Link href="/boutique" className="group flex items-center gap-3 text-white hover:text-blue-300 transition">
                    <span className="text-blue-400 font-bold text-3xl">/</span>
                    <span className="font-medium underline decoration-white/30 underline-offset-8 text-2xl">Guides Complets</span>
                  </Link>
                </li>
                <li>
                  <Link href="/articles" className="group flex items-center gap-3 text-white hover:text-blue-300 transition">
                    <span className="text-blue-400 font-bold text-3xl">/</span>
                    <span className="font-medium underline decoration-white/30 underline-offset-8 text-2xl">Articles</span>
                  </Link>
                </li>
                <li>
                  <Link href="/articles" className="group flex items-center gap-3 text-white hover:text-blue-300 transition">
                    <span className="text-blue-400 font-bold text-3xl">/</span>
                    <span className="font-medium underline decoration-white/30 underline-offset-8 text-2xl">Ressources</span>
                  </Link>
                </li>
                <li>
                  <a href="https://chat.troisiemechemin.fr" target="_blank" className="group flex items-center gap-3 text-white hover:text-blue-300 transition">
                    <span className="text-blue-400 font-bold text-3xl">/</span>
                    <span className="font-medium underline decoration-white/30 underline-offset-8 text-2xl">L'Approche</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Barre App - Sortie du bloc image pour aérer et gagner de la place */}
        <div className="mt-4">
          <a href="https://chat.troisiemechemin.fr" target="_blank" className="flex items-center justify-center gap-4 bg-blue-50/50 border border-blue-100 p-3 rounded-2xl hover:bg-blue-100 transition shadow-sm text-slate-800 italic font-medium">
            <span className="text-blue-500">✦</span>
            <span>Troisième chemin : l'app de psychologie 100% humaine, sans IA</span>
          </a>
        </div>
      </section>

      {/* SECTION DU BAS - CARTES VERTICALES CLASSIQUES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Link href="/boutique" className="group block border border-slate-200 rounded-3xl overflow-hidden hover:border-slate-400 transition bg-white p-2 shadow-sm">
          <div className="relative h-28 w-full rounded-2xl overflow-hidden">
            <img src="/guide.jpg" alt="Boutique" className="w-full h-full object-cover sepia-[0.1]" />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-medium mb-1 italic">La Boutique</h3>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">Cadres théoriques et pratiques basés sur la recherche.</p>
          </div>
        </Link>

        <Link href="/articles" className="group block border border-slate-200 rounded-3xl overflow-hidden hover:border-slate-400 transition bg-white p-2 shadow-sm">
          <div className="relative h-28 w-full rounded-2xl overflow-hidden">
            <img src="/articles.jpg" alt="Articles" className="w-full h-full object-cover sepia-[0.1]" />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-medium mb-1 italic">Articles</h3>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">Exploration du comportement et développement.</p>
          </div>
        </Link>

        <a href="https://chat.troisiemechemin.fr" target="_blank" className="group block border border-blue-200 rounded-3xl overflow-hidden hover:border-blue-400 transition bg-blue-50/40 p-2 shadow-sm">
          <div className="relative h-28 w-full rounded-2xl overflow-hidden">
            <img src="/humanist-approach.jpg" alt="App" className="w-full h-full object-cover sepia-[0.1]" />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold italic text-blue-900 mb-1">L'Application</h3>
            <p className="text-xs text-blue-800/70 font-sans leading-relaxed">Espace de thérapie 100% humaine.</p>
          </div>
        </a>

      </section>
    </main>
  )
}