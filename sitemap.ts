import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { products } from '@/app/boutique/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://troisiemechemin.fr'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/boutique`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/articles`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/pour-les-therapeutes`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/a-propos`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/charte-editoriale`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/mentions-legales`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ]

  const articleEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/articles/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${base}/boutique/${product.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...articleEntries, ...productEntries]
}