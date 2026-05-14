"use client"

import { useState } from "react"

type Variant = "full" | "minimal"
type State = "idle" | "loading" | "success" | "error"

interface Props {
  variant?: Variant
}

export default function NewsletterSignup({ variant = "full" }: Props) {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<State>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setErrorMsg(data.error === "email_invalide" ? "Adresse email invalide." : "Une erreur est survenue.")
        setState("error")
      } else {
        setState("success")
        setEmail("")
      }
    } catch {
      setErrorMsg("Une erreur est survenue.")
      setState("error")
    }
  }

  if (variant === "minimal") {
    return (
      <div className="w-full">
        {state === "success" ? (
          <p className="text-xs font-sans text-slate-500 italic">
            Abonné(e). À bientôt&nbsp;!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.fr"
              required
              disabled={state === "loading"}
              className="flex-1 min-w-0 px-3 py-1.5 text-sm font-sans bg-transparent border border-slate-300 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-600 transition disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="shrink-0 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-sans font-bold transition hover:bg-blue-600 disabled:opacity-50"
            >
              {state === "loading" ? "…" : "OK"}
            </button>
          </form>
        )}
        {state === "error" && (
          <p className="mt-1 text-[11px] font-sans text-red-500">{errorMsg}</p>
        )}
      </div>
    )
  }

  // variant === "full"
  return (
    <section className="max-w-2xl mx-auto my-16 px-6 py-10 bg-white border border-slate-100 rounded-3xl shadow-sm text-center">
      <p className="text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-blue-600 mb-4">
        Newsletter
      </p>
      <h2 className="text-3xl md:text-4xl font-serif italic text-slate-900 mb-3 leading-tight">
        Reste dans la boucle.
      </h2>
      <p className="text-slate-500 font-sans italic text-sm md:text-base mb-8 leading-relaxed">
        Chaque nouvel article directement dans ta boîte. Pas de spam — juste des réflexions cliniques sur la psychologie et l'expérience humaine.
      </p>

      {state === "success" ? (
        <div className="py-4">
          <p className="text-lg font-serif italic text-slate-700 mb-1">
            Bienvenue.
          </p>
          <p className="text-sm font-sans text-slate-400 italic">
            Un email de confirmation t'a été envoyé.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.fr"
            required
            disabled={state === "loading"}
            className="flex-1 min-w-0 px-4 py-3 text-sm font-sans bg-slate-50 border border-slate-200 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="shrink-0 px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-sans font-bold transition hover:bg-blue-600 disabled:opacity-50 shadow-sm"
          >
            {state === "loading" ? "…" : "S'abonner →"}
          </button>
        </form>
      )}

      {state === "error" && (
        <p className="mt-3 text-sm font-sans text-red-500">{errorMsg}</p>
      )}
    </section>
  )
}
