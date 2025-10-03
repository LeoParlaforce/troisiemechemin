"use client"

import { useTransition } from "react"

export default function PortalButton({ sessionId }: { sessionId: string }) {
  const [pending, start] = useTransition()
  return (
    <button
      onClick={() =>
        start(async () => {
          const r = await fetch("/api/portal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id: sessionId }),
          })
          const data = await r.json()
          if (data?.url) window.location.href = data.url
          else alert("Erreur portail")
        })
      }
      disabled={pending}
      className="rounded-md border px-4 py-2 text-sm transition hover:border-accent hover:text-accent disabled:opacity-60"
    >
      {pending ? "Ouverture…" : "Gérer mon inscription"}
    </button>
  )
}
