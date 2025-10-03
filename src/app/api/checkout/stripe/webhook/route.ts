// app/api/checkout/stripe/webhook/route.ts
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { Resend } from "resend"
import { products } from "@/app/boutique/data"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type TrackId = "t1-fr" | "t2-fr"

const must = (k: string) => {
  const v = process.env[k]
  if (!v) throw new Error(`Missing ${k}`)
  return v
}

const stripe = new Stripe(must("STRIPE_SECRET_KEY"))
const resend = new Resend(must("RESEND_API_KEY"))
const FROM = must("RESEND_FROM")

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
  <p>Bienvenue au groupe de parole. Il aura lieu <strong>${when}</strong>, puis toutes les 2 semaines. Durée&nbsp;: 90 minutes.</p>
  <p>Règles&nbsp;: caméra facultative, confidentialité.</p>
  <p>Vous ne prendrez la parole que si vous le souhaitez. Certains membres viennent pour écouter, d'autres pour participer.</p>
  <p><strong>Lien d’accès aux sessions&nbsp;:</strong><br />
    <a href="${link}" style="color:#7c3aed">${link}</a>
  </p>
  <p>Cordialement,<br/>Léo Gayrard</p>
</div>`.trim()
}

function downloadUrlFor(slug: string, origin: string) {
  return `${origin}/boutique/${slug}`
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")
  if (!sig) return NextResponse.json({ error: "no_signature" }, { status: 400 })
  const payload = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, sig, must("STRIPE_WEBHOOK_SECRET"))
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "invalid_signature"
    console.error("Signature error:", msg)
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 })
  }

  // On traite seulement ici ; sinon 200
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true })
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session
    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin

    const full = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items", "customer_details", "subscription"],
    })

    const email = full.customer_details?.email ?? undefined
    const name = full.customer_details?.name ?? ""
    const firstName = name.split(" ")[0] ?? ""

    // track prioritaire depuis metadata.subscription, fallback session
    const sub = (full.subscription ?? null) as Stripe.Subscription | null
    const subTrack = sub?.metadata?.track
    const sessTrack = (session.metadata?.track as string | undefined) ?? session.client_reference_id ?? undefined
    const trackRaw = (subTrack ?? sessTrack) as string | undefined

    // Abonnement groupe
    if (trackRaw && email) {
      if (trackRaw !== "t1-fr" && trackRaw !== "t2-fr") {
        // ignore les anciens EN si jamais
        return NextResponse.json({ ok: true })
      }
      const track: TrackId = trackRaw
      // ensure metadata.track
      if (sub && sub.metadata?.track !== track) {
        await stripe.subscriptions.update(sub.id, { metadata: { ...(sub.metadata || {}), track } })
      }

      const link = ZOOM_LINK[track] || process.env.ZOOM_DEFAULT_LINK || "#"

      // mail client
      try {
        await resend.emails.send({
          from: FROM,
          to: email,
          subject: `Bienvenue — ${track}`,
          html: welcomeHtml(track, link),
        })
      } catch (e) {
        console.error("welcome send error:", e)
      }

      // mail admin
      try {
        await resend.emails.send({
          from: FROM,
          to: must("CONTACT_TO"),
          subject: `[NEW SUB] ${track}`,
          html: `<div style="font-family:Arial">
                   <p>Track: <b>${track}</b></p>
                   <p>Email: ${email}</p>
                   <p>Sub: ${sub?.id ?? "n/a"}</p>
                 </div>`,
        })
      } catch (e) {
        console.error("admin notify error:", e)
      }

      return NextResponse.json({ ok: true })
    }

    // Paiement e-book
    const item = full.line_items?.data[0]
    const title = item?.description || "E-book"
    const match = products.find(p => p.title.toLowerCase() === title.toLowerCase())
    const slug = match?.slug || "introduction-aux-guides"
    const downloadUrl = downloadUrlFor(slug, origin)

    if (email) {
      try {
        await resend.emails.send({
          from: FROM,
          to: email,
          subject: `Votre e-book « ${title} » — lien`,
          html:
            `<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#171717">` +
            `<p>Bonjour ${firstName || ""}, merci pour votre achat.</p>` +
            `<p><strong>Téléchargement</strong> : <a href="${downloadUrl}" style="color:#7c3aed">cliquer ici</a></p>` +
            `</div>`,
        })
      } catch (e) {
        console.error("ebook send error:", e)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "handler_error"
    console.error("Webhook handler error:", msg)
    return NextResponse.json({ error: "handler_error" }, { status: 200 })
  }
}
