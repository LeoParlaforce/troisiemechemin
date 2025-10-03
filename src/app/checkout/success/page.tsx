"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { products } from "@/app/boutique/data"

type TrackId = "t1-fr" | "t2-fr" | "t1-en" | "t2-en"

function gcalUrl(p:{title:string;start:string;end:string;details?:string;location?:string;ctz?:string;recur?:string}) {
  const q = new URLSearchParams()
  q.set("text", p.title); q.set("dates", `${p.start}/${p.end}`)
  if (p.details) q.set("details", p.details)
  if (p.location) q.set("location", p.location)
  q.set("ctz", p.ctz || "Europe/Paris")
  if (p.recur) q.set("recur", `RRULE:${p.recur}`)
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&${q.toString()}`
}

const TRACK_GCAL: Record<TrackId,{title:string;start:string;end:string}> = {
  "t1-fr": { title: "Groupe Thème 1 — FR", start: "20260107T170000", end: "20260107T183000" },
  "t2-fr": { title: "Groupe Thème 2 — FR", start: "20260114T170000", end: "20260114T183000" },
  "t1-en": { title: "Group Theme 1 — ENG", start: "20260110T190000", end: "20260110T203000" },
  "t2-en": { title: "Group Theme 2 — ENG", start: "20260117T190000", end: "20260117T203000" },
}

export default function SuccessPage() {
  const sp = useSearchParams()
  const sid = sp.get("session_id") || sp.get("id")
  const [track, setTrack] = useState<TrackId | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (!sid) return
    ;(async () => {
      const r = await fetch(`/api/checkout/success?id=${encodeURIComponent(sid)}`, { cache: "no-store" })
      if (!r.ok) return
      const data = await r.json()
      setTrack(data.track ?? null)
      setEmail(data.email ?? null)
      // fallback email si le webhook n’a pas tourné
      if (data.email && data.track) {
        try {
          setSending(true)
          await fetch("/api/tracks/send-welcome", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: data.email, track: data.track }),
          })
        } finally { setSending(false) }
      }
    })()
  }, [sid])

  const gcal = useMemo(() => {
    if (!track) return ""
    const m = TRACK_GCAL[track]
    return gcalUrl({
      title: m.title,
      start: m.start,
      end: m.end,
      details: "Session en visioconférence. Le lien vous a été envoyé par email.",
      location: "Jitsi Meet",
      ctz: "Europe/Paris",
      recur: "FREQ=WEEKLY;INTERVAL=2",
    })
  }, [track])

  async function buyMember(slug: string) {
    const r = await fetch("/api/checkout/ebook-member", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
    const { url } = await r.json()
    if (url) window.location.href = url
  }

  const discounted = useMemo(() => {
    const list = products.slice()
    const hasPack = list.some(p => p.slug === "pack-integral")
    if (!hasPack) list.unshift({ slug: "pack-integral", title: "Pack intégral", image: undefined } as any)
    return list
  }, [])

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-foreground">
      <h1 className="text-3xl font-bold">Paiement confirmé</h1>
      {email && <p className="mt-2 opacity-80">Confirmation envoyée à <span className="font-medium">{email}</span>.</p>}
      {track && (
        <div className="mt-6 space-y-3">
          <p className="opacity-80">Inscription confirmée pour <strong>{track}</strong>.</p>
          <a
            href={gcal}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md border px-4 py-2 text-sm transition hover:scale-[1.02] hover:border-accent hover:text-accent"
          >
            Ajouter à Google Calendar
          </a>
          {sending && <p className="text-xs opacity-60">Envoi des infos par email…</p>}
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Guides — tarif membre</h2>
        <p className="mt-1 text-sm opacity-70">Avec votre inscription à un groupe, chaque guide est à <strong>5 €</strong> (au lieu de 9 €). Le pack intégral est à <strong>29 €</strong> (au lieu de 49 €).</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {discounted.map(p => {
            const isPack = p.slug === "pack-integral"
            const newPrice = isPack ? 29 : 5
            const oldPrice = isPack ? 49 : 9
            return (
              <article key={p.slug} className="border rounded-lg overflow-hidden">
                {p.image && <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />}
                <div className="p-4">
                  <h3 className="font-medium">{p.title}</h3>
                  <p className="mt-1 text-sm">
                    <span className="font-semibold">{newPrice} €</span>{" "}
                    <span className="opacity-60 line-through">{oldPrice} €</span>
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => buyMember(p.slug)}
                      className="px-3 py-2 rounded bg-purple-600 text-white text-sm hover:bg-purple-700 transition"
                    >
                      Acheter à {newPrice} €
                    </button>
                    <a
                      href={`/boutique/${p.slug}`}
                      className="px-3 py-2 rounded border text-sm hover:border-accent hover:text-accent transition"
                    >
                      Voir le guide
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
