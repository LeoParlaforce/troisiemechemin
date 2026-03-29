import { getPostBySlug, getAllPosts } from "@/lib/posts"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import Link from "next/link"
import ShareActions from "@/components/ShareActions"

interface FAQItem { question: string; answer: string; }
interface PageProps { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug) as any
  if (!post) return { title: "Article Introuvable | Troisième Chemin" }
  const url = `https://troisiemechemin.fr/articles/${slug}`

  return {
    title: `${post.title} | Troisième Chemin`,
    description: post.summary,
    alternates: { canonical: url },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    openGraph: {
      title: post.title,
      description: post.summary,
      url,
      siteName: "Troisième Chemin — Psychologie & Restructuration",
      images: [{ url: `https://troisiemechemin.fr${post.image}`, width: 1200, height: 630, alt: post.title }],
      locale: "fr_FR",
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Léo Gayrard"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [`https://troisiemechemin.fr${post.image}`],
    },
  }
}

export async function generateStaticParams() {
  const allPosts = getAllPosts()
  return allPosts.map((post: any) => ({ slug: post.slug }))
}

const markdownComponents = {
  h2: ({ ...props }: any) => <h2 {...props} className="text-3xl md:text-5xl font-medium text-slate-900 mt-16 mb-8 tracking-tight border-b border-slate-100 pb-4 font-serif italic" />,
  h3: ({ ...props }: any) => <h3 {...props} className="text-lg md:text-xl font-bold text-slate-800 mt-10 mb-6 uppercase tracking-[0.2em] font-sans" />,
  p: ({ ...props }: any) => <p {...props} className="text-lg md:text-xl leading-relaxed text-slate-700 mb-8 font-serif" />,
  ul: ({ ...props }: any) => <ul {...props} className="space-y-4 mb-10 list-none" />,
  li: ({ ...props }: any) => (
    <li {...props} className="flex items-start text-lg md:text-xl text-slate-700 font-serif italic">
      <span className="text-blue-400 mr-3 font-bold text-2xl leading-none">/</span>
      {props.children}
    </li>
  ),
  blockquote: ({ ...props }: any) => (
    <div className="my-12 bg-blue-50/50 border-l-2 border-blue-400 p-6 md:p-8 rounded-r-3xl italic">
      <p className="text-xl md:text-2xl font-medium leading-relaxed text-blue-900 mb-0">"{props.children}"</p>
    </div>
  ),
  strong: ({ ...props }: any) => <strong {...props} className="font-bold text-slate-900 bg-blue-50 px-1" />,
  a: ({ ...props }: any) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline decoration-1 underline-offset-4 hover:text-blue-800 transition-all" />,
  img: ({ ...props }: any) => (
    <span className="block my-12 w-full rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-white p-2">
      <img {...props} className="w-full h-auto rounded-2xl block" alt={props.alt || "Image de l'article"} />
    </span>
  ),
}

