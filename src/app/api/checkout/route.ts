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
    expand: ["subscription", "customer", "line_items"],
  })

  const track =
    (s.metadata?.track as string | undefined) ||
    s.client_reference_id ||
    null

  const email = s.customer_details?.email || null

  const li = s.line_items?.data?.[0]
  const slug =
    (li?.description
      ? li.description.toLowerCase().replace(/\s+/g, "-")
      : null) || null

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
