import Link from "next/link"
import Stripe from "stripe"

export const dynamic = "force-dynamic"

const SIGNAL_LINK = "https://signal.me/#u/leogayrard.11"
const SIGNAL_USERNAME = "@leogayrard.11"

async function verifySession(sessionId: string | undefined) {
  if (!sessionId) return null
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.status === "complete" || session.payment_status === "paid") {
      return session
    }
    return null
  } catch {
    return null
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const params = await searchParams
  const session = await verifySession(params.session_id)
  const valid = !!session

  return (
    <main className="font-serif text-slate-900 bg-transparent min-h-screen">

      <section className="max-w-3xl mx-auto px-6 py-16 md:py-24">

        {valid ? (
          <>
            {/* SUCCESS HEADER */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/60 border border-blue-200 text-blue-700 text-xs font-sans font-bold uppercase tracking-widest mb-6">
                <span className="text-blue-500">✦</span> Abonnement actif
              </div>

              <h1 className="text-5xl md:text-6xl font-bold italic tracking-tighter leading-none mb-6">
                Bienvenue.
              </h1>

              <p className="text-xl text-slate-500 italic font-light leading-relaxed max-w-xl mx-auto">
                Votre chat avec Léo Gayrard est désormais ouvert.
              </p>
            </div>

            {/* PROCHAINE ÉTAPE */}
            <div className="border-2 border-slate-900 rounded-3xl p-8 md:p-10 bg-white/80 space-y-6">

              <div className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500">
                Prochaine étape
              </div>

              <h2 className="text-2xl md:text-3xl font-bold italic text-slate-900 leading-tight">
                Ouvrir la conversation sur Signal.
              </h2>

              <p className="text-slate-600 italic leading-relaxed">
                Le chat se fait sur <strong>Signal</strong>, une application de messagerie chiffrée de bout en bout. Si vous ne l'avez pas encore, installez-la sur votre téléphone (et votre ordinateur si vous voulez).
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">
                  Mon contact Signal
                </div>
                <div className="text-2xl font-mono text-slate-900 break-all">
                  {SIGNAL_USERNAME}
                </div>
                <a
                  href={SIGNAL_LINK}
                  className="block w-full py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-full font-bold text-sm font-sans text-center transition"
                >
                  Ouvrir dans Signal →
                </a>
                <p className="text-slate-500 italic text-xs leading-relaxed">
                  Pas encore Signal ?{" "}
                  <a
                    href="https://signal.org/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Téléchargez-le gratuitement
                  </a>{" "}
                  pour iOS, Android, macOS, Windows et Linux.
                </p>
              </div>

              <p className="text-slate-500 italic text-sm leading-relaxed">
                Ce lien vous a aussi été envoyé par email, avec votre reçu de paiement.
              </p>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-slate-400 font-sans text-xs uppercase tracking-widest">
                  Facturation Stripe · Annulable à tout moment depuis l'email de reçu
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/articles"
                className="block py-4 px-6 border border-slate-300 text-slate-600 rounded-full font-bold text-sm font-sans text-center hover:border-blue-400 hover:text-blue-600 transition italic"
              >
                Lire les articles
              </Link>
              <Link
                href="/boutique"
                className="block py-4 px-6 border border-slate-300 text-slate-600 rounded-full font-bold text-sm font-sans text-center hover:border-blue-400 hover:text-blue-600 transition italic"
              >
                Parcourir la boutique
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold italic tracking-tighter leading-tight mb-6">
                Session introuvable.
              </h1>
              <p className="text-slate-500 italic mb-10 max-w-xl mx-auto leading-relaxed">
                Nous n'avons pas pu vérifier votre abonnement. Si vous venez de payer, attendez quelques secondes et rafraîchissez la page.
              </p>
              <Link
                href="/app"
                className="inline-flex items-center justify-center px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-sm font-sans hover:bg-blue-600 transition"
              >
                Retour à l'app →
              </Link>
            </div>
          </>
        )}

      </section>
    </main>
  )
}
