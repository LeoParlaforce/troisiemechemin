import Stripe from "stripe"
import Link from "next/link"
import Image from "next/image"
import { products } from "../boutique/data"

const GROUP_IMG = "/group.jpg" // mets ici l'image "groupes de parole" de ta home

export default async function Success({
  searchParams,
}: { searchParams: { session_id?: string } }) {
  const sessionId = searchParams.session_id
  if (!sessionId) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-bold">Paiement confirmé</h1>
        <a href="/boutique" className="mt-6 inline-block rounded-md border px-4 py-2">Retour Boutique</a>
      </main>
    )
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const full = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data.price.product", "customer_details"],
  })

  const li = full.line_items?.data?.[0]
  const prod = li?.price?.product as Stripe.Product | undefined
  const slug = prod?.metadata?.slug || ""
  const isPack = slug === "pack-integral"
  const p = products.find(x => x.slug === slug)
  const displayTitle = isPack
    ? "Pack intégral"
    : p
    ? `${p.title} : guide psychologique & pratique`
    : (prod?.name || "E-book")

  const pack = products.find(x => x.slug === "pack-integral")
  const packImg = pack?.image || "/pack.jpg"
  const anchorFR = p?.group === "t1" ? "#t1-fr" : "#t2-fr"

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Paiement confirmé</h1>
      <p className="mt-3 opacity-80">Merci. Téléchargez votre fichier et poursuivez si vous le souhaitez.</p>

      {/* Téléchargement */}
      <div className="mt-6 rounded border p-4 flex items-center justify-between">
        <div className="font-semibold">{displayTitle}</div>
        {!isPack && (
          <a
            href={`/api/download?session_id=${encodeURIComponent(sessionId)}&slug=${encodeURIComponent(slug)}`}
            className="rounded-md bg-accent px-3 py-2 text-white text-sm"
          >
            Télécharger le PDF
          </a>
        )}
        {isPack && (
          <Link href="/boutique/pack-integral" className="rounded-md border px-3 py-2 text-sm">
            Voir le pack
          </Link>
        )}
      </div>

      {/* Suggestions visuelles */}
      {!isPack && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {/* Pack intégral */}
          <Link href="/boutique/pack-integral" className="group block overflow-hidden rounded-xl border hover:shadow-md">
            <div className="relative aspect-[3/2]">
              <Image src={packImg} alt="Pack intégral" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="font-serif font-semibold">Pack intégral</div>
                <div className="text-sm opacity-70">Tous les guides · 49 €</div>
              </div>
              <span className="rounded-md border px-3 py-1.5 text-sm transition group-hover:border-accent group-hover:text-accent">
                Voir
              </span>
            </div>
          </Link>

          {/* Groupe lié */}
          <Link href={`/therapies-groupe${anchorFR}`} className="group block overflow-hidden rounded-xl border hover:shadow-md">
            <div className="relative aspect-[3/2]">
              <Image src={GROUP_IMG} alt="Groupes de parole" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="font-serif font-semibold">Groupes de parole</div>
                <div className="text-sm opacity-70">Rejoindre le thème lié</div>
              </div>
              <span className="rounded-md border px-3 py-1.5 text-sm transition group-hover:border-accent group-hover:text-accent">
                Rejoindre
              </span>
            </div>
          </Link>
        </div>
      )}

      <a href="/boutique" className="mt-8 inline-block rounded-md border px-4 py-2">Retour Boutique</a>
    </main>
  )
}
