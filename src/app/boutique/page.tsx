import Image from "next/image"
import Link from "next/link"
import { products } from "./data"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Boutique | Protocoles Cliniques & Guides Psychologiques | Troisième Chemin",
  description: "Parcourez notre collection de protocoles cliniques et de guides de restructuration psychologique basés sur la recherche.",
  alternates: { canonical: "https://troisiemechemin.fr/boutique" }
}

export default function Boutique() {
  // 1. Trier les produits : Le pack-integral en DERNIER
  const sortedProducts = [...products].sort((a, b) => {
    if (a.slug === "pack-integral") return 1
    if (b.slug === "pack-integral") return -1
    return 0
  })

  return (
    <main className="min-h-screen bg-transparent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": sortedProducts.map((p, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "url": `https://troisiemechemin.fr/boutique/${p.slug}`,
              "name": p.title
            }))
          })
        }}
      />
      <section className="mx-auto max-w-6xl px-6 py-14">
        <header className="mb-16">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-slate-900 max-md:text-white italic tracking-tighter transition-colors">Boutique.</h1>
          <p className="mt-4 text-xl text-slate-500 max-md:text-slate-300 max-w-2xl font-serif italic leading-relaxed transition-colors">
            La psychologie n'est pas qu'une théorie. Elle s'incarne dans la pratique. <br/>
            Lire clairement, appliquez concrètement, et soigner son monde.
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((p) => {
            // 2. Logique d'attribution des images spécifiques et SÉCURISÉE
            let productImage = p.image; // Image par défaut de data.ts

            // Condition spécifique pour l'Introduction
            if (p.slug === "introduction-aux-guides") {
              productImage = "/introduction.jpg";
            }

            // Condition spécifique pour Haut Potentiel (On couvre les deux slugs probables)
            if (p.slug === "hauts-potentiels" || p.slug === "haut-potentiel-intellectuel") {
              productImage = "/hpi.jpg"; // Pointant vers public/hpi.jpg
            }

            // 3. Sécurité d'affichage si productImage est indéfini
            const finalImage = productImage || "/placeholder.jpg"; // Placeholder si rien n'est trouvé

            return (
              <Link
                key={p.slug}
                href={`/boutique/${p.slug}`}
                className="group block relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/70 backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative aspect-3/4 w-full overflow-hidden">
                  <Image 
                    src={finalImage} 
                    alt={p.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105 sepia-[0.1]" 
                    sizes="(min-width:1024px) 33vw, 50vw" 
                  />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white backdrop-blur-sm">
                     <p className="text-sm italic font-serif leading-relaxed mb-2 line-clamp-4">{p.summary}</p>
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">Voir le Protocole →</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-slate-900 italic group-hover:text-blue-600 transition-colors">{p.title}</h3>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}