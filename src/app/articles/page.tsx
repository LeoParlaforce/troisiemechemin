import Link from "next/link"
import { getAllPosts } from "@/lib/posts"
import { Metadata } from "next"

interface Post { slug: string; title: string; summary: string; date: string; image: string; }

export const metadata: Metadata = {
  title: "Articles | Réflexions cliniques & Psychologie | Troisième Chemin",
  description: "Explorez nos réflexions cliniques sur la psychologie, la thérapie et le lien humain.",
  alternates: { canonical: "https://troisiemechemin.fr/articles" }
}

export default function ArticlesPage() {
  const posts: Post[] = getAllPosts()
  const libraryFaqs = [
    { question: "À quelle fréquence la section Articles est-elle mise à jour ?", answer: "Nous publions de nouvelles réflexions mensuellement." },
    { question: "Puis-je citer ces articles ?", answer: "Oui, veuillez citer 'Troisième Chemin' et inclure l'URL spécifique." }
  ]

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 font-serif w-full bg-transparent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Articles Troisième Chemin",
              "publisher": { "@type": "Organization", "name": "Troisième Chemin" },
              "blogPost": posts.map((post) => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "author": { "@type": "Person", "name": "Léo Gayrard" },
                "datePublished": post.date,
                "image": post.image
              }))
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": libraryFaqs.map((f) => ({
                "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer }
              }))
            }
          ])
        }}
      />
      <header className="mb-12 md:mb-16 border-b border-slate-200/50 pb-8">
        <h1 className="text-4xl md:text-5xl font-medium italic tracking-tight text-slate-900 mb-4">
          Articles.
        </h1>
        <p className="text-base md:text-lg text-slate-600 font-sans italic opacity-90">
          Réflexions sur la psychologie, la pratique clinique et l'expérience humaine.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {posts.map((post: Post) => (
          <Link key={post.slug} href={`/articles/${post.slug}`} className="group block">
            <article className="flex flex-col gap-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white/90 backdrop-blur-sm">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover sepia-[0.1] transition duration-700 group-hover:scale-105" />
              </div>
              <div className="space-y-3 px-1">
                <div className="flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.2em] text-blue-600 font-bold">
                  <span>{post.date}</span>
                  <span className="text-slate-300">/</span>
                  <span>Réflexions</span>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed font-sans italic line-clamp-3">
                  {post.summary}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}
