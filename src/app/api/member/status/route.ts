import { NextResponse } from "next/server"
import Stripe from "stripe"
import { cookies } from "next/headers"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const OCCUPY = ["active","trialing","past_due","unpaid"]

export async function GET() {
  const store = await cookies()                       // ← ICI
  const cid = store.get("member_cid")?.value          // ← ICI
  if (!cid) return NextResponse.json({ member: false })
  const q = `customer:'${cid}' AND (${OCCUPY.map(s=>`status:'${s}'`).join(" OR ")})`
  const r = await stripe.subscriptions.search({ query: q, limit: 1 })
  return NextResponse.json({ member: r.data.length > 0 })
}
