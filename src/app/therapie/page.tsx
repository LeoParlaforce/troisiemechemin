"use client"

import Link from "next/link"
import { useState } from "react"

export default function TherapiePage() {
  const [loading, setLoading] = useState<"reduced" | "full" | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubscribe = async (tier: "reduced" | "full") => {
    setLoading(tier)
    setError(null)
    try {
      const res = await fetch("/api/checkout/signal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, segment: "therapie" }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || "Une erreur est survenue. Réessayez.")
        setLoading(null)
      }
    } catch (e) {
      setError("Erreur réseau. Réessayez.")
      setLoading(null)
    }
  }

  const faqs = [
    {
      q: "Comment ça se passe concrètement ?",
      a: "Après votre abonnement, vous recevez par email mon contact Signal. Signal est une application de messagerie chiffrée de bout en bout que vous installez sur votre téléphone (et votre ordinateur si vous voulez). Vous m'écrivez quand vous voulez, je vous réponds. C'est tout.",
    },
    {
      q: "Pourquoi de l'écrit et pas en visio ?",
      a: "L'écrit a une vertu thérapeutique qu'on sous-estime. On écrit quand quelque chose nous vient — pas quand un créneau dans un agenda nous l'ordonne. Le geste d'écrire force à formuler, et formuler est déjà une part du travail. Tout reste en trace, vous pouvez relire vos propres mots, voir le chemin parcouru.",
    },
    {
      q: "Est-ce que c'est vraiment de la thérapie ?",
      a: "Oui. Je suis psychologue clinicien diplômé d'État, formé à la psychanalyse. Ce n'est pas du coaching, ce n'est pas du bien-être, ce n'est pas du soutien moral. C'est une thérapie, avec son cadre, sa rigueur et son éthique — adaptée au format chat.",
    },
    {
      q: "Y a-t-il une IA dans la boucle ?",
      a: "Aucune. Vous écrivez avec un humain — moi. Pas d'algorithme, pas de réponse automatique, pas de script. Une vraie présence à l'autre bout.",
    },
    {
      q: "Pourquoi deux prix pour le même service ?",
      a: "Le service est strictement identique. Le tarif réduit (80€) est pour les étudiants et les jeunes au budget serré. Le tarif plein (150€) est le standard. À vous de choisir ce qui correspond à votre situation, sans justificatif.",
    },
    {
      q: "Et si je veux arrêter ?",
      a: "Vous annulez en un clic depuis l'email de reçu Stripe. Aucun engagement, aucune durée minimum.",
    },
  ]

  return (
    <main className="font-serif text-slate-900 bg-transparent">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-20 md:pt-16">
        <Link
          href="/app"
          className="inline-flex items-center text-xs font-sans uppercase tracking-[0.2em] text-blue-600 font-bold mb-8 hover:gap-2 gap-1 transition-all"
        >
          <span>←</span> Retour
        </Link>

        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/60 border border-blue-200 text-blue-700 text-xs font-sans font-bold uppercase tracking-widest">
            <span className="text-blue-500">✦</span> Thérapie · Chat privé
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold italic tracking-tighter leading-none mb-8 max-w-4xl">
          Une thérapie qui s'inscrit{" "}
          <span className="text-blue-600">dans votre quotidien.</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 italic font-light leading-relaxed max-w-2xl mb-6">
          Écrivez quand quelque chose vient. Le matin, le soir, après un appel difficile, avant une décision. Pas seulement le mardi à 18h.
        </p>

        <p className="text-base text-slate-500 italic font-sans">
          Chiffré de bout en bout · 100% humain · Annulable à tout moment
        </p>
      </section>

      {/* CE QUI CHANGE */}
      <section className="border-y border-slate-200 bg-white/60 backdrop-blur-sm py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-10">
            La différence
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            <div className="space-y-4">
              <div className="text-5xl font-bold italic text-slate-900 tracking-tighter">1×/sem</div>
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">Le format classique</div>
              <p className="text-slate-600 italic text-sm leading-relaxed">
                Une heure par semaine, dans un créneau qu'il faut trouver. Le reste du temps, vous êtes seul avec ce qui vous traverse.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold italic text-slate-900 tracking-tighter">∞</div>
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">Ici</div>
              <p className="text-slate-600 italic text-sm leading-relaxed">
                Vous écrivez quand vous voulez. Une phrase ce matin, un paragraphe ce soir, un long texte demain. Je suis là.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold italic text-slate-900 tracking-tighter">Trace</div>
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">L'écrit</div>
              <p className="text-slate-600 italic text-sm leading-relaxed">
                Tout reste. Vous relisez ce que vous avez dit, vous voyez le chemin. L'écrit n'est pas un pis-aller — c'est un autre travail, parfois plus profond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CE DONT ON PEUT PARLER */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-4">
          Ce dont on peut parler
        </p>
        <h2 className="text-4xl md:text-5xl font-bold italic tracking-tighter mb-12 max-w-3xl leading-tight">
          De tout, en fait.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { t: "L'anxiété et les angoisses", d: "Les ruminations, les attaques de panique, la peur de l'avenir, le sentiment d'être submergé." },
            { t: "Les relations", d: "Le couple, la famille, l'amitié, les conflits, la solitude, la difficulté à aimer ou à se laisser aimer." },
            { t: "Le travail et le sens", d: "Le burn-out, la perte de motivation, le sentiment d'imposture, les choix d'orientation." },
            { t: "Les pertes et les deuils", d: "La mort d'un proche, une rupture, un licenciement, une santé qui change." },
            { t: "L'identité et le rapport à soi", d: "Qui je suis, ce que je veux vraiment, ce qui me retient, ce que je n'arrive pas à dire." },
            { t: "Tout ce qui n'a pas de nom", d: "Le malaise diffus, l'ennui, le sentiment de passer à côté de sa vie sans pouvoir expliquer pourquoi." },
          ].map((item, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl p-6 bg-white/70 backdrop-blur-sm">
              <h3 className="text-lg font-bold italic text-slate-900 mb-2">{item.t}</h3>
              <p className="text-slate-600 italic text-sm leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TARIFS */}
      <section className="border-t border-slate-200 bg-white/60 backdrop-blur-sm py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-4 text-center">
            Tarif
          </p>
          <h2 className="text-4xl md:text-5xl font-bold italic tracking-tighter mb-6 text-center">
            Deux prix. Même service.
          </h2>
          <p className="text-slate-500 italic mb-12 text-center max-w-xl mx-auto leading-relaxed">
            Le tarif réduit existe pour les étudiants et les jeunes au budget serré. Le tarif plein est le standard. À vous de choisir.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* RÉDUIT */}
            <div className="border border-slate-200 rounded-3xl p-8 md:p-10 bg-white/80 space-y-6">
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">
                Tarif réduit
              </div>
              <div>
                <div className="text-6xl font-bold italic tracking-tighter text-slate-900">80€</div>
                <div className="text-slate-400 font-sans text-sm uppercase tracking-widest mt-1">/ mois</div>
              </div>
              <p className="text-slate-500 italic text-sm leading-relaxed">
                Pour les étudiants et les jeunes au budget serré.
              </p>
              <button
                onClick={() => handleSubscribe("reduced")}
                disabled={loading !== null}
                className="w-full py-4 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-900 rounded-full font-bold text-sm font-sans transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === "reduced" ? "Ouverture…" : "S'abonner →"}
              </button>
            </div>

            {/* PLEIN */}
            <div className="border-2 border-slate-900 rounded-3xl p-8 md:p-10 bg-white/80 space-y-6">
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500">
                Tarif plein
              </div>
              <div>
                <div className="text-6xl font-bold italic tracking-tighter text-slate-900">150€</div>
                <div className="text-slate-400 font-sans text-sm uppercase tracking-widest mt-1">/ mois</div>
              </div>
              <p className="text-slate-500 italic text-sm leading-relaxed">
                Le tarif standard.
              </p>
              <button
                onClick={() => handleSubscribe("full")}
                disabled={loading !== null}
                className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-full font-bold text-sm font-sans transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === "full" ? "Ouverture…" : "S'abonner →"}
              </button>
            </div>

          </div>

          {error && (
            <p className="text-red-500 text-sm text-center italic mt-6">{error}</p>
          )}

          <p className="text-slate-400 text-xs font-sans uppercase tracking-widest text-center mt-8">
            Résiliation à tout moment · Chiffré · 100% humain — sans IA
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-4">
          Questions fréquentes
        </p>
        <h2 className="text-3xl md:text-4xl font-bold italic tracking-tighter mb-10">
          Avant de commencer.
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="group border border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold italic text-slate-800 hover:text-blue-600 transition-colors">
                <span className="pr-4">{f.q}</span>
                <span className="text-blue-400 group-open:rotate-180 transition-transform shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-600 italic text-sm leading-relaxed border-t border-slate-100 pt-4">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>

    </main>
  )
}
