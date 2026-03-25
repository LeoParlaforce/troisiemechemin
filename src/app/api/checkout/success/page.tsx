"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // On appelle ta route GET success pour récupérer le slug et l'email
      fetch(`/api/checkout/success?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((json) => {
          setData(json)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [sessionId])

  if (loading) return <div className="p-20 text-center font-serif text-xl">Chargement de votre commande...</div>

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-transparent">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-purple-600">Merci pour votre achat !</h1>
      <p className="mt-4 text-lg opacity-70 italic">
        Un e-mail de confirmation a été envoyé à <span className="font-bold text-foreground">{data?.email || "votre adresse"}</span>
      </p>
      
      {data?.slug && (
        <div className="mt-12 p-10 border border-white/20 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl">
          <p className="mb-6 text-sm uppercase tracking-widest opacity-50 font-bold">Votre guide est prêt</p>
          <a 
            // CORRECTION : On passe les paramètres attendus par ton api/download/route.ts
            href={`/api/download?slug=${data.slug}&session_id=${sessionId}`}
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-md font-bold uppercase tracking-tighter transition-transform hover:-translate-y-1 active:scale-95 shadow-lg"
          >
            Télécharger le PDF
          </a>
        </div>
      )}

      {!data?.slug && !loading && (
        <p className="mt-10 text-red-500 italic">
          Une erreur est survenue lors de la récupération de votre lien. 
          Vérifiez vos e-mails ou contactez le support.
        </p>
      )}
    </main>
  )
}