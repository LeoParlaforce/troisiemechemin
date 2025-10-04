"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { products } from "@/app/boutique/data"

type TrackId = "t1-fr" | "t2-fr"

const TRACK_GCAL: Record<TrackId, { title: string; start: string; end: string }> = {
  "t1-fr": { title: "Groupe Thème 1 — FR", start: "20260107T170000", end: "20260107T183000" },
  "t2-fr": { title: "Groupe Thème 2 — FR", start: "20260114T170000", end: "20260114T183000" },
}

function gcalUrl(p:{title:string;start:string;end:string;details?:string;location?:string;ctz?:string;recur?:string}) {
  const q = new URLSearchParams()
  q.set("text", p.title)
  q.set("dates", `${p.start}/${p.end}`)
  if (p.details) q.set("details", p.details)
  if (p.location) q.set("location", p.location)
  q.set("ctz", p.ctz || "Europe/Paris")
  if (p.recur) q.set("recur", `RRULE:${p.recur}`)
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&${q.toString()}`
}

export default function SuccessClient() {
  const sp = useSearchParams()
  const sid = sp.get("session_id") || sp.get("id")

  const [track, setTrack] = useState<TrackId | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [slug, setSlug] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (!sid) return
    ;(async () => {
      const r = await fetch(`/api/checkout/success?id=${encodeURIComponent(sid)}`, { cache: "no-store" })
      if (!r.ok) return
      const data: { track?: TrackId; email?: string; slug?: string } = await r.json()
      setTrack(data.track ?? null)
      setEmail(data.email ?? null)
      setSlug(data.slug ?? null)
      if (data.email && data.track) {
        setSending(true)
        await fetch("/api/tracks/send-welcome", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email, track: data.track }),
        })
        setSending(false)
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

  const suggestions = useMemo(() => {
    return products.filter(p => p.slug !== slug).slice(0, 6)
  }, [slug])

  async function handleDownload() {
    if (!slug) return
    const link = document.createElement("a")
    link.href = `/boutique/${slug}?download=1`
    link.download = `${slug}.pdf`
    link.click()
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-foreground">
      <h1 className="text-3xl font-bold">Paiement confirmé</h1>
      {email && (
        <p className="mt-2 opacity-80">
          Confirmation envoyée à <span className="font-medium">{email}</span>.
        </p>
      )}

      {/* Groupes */}
      {track && (
        <div className="mt-6 space-y-3">
          <p className="opacity-80">
            Inscription confirmée pour <strong>{track}</strong>.
          </p>
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

      {/* E-book : vrai téléchargement */}
      {!track && slug && (
        <div className="mt-8">
          <button
            onClick={handleDownload}
            className="rounded-md bg-purple-600 text-white px-4 py-2 text-sm hover:bg-purple-700 transition"
          >
            Télécharger maintenant
          </button>
        </div>
      )}

      {/* Suggestions de guides */}
      {!track && suggestions.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Autres guides qui peuvent vous intéresser</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map(p => (
              <article key={p.slug} className="border rounded-lg overflow-hidden">
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-medium">{p.title}</h3>
                  <a
                    href={`/boutique/${p.slug}`}
                    className="inline-block mt-3 text-sm text-purple-600 hover:underline"
                  >
                    Voir le guide
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
