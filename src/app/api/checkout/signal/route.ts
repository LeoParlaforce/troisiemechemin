import { NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function must(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

const stripe = new Stripe(must("STRIPE_SECRET_KEY"))

type Tier = "reduced" | "full"
type Segment = "therapie" | "supervision"

const TIERS: Record<Tier, { amount: number; label: string }> = {
  reduced: {
    amount: 8000, // 80€
    label: "Tarif réduit",
  },
  full: {
    amount: 15000, // 150€
    label: "Tarif plein",
  },
}

export async function POST(req: Request) {
  try {
    const { tier, segment } = (await req.json()) as {
      tier?: Tier
      segment?: Segment
    }

    if (tier !== "reduced" && tier !== "full") {
      return NextResponse.json({ error: "invalid_tier" }, { status: 400 })
    }
    if (segment !== "therapie" && segment !== "supervision") {
      return NextResponse.json({ error: "invalid_segment" }, { status: 400 })
    }

    const url = new URL(req.url)
    const baseUrl = `${url.protocol}//${url.host}`

    const { amount, label } = TIERS[tier]

    const productName =
      segment === "therapie"
        ? `Thérapie — ${label}`
        : `Supervision — ${label}`

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      locale: "auto",
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: amount,
            recurring: { interval: "month" },
            product_data: {
              name: productName,
              description:
                "Chat privé chiffré avec Léo Gayrard — psychologue clinicien. Annulable à tout moment.",
            },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: {
          service: "signal-chat",
          tier,
          segment,
        },
      },
      metadata: {
        service: "signal-chat",
        tier,
        segment,
      },
      allow_promotion_codes: true,
      success_url: `${baseUrl}/app/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/app`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error("Signal checkout error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}