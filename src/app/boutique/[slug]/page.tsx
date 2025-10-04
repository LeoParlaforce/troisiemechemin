import Image from "next/image"
import { notFound } from "next/navigation"
import { products, getProductBySlug } from "../data"
import BuyButton from "./BuyButton"

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProductBySlug(params.slug)
  return {
    title: p ? `${p.title} — troisiemechemin.fr` : "Guide — troisiemechemin.fr",
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const p = getProductBySlug(slug)
  if (!p) return notFound()

  const anchorFR = p.group === "t1" ? "#t1-fr" : "#t2-fr"

  return (
    <main className="min-h-screen text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-2 md:items-start">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border">
          <Image src={p.image} alt={p.title} fill className="object-cover" priority />
        </div>
        <div>
          <a href="/boutique" className="text-sm opacity-80 hover:text-accent cursor-pointer">
            ← Retour à la Boutique
          </a>

          <h1 className="mt-3 text-4xl font-bold">{p.title}</h1>
          <p className="mt-2 text-lg opacity-80">{p.price}</p>

          <p className="mt-6 text-base opacity-90">{p.summary}</p>

          <h2 className="mt-8 text-xl font-semibold">Chapitres</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2">
            {p.chapters.map((c, i) => <li key={i}>{c}</li>)}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <BuyButton slug={p.slug} title={p.title} image={p.image} />
            <a
              href={`/therapies-groupe${anchorFR}`}
              className="rounded-md border px-6 py-3 text-base transition hover:border-accent hover:text-accent cursor-pointer"
            >
              Rejoindre le groupe (FR)
            </a>
          </div>

          <p className="mt-6 text-sm opacity-70">
            Format PDF. Lecture ordinateur et mobile. Mises à jour incluses.
          </p>
        </div>
      </section>
    </main>
  )
}
