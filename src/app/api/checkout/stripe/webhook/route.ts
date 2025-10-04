import { NextResponse } from "next/server"
import Stripe from "stripe"
import { Resend } from "resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function must(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

const stripe = new Stripe(must("STRIPE_SECRET_KEY"))
const resend = new Resend(must("RESEND_API_KEY"))
const FROM = must("RESEND_FROM")

type TrackId = "t1-fr" | "t2-fr"

const ZOOM_LINK: Record<TrackId, string | undefined> = {
  "t1-fr": process.env.ZOOM_T1_FR_LINK,
  "t2-fr": process.env.ZOOM_T2_FR_LINK,
}

const FIRST_DATE_TEXT: Record<TrackId, string> = {
  "t1-fr": "mercredi 7 janvier 2026 à 17:00 (Europe/Paris)",
  "t2-fr": "mercredi 14 janvier 2026 à 17:00 (Europe/Paris)",
}

function welcomeHtml(track: TrackId, link: string) {
  const when = FIRST_DATE_TEXT[track] || "à la date annoncée"
  return `
<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#171717">
  <p>Bonjour,</p>
  <p>Bienvenue au groupe de parole. Il aura lieu <strong>${when}</strong>, puis toutes les 2 semaines. Durée : 90 minutes.</p>
  <p>Règles : caméra facultative, confidentialité.</p>
  <p><strong>Lien d’accès aux sessions :</strong><br />
    <a href="${link}" style="color:#7c3aed">${link}</a>
  </p>
  <p>Cordialement,<br/>Léo Gayrard</p>
</div>`.trim()
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")
  if (!sig) return NextResponse.json({ error: "no_signature" }, { status: 400 })
  const payload = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, sig, must("STRIPE_WEBHOOK_SECRET"))
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 })
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true })
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session
    const full = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items", "customer_details", "subscription"],
    })

    const email = full.customer_details?.email ?? undefined
    const sub = (full.subscription ?? null) as Stripe.Subscription | null
    const subTrack = sub?.metadata?.track
    const sessTrack = (session.metadata?.track as string | undefined) ?? session.client_reference_id ?? undefined
    const trackRaw = (subTrack ?? sessTrack) as string | undefined

    // Groupes: mail OK
    if (trackRaw === "t1-fr" || trackRaw === "t2-fr") {
      if (sub && sub.metadata?.track !== trackRaw) {
        await stripe.subscriptions.update(sub.id, { metadata: { ...(sub.metadata || {}), track: trackRaw } })
      }
      const link = ZOOM_LINK[trackRaw] || process.env.ZOOM_DEFAULT_LINK || "#"
      if (email) {
        try {
          await resend.emails.send({
            from: FROM,
            to: email,
            subject: `Bienvenue — ${trackRaw}`,
            html: welcomeHtml(trackRaw as TrackId, link),
          })
        } catch (e) {
          console.error("welcome send error:", e)
        }
      }
      try {
        await resend.emails.send({
          from: FROM,
          to: must("CONTACT_TO"),
          subject: `[NEW SUB] ${trackRaw}`,
          html: `<div style="font-family:Arial"><p>Track: <b>${trackRaw}</b></p><p>Email: ${email ?? "n/a"}</p><p>Sub: ${sub?.id ?? "n/a"}</p></div>`,
        })
      } catch (e) {
        console.error("admin notify error:", e)
      }
      return NextResponse.json({ ok: true })
    }

    // E-books: aucun email ici
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("Webhook handler error:", e)
    return NextResponse.json({ error: "handler_error" }, { status: 200 })
  }
}
