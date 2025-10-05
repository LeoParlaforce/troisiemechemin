// app/api/checkout/create/route.ts (ou ton fichier actuel)
import { NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type TrackId = "t1-fr" | "t2-fr"

function mustGet(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

const stripe = new Stripe(mustGet("STRIPE_SECRET_KEY"))

// 17:00 Europe/Paris = 16:00 UTC en janvier
const T1_START_UTC = Math.floor(Date.UTC(2026, 0, 7, 16, 0, 0) / 1000)  // 2026-01-07
const T2_START_UTC = Math.floor(Date.UTC(2026, 0, 14, 16, 0, 0) / 1000) // 2026-01-14

export async function POST(req: Request) {
  const { track } = (await req.json()) as { track?: TrackId }
  if (!track || !["t1-fr", "t2-fr"].includes(track)) {
    return NextResponse.json({ error: "invalid_track" }, { status: 400 })
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin
  const currency = "eur"

  const eur = Number(process.env.GROUP_PRICE_EUR_CENTS || "0")
  if (!eur) return NextResponse.json({ error: "price_missing" }, { status: 500 })

  const nameByTrack: Record<TrackId, string> = {
    "t1-fr": "Groupe Thème 1 — FR",
    "t2-fr": "Groupe Thème 2 — FR",
  }

  const trial_end = track === "t1-fr" ? T1_START_UTC : T2_START_UTC

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    client_reference_id: track,
    metadata: { track },
    locale: "fr",
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/therapies-groupe#inscription-${track}`,
    allow_promotion_codes: true,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency,
          unit_amount: eur,
          recurring: { interval: "week", interval_count: 2 },
          product_data: { name: nameByTrack[track] },
        },
      },
    ],
    subscription_data: {
      trial_end,                 // premier prélèvement à la date voulue
      proration_behavior: "none",
      metadata: { track },
    },
  })

  return NextResponse.json({ url: session.url }, { status: 200 })
}
