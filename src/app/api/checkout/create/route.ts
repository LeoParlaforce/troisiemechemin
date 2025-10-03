import { NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type TrackId = "t1-fr" | "t2-fr" | "t1-en" | "t2-en"

function mustGet(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

const stripe = new Stripe(mustGet("STRIPE_SECRET_KEY"))

export async function POST(req: Request) {
  const { track } = (await req.json()) as { track?: TrackId }
  if (!track || !["t1-fr","t2-fr","t1-en","t2-en"].includes(track)) {
    return NextResponse.json({ error: "invalid_track" }, { status: 400 })
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin
  const isFR = track.endsWith("-fr")
  const currency = isFR ? "eur" : "usd"

  const eur = Number(process.env.GROUP_PRICE_EUR_CENTS || "0")
  const usd = Number(process.env.GROUP_PRICE_USD_CENTS || "0")
  const unit_amount = isFR ? eur : usd
  if (!unit_amount) return NextResponse.json({ error: "price_missing" }, { status: 500 })

  const nameByTrack: Record<TrackId, string> = {
    "t1-fr": "Groupe Thème 1 — FR",
    "t2-fr": "Groupe Thème 2 — FR",
    "t1-en": "Group Theme 1 — ENG",
    "t2-en": "Group Theme 2 — ENG",
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    client_reference_id: track,
    metadata: { track },
    locale: isFR ? "fr" : "en",
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/therapies-groupe#inscription-${track}`,
    allow_promotion_codes: true,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency,
          unit_amount,
          recurring: { interval: "week", interval_count: 2 },
          product_data: { name: nameByTrack[track] },
        },
      },
    ],
  })

  return NextResponse.json({ url: session.url }, { status: 200 })
}
