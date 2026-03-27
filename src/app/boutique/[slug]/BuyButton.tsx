"use client"
import { useState, useEffect } from "react"

function svgCursor(emoji: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><text y='24' font-size='24'>${emoji}</text></svg>`
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}") 0 0, auto`
}

export default function BuyButton({
  slug,
  priceEUR,
  priceUSD,
  image,
}: { 
  slug: string; 
  priceEUR: string; 
  priceUSD: string;
  image: string;
}) {
  const [loading, setLoading] = useState(false)
  const [hover, setHover] = useState(false)
  const [displayPrice, setDisplayPrice] = useState<string>("")
  const [activeCurrency, setActiveCurrency] = useState<string>("EUR")

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const isUSZone = timeZone.includes("America") || timeZone.includes("US") || timeZone.includes("Canada")
    
    if (slug === "introduction-aux-guides") {
      setDisplayPrice("Gratuit")
    } else {
      if (isUSZone) {
        setDisplayPrice(priceUSD)
        setActiveCurrency("USD")
      } else {
        setDisplayPrice(priceEUR)
        setActiveCurrency("EUR")
      }
    }
  }, [priceEUR, priceUSD, slug])

  const isFree = slug === "introduction-aux-guides"
  const cursor = loading ? svgCursor("⏳") : hover ? svgCursor("✨") : svgCursor("🪄")

  async function go() {
    if (isFree) {
      window.open("/Introduction aux guides.pdf", "_blank")
      return
    }

    try {
      setLoading(true)
      const r = await fetch("/api/checkout/ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, image, currency: activeCurrency }),
      })
      const data = await r.json()
      if (r.ok && data.url) { 
        window.location.href = data.url
        return 
      }
    } catch (e) {
      alert("Achat indisponible pour le moment.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex flex-col items-start">
      {displayPrice && (
        <span className="mb-2 text-2xl font-light text-slate-900 italic whitespace-nowrap">
          {displayPrice}
        </span>
      )}
      
      <button
        type="button"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={go}
        disabled={loading}
        style={{ cursor }}
        className={`h-13 rounded-md px-8 text-base font-bold uppercase tracking-tight bg-slate-900 text-white transition transform-gpu hover:-translate-y-1 hover:shadow-lg active:scale-95 flex items-center justify-center ${loading ? "opacity-70" : ""}`}
      >
        {loading ? "..." : isFree ? "Accès Libre" : "Commander"}
      </button>
    </div>
  )
}