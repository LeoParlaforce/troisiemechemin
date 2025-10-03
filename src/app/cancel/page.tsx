export default function Cancel() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Paiement annulé</h1>
      <p className="mt-3 opacity-80">Vous pouvez réessayer ou choisir un autre guide.</p>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/boutique" className="mt-6 inline-block rounded-md border px-4 py-2">
        Retour Boutique
      </a>
    </main>
  )
}
