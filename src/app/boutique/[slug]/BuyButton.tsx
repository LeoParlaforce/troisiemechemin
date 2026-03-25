"use client"
import { useState } from "react"

function svgCursor(emoji: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><text y='24' font-size='24'>${emoji}</text></svg>`
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}") 0 0, auto`
}

export default function BuyButton({
  slug,
  title,
  image,
  price,
}: { slug: string; title: string; image: string; price: string }) {
  const [loading, setLoading] = useState(false)
  const [hover, setHover] = useState(false)

  // Vérification stricte
  const isFree = slug === "introduction-aux-guides" || price === "Gratuit"
  const cursor = loading ? svgCursor("⏳") : hover ? svgCursor("✨") : svgCursor("🪄")

  async function go() {
    if (isFree) {
      // Route exacte basée sur ton fichier dans /public/
      // Le navigateur transforme les espaces en %20 automatiquement
      window.open("/Introduction aux guides.pdf", "_blank")
      return
    }

    try {
      setLoading(true)
      const r = await fetch("/api/checkout/ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, image }),
      })
      const { url } = await r.json()
      if (r.ok && url) { 
        window.location.href = url
        return 
      }
      alert("Une erreur est survenue lors de l'accès au paiement.")
    } catch (e) {
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
      className={`rounded-md px-8 py-3 text-base font-bold uppercase tracking-tight bg-purple-600 text-white transition transform-gpu hover:-translate-y-1 hover:shadow-lg active:scale-95 ${loading ? "opacity-70" : ""}`}
    >
      {loading ? "Redirection…" : isFree ? "Accès Libre" : "Acheter"}
    </button>
  )
}