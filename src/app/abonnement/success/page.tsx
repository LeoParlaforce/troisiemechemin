import Stripe from "stripe"
import Link from "next/link"
import PortalButton from "./PortalButton"

export default async function SubSuccess({ searchParams }:{ searchParams:{ session_id?: string } }) {
  const sid = searchParams.session_id
  if (!sid) return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Inscription confirmée</h1>
      <p className="mt-3 opacity-80">Retour aux <a className="underline" href="/therapies-groupe">Groupes</a>.</p>
    </main>
  )

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const s = await stripe.checkout.sessions.retrieve(sid, { expand: ["subscription"] })
  const track = (s.subscription as any)?.metadata?.track as "t1-fr"|"t2-fr"|"t1-en"|"t2-en" | undefined

  const title = track === "t1-fr" ? "Thème 1 — FR"
    : track === "t2-fr" ? "Thème 2 — FR"
    : track === "t1-en" ? "Theme 1 — ENG"
    : track === "t2-en" ? "Theme 2 — ENG"
    : "Groupe"

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Inscription confirmée</h1>
      <p className="mt-3 opacity-80">Prélèvement automatique toutes les 2 semaines. Vous pouvez arrêter à tout moment.</p>

      <div className="mt-6 rounded border p-4 space-y-3">
        <div className="font-semibold">{title}</div>
        {track && (
          <a
            href={`/api/ics?track=${encodeURIComponent(track)}`}
            className="inline-block rounded-md bg-accent px-4 py-2 text-white text-sm"
          >
            Ajouter au calendrier (.ics)
          </a>
        )}
        <PortalButton sessionId={sid} />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link href="/therapies-groupe" className="rounded-md border px-4 py-3 text-center transition hover:border-accent hover:text-accent">
          Voir les groupes
        </Link>
        <Link href="/boutique" className="rounded-md border px-4 py-3 text-center transition hover:border-accent hover:text-accent">
          Découvrir les guides
        </Link>
      </div>
    </main>
  )
}
