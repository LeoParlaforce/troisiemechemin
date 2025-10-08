import Stripe from "stripe"
import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type TrackId = "t1-fr" | "t2-fr"

function mustGet(k: string): string {
  const v = process.env[k]
  if (!v) throw new Error(`Missing ${k}`)
  return v
}

const stripe = new Stripe(mustGet("STRIPE_SECRET_KEY"))

const LABEL: Record<TrackId, string> = {
  "t1-fr": "Groupe FR — Thème 1",
  "t2-fr": "Groupe FR — Thème 2",
}

// Dates UTC (17:00 Paris = 16:00 UTC)
const T1_START_UTC = Math.floor(Date.UTC(2026, 0, 7, 16, 0, 0) / 1000)
const T2_START_UTC = Math.floor(Date.UTC(2026, 0, 14, 16, 0, 0) / 1000)

export async function POST(req: Request) {
  try {
    const { track } = (await req.json()) as { track?: TrackId }
    if (!track || (track !== "t1-fr" && track !== "t2-fr")) {
      return NextResponse.json({ error: "bad_track" }, { status: 400 })
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin
    const unit_amount = Number(process.env.GROUP_PRICE_EUR_CENTS ?? "2400")
    if (!unit_amount) {
      return NextResponse.json({ error: "price_missing" }, { status: 500 })
    }

    const trial_end = track === "t1-fr" ? T1_START_UTC : T2_START_UTC
    const now = Math.floor(Date.now() / 1000)
    const effectiveTrialEnd = trial_end > now ? trial_end : now

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
      subscription_data: {
        // Stripe : on ne garde que trial_end (PAS billing_cycle_anchor)
        trial_end: effectiveTrialEnd,
        metadata: { track },
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/therapies-groupe#creneaux`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (e: unknown) {
    console.error("subscribe route error:", e)
    const msg = e instanceof Error ? e.message : "stripe_error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
