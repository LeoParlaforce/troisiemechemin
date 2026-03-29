"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { products } from "@/app/boutique/data"

// FIX : suppression complète du code groupes (t1-fr, t2-fr, Jitsi, Calendar, PortalButton)
// Il reste uniquement : vérification paiement → téléchargement PDF → suggestions upsell

export default function SuccessClient() {
  const sp = useSearchParams()
  const sid = sp.get("session_id") || sp.get("id")

  const [slug, setSlug] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!sid) {
      setLoading(false)
      setError(true)
      return
    }
    fetch(`/api/checkout/success?session_id=${encodeURIComponent(sid)}`, { cache: "no-store" })
      .then(r => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then(data => {
        setSlug(data.slug ?? null)
        setEmail(data.email ?? null)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [sid])

  async function handleDownload() {
    if (!slug || !sid) return
    window.location.href = `/api/download?slug=${encodeURIComponent(slug)}&session_id=${encodeURIComponent(sid)}`
  }

  const suggestions = products
    .filter(p => p.slug !== slug && p.slug !== "introduction-aux-guides")
    .slice(0, 3)

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 font-serif">

      {/* CHARGEMENT */}
      {loading && (
        <div className="text-center py-20">
          <p className="text-slate-400 italic animate-pulse">Vérification de votre commande…</p>
        </div>
      )}

      {/* ERREUR */}
      {!loading && (error || !slug) && (
        <div className="text-center py-20 space-y-6">
          <h1 className="text-3xl font-bold italic">Une erreur est survenue.</h1>
          <p className="text-slate-500 italic">
            Si vous avez été débité, contactez-nous et nous réglerons cela immédiatement.
          </p>
          <a
            href="mailto:leo.gayrard@gmail.com?subject=Problème de téléchargement — Troisième Chemin&body=Mon identifiant de session est : "
            className="inline-block px-8 py-3 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-blue-600 transition font-sans"
          >
            Contacter le support →
          </a>
        </div>
      )}

      {/* SUCCÈS */}
      {!loading && !error && slug && (
        <div className="space-y-12">

          {/* CONFIRMATION */}
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <span className="text-green-600 text-xl">✓</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold italic tracking-tight">
              Paiement confirmé.
            </h1>
            {email && (
              <p className="text-slate-500 italic text-sm">
                Confirmation envoyée à <span className="text-slate-700 font-medium">{email}</span>
              </p>
            )}
          </div>

          {/* TÉLÉCHARGEMENT */}
          <div className="border border-slate-200 rounded-2xl p-8 bg-white/80 backdrop-blur-sm text-center space-y-4">
            <p className="text-slate-600 italic leading-relaxed">
              Votre guide est prêt. Téléchargez-le maintenant — le lien sécurisé est valable 1 heure.
            </p>
            <button
              onClick={handleDownload}
              className="inline-block px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-blue-600 transition hover:-translate-y-0.5 transform-gpu shadow-sm font-sans"
            >
              Télécharger le PDF →
            </button>
            <p className="text-slate-400 text-xs italic">
              Vérifiez vos spams si vous ne recevez pas l'email de confirmation.
            </p>
          </div>

          {/* UPSELL : app */}
          <div className="border border-blue-200 rounded-2xl p-8 bg-blue-50/50 text-center space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 font-sans">Aller plus loin</p>
            <h2 className="text-2xl font-bold italic text-slate-900">
              Envie de travailler ces thèmes avec un vrai psychologue ?
            </h2>
            <p className="text-slate-500 italic text-sm max-w-md mx-auto">
              Accès direct 1:1 via l'app Troisième Chemin. Humain, chiffré, sans IA.
            </p>
            <a
              href="https://chat.troisiemechemin.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-slate-900 transition font-sans"
            >
              Ouvrir l'App →
            </a>
          </div>

          {/* UPSELL : autres guides */}
          {suggestions.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold italic text-slate-900 text-center">
                Vous pourriez aussi aimer
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {suggestions.map(p => (
                  <Link
                    key={p.slug}
                    href={`/boutique/${p.slug}`}
                    className="group block border border-slate-200 rounded-xl overflow-hidden bg-white/80 hover:border-blue-300 hover:shadow-md transition"
                  >
                    <div className="relative aspect-3/4 w-full overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold italic text-slate-900 group-hover:text-blue-600 transition-colors text-sm">
                        {p.title}
                      </h3>
                      <p className="text-blue-600 text-xs font-bold mt-1 font-sans">{p.priceEUR}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="text-center pt-4">
            <Link
              href="/boutique"
              className="text-slate-400 hover:text-blue-600 text-sm italic transition underline underline-offset-4"
            >
              ← Retour à la Boutique
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
