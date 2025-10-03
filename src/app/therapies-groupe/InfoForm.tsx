"use client"

import { useEffect, useState } from "react"

type TrackId = "t1-fr" | "t2-fr"

export default function InfoForm() {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<string | null>(null)
  const [track, setTrack] = useState<TrackId | "">("")
  const [type, setType] = useState<"info" | "waitlist">("info")

  // pré-sélection via #inscription-<track> ou #inscription-<track>-wait
  useEffect(() => {
    const h = window.location.hash.replace("#inscription-", "")
    const isWait = h.endsWith("-wait")
    const t = h.replace("-wait", "")
    if (["t1-fr", "t2-fr"].includes(t)) {
      setTrack(t as TrackId)
      if (isWait) setType("waitlist")
    }
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setOk(null)
    const form = new FormData(e.currentTarget)
    const payload = {
      type,
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      track: String(form.get("track") || ""),
      message: String(form.get("message") || ""),
    }

    try {
      setLoading(true)
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (res.ok) setOk(type === "waitlist" ? "Ajouté à la liste d’attente." : "Demande envoyée.")
      else setOk("Erreur. Réessayez.")
    } catch {
      setOk("Erreur réseau.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-3">
      <div className="flex gap-3">
        <label className="inline-flex items-center gap-2 text-sm border rounded px-3 py-2 cursor-pointer">
          <input
            type="radio"
            name="type"
            value="info"
            checked={type === "info"}
            onChange={() => setType("info")}
          />
          Demande d’info
        </label>
        <label className="inline-flex items-center gap-2 text-sm border rounded px-3 py-2 cursor-pointer">
          <input
            type="radio"
            name="type"
            value="waitlist"
            checked={type === "waitlist"}
            onChange={() => setType("waitlist")}
          />
          Liste d’attente
        </label>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <input required name="name" placeholder="Votre nom" className="w-full border rounded p-3" />
        <input required type="email" name="email" placeholder="Votre email" className="w-full border rounded p-3" />
      </div>

      <select
        name="track"
        value={track}
        onChange={e => setTrack(e.target.value as TrackId | "")}
        className="w-full border rounded p-3"
        required
      >
        <option value="" disabled>Choisir un groupe…</option>
        <option value="t1-fr">Thème 1 — FR</option>
        <option value="t2-fr">Thème 2 — FR</option>
      </select>

      <textarea name="message" placeholder="Votre question" className="w-full border rounded p-3" rows={5} />

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className={[
          "px-4 py-2 rounded bg-purple-600 text-white",
          "cursor-pointer hover:bg-purple-700 active:scale-[0.98]",
          loading ? "opacity-70 cursor-wait" : "",
          "transition-transform duration-100",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
        ].join(" ")}
      >
        {loading ? "Envoi…" : "Envoyer"}
      </button>

      {ok && <p className="text-green-700">{ok}</p>}
    </form>
  )
}
