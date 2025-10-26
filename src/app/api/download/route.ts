// src/app/api/download/route.ts
import { NextResponse } from "next/server"
import Stripe from "stripe"
import fs from "node:fs"
import fsp from "node:fs/promises"
import path from "node:path"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const PACK_SLUG = "pack-integral"
const PACK_ARCHIVE = "Guides psychologiques - Pack intégral.rar" // présent dans /public/

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
  const asciiFallback = filename.replace(/[^\x20-\x7E]/g, "_")
  const utf8 = encodeURIComponent(filename)
    .replace(/['()]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)
    .replace(/\*/g, "%2A")
  return `attachment; filename="${asciiFallback}"; filename*=UTF-8''${utf8}`
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const sessionId = url.searchParams.get("session_id") || ""
    const slug = url.searchParams.get("slug") || ""
    if (!sessionId || !slug) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const full = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    })
    if (full.payment_status !== "paid") {
      return NextResponse.json({ error: "unpaid" }, { status: 403 })
    }

    const ok = (full.line_items?.data ?? []).some((li) => {
      const product = li.price?.product
      const prod = typeof product === "string" ? undefined : (product as Stripe.Product | undefined)
      return prod?.metadata?.slug === slug
    })
    if (!ok) return NextResponse.json({ error: "item_not_in_session" }, { status: 403 })

    // Pack -> stream depuis /public
    if (slug === PACK_SLUG) {
      const archPath = path.join(process.cwd(), "public", PACK_ARCHIVE)
      const stat = await fsp.stat(archPath)
      const stream = fs.createReadStream(archPath)

      const headers = new Headers()
      headers.set("Content-Type", mimeForArchive(PACK_ARCHIVE))
      headers.set("Content-Length", String(stat.size))
      headers.set("Accept-Ranges", "bytes")
      headers.set("Cache-Control", "no-store, private")
      headers.set("Content-Disposition", contentDisposition(PACK_ARCHIVE))

      return new NextResponse(stream as unknown as ReadableStream, { status: 200, headers })
    }

    // PDF unitaire depuis /public
    const fname = files[slug]
    if (!fname) return NextResponse.json({ error: "file_not_mapped" }, { status: 404 })

    const filePath = path.join(process.cwd(), "public", fname)
    const stat = await fsp.stat(filePath)
    const stream = fs.createReadStream(filePath)

    const headers = new Headers()
    headers.set("Content-Type", "application/pdf")
    headers.set("Content-Length", String(stat.size))
    headers.set("Accept-Ranges", "bytes")
    headers.set("Cache-Control", "no-store, private")
    headers.set("Content-Disposition", contentDisposition(fname))

    return new NextResponse(stream as unknown as ReadableStream, { status: 200, headers })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "download_error"
    return NextResponse.json({ error: "download_error", detail: msg }, { status: 500 })
  }
}
