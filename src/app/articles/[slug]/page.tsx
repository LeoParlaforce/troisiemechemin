// src/app/articles/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from "@/lib/posts"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import Link from "next/link"
import ShareActions from "@/components/ShareActions"

export async function generateMetadata({ params }: { params: any }) {
  const { slug } = await params
  const post = getPostBySlug(slug) as any
  if (!post) return {}
  return { title: `${post.title} | Troisième Chemin`, description: post.summary }
}

export async function generateStaticParams() {
  const allPosts = getAllPosts()
  return allPosts.map((post: any) => ({ slug: post.slug }))
}

const markdownComponents = {
  h2: ({ ...props }: any) => <h2 {...props} className="text-4xl md:text-5xl font-medium text-slate-900 mt-16 mb-8 tracking-tight border-b border-slate-100 pb-4 font-serif italic" />,
  h3: ({ ...props }: any) => <h3 {...props} className="text-xl font-bold text-slate-800 mt-10 mb-6 uppercase tracking-[0.2em] font-sans" />,
  p: ({ ...props }: any) => <p {...props} className="text-xl leading-relaxed text-slate-700 mb-8 font-serif" />,
  ul: ({ ...props }: any) => <ul {...props} className="space-y-4 mb-10 list-none" />,
  li: ({ ...props }: any) => (
    <li {...props} className="flex items-start text-xl text-slate-700 font-serif italic">
      <span className="text-blue-400 mr-3 font-bold text-2xl leading-none">/</span>
      {props.children}
    </li>
  ),
  blockquote: ({ ...props }: any) => (
    <div className="my-12 bg-blue-50/50 border-l-2 border-blue-400 p-8 rounded-r-3xl italic">
      <p className="text-2xl font-medium leading-relaxed text-blue-900 mb-0">"{props.children}"</p>
    </div>
  ),
  strong: ({ ...props }: any) => <strong {...props} className="font-bold text-slate-900 bg-blue-50 px-1" />,
  a: ({ ...props }: any) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline decoration-1 underline-offset-4 hover:text-blue-800 transition-all" />,
  img: ({ ...props }: any) => (
    <span className="block my-12 w-full rounded-3xl overflow-hidden shadow-xl border border-slate-100 p-2 bg-white">
      <img {...props} className="w-full h-auto rounded-2xl block" alt={props.alt || "Image article"} />
    </span>
  ),
};

export default async function ArticlePage({ params }: { params: any }) {
  const { slug } = await params
  const post = getPostBySlug(slug) as any
  if (!post) return notFound()

  const contentParts = (post.content || "").split("[CTA-APP]")
  const articleUrl = `https://troisiemechemin.fr/articles/${slug}`

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <article>
        <nav className="max-w-5xl mx-auto mb-10">
          <Link href="/articles" className="group inline-flex items-center text-xs font-sans uppercase tracking-[0.2em] text-blue-600 font-bold">
            <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span>
            Retour aux articles
          </Link>
        </nav>

        <header className="max-w-4xl mx-auto text-center mb-10 font-serif">
          <div className="text-blue-600 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">{post.date}</div>
          <h1 className="text-5xl md:text-7xl font-medium text-slate-900 leading-tight tracking-tighter mb-6 italic">{post.title}</h1>
          <p className="text-2xl font-light text-slate-500 italic max-w-2xl mx-auto leading-snug">{post.summary}</p>
        </header>

        {/* PREMIER PARTAGE */}
        <ShareActions url={articleUrl} title={post.title} />

        <div className="max-w-5xl mx-auto mb-10">
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100 p-2 bg-white">
             <img 
               src={post.image} 
               alt={post.title} 
               className="w-full h-auto max-h-150 object-cover rounded-2xl block" 
             />
          </div>
          {post.imageCredit && (
            <div className="text-center text-[10px] text-slate-400 italic font-sans tracking-widest uppercase mt-4">
              <ReactMarkdown components={{ p: ({node, ...p}) => <span {...p} />, a: ({node, ...p}) => <a {...p} className="underline hover:text-blue-600" /> }}>
                {post.imageCredit}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="prose-xl">
            <ReactMarkdown components={markdownComponents}>{contentParts[0]}</ReactMarkdown>

            {contentParts.length > 1 && (
              <a href="https://chat.troisiemechemin.fr" target="_blank" rel="noopener noreferrer" className="block my-16 group p-px rounded-3xl bg-linear-to-br from-blue-100 to-transparent shadow-sm hover:shadow-md transition-all">
                <div className="bg-white rounded-[22px] p-3 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <div className="w-full md:w-48 aspect-video md:aspect-square rounded-xl overflow-hidden shadow-sm border border-slate-100">
                    <img src="/humanist-approach.jpg" alt="Troisième chemin" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 sepia-[0.1]" />
                  </div>
                  <div className="font-serif text-center md:text-left flex-1 py-4 md:py-0">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-2 font-sans">Human Connection</h3>
                    <p className="text-2xl md:text-3xl italic text-slate-800 leading-tight">Troisième chemin App</p>
                    <p className="text-sm text-slate-500 mt-2 font-sans font-light">L'espace de supervision et de pratique clinique.</p>
                  </div>
                  <div className="pr-0 md:pr-6 pb-4 md:pb-0">
                    <span className="bg-slate-900 text-white px-6 py-3 rounded-full font-sans font-bold text-sm group-hover:bg-blue-600 transition-all whitespace-nowrap">Rejoindre →</span>
                  </div>
                </div>
              </a>
            )}

            {contentParts.length > 1 && <ReactMarkdown components={markdownComponents}>{contentParts[1]}</ReactMarkdown>}
          </div>
        </div>

        {/* DEUXIÈME PARTAGE */}
        <div className="mt-20">
          <ShareActions url={articleUrl} title={post.title} />
        </div>

        <footer className="max-w-7xl mx-auto mt-24 grid md:grid-cols-3 gap-6 font-sans border-t border-slate-100 pt-16 mb-20">
          <Link href="/articles" className="group h-96 relative rounded-4xl overflow-hidden border border-slate-200 shadow-xl">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${post.image})` }} />
            <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/50 transition-colors" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300 mb-2">Bibliothèque</h4>
              <p className="text-3xl font-serif italic mb-2">Plus d'Articles</p>
              <p className="text-sm font-light opacity-80">Continuez votre lecture.</p>
            </div>
          </Link>

          <Link href="/boutique" className="group h-96 relative rounded-4xl overflow-hidden border border-slate-200 shadow-xl">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/complete-guide.jpg')" }} />
            <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/50 transition-colors" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300 mb-2">Boutique</h4>
              <p className="text-3xl font-serif italic mb-2">La Boutique</p>
              <p className="text-sm font-light opacity-80">Guides cliniques et cadres théoriques.</p>
            </div>
          </Link>

          <Link href="https://chat.troisiemechemin.fr" className="group h-96 relative rounded-4xl overflow-hidden border border-slate-200 shadow-xl">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/humanist-approach.jpg')" }} />
            <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/50 transition-colors" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300 mb-2">Plateforme</h4>
              <p className="text-3xl font-serif italic mb-2">L'Application</p>
              <p className="text-sm font-light opacity-80">Supervision & connexion humaine.</p>
            </div>
          </Link>
        </footer>
      </article>
    </main>
  )
}