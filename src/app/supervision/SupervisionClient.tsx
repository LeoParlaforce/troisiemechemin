"use client"

import Link from "next/link"
import { useState } from "react"

export default function SupervisionClient() {
  const [loading, setLoading] = useState<"reduced" | "full" | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubscribe = async (tier: "reduced" | "full") => {
    setLoading(tier)
    setError(null)
    try {
      const res = await fetch("/api/checkout/signal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, segment: "supervision" }),
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
      a: "Après votre abonnement, vous recevez par email mon contact Signal. Vous m'écrivez quand un cas vous occupe, quand une intervention vous laisse perplexe, quand votre cadre est mis à l'épreuve. Je réponds. C'est un dialogue clinique continu.",
    },
    {
      q: "Pourquoi de l'écrit pour superviser ?",
      a: "Parce que vous n'écrivez pas dans un créneau — vous écrivez quand un cas vous occupe, juste après une séance, au moment où c'est encore vif. Cette immédiateté a une valeur clinique que la supervision mensuelle, par construction, ne peut pas offrir.",
    },
    {
      q: "Est-ce que vous imposez un cadre théorique ?",
      a: "Non. La supervision ne consiste pas à imposer un cadre — elle vous aide à penser le vôtre, avec vos propres références, dans votre propre cohérence. On travaille avec ce que vous apportez.",
    },
    {
      q: "C'est pour qui ?",
      a: "Pour tous les professionnels qui ont à faire à des humains : psychologues, psychiatres, médecins, infirmiers, travailleurs sociaux, éducateurs, coachs, praticiens en formation. Dès lors que votre travail vous confronte à la réalité psychique d'autrui, une supervision a du sens.",
    },
    {
      q: "Pourquoi deux prix pour le même service ?",
      a: "Le service est strictement identique. Le tarif réduit (80€) est pour les jeunes praticiens et les étudiants. Le tarif plein (150€) est le standard. À vous de choisir, sans justificatif.",
    },
    {
      q: "Et si je veux arrêter ?",
      a: "Vous annulez en un clic depuis l'email de reçu Stripe. Aucun engagement.",
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
            <span className="text-blue-500">✦</span> Supervision · Chat privé
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold italic tracking-tighter leading-none mb-8 max-w-4xl">
          Une supervision qui suit{" "}
          <span className="text-blue-600">votre pratique réelle.</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 italic font-light leading-relaxed max-w-2xl mb-6">
          Écrivez après une séance qui vous travaille. Pas un mois plus tard quand vous l'aurez oubliée — maintenant, pendant que c'est encore vif.
        </p>

        <p className="text-base text-slate-500 italic font-sans">
          Messagerie individuelle privée · 100% humain · Annulable à tout moment
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
              <div className="text-5xl font-bold italic text-slate-900 tracking-tighter">1×/mois</div>
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">Le format classique</div>
              <p className="text-slate-600 italic text-sm leading-relaxed">
                Une réunion mensuelle où l'on essaie de se souvenir des cas. Tout ce qui s'est passé entre temps reste dans l'angle mort.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold italic text-slate-900 tracking-tighter">∞</div>
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">Ici</div>
              <p className="text-slate-600 italic text-sm leading-relaxed">
                Vous m'écrivez quand un cas vous occupe, dans la foulée. Une supervision continue, jamais en différé.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold italic text-slate-900 tracking-tighter">Seul·e</div>
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">Sans supervision</div>
              <p className="text-slate-600 italic text-sm leading-relaxed">
                Vos patients vous mobilisent. Ce que ça fait en vous a besoin d'être travaillé — sans que ça vienne polluer leur thérapie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CE QU'ON PEUT TRAVAILLER */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-4">
          Ce qu'on travaille
        </p>
        <h2 className="text-4xl md:text-5xl font-bold italic tracking-tighter mb-12 max-w-3xl leading-tight">
          Tout ce qui constitue votre pratique.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { t: "Les cas qui résistent", d: "Le patient qui stagne, celui qui agit, celui qui vous laisse perplexe. On reprend ensemble ce qui se joue dans le transfert." },
            { t: "Le cadre et ses crises", d: "Les ruptures de cadre, les demandes hors cadre, la question des honoraires, les fins de cure, les absences." },
            { t: "L'éthique de la pratique", d: "Les situations qui posent question. Ce qu'on dit, ce qu'on ne dit pas. Ce qu'on accueille, ce qu'on refuse." },
            { t: "Votre identité clinique", d: "Qui vous êtes comme clinicien, ce qui s'affirme, ce qui hésite. Le style se forge dans l'élaboration." },
            { t: "Les outils théoriques", d: "Lecture de cas, références cliniques, articulations entre la théorie et ce qui se passe réellement dans le cabinet." },
            { t: "Les passages difficiles", d: "Les périodes où la pratique fatigue, où le doute s'installe, où l'on se demande si l'on fait le bon métier." },
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
            Le tarif réduit existe pour les jeunes praticiens et les étudiants en formation. Le tarif plein est le standard. À vous de choisir.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="border border-slate-200 rounded-3xl p-8 md:p-10 bg-white/80 space-y-6">
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">
                Tarif réduit
              </div>
              <div>
                <div className="text-6xl font-bold italic tracking-tighter text-slate-900">80€</div>
                <div className="text-slate-400 font-sans text-sm uppercase tracking-widest mt-1">/ mois</div>
              </div>
              <p className="text-slate-500 italic text-sm leading-relaxed">
                Pour les jeunes praticiens et les étudiants en formation.
              </p>
              <button
                onClick={() => handleSubscribe("reduced")}
                disabled={loading !== null}
                className="w-full py-4 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-900 rounded-full font-bold text-sm font-sans transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === "reduced" ? "Ouverture…" : "S'abonner →"}
              </button>
            </div>

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
            Résiliation à tout moment · Messagerie privée · 100% humain — sans IA
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
