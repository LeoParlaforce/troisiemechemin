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

  const s = await stripe.checkout.sessions.retrieve(id, {
    expand: ["subscription", "customer", "line_items.data.price.product"],
  })

  const track =
    (s.metadata?.track as string | undefined) ||
    s.client_reference_id ||
    null

  const email = s.customer_details?.email || null

  let slug: string | null = null
  const line = s.line_items?.data?.[0]

  // --- récupération du slug depuis metadata produit Stripe
  if (line?.price?.product && typeof line.price.product !== "string") {
    const product = line.price.product as Stripe.Product
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    slug = (product.metadata as any)?.slug || null
  }

  // --- fallback sur description
  if (!slug && line?.description) {
    slug = line.description.toLowerCase().replace(/\s+/g, "-")
  }

  const res = NextResponse.json({ track, email, slug }, { status: 200 })

  const isMember = track === "t1-fr" || track === "t2-fr"
  const customerId =
    typeof s.customer === "string"
      ? s.customer
      : s.customer
      ? (s.customer as Stripe.Customer).id
      : null

  if (customerId && isMember) {
    res.cookies.set("member_cid", customerId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    })
  }

  return res
}
