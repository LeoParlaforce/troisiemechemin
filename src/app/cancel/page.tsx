import Link from "next/link"

export const metadata = {
  title: "Paiement annulé | Troisième Chemin",
  robots: { index: false, follow: false },
}

export default function Cancel() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-24 text-center font-serif">
      <h1 className="text-4xl font-bold italic tracking-tight mb-4 text-slate-900">Paiement annulé.</h1>
      <p className="text-slate-500 italic mb-10">
        Aucun prélèvement n'a été effectué. Vous pouvez réessayer ou choisir un autre guide.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/boutique"
          className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-blue-600 transition font-sans"
        >
          Retour à la Boutique
        </Link>
        <a
          href="mailto:leo.gayrard@gmail.com"
          className="px-8 py-3 border border-slate-300 text-slate-600 rounded-full font-bold text-sm hover:border-blue-400 hover:text-blue-600 transition italic font-sans"
        >
          Besoin d'aide ?
        </a>
      </div>
    </main>
  )
}
