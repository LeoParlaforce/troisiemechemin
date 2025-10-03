import Stripe from "stripe"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!) // pas d'apiVersion

function amountFor(slug: string) {
  return slug === "pack-integral" ? 4900 : 900
}

export async function POST(req: Request) {
  try {
    const { slug, title, image = "" } = await req.json()
    if (!slug || !title) return NextResponse.json({ error: "Bad request" }, { status: 400 })

    const origin = new URL(req.url).origin
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "eur",
          unit_amount: amountFor(slug),
          product_data: { name: title, images: image ? [`${origin}${image}`] : undefined, metadata: { slug } },
        },
        quantity: 1,
      }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      allow_promotion_codes: true,
    })
    return NextResponse.json({ url: session.url })
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Stripe error" }, { status: 500 })
  }
}
