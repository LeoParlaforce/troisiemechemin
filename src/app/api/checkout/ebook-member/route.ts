import { NextResponse } from "next/server"
import Stripe from "stripe"
import { cookies } from "next/headers"
import { products } from "@/app/boutique/data"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function mustGet(n: string) { const v = process.env[n]; if (!v) throw new Error(`Missing ${n}`); return v }
const stripe = new Stripe(mustGet("STRIPE_SECRET_KEY"))
const OCCUPY = ["active","trialing","past_due","unpaid"]

async function isMember(customerId: string) {
  const q = `customer:'${customerId}' AND (${OCCUPY.map(s=>`status:'${s}'`).join(" OR ")})`
  const r = await stripe.subscriptions.search({ query: q, limit: 1 })
  return r.data.length > 0
}

export async function POST(req: Request) {
  const { slug } = await req.json() as { slug?: string }
  if (!slug) return NextResponse.json({ error: "missing_slug" }, { status: 400 })

  const store = await cookies()                       // ← ICI
  const cid = store.get("member_cid")?.value          // ← ICI
  if (!cid) return NextResponse.json({ error: "not_member" }, { status: 403 })
  if (!(await isMember(cid))) return NextResponse.json({ error: "not_member" }, { status: 403 })

  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin
  const p = products.find(x => x.slug === slug)
  if (!p) return NextResponse.json({ error: "unknown_product" }, { status: 404 })

  const unit_amount = slug === "pack-integral" ? 2900 : 500
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "fr",
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/boutique/${slug}`,
    line_items: [{ quantity: 1, price_data: { currency: "eur", unit_amount, product_data: { name: p.title } } }],
    customer: cid,
  })

  return NextResponse.json({ url: session.url }, { status: 200 })
}
