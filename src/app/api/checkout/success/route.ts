import { NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function mustGet(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}
const stripe = new Stripe(mustGet("STRIPE_SECRET_KEY"))

export async function GET(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get("id") || url.searchParams.get("session_id")
  if (!id) return NextResponse.json({ error: "missing_session_id" }, { status: 400 })

  try {
    const s = await stripe.checkout.sessions.retrieve(id, {
      expand: ["line_items.data.price.product"],
    })

    const email = s.customer_details?.email || null
    let slug: string | null = null
    const line = s.line_items?.data?.[0]

    // 1. Récupération du slug via les metadata du produit Stripe (le plus fiable)
    if (line?.price?.product && typeof line.price.product !== "string") {
      const product = line.price.product as Stripe.Product
      slug = (product.metadata as any)?.slug || null
    }

    // 2. Fallback sur le nom du produit (transformé en slug)
    if (!slug && line?.description) {
      slug = line.description.toLowerCase().trim().replace(/\s+/g, "-")
    }

    // On renvoie juste ce qui est nécessaire pour la page de succès
    return NextResponse.json({ 
      status: s.payment_status, // "paid", "unpaid", etc.
      email, 
      slug 
    }, { status: 200 })

  } catch (e) {
    return NextResponse.json({ error: "stripe_error" }, { status: 500 })
  }
}