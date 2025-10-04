import Stripe from "stripe"
import PortalButton from "./PortalButton"

type TrackId = "t1-fr" | "t2-fr"

export default async function SubSuccess({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string | string[] }>
}) {
  const sp = await searchParams
  const sid = Array.isArray(sp.session_id) ? sp.session_id[0] : sp.session_id

  if (!sid) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-bold">Inscription confirmée</h1>
        <p className="mt-3 opacity-80">
          Retour aux{" "}
          <a href="/therapies-groupe" className="underline">
            Groupes
          </a>.
        </p>
      </main>
    )
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const s = await stripe.checkout.sessions.retrieve(sid, { expand: ["subscription"] })
  const sub = (s.subscription ?? null) as Stripe.Subscription | null
  const track = sub?.metadata?.track as TrackId | undefined

  const title =
    track === "t1-fr" ? "Thème 1 — FR" :
    track === "t2-fr" ? "Thème 2 — FR" :
    "Groupe"

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Inscription confirmée</h1>
      <p className="mt-3 opacity-80">
        Prélèvement automatique toutes les 2 semaines. Vous pouvez arrêter à tout moment.
      </p>

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
        <a
          href="/therapies-groupe"
          className="rounded-md border px-4 py-3 text-center transition hover:border-accent hover:text-accent"
        >
          Voir les groupes
        </a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/boutique"
          className="rounded-md border px-4 py-3 text-center transition hover:border-accent hover:text-accent"
        >
          Découvrir les guides
        </a>
      </div>
    </main>
  )
}