// Routing intelligent : article pour thérapeutes → /pour-les-therapeutes
// Reconnaît les deux langues pour compatibilité cross-site
function isForTherapists(category: string): boolean {
  return (
    category === "Développement Professionnel" ||
    category === "Professional Development"
  )
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug) as any
  if (!post) return notFound()

  const contentParts = (post.content || "").split("[CTA-APP]")
  const articleUrl = `https://troisiemechemin.fr/articles/${slug}`
  const faqs: FAQItem[] = post.faqs || []
  const therapeuteArticle = isForTherapists(post.category || "")

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-slate-900">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.summary,
              "image": `https://troisiemechemin.fr${post.image}`,
              "datePublished": new Date(post.date).toISOString(),
              "dateModified": new Date(post.date).toISOString(),
              // FIX : @id cross-référence vers l'auteur du layout
              "author": { "@id": "https://troisiemechemin.fr/#author" },
              "publisher": { "@id": "https://troisiemechemin.fr/#organization" },
              "mainEntityOfPage": { "@type": "WebPage", "@id": articleUrl },
              "articleSection": post.category || "Psychologie",
              "inLanguage": "fr-FR",
              "isPartOf": { "@id": "https://troisiemechemin.fr/#website" }
            },
            ...(faqs.length > 0 ? [{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map((f: FAQItem) => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": { "@type": "Answer", "text": f.answer }
              }))
            }] : [])
          ])
        }}
      />

      <article>
        {/* Navigation retour */}
        <nav className="max-w-5xl mx-auto mb-8 md:mb-10">
          <Link href="/articles" className="group inline-flex items-center text-xs font-sans uppercase tracking-[0.2em] text-blue-600 font-bold">
            <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> Retour aux articles
          </Link>
        </nav>

        {/* En-tête */}
        <header className="max-w-4xl mx-auto text-center mb-10 font-serif">
          <div className="flex items-center justify-center gap-4 mb-4">
            <time dateTime={post.date} className="text-blue-600 text-[10px] font-bold uppercase tracking-[0.4em]">
              {post.date}
            </time>
            {post.category && (
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 font-sans">
                {post.category}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-slate-900 leading-tight tracking-tighter mb-6 italic px-2">
            {post.title}
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-500 italic max-w-2xl mx-auto leading-snug px-4">
            {post.summary}
          </p>
        </header>

        {/* Partage en haut */}
        <div className="mb-8">
          <ShareActions url={articleUrl} title={post.title} />
        </div>

        {/* Image principale */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-white relative p-2">
            <img src={post.image} alt={post.title} className="w-full h-auto max-h-[60vh] object-cover rounded-xl block" />
            {post.imageCredit && (
              <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md text-[10px] text-white/90 px-3 py-1 rounded-full font-sans uppercase tracking-widest z-20">
                <ReactMarkdown components={{
                  p: ({children}) => <p className="m-0 p-0 text-white/90">{children}</p>,
                  a: ({...props}) => <a {...props} className="underline hover:text-white transition-colors" target="_blank" />
                }}>
                  {post.imageCredit}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>

        {/* Contenu */}
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100">
          <div className="prose-lg md:prose-xl max-w-none">

            <ReactMarkdown components={markdownComponents}>{contentParts[0]}</ReactMarkdown>

            {/* CTA MID-ARTICLE — routing selon catégorie */}
            {contentParts.length > 1 && (
              therapeuteArticle ? (
                // Articles "Développement Professionnel" → page thérapeutes FR
                <Link
                  href="/pour-les-therapeutes"
                  className="block my-12 group p-px rounded-3xl bg-gradient-to-br from-blue-100 to-transparent shadow-sm hover:shadow-md transition-all no-underline"
                >
                  <div className="bg-white rounded-[22px] p-4 flex flex-col md:flex-row items-center gap-6 border border-slate-50">
                    <div className="w-full md:w-40 aspect-video md:aspect-square rounded-xl overflow-hidden shrink-0">
                      <img src="/articles.jpg" alt="Pour les thérapeutes" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-2 font-sans">Pour les Praticiens</h3>
                      <p className="text-xl md:text-2xl italic text-slate-800 leading-tight">Troisième Chemin — Pour les Thérapeutes</p>
                      <p className="text-sm text-slate-500 italic mt-2 font-sans">Séances quotidiennes, supervision, acquisition de patients.</p>
                    </div>
                    <div className="md:pr-4 pb-2 md:pb-0">
                      <span className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm group-hover:bg-blue-600 transition-all inline-block font-sans">
                        Découvrir →
                      </span>
                    </div>
                  </div>
                </Link>
              ) : (
                // Tous les autres → app chat
                <a
                  href="https://chat.troisiemechemin.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block my-12 group p-px rounded-3xl bg-gradient-to-br from-blue-100 to-transparent shadow-sm hover:shadow-md transition-all"
                >
                  <div className="bg-white rounded-[22px] p-4 flex flex-col md:flex-row items-center gap-6 border border-slate-50">
                    <div className="w-full md:w-40 aspect-video md:aspect-square rounded-xl overflow-hidden shrink-0">
                      <img src="/humanist-approach.jpg" alt="App" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-2 font-sans">Soutien continu</h3>
                      <p className="text-xl md:text-2xl italic text-slate-800 leading-tight">App Troisième Chemin</p>
                      <p className="text-sm text-slate-500 italic mt-2 font-sans">Thérapie quotidienne. Humaine, chiffrée, sans IA.</p>
                    </div>
                    <div className="md:pr-4 pb-2 md:pb-0">
                      <span className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm group-hover:bg-blue-600 transition-all inline-block font-sans">
                        Rejoindre →
                      </span>
                    </div>
                  </div>
                </a>
              )
            )}

            {contentParts.length > 1 && (
              <ReactMarkdown components={markdownComponents}>{contentParts[1]}</ReactMarkdown>
            )}
          </div>

          {/* FAQ */}
          {faqs.length > 0 && (
            <section className="mt-12 border-t border-slate-100 pt-10">
              <h2 className="text-2xl md:text-3xl font-serif italic mb-6 text-slate-900">Questions fréquentes</h2>
              <div className="space-y-4">
                {faqs.map((faq: FAQItem, i: number) => (
                  <details key={i} className="group border border-slate-200 rounded-2xl bg-slate-50 transition-all">
                    <summary className="flex items-center justify-between p-4 md:p-5 cursor-pointer list-none font-serif text-base md:text-lg text-slate-800 hover:text-blue-600">
                      <span className="pr-4">{faq.question}</span>
                      <span className="shrink-0 transition-transform group-open:rotate-180 text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m6 9 6 6 6-6"/>
                        </svg>
                      </span>
                    </summary>
                    <div className="px-4 md:px-5 pb-4 md:pb-5 text-slate-600 italic font-sans border-t border-slate-100 pt-4 text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Partage en bas */}
          <div className="mt-10 pt-8 border-t border-slate-50">
            <ShareActions url={articleUrl} title={post.title} />
          </div>
        </div>

        {/* FOOTER CTA — 3 blocs, central adapté selon catégorie */}
        <footer className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 text-white">

          <Link href="/articles" className="group h-72 md:h-80 relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900">
            <img src="/articles.jpg" alt="Articles" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent z-10" />
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300 mb-2">Bibliothèque</h4>
              <p className="text-2xl md:text-3xl font-serif italic leading-tight">Plus d'articles</p>
            </div>
          </Link>

          {/* Bloc central : thérapeutes ou app selon catégorie */}
          {therapeuteArticle ? (
            <Link href="/pour-les-therapeutes" className="group h-72 md:h-80 relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900">
              <img src="/articles.jpg" alt="Pour les thérapeutes" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/40 to-transparent z-10" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-200 mb-2">Praticiens</h4>
                <p className="text-2xl md:text-3xl font-serif italic leading-tight">Pour les Thérapeutes</p>
              </div>
            </Link>
          ) : (
            <a href="https://chat.troisiemechemin.fr" target="_blank" rel="noopener noreferrer" className="group h-72 md:h-80 relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900">
              <img src="/humanist-approach.jpg" alt="App" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/40 to-transparent z-10" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-200 mb-2">Communauté</h4>
                <p className="text-2xl md:text-3xl font-serif italic leading-tight">Rejoindre l'App</p>
              </div>
            </a>
          )}

          <Link href="/boutique" className="group h-72 md:h-80 relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 md:col-span-2 lg:col-span-1">
            <img src="/guide.jpg" alt="Boutique" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent z-10" />
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300 mb-2">Boutique</h4>
              <p className="text-2xl md:text-3xl font-serif italic leading-tight">Guides cliniques</p>
            </div>
          </Link>

        </footer>
      </article>
    </main>
  )
}
