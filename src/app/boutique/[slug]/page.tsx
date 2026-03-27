import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getProductBySlug } from "@/app/boutique/data"
import BuyButton from "./BuyButton"

interface PageProps { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const p = getProductBySlug(slug)
  if (!p) return {}

  // Détermination de l'image pour les métadonnées
  let metaImage = p.image;
  if (slug === "introduction-aux-guides") metaImage = "/introduction.jpg";
  if (slug === "hauts-potentiels" || slug === "haut-potentiel-intellectuel") metaImage = "/hpi.jpg";

  return { 
    title: `${p.title} | Protocole | Troisième Chemin`, 
    description: p.summary,
    openGraph: { images: [{ url: metaImage }] }
  }
}

export default async function EbookPage({ params }: PageProps) {
  const { slug } = await params
  const p = getProductBySlug(slug)
  if (!p) return notFound()

  const productFaqs = p.faq || []

  // Logique d'image identique à la page boutique pour la cohérence
  let productImage = p.image;
  if (slug === "introduction-aux-guides") productImage = "/introduction.jpg";
  if (slug === "hauts-potentiels" || slug === "haut-potentiel-intellectuel") productImage = "/hpi.jpg";

  return (
    <main className="min-h-screen text-slate-900 bg-transparent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": p.title,
              "description": p.summary,
              "image": productImage,
              "brand": { "@type": "Brand", "name": "Troisième Chemin" },
              "offers": {
                "@type": "Offer",
                "price": p.priceEUR.replace('€', '').replace(',', '.').trim(),
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock",
                "url": `https://troisiemechemin.fr/boutique/${slug}`
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Boutique", "item": "https://troisiemechemin.fr/boutique" },
                { "@type": "ListItem", "position": 2, "name": p.title, "item": `https://troisiemechemin.fr/boutique/${slug}` }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": productFaqs.map((f) => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": { "@type": "Answer", "text": f.answer }
              }))
            }
          ])
        }}
      />

      <section className="mx-auto max-w-5xl px-6 py-14">
        <Link href="/boutique" className="text-sm underline text-slate-500 hover:text-slate-900 transition-colors font-sans italic">
          ← Retour à la Boutique
        </Link>

        <div className="mt-6 grid gap-12 md:grid-cols-2 md:items-stretch">
          <div className="relative aspect-3/4 md:min-h-125 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl flex">
            <Image 
              src={productImage} 
              alt={p.title} 
              fill 
              className="object-cover sepia-[0.1]" 
              priority 
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div className="flex flex-col p-8 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm h-full">
            <h1 className="font-serif text-4xl md:text-5xl font-bold italic leading-tight">{p.title}</h1>
            <p className="mt-6 text-lg text-slate-700 leading-relaxed font-serif italic">{p.summary}</p>

            {p.chapters.length > 0 && (
              <div className="mt-8 grow">
                <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 opacity-60 font-sans">Sommaire</h2>
                <ul className="mt-4 space-y-2">
                  {p.chapters.map((c, i) => (
                    <li key={i} className="flex items-baseline text-sm text-slate-600 italic font-serif">
                      <span className="mr-3 text-blue-600 font-bold">/</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-12 flex flex-col sm:flex-row gap-4 items-end border-t border-slate-100 pt-8">
              <div className="w-full sm:flex-1">
                <BuyButton slug={p.slug} priceEUR={p.priceEUR} priceUSD={p.priceUSD} image={productImage} />
              </div>
              <a
                href="https://chat.troisiemechemin.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center px-8 h-13 rounded-md border-2 border-slate-900 text-slate-900 font-bold uppercase tracking-tight hover:bg-slate-900 hover:text-white transition-all text-sm font-sans"
              >
                Accéder à l'App
              </a>
            </div>
          </div>
        </div>

        {productFaqs.length > 0 && (
          <div className="mt-20 max-w-4xl">
            <h2 className="text-2xl font-serif font-bold mb-8 italic">Questions fréquentes</h2>
            <div className="grid gap-4">
              {productFaqs.map((faq, i) => (
                <details key={i} className="group border border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm transition-all shadow-sm">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-slate-800 font-serif italic">
                    {faq.question}
                    <span className="text-blue-500 group-open:rotate-180 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-slate-600 font-sans text-sm italic border-t border-slate-50 pt-4 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}