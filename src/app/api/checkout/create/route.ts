// src/app/api/checkout/create/route.ts
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
  const eur = Number(process.env.GROUP_PRICE_EUR_CENTS || "0")
  if (!eur) return NextResponse.json({ error: "price_missing" }, { status: 500 })

  const trial_end = track === "t1-fr" ? T1_START_UTC : T2_START_UTC
  const now = Math.floor(Date.now() / 1000)
  const effectiveTrialEnd = trial_end > now ? trial_end : now

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    locale: "fr",
    client_reference_id: track,
    metadata: { track },
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/therapies-groupe#inscription-${track}`,
    allow_promotion_codes: true,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: eur,
          recurring: { interval: "week", interval_count: 2 },
          product_data: {
            name: track === "t1-fr" ? "Groupe Thème 1 — FR" : "Groupe Thème 2 — FR",
          },
        },
      },
    ],
    subscription_data: {
      trial_end: effectiveTrialEnd, // première facturation à la date voulue
      metadata: { track },
    },
  })

  return NextResponse.json({ url: session.url }, { status: 200 })
}
