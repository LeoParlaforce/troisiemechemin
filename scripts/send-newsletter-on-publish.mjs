/**
 * Triggered by GitHub Actions on push of new .md articles.
 * Reads NEW_ARTICLE_FILES (newline-separated paths) from env,
 * parses frontmatter, and sends a Resend broadcast per article.
 *
 * Env vars required: RESEND_API_KEY, RESEND_AUDIENCE_ID, RESEND_FROM (optional)
 */

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Resend } from "resend"

const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID
const FROM = process.env.RESEND_FROM || "contact@troisiemechemin.fr"
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://troisiemechemin.fr"

if (!RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY manquant")
  process.exit(1)
}
if (!RESEND_AUDIENCE_ID) {
  console.error("❌ RESEND_AUDIENCE_ID manquant")
  process.exit(1)
}

const rawFiles = process.env.NEW_ARTICLE_FILES || ""
const files = rawFiles.split("\n").map(f => f.trim()).filter(Boolean)

if (files.length === 0) {
  console.log("Aucun nouvel article détecté.")
  process.exit(0)
}

const resend = new Resend(RESEND_API_KEY)

function articleHtml(title, summary, slug) {
  const articleUrl = `${SITE_URL}/articles/${slug}`
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a">
  <div style="background:#0a0a0a;color:#f2f2f0;font-family:Georgia,'Times New Roman',serif;max-width:580px;margin:0 auto;padding:48px 32px">
    <p style="font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:#4b5563;font-family:Arial,Helvetica,sans-serif;margin:0 0 40px">Troisième Chemin — Nouvel article</p>
    <h1 style="font-size:32px;font-style:italic;font-weight:400;color:#f2f2f0;margin:0 0 20px;line-height:1.25">${title}</h1>
    <p style="font-size:17px;color:#c9c9c4;line-height:1.75;margin:0 0 40px;font-style:italic">${summary}</p>
    <div style="border-top:1px solid #1f2937;padding-top:32px">
      <a href="${articleUrl}" style="display:inline-block;background:#f2f2f0;color:#0a0a0a;padding:13px 28px;border-radius:100px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;text-decoration:none;letter-spacing:0.08em">Lire l'article →</a>
    </div>
    <p style="margin:40px 0 0;font-size:11px;color:#374151;font-family:Arial,Helvetica,sans-serif;line-height:1.6">
      troisiemechemin.fr · Léo Gayrard, Psychologue Clinicien<br>
      <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#4b5563;text-decoration:underline">Se désabonner</a>
    </p>
  </div>
</body>
</html>`
}

async function sendForFile(filePath) {
  const abs = path.resolve(process.cwd(), filePath)
  if (!fs.existsSync(abs)) {
    console.warn(`⚠️  Fichier introuvable : ${abs}`)
    return
  }

  const raw = fs.readFileSync(abs, "utf-8")
  const { data } = matter(raw)
  const { title, summary, slug } = data

  if (!title || !summary || !slug) {
    console.warn(`⚠️  Frontmatter incomplet dans ${filePath} (title/summary/slug requis)`)
    return
  }

  console.log(`📨 Envoi newsletter pour : ${title}`)

  const broadcast = await resend.broadcasts.create({
    audienceId: RESEND_AUDIENCE_ID,
    from: FROM,
    name: `[Article] ${title}`,
    subject: title,
    html: articleHtml(title, summary, slug),
  })

  if (broadcast.error) {
    console.error(`❌ Erreur création broadcast :`, broadcast.error)
    process.exitCode = 1
    return
  }

  const sent = await resend.broadcasts.send(broadcast.data.id)
  if (sent.error) {
    console.error(`❌ Erreur envoi broadcast :`, sent.error)
    process.exitCode = 1
    return
  }

  console.log(`✅ Broadcast envoyé : ${broadcast.data.id}`)
}

for (const file of files) {
  await sendForFile(file)
}
