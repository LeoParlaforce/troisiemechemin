"use client"
import { useState } from "react"

function svgCursor(emoji: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><text y='24' font-size='24'>${emoji}</text></svg>`
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}") 0 0, auto`
}

export default function BuyButton({ slug, title }: { slug: string; title: string }) {
  const [loading, setLoading] = useState(false)
  const [hover, setHover] = useState(false)

  const cursor = loading ? svgCursor("⏳") : hover ? svgCursor("✨") : svgCursor("🪄")

  async function go() {
    try {
      setLoading(true)

      // 1) tente tarif membre
      const m = await fetch("/api/checkout/ebook-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      })
      if (m.ok) {
        const { url } = await m.json()
        if (url) { window.location.href = url; return }
      }

      // 2) fallback prix public
      const r = await fetch("/api/checkout/ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      })
      const { url } = await r.json()
      if (r.ok && url) { window.location.href = url; return }

      alert("Achat indisponible pour le moment.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={go}
      disabled={loading}
      style={{ cursor }}
      className={[
        "rounded-md px-6 py-3 text-base bg-purple-600 text-white",
        "hover:bg-purple-700 transition active:scale-[0.98]",
        loading ? "opacity-70" : "",
      ].join(" ")}
      title={loading ? "Redirection…" : `Acheter « ${title} »`}
    >
      {loading ? "Redirection…" : "Acheter"}
    </button>
  )
}
