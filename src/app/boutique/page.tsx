import Image from "next/image"
import Link from "next/link"
import { products } from "./data"

export const metadata = {
  title: "Boutique | troisiemechemin.fr",
  description: "Accédez à nos guides de restructuration psychologique.",
}

export default function Boutique() {
  return (
    <main className="min-h-screen text-foreground bg-transparent">
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">Boutique</h1>

        <p className="mt-4 text-lg opacity-80 max-w-2xl leading-relaxed">
          La psychologie n&apos;est pas qu&apos;un corpus théorique, elle est surtout intéressante dans sa pratique.
          Appliquez ces lectures dans votre vie de tous les jours. Soignez votre monde.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/boutique/${p.slug}`}
              className="group block relative overflow-hidden rounded-xl border bg-white/40 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                />

                {/* Overlay au survol - Uniquement le contenu informatif */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/60 backdrop-blur-sm p-6 text-white overflow-y-auto">
                  <h3 className="font-serif text-xl font-bold">{p.title}</h3>
                  <p className="mt-3 text-sm opacity-90 leading-relaxed italic">{p.summary}</p>
                  <div className="mt-4 h-px w-10 bg-purple-400" />
                  <ul className="mt-4 space-y-1 text-xs opacity-80">
                    {p.chapters.slice(0, 5).map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))}
                    {p.chapters.length > 5 && <li>...</li>}
                  </ul>
                </div>
              </div>

              {/* Pied de carte épuré */}
              <div className="flex items-center justify-between p-5">
                <h3 className="font-serif text-lg font-bold leading-tight">{p.title}</h3>
                <span className="text-sm font-semibold opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-4">
                  {p.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}