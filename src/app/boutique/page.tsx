// app/boutique/page.tsx
import Image from "next/image"
import { products } from "./data"

export default function Boutique() {
  return (
    <main className="min-h-screen text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h1 className="font-serif text-4xl md:text-5xl font-bold">Boutique</h1>

        <p className="mt-4 text-lg opacity-80">
          La psychologie n&apos;est pas qu&apos;un corpus théorique, elle est surtout intéressante dans sa pratique.
          Elle est une lecture dont l&apos;intérêt en est l&apos;application dans votre vie de tous les jours.
          Portez un regard différent, soignez votre monde.
          <br />
          <span className="text-sm opacity-60">
            Inscrit à un groupe ? Tarifs membres : guides 5 €, pack 29 €.
          </span>
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <a
              key={p.slug}
              href={`/boutique/${p.slug}`}
              className="group block relative overflow-hidden rounded-xl border bg-white/50 backdrop-blur transition duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
            >
              {/* Couverture + overlay limité à l’image */}
              <div className="relative aspect-[3/4] w-full">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-100" />
                )}

                <div className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div className="h-full overflow-y-auto bg-black/65 text-white backdrop-blur-sm p-4 md:p-5">
                    <h3 className="font-serif text-lg md:text-xl font-semibold">{p.title}</h3>
                    {p.summary && (
                      <p className="mt-2 text-sm md:text-base text-white/90">{p.summary}</p>
                    )}
                    {Array.isArray(p.chapters) && p.chapters.length > 0 && (
                      <>
                        <h4 className="mt-3 font-semibold">Chapitres</h4>
                        <ul className="mt-1 list-disc pl-5 text-sm md:text-base space-y-0.5">
                          {p.chapters.map((c: string, i: number) => <li key={i}>{c}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Pied de carte */}
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-serif text-base md:text-lg font-semibold">{p.title}</h3>
                  {p.price && <p className="text-sm opacity-70">{p.price}</p>}
                </div>
                <span className="text-sm opacity-70 group-hover:opacity-100">Voir</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
