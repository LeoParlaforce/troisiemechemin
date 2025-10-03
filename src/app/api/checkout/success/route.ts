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

  const s = await stripe.checkout.sessions.retrieve(id, { expand: ["subscription", "customer"] })

  // ✅ typage propre sans any
  const track: string | null =
    (s.metadata && s.metadata.track) ||
    s.client_reference_id ||
    null

  const email: string | null = s.customer_details?.email || null

  const customerId =
    typeof s.customer === "string" ? s.customer :
    (s.customer ? (s.customer as Stripe.Customer).id : null)

  const res = NextResponse.json({ track, email }, { status: 200 })

  if (customerId && track) {
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
