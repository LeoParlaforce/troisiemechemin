// src/app/api/download/route.ts
import { NextResponse } from "next/server"
import Stripe from "stripe"
import fs from "node:fs"
import fsp from "node:fs/promises"
import path from "node:path"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const PACK_SLUG = "pack-integral"
const PACK_ARCHIVE = "Guides psychologiques - Pack intégral.rar" // placé dans /public/

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

function mimeForArchive(filename: string): string {
  const lower = filename.toLowerCase()
  if (lower.endsWith(".zip")) return "application/zip"
  if (lower.endsWith(".rar")) return "application/octet-stream"
  return "application/octet-stream"
}

function contentDisposition(filename: string) {
  const ascii = filename.replace(/[^\x20-\x7E]/g, "_")
  const utf8 = encodeURIComponent(filename)
    .replace(/['()]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)
    .replace(/\*/g, "%2A")
  return `attachment; filename="${ascii}"; filename*=UTF-8''${utf8}`
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const sessionId = url.searchParams.get("session_id") || ""
    const slug = url.searchParams.get("slug") || ""
    if (!sessionId || !slug) return NextResponse.json({ error: "bad_request" }, { status: 400 })

    // 1) Session Stripe payée
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
    const s = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["line_items.data.price.product"] })
    if (!s || s.payment_status !== "paid") {
      return NextResponse.json(
        { error: "stripe_session_invalid", detail: s?.payment_status ?? null },
        { status: 403 }
      )
    }

    // 2) Vérifier que l'article demandé est bien dans la session
    const hasItem = (s.line_items?.data ?? []).some(li => {
      const product = li.price?.product
      const prod = typeof product === "string" ? undefined : (product as Stripe.Product | undefined)
      const metaSlug = prod?.metadata?.slug ?? ""
      const name = (prod?.name ?? "").toLowerCase()
      if (slug === PACK_SLUG) {
        // tolérance pour le pack
        return (
          metaSlug === PACK_SLUG ||
          metaSlug === "pack" ||
          metaSlug === "pack-integral-winrar" ||
          name.includes("pack intégral") ||
          name.includes("pack integral")
        )
      }
      return metaSlug === slug
    })
    if (!hasItem) return NextResponse.json({ error: "item_not_in_session" }, { status: 403 })

    // 3) Streaming depuis /public
    if (slug === PACK_SLUG) {
      const p = path.join(process.cwd(), "public", PACK_ARCHIVE)
      const st = await fsp.stat(p)
      const stream = fs.createReadStream(p)
      const h = new Headers()
      h.set("Content-Type", mimeForArchive(PACK_ARCHIVE))
      h.set("Content-Length", String(st.size))
      h.set("Accept-Ranges", "bytes")
      h.set("Cache-Control", "no-store, private")
      h.set("Content-Disposition", contentDisposition(PACK_ARCHIVE))
      return new Response(stream as unknown as ReadableStream, { status: 200, headers: h })
    }

    const fname = files[slug]
    if (!fname) return NextResponse.json({ error: "file_not_mapped" }, { status: 404 })
    const fp = path.join(process.cwd(), "public", fname)
    const st = await fsp.stat(fp)
    const stream = fs.createReadStream(fp)
    const h = new Headers()
    h.set("Content-Type", "application/pdf")
    h.set("Content-Length", String(st.size))
    h.set("Accept-Ranges", "bytes")
    h.set("Cache-Control", "no-store, private")
    h.set("Content-Disposition", contentDisposition(fname))
    return new Response(stream as unknown as ReadableStream, { status: 200, headers: h })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "download_error"
    return NextResponse.json({ error: "download_error", detail: msg }, { status: 500 })
  }
}
