"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { products } from "@/app/boutique/data"

export default function SuccessClient() {
  const sp = useSearchParams()
  const sid = sp.get("session_id") || sp.get("id")

  const [email, setEmail] = useState<string | null>(null)
  const [slug, setSlug] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sid) {
      setLoading(false)
      return
    }
    ;(async () => {
      try {
        const r = await fetch(`/api/checkout/success?session_id=${encodeURIComponent(sid)}`, { cache: "no-store" })
        if (r.ok) {
          const data: { email?: string; slug?: string } = await r.json()
          setEmail(data.email ?? null)
          setSlug(data.slug ?? null)
        }
      } catch (e) {
        console.error("Erreur de récupération de la session", e)
      } finally {
        setLoading(false)
      }
    })()
  }, [sid])

  const suggestions = useMemo(() => {
    return products.filter(p => p.slug !== slug).slice(0, 3)
  }, [slug])

  // Fonction de téléchargement synchronisée avec ton API sécurisée
  async function handleDownload() {
    if (!slug || !sid) return
    window.location.href = `/api/download?slug=${slug}&session_id=${sid}`
  }

  if (loading) {
    return <main className="max-w-5xl mx-auto px-6 py-16 text-center">Chargement de votre commande...</main>
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-foreground">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-purple-600">Paiement confirmé !</h1>
        {email && (
          <p className="mt-4 text-lg opacity-80 italic">
            Un e-mail de confirmation a été envoyé à <span className="font-bold">{email}</span>.
          </p>
        )}
      </div>

      {/* Zone de Téléchargement */}
      {slug ? (
        <div className="max-w-md mx-auto p-10 border border-white/20 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl text-center">
          <p className="mb-6 text-sm uppercase tracking-widest opacity-50 font-bold">Votre guide est prêt</p>
          <button
            onClick={handleDownload}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-md font-bold uppercase tracking-tighter transition-transform hover:-translate-y-1 active:scale-95 shadow-lg"
          >
            Télécharger le PDF
          </button>
        </div>
      ) : (
        <div className="text-center text-red-500 italic">
          Session introuvable. Veuillez vérifier vos e-mails pour accéder à votre guide.
        </div>
      )}

      {/* Suggestions de guides */}
      {suggestions.length > 0 && (
        <section className="mt-24 border-t border-white/10 pt-12">
          <h2 className="text-2xl font-serif font-bold text-center">Continuer la lecture</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map(p => (
              <article key={p.slug} className="group flex flex-col bg-white/5 rounded-xl overflow-hidden border border-white/10 transition hover:border-purple-500/50">
                {p.image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <h3 className="font-serif font-bold text-lg">{p.title}</h3>
                  <a
                    href={`/boutique/${p.slug}`}
                    className="mt-4 text-sm font-bold text-purple-600 uppercase tracking-widest hover:text-purple-400"
                  >
                    Voir le guide →
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