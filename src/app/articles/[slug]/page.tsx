import { getPostBySlug } from "@/lib/posts"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

export async function generateMetadata({ params }: { params: any }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Troisième Chemin`,
    description: post.summary,
    openGraph: { title: post.title, description: post.summary, images: [post.image] },
  }
}

export async function generateStaticParams() {
  const { getAllPosts } = await import("@/lib/posts")
  const allPosts = getAllPosts()
  return allPosts.map((post: any) => ({ slug: post.slug }))
}

const markdownComponents = {
  h2: ({ ...props }: any) => <h2 {...props} className="text-4xl md:text-5xl font-black text-slate-900 mt-24 mb-10 tracking-tight leading-tight border-b pb-4" />,
  h3: ({ ...props }: any) => <h3 {...props} className="text-2xl font-bold text-slate-800 mt-12 mb-6 uppercase tracking-wide" />,
  p: ({ ...props }: any) => <p {...props} className="text-xl leading-relaxed text-slate-700 mb-8" />,
  ul: ({ ...props }: any) => <ul {...props} className="space-y-4 mb-10 list-none" />,
  li: ({ ...props }: any) => (
    <li {...props} className="flex items-start text-xl text-slate-700">
      <span className="text-violet-500 mr-3 font-bold text-2xl leading-none">/</span>
      {props.children}
    </li>
  ),
  blockquote: ({ ...props }: any) => (
    <div className="my-16 bg-slate-900 text-white p-12 rounded-3xl -rotate-1 shadow-2xl transition hover:rotate-0 duration-500">
      <p className="text-3xl font-black italic leading-tight mb-0">"{props.children}"</p>
    </div>
  ),
  strong: ({ ...props }: any) => <strong {...props} className="font-extrabold text-slate-900 bg-violet-100 px-1 rounded" />,
  a: ({ ...props }: any) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-violet-600 font-bold underline decoration-2 underline-offset-4 hover:bg-violet-600 hover:text-white transition-all px-1" />,
};

export default async function ArticlePage({ params }: { params: any }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return notFound()

  const contentParts = (post.content || "").split("[CTA-APP]")

  return (
    <main className="max-w-7xl mx-auto px-4 py-20">
      <article className="relative">
        <header className="max-w-4xl mx-auto text-center mb-24">
          <div className="inline-block bg-violet-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-8 shadow-lg">
            {post.date} • Marketing Clinique
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-12">
            {post.title}
          </h1>
          <p className="text-2xl md:text-3xl font-medium text-slate-500 leading-tight italic">
            {post.summary}
          </p>
        </header>

        {/* Section Image Principale & Crédit */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="w-full h-[600px] rounded-4xl overflow-hidden shadow-2xl relative">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
          {post.imageCredit && (
            <div className="mt-4 text-right text-sm text-slate-400 italic px-4">
              <ReactMarkdown components={{ p: ({children}) => <span>{children}</span> }}>
                {post.imageCredit}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="prose-xl">
            <ReactMarkdown components={markdownComponents}>{contentParts[0]}</ReactMarkdown>

            {/* Middle CTA - Version Française */}
            {contentParts.length > 1 && (
              <a href="https://chat.troisiemechemin.fr" target="_blank" rel="noopener noreferrer" 
                 className="block my-16 h-48 relative rounded-3xl overflow-hidden group shadow-lg transition-transform hover:scale-[1.01]">
                <div className="absolute inset-0 bg-slate-900" />
                <div className="absolute inset-0 p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white z-10">
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold uppercase tracking-[0.2em] text-violet-300 mb-2">Supervision Professionnelle</h3>
                    <p className="text-xl opacity-90 leading-tight mb-0 text-white font-light italic">Un soutien clinique pour votre pratique.</p>
                  </div>
                  <span className="bg-white text-slate-900 px-8 py-3 rounded-full font-medium text-base tracking-wide whitespace-nowrap group-hover:bg-violet-600 group-hover:text-white transition-all shadow-md">
                    Rejoindre la supervision →
                  </span>
                </div>
              </a>
            )}

            {contentParts.length > 1 && (
              <ReactMarkdown components={markdownComponents}>{contentParts[1]}</ReactMarkdown>
            )}
          </div>
        </div>

        {/* Footer CTAs - Version Française */}
        <footer className="max-w-5xl mx-auto mt-40 grid md:grid-cols-2 gap-8">
          <a href="https://chat.troisiemechemin.fr" className="group h-80 relative rounded-4xl overflow-hidden border border-slate-200 shadow-xl transition hover:-translate-y-2 duration-300">
            <div className="absolute inset-0 bg-slate-900/80 group-hover:bg-violet-900/90 transition duration-500 z-10" />
            <div className="absolute inset-0 p-12 flex flex-col justify-end text-white z-20">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-violet-400">Application</h4>
              <p className="text-4xl font-light leading-tight text-white mb-2">App de Supervision</p>
              <p className="text-lg font-light opacity-70 text-white italic">Retours cliniques sur votre pratique.</p>
            </div>
          </a>

          <a href="/boutique" className="group h-80 relative rounded-4xl overflow-hidden border border-slate-200 shadow-xl transition hover:-translate-y-2 duration-300 text-right">
            <div className="absolute inset-0 bg-slate-900/80 group-hover:bg-indigo-900/90 transition duration-500 z-10" />
            <div className="absolute inset-0 p-12 flex flex-col justify-end text-white z-20">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-indigo-400">Librairie</h4>
              <p className="text-4xl font-light leading-tight text-white mb-2">Livres de Psychologie</p>
              <p className="text-lg font-light opacity-70 text-white italic">Guides de clinique humaniste.</p>
            </div>
          </a>
        </footer>
      </article>
    </main>
  )
}