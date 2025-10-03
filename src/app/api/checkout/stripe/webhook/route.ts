// app/api/checkout/stripe/webhook/route.ts
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { Resend } from "resend"
import { products } from "@/app/boutique/data"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type TrackId = "t1-fr" | "t2-fr" | "t1-en" | "t2-en"

function mustGet(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

const stripe = new Stripe(mustGet("STRIPE_SECRET_KEY"))
const resend = new Resend(mustGet("RESEND_API_KEY"))
const FROM = mustGet("RESEND_FROM")

const ZOOM_LINK: Record<TrackId, string | undefined> = {
  "t1-fr": process.env.ZOOM_T1_FR_LINK,
  "t2-fr": process.env.ZOOM_T2_FR_LINK,
  "t1-en": process.env.ZOOM_T1_EN_LINK,
  "t2-en": process.env.ZOOM_T2_EN_LINK,
}

const FIRST_DATE_TEXT: Record<TrackId, string> = {
  "t1-fr": "mercredi 7 janvier 2026 à 17:00 (Europe/Paris)",
  "t2-fr": "mercredi 14 janvier 2026 à 17:00 (Europe/Paris)",
  "t1-en": "samedi 10 janvier 2026 à 19:00 (Europe/Paris)",
  "t2-en": "samedi 17 janvier 2026 à 19:00 (Europe/Paris)",
}

function welcomeHtml(track: string, link: string) {
  const when = FIRST_DATE_TEXT[track as TrackId] || "à la date annoncée"
  return `
<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#171717">
  <p>Bonjour,</p>
  <p>bienvenue au groupe de parole. Il aura lieu <strong>${when}</strong>, puis avec une récurrence de toutes les 2 semaines. Durée&nbsp;: 90 minutes.</p>
  <p>Règles&nbsp;: caméra facultative, confidentialité.</p>
  <p>Vous ne prendrez la parole que si vous le souhaitez, aux groupes de parole vous n'êtes obligé de rien. Certains membres viennent pour écouter, d'autres aussi pour participer. C'est à vous de décider.</p>
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
  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 })
  const payload = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, sig, mustGet("STRIPE_WEBHOOK_SECRET"))
  } catch (err: any) {
    console.error("Signature error:", err?.message)
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 })
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true })
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session
    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin

    const full = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items", "customer_details", "subscription"],
    })

    const email = full.customer_details?.email || undefined
    const name = full.customer_details?.name || ""
    const firstName = name.split(" ")[0] || ""

    const track =
      (session.metadata && (session.metadata as any).track) ||
      session.client_reference_id ||
      undefined

    // Cas abonnement groupe → mail “Bienvenue” + mail interne admin
    if (track && full.subscription && email) {
      const sub = full.subscription as Stripe.Subscription

      // tag metadata.track si absent
      if ((sub.metadata?.track || "") !== track) {
        await stripe.subscriptions.update(sub.id, {
          metadata: { ...(sub.metadata || {}), track },
        })
      }

      // lien d’accès (Jitsi/Zoom selon env)
      const link = ZOOM_LINK[track as TrackId] || process.env.ZOOM_DEFAULT_LINK || "#"

      // envoi au client
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

      // mail interne admin
      try {
        await resend.emails.send({
          from: FROM,
          to: mustGet("CONTACT_TO"),
          subject: `[NEW SUB] ${track}`,
          html: `<div style="font-family:Arial">
                   <p>Track: <b>${track}</b></p>
                   <p>Email: ${email}</p>
                   <p>Sub: ${sub.id}</p>
                 </div>`,
        })
      } catch (e) {
        console.error("admin notify error:", e)
      }

      return NextResponse.json({ ok: true })
    }

    // Sinon: cas e-book → mail de livraison
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
  } catch (e) {
    console.error("Webhook handler error:", e)
    // 200 en dev pour éviter les retries infinis
    return NextResponse.json({ error: "handler_error" }, { status: 200 })
  }
}
