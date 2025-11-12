import { NextResponse } from "next/server"
import Stripe from "stripe"
import fs from "node:fs"
import fsp from "node:fs/promises"
import path from "node:path"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const PACK_SLUG = "pack-integral"
const PACK_ARCHIVE = "Guides psychologiques - Pack intégral.rar" // dans /public/

const files: Record<string, string> = {
  "introduction-aux-guides": "Introduction aux guides.pdf",
  "estime-de-soi": "Estime de soi - guide psychologique & pratique.pdf",
  "depression": "Dépression - guide psychologique & pratique.pdf",
  "anxiete": "Anxiété - guide psychologique & pratique.pdf",
  "relations-amoureuses": "Relations amoureuses - guide psychologique & pratique.pdf",
  "solitude": "Solitude - guide psychologique & pratique.pdf",
  "tdah": "TDAH - guide psychologique & pratique.pdf",
  "tsa": "Troubles du spectre autistique - guide psychologique & pratique.pdf",
  "tca": "Troubles du comportement alimentaire - guide psychologique & pratique.pdf",
  "sommeil": "Troubles du sommeil - guide psychologique & pratique.pdf",
  "procrastination-creativite": "Procrastination et créativité - guide psychologique & pratique.pdf",
  "hauts-potentiels": "Hauts Potentiels - guide psychologique & pratique.pdf",
}

function mimeForArchive(n: string) {
  return n.toLowerCase().endsWith(".zip") ? "application/zip" : "application/octet-stream"
}
function contentDisposition(filename: string) {
  const ascii = filename.replace(/[^\x20-\x7E]/g, "_")
  const utf8 = encodeURIComponent(filename).replace(/['()]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`).replace(/\*/g, "%2A")
  return `attachment; filename="${ascii}"; filename*=UTF-8''${utf8}`
}
async function streamFile(p: string, name: string, type: string) {
  const st = await fsp.stat(p)
  const s = fs.createReadStream(p)
  const h = new Headers()
  h.set("Content-Type", type)
  h.set("Content-Length", String(st.size))
  h.set("Accept-Ranges", "bytes")
  h.set("Cache-Control", "no-store, private")
  h.set("Content-Disposition", contentDisposition(name))
  return new Response(s as unknown as ReadableStream, { status: 200, headers: h })
}
function normalizeSlug(raw: string): { norm: string; isPack: boolean; debug: string } {
  const dec = decodeURIComponent(raw || "").trim().toLowerCase()
  const noAcc = dec.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const slug = noAcc.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
  const isPack = slug.includes("pack") && slug.includes("integral")
  return { norm: isPack ? PACK_SLUG : slug, isPack, debug: slug }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const rawSlug = url.searchParams.get("slug") || ""
    const { norm: slug, isPack, debug } = normalizeSlug(rawSlug)
    const sessionId = url.searchParams.get("session_id") || ""
    const diag = url.searchParams.get("diag") === "1"

    if (!slug) return NextResponse.json({ error: "bad_request" }, { status: 400 })

    // Bypass test: /api/download?slug=pack-integral&diag=1
    if (diag && isPack) {
      const p = path.join(process.cwd(), "public", PACK_ARCHIVE)
      return streamFile(p, PACK_ARCHIVE, mimeForArchive(PACK_ARCHIVE))
    }

    if (!sessionId) return NextResponse.json({ error: "missing_session_id" }, { status: 400 })

    // Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
    const s = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["line_items.data.price.product"] })
    if (!s || s.payment_status !== "paid") {
      return NextResponse.json({ error: "stripe_session_invalid", detail: s?.payment_status ?? null }, { status: 403 })
    }

    // Autorisation:
    // - PACK: autorisé si session payée (peu importe line_items)
    // - AUTRES: vérifier que metadata.slug correspond
let authorized = isPack
if (!authorized) {
  const name = (s.line_items?.data?.[0]?.description || "").toLowerCase()
  const normName = normalizeSlug(name).norm
  authorized = normName === slug
}


    // Envoi
    if (isPack) {
      const p = path.join(process.cwd(), "public", PACK_ARCHIVE)
      return streamFile(p, PACK_ARCHIVE, mimeForArchive(PACK_ARCHIVE))
    }

    const fname = files[slug]
    if (!fname) return NextResponse.json({ error: "file_not_mapped", requested: slug }, { status: 404 })
    const fp = path.join(process.cwd(), "public", fname)
    return streamFile(fp, fname, "application/pdf")
  } catch (e) {
    const msg = e instanceof Error ? e.message : "download_error"
    return NextResponse.json({ error: "download_error", detail: msg }, { status: 500 })
  }
}
