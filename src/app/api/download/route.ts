import { NextResponse } from "next/server"
import Stripe from "stripe"
import fs from "node:fs/promises"
import path from "node:path"

export const runtime = "nodejs"

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

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const sessionId = url.searchParams.get("session_id") || ""
    const slug = url.searchParams.get("slug") || ""
    if (!sessionId || !slug) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 })
    }
    if (slug === "pack-integral") {
      return NextResponse.json({ error: "use_pack_page" }, { status: 400 })
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
      const prod =
        typeof product === "string" ? undefined : (product as Stripe.Product | undefined)
      return prod?.metadata?.slug === slug
    })
    if (!ok) {
      return NextResponse.json({ error: "item_not_in_session" }, { status: 403 })
    }

    const fname = files[slug]
    if (!fname) {
      return NextResponse.json({ error: "file_not_mapped" }, { status: 404 })
    }

    const filePath = path.join(process.cwd(), "private", "pdfs", fname)
    const buf = await fs.readFile(filePath)
    const body = new Uint8Array(buf)

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fname}"`,
        "Cache-Control": "no-store",
      },
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "download_error"
    return NextResponse.json({ error: "download_error", detail: msg }, { status: 500 })
  }
}
