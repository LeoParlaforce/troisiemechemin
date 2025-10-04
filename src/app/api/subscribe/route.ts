import Stripe from "stripe"
import { NextResponse } from "next/server"

type TrackId = "t1-fr" | "t2-fr"

function must(k: string): string {
  const v = process.env[k]
  if (!v) throw new Error(`Missing ${k}`)
  return v
}

const stripe = new Stripe(must("STRIPE_SECRET_KEY"))

const LABEL: Record<TrackId, string> = {
  "t1-fr": "Groupe FR — Thème 1",
  "t2-fr": "Groupe FR — Thème 2",
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { track?: TrackId }
    const track = body.track

    if (track !== "t1-fr" && track !== "t2-fr") {
      return NextResponse.json({ error: "bad_track" }, { status: 400 })
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin
    const unit_amount = Number(process.env.GROUP_PRICE_EUR_CENTS ?? "2400")

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      locale: "fr",
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount,
            recurring: { interval: "week", interval_count: 2 },
            product_data: { name: LABEL[track], metadata: { track } },
          },
          quantity: 1,
        },
      ],
      subscription_data: { metadata: { track } },
      success_url: `${origin}/abonnement/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/therapies-groupe#creneaux`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "stripe_error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
