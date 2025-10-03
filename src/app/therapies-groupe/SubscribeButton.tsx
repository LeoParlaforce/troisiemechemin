"use client"

import { useState } from "react"

type TrackId = "t1-fr" | "t2-fr"

export default function SubscribeButton({
  track,
  label = "S’inscrire (toutes les 2 semaines)",
}: { track: TrackId; label?: string }) {
  const [loading, setLoading] = useState(false)

  async function go() {
    try {
      setLoading(true)
      const r = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track }),
      })
      const { url } = await r.json()
      if (!r.ok || !url) throw new Error("create_failed")
      window.location.href = url
    } finally {
      setLoading(false)
    }
  }

  return (
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
      {loading ? "Redirection…" : label}
    </button>
  )
}
