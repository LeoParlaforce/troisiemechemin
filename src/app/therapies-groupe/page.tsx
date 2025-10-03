// app/therapies-groupe/page.tsx
"use client"
export const dynamic = "force-dynamic"

import { useEffect, useMemo, useState } from "react"
import SubscribeButton from "./SubscribeButton"
import InfoForm from "./InfoForm"
import { products } from "../boutique/data"

type TrackId = "t1-fr" | "t2-fr"
type Track = {
  id: TrackId
  title: string
  lang: "FR"
  week: "A" | "B"
  dayTime: string
  desc: string
  start: string
  imgPool: string[]
}
type Availability = Record<TrackId, { count: number; spotsLeft: number; full: boolean }>

function priceText() {
  return "24 € toutes les 2 semaines"
}

function GroupCard({ t, avail }: { t: Track; avail: Availability[TrackId] }) {
  const [bg, setBg] = useState<string>("")
  const pick = () => {
    if (!t.imgPool.length) return
    const i = Math.floor(Math.random() * t.imgPool.length)
    setBg(t.imgPool[i]!)
  }
  const clear = () => setBg("")

  return (
    <article
      id={t.id}
      onMouseEnter={pick}
      onMouseLeave={clear}
      className="relative overflow-hidden rounded-xl border p-5 transition hover:shadow-md hover:border-accent/50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          backgroundImage: bg ? `url(${bg})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: bg ? 0.18 : 0,
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t.title}</h2>
          <span className={`text-xs px-2 py-1 rounded border ${avail.full ? "border-red-300 text-red-700" : ""}`}>
            FR · Semaine {t.week}{avail.full ? " · Complet" : ""}
          </span>
        </div>

        <p className="mt-2 text-sm opacity-80">{t.dayTime}</p>
        <p className="mt-1 text-sm">
          <span className="font-medium">{t.start}</span>
          <span className="opacity-70"> · puis une séance toutes les deux semaines</span>
        </p>
        <p className="mt-3 text-sm opacity-80">{t.desc}</p>
        <ul className="mt-4 text-sm space-y-1">
          <li>• Max. 10 personnes</li>
          <li>• Visio-conférence</li>
          <li>• {priceText()}</li>
          {!avail.full && <li>• {avail.spotsLeft} place(s) restante(s)</li>}
        </ul>

        <div className="mt-5 flex flex-wrap gap-3">
          {avail.full ? (
            <a
              href={`#inscription-${t.id}-wait`}
              className="cursor-pointer rounded-md border px-4 py-2 text-sm transition hover:scale-[1.02] hover:border-accent hover:text-accent"
            >
              Rejoindre la liste d’attente
            </a>
          ) : (
            <SubscribeButton track={t.id} label="S’inscrire (toutes les 2 semaines)" />
          )}

          {!avail.full && (
            <a
              href={`#inscription-${t.id}`}
              className="cursor-pointer rounded-md border px-4 py-2 text-sm transition hover:scale-[1.02] hover:border-accent hover:text-accent"
            >
              Demande d’info
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Groupes() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const tracks = useMemo<Track[]>(() => {
    const t1Imgs = products.filter(p => p.group === "t1" && p.image).map(p => p.image)
    const t2Imgs = products.filter(p => p.group === "t2" && p.image).map(p => p.image)
    return [
      {
        id: "t1-fr",
        title: "Thème 1 — Anxiété & régulation",
        lang: "FR",
        week: "A",
        dayTime: "Mercredi 17:00–18:30 (Europe/Paris)",
        desc: "Tolérance à l’incertitude, expositions, outils de régulation.",
        start: "Démarrage : mercredi 7 jan 2026",
        imgPool: t1Imgs,
      },
      {
        id: "t2-fr",
        title: "Thème 2 — Relations & estime de soi",
        lang: "FR",
        week: "B",
        dayTime: "Mercredi 17:00–18:30 (Europe/Paris)",
        desc: "Parole claire, positions, actes de valeur et limites.",
        start: "Démarrage : mercredi 14 jan 2026",
        imgPool: t2Imgs,
      },
    ]
  }, [])

  const [avail, setAvail] = useState<Availability>({
    "t1-fr": { count: 0, spotsLeft: 10, full: false },
    "t2-fr": { count: 0, spotsLeft: 10, full: false },
  })

  useEffect(() => {
    let ok = true
    ;(async () => {
      const res = await fetch("/api/tracks/availability", { cache: "no-store" })
      if (!res.ok) return
      const data = (await res.json()) as Partial<Record<TrackId, Availability[TrackId]>>
      if (ok) {
        setAvail(a => ({
          ...a,
          ...(data["t1-fr"] ? { "t1-fr": data["t1-fr"]! } : {}),
          ...(data["t2-fr"] ? { "t2-fr": data["t2-fr"]! } : {}),
        }))
      }
    })()
    return () => {
      ok = false
    }
  }, [])

  if (!mounted) return null

  return (
    <main suppressHydrationWarning className="min-h-screen text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold">Groupes de parole thématiques</h1>
      <p className="mt-3 text-lg opacity-80">
  Début <strong>janvier 2026</strong>. Inscrivez-vous au(x) groupe(s) de votre choix.
  Séance de 90 minutes, 1 séance visio-conférence toutes les 2 semaines.
  Sur le même créneau&nbsp;: thème 1 groupe A semaine A, thème 2 groupe B semaine B.
</p>
        <p className="mt-2 text-sm opacity-80">
          Vous ne prendrez la parole que si vous le souhaitez, aux groupes de parole vous n&apos;êtes obligé de rien.
          Certains membres viennent pour écouter, d&apos;autres aussi pour participer. C&apos;est à vous de décider.
        </p>
        <p className="mt-2 text-sm opacity-70">
          Inscrit à un groupe ? Tarifs membres sur les e-books : guides <strong>5 €</strong> (au lieu de 9 €) · pack intégral <strong>29 €</strong> (au lieu de 49 €).
        </p>
      </section>

      <section id="creneaux" className="mx-auto max-w-6xl px-6 pb-20 grid gap-6 md:grid-cols-2">
        {tracks.map(t => <GroupCard key={t.id} t={t} avail={avail[t.id]} />)}
      </section>

      <section id="inscription" className="mx-auto max-w-3xl px-6 pb-24">
        <h2 className="text-2xl font-semibold">Demande d’info</h2>

        <div id="inscription-t1-fr" />
        <div id="inscription-t2-fr" />

        <InfoForm />
      </section>
    </main>
  )
}
