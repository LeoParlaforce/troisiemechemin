import Image from "next/image"
import { notFound } from "next/navigation"
import { products, getProductBySlug } from "../data"
import BuyButton from "./BuyButton"

interface PageProps { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const p = getProductBySlug(slug)
  if (!p) return { title: "Guide non trouvé" }
  return {
    title: `${p.title} | troisiemechemin.fr`,
    description: p.summary,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const p = getProductBySlug(slug)
  if (!p) return notFound()

  // SEO JSON-LD conservé pour Google mais invisible visuellement
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": p.title,
        "image": `https://troisiemechemin.fr${p.image}`,
        "description": p.summary,
        "offers": {
          "@type": "Offer",
          "price": p.price === "Gratuit" ? "0" : "9.50",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": p.faq.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": { "@type": "Answer", "text": item.answer }
        }))
      }
    ]
  }

  return (
    <main className="min-h-screen text-foreground bg-transparent">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          
          {/* Bloc Image avec effet de profondeur */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border bg-white/10 backdrop-blur-sm shadow-2xl">
            <Image 
              src={p.image} 
              alt={p.title} 
              fill 
              className="object-cover" 
              priority 
            />
          </div>

          {/* Bloc Texte avec fond translucide */}
          <div className="flex flex-col p-8 rounded-2xl bg-white/30 backdrop-blur-md border border-white/20">
            <a href="/boutique" className="text-sm font-medium opacity-60 hover:opacity-100 hover:text-purple-600 transition-all">
              ← Retour Boutique
            </a>

            <h1 className="mt-4 font-serif text-4xl md:text-5xl font-bold leading-tight">{p.title}</h1>
            <p className="mt-2 text-2xl font-light text-purple-700 italic">{p.price}</p>
            
            <p className="mt-8 text-lg opacity-90 leading-relaxed">
              {p.summary}
            </p>

            <div className="mt-10">
              <h2 className="text-xs font-bold uppercase tracking-widest opacity-50">Sommaire</h2>
              <ul className="mt-4 space-y-3">
                {p.chapters.map((c, i) => (
                  <li key={i} className="flex items-baseline opacity-80">
                    <span className="mr-3 text-purple-600 font-bold">/</span> {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <BuyButton slug={p.slug} title={p.title} image={p.image} price={p.price} />
              <a href="https://chat.troisiemechemin.fr" className="flex items-center justify-center rounded-md border border-black/10 px-8 py-3 font-semibold bg-white/50 hover:bg-white/80 transition-all">
                Lancer l'App
              </a>
            </div>
          </div>
        </div>

        {/* FAQ - On reste sur le fond translucide */}
        {p.faq.length > 0 && (
          <section className="mt-20 p-8 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/10">
            <h2 className="font-serif text-3xl font-bold">Questions fréquentes</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {p.faq.map((item, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold">Q : {item.question}</h3>
                  <p className="mt-3 opacity-80 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  )
}