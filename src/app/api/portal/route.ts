import Stripe from "stripe"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const { session_id } = (await req.json()) as { session_id?: string }
    if (!session_id) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 })
    }

    const origin = new URL(req.url).origin
    const checkout = await stripe.checkout.sessions.retrieve(session_id)
    const customer =
      typeof checkout.customer === "string"
        ? checkout.customer
        : checkout.customer?.id

    if (!customer) {
      return NextResponse.json({ error: "no_customer" }, { status: 400 })
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${origin}/abonnement/success?session_id=${encodeURIComponent(
        session_id,
      )}`,
    })

    return NextResponse.json({ url: portal.url })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "portal_error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
