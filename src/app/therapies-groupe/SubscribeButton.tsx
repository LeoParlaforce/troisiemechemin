"use client"

import { useState } from "react"

type TrackId = "t1-fr" | "t2-fr" | "t1-en" | "t2-en"

export default function SubscribeButton({
  track,
  label,
}: {
  track: TrackId
  label?: string
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function go() {
    setError(null)
    setLoading(true)
    try {
      const endpoint =
        track.startsWith("t1-en") || track.startsWith("t2-en")
          ? "/api/checkout/create"
          : "/api/subscribe"

      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track }),
      })

      const data = await r.json()
      if (!r.ok || !data?.url) {
        throw new Error(data?.error || "create_failed")
      }

      window.location.href = data.url
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erreur inconnue"
      setError(msg)
      console.error("subscribe error:", e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-start">
      <button
        type="button"
        onClick={go}
        disabled={loading}
        className={[
          "px-4 py-2 rounded bg-purple-600 text-white",
          "cursor-pointer hover:bg-purple-700 active:scale-[0.98]",
          loading ? "opacity-70 cursor-wait" : "",
          "transition-transform duration-100",
        ].join(" ")}
      >
        {loading ? "Redirection…" : label || "S’inscrire (toutes les 2 semaines)"}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}
