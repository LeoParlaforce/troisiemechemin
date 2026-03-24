// src/lib/posts.ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "src/posts")

export function getAllPosts() { // <-- Vérifiez l'export ici
  if (!fs.existsSync(postsDirectory)) return []
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)
    return { slug, ...data } as any
  })
}

export function getPostBySlug(slug: string) { // <-- Et ici
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)
    return { slug, content, ...data } as any
  } catch (e) {
    return null
  }
}