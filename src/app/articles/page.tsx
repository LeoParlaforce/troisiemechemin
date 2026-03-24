import { getAllPosts } from "@/lib/posts"
import Link from "next/link"

export const metadata = {
  title: "Articles & Ressources | Troisième Chemin",
  description: "Guides pratiques et réflexions sur la psychologie et la pratique clinique.",
}

export default function ArticlesPage() {
  const posts = getAllPosts()

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Articles</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Réflexions cliniques, guides de pratique et outils pour les psychologues humanistes.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link 
            key={post.slug} 
            href={`/articles/${post.slug}`}
            className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100"
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
            </div>
            <div className="p-8">
              <span className="text-xs font-bold text-violet-600 uppercase tracking-widest">{post.date}</span>
              <h2 className="text-2xl font-bold mt-2 mb-4 group-hover:text-violet-600 transition-colors leading-tight">
                {post.title}
              </h2>
              <p className="text-slate-500 line-clamp-3 italic">{post.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}