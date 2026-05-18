"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY_SUBSCRIBED = "newsletter_subscribed"
const STORAGE_KEY_DISMISSED_AT = "newsletter_dismissed_at"
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 jours
const DELAY_MS = 10_000

type FormState = "idle" | "loading" | "success" | "error"

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [formState, setFormState] = useState<FormState>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    const subscribed = localStorage.getItem(STORAGE_KEY_SUBSCRIBED)
    if (subscribed === "1") return

    const dismissedAt = localStorage.getItem(STORAGE_KEY_DISMISSED_AT)
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10)
      if (elapsed < DISMISS_DURATION_MS) return
    }

    const timer = setTimeout(() => setVisible(true), DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY_DISMISSED_AT, String(Date.now()))
    setVisible(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState("loading")
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
        setFormState("error")
      } else {
        setFormState("success")
        localStorage.setItem(STORAGE_KEY_SUBSCRIBED, "1")
        setTimeout(() => setVisible(false), 3000)
      }
    } catch {
      setErrorMsg("Une erreur est survenue.")
      setFormState("error")
    }
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Inscription à la newsletter"
    >
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        onClick={dismiss}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">
        <button
          onClick={dismiss}
          aria-label="Fermer"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-blue-600 mb-4">
          Newsletter
        </p>

        {formState === "success" ? (
          <div className="py-4">
            <p className="text-2xl font-serif italic text-slate-900 mb-2">Bienvenue.</p>
            <p className="text-sm font-sans text-slate-400 italic">
              Un email de confirmation t'a été envoyé.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl md:text-3xl font-serif italic text-slate-900 mb-2 leading-tight">
              Reste dans la boucle.
            </h2>
            <p className="text-slate-500 font-sans italic text-sm mb-6 leading-relaxed">
              Chaque nouvel article directement dans ta boîte. Pas de spam — juste des réflexions cliniques sur la psychologie et l'expérience humaine.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.fr"
                required
                disabled={formState === "loading"}
                className="w-full px-4 py-3 text-sm font-sans bg-slate-50 border border-slate-200 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={formState === "loading"}
                className="w-full px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-sans font-bold transition hover:bg-blue-600 disabled:opacity-50 shadow-sm"
              >
                {formState === "loading" ? "…" : "S'abonner →"}
              </button>
            </form>

            {formState === "error" && (
              <p className="mt-3 text-sm font-sans text-red-500">{errorMsg}</p>
            )}

            <button
              onClick={dismiss}
              className="mt-4 text-xs font-sans text-slate-400 hover:text-slate-600 transition underline-offset-2 hover:underline"
            >
              Non merci
            </button>
          </>
        )}
      </div>
    </div>
  )
}
