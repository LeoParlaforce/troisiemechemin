import { NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type TrackId = "t1-fr" | "t2-fr"
type Av = { count: number; spotsLeft: number; full: boolean }

const CAPACITY = 10
const stripe = new Stripe(required("STRIPE_SECRET_KEY"))

function required(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

const TRACKS: TrackId[] = ["t1-fr", "t2-fr"]
const OCCUPY = new Set<Stripe.Subscription.Status>([
  "active", "trialing", "past_due", "unpaid",
])

async function countByTrack(track: TrackId): Promise<number> {
  const q = `metadata['track']:'${track}' AND status:'active'`
  const it = await stripe.subscriptions.search({ query: q, limit: 100 })
  let total = it.data.length
  let next = it.next_page
  while (next) {
    const page = await stripe.subscriptions.search({ query: q, page: next, limit: 100 })
    total += page.data.length
    next = page.next_page
  }
  return total
}

export async function GET() {
  const base: Record<TrackId, Av> = {
    "t1-fr": { count: 0, spotsLeft: CAPACITY, full: false },
    "t2-fr": { count: 0, spotsLeft: CAPACITY, full: false },
  }

  async function safeCount(track: TrackId) {
    try {
      return await countByTrack(track)
    } catch {
      const subIds = new Set<string>()
      let starting_after: string | undefined
      while (true) {
        const page = await stripe.subscriptions.list({ limit: 100, starting_after })
        for (const s of page.data) {
          if (!OCCUPY.has(s.status) || s.cancel_at_period_end) continue
          if ((s.metadata?.track as string | undefined) === track) {
            subIds.add(s.id)
          }
        }
        if (!page.has_more) break
        starting_after = page.data[page.data.length - 1]?.id
      }
      return subIds.size
    }
  }

  for (const id of TRACKS) {
    const count = await safeCount(id)
    const spotsLeft = Math.max(0, CAPACITY - count)
    base[id] = { count, spotsLeft, full: spotsLeft === 0 }
  }

  return NextResponse.json(base, { status: 200 })
}
