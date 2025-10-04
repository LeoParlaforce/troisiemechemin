import NextLink from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen text-foreground">
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              Psychologie : incarner la vie, découvrez votre monde
            </h1>
            <p className="mt-5 text-xl/8 opacity-80">
              Accompagnement psychologique et guides pratiques. E-books et groupe de paroles par visio en ligne.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <NextLink
                href="/boutique"
                className="rounded-md bg-accent px-6 py-3 text-white text-base font-medium
                           transition transform-gpu hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Découvrir les guides
              </NextLink>
              <NextLink
                href="/therapies-groupe"
                className="rounded-md border px-6 py-3 text-base font-medium
                           transition transform-gpu hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-md
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Groupes de parole thématiques en visio
              </NextLink>
            </div>
          </div>

          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl border">
            <Image
              src="/hero.jpg"
              alt="Troisième Chemin — regard sans haine"
              fill
              className="object-cover object-[50%_20%] transition transform-gpu hover:scale-[1.03]"
              priority
              sizes="(min-width:768px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* 3 points clés */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-semibold">Ce que tu trouveras ici</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {/* Carte 1 — Guides */}
          <NextLink
            href="/boutique"
            aria-label="Voir les guides complets"
            className="group block rounded-xl border overflow-hidden transition
                       hover:-translate-y-1 hover:shadow-xl hover:border-accent transform-gpu"
          >
            <div className="relative aspect-[3/2]">
              <Image
                src="/guide.jpg"
                alt="Guides complets"
                fill
                className="object-cover transition transform-gpu group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold transition group-hover:text-accent">
                Guides complets
              </h3>
              <p className="mt-2 text-base opacity-80">
                E-book sous format PDF : Estime de soi, Dépression, Anxiété, Relations amoureuses, Solitude,
                Troubles du sommeil, Troubles du spectre autistique, Troubles du comportement alimentaire, TDAH,
                Procrastination et créativité, Hauts potentiels.
              </p>
            </div>
          </NextLink>

          {/* Carte 2 — Groupes */}
          <NextLink
            href="/therapies-groupe"
            aria-label="Voir les groupes de parole"
            className="group block rounded-xl border overflow-hidden transition
                       hover:-translate-y-1 hover:shadow-xl hover:border-accent transform-gpu"
          >
            <div className="relative aspect-[3/2]">
              <Image
                src="/group.jpg"
                alt="Groupes de parole"
                fill
                className="object-cover transition transform-gpu group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold transition group-hover:text-accent">
                Groupes de parole
              </h3>
              <p className="mt-2 text-base opacity-80">
                Séances thématiques bimensuelles en visio animées par un psychologue expert.
              </p>
            </div>
          </NextLink>

          {/* Carte 3 — non clickable */}
          <article className="rounded-xl border p-6 transition hover:shadow-md hover:border-accent/50">
            <h3 className="text-lg font-semibold">Approche humaniste</h3>
            <p className="mt-2 text-base opacity-80">
              Nous travaillons sans jugement, avec logique et sentiment. Devenez vous-même le soigneur de votre monde.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}
