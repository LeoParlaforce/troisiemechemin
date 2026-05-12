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

const SIGNAL_USERNAME = "@leogayrard.11"
const SIGNAL_LINK = "https://signal.me/#u/leogayrard.11"
const SIGNAL_DOWNLOAD = "https://signal.org/download"

function signalWelcomeHtml() {
  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; line-height:1.6; color:#171717; max-width:600px; margin:0 auto; padding:24px">
  <p>Bonjour,</p>

  <p>Votre abonnement est désormais actif. Merci.</p>

  <p>Le chat se fait sur <strong>Signal</strong>, une application de messagerie chiffrée de bout en bout. Pour commencer :</p>

  <p><strong>1.</strong> Installez Signal sur votre téléphone si ce n'est pas déjà fait : <a href="${SIGNAL_DOWNLOAD}" style="color:#2563eb">${SIGNAL_DOWNLOAD}</a></p>

  <p><strong>2.</strong> Ouvrez la conversation avec moi :</p>

  <p style="margin:24px 0">
    <a href="${SIGNAL_LINK}" style="display:inline-block; background:#0f172a; color:#ffffff; padding:14px 24px; text-decoration:none; font-weight:700; letter-spacing:0.05em; border-radius:4px">Ouvrir dans Signal</a>
  </p>

  <p>Mon nom d'utilisateur Signal : <span style="font-family:ui-monospace,monospace; background:#f4f4f4; padding:4px 8px">${SIGNAL_USERNAME}</span></p>

  <p>Écrivez quand vous voulez, de ce que vous voulez. C'est votre espace.</p>

  <p>La facturation est gérée par Stripe. Vous pouvez annuler à tout moment depuis l'email de reçu que Stripe vous envoie séparément.</p>

  <p style="margin-top:40px; padding-top:20px; border-top:1px solid #e5e5e5; color:#666; font-size:14px">
    Léo Gayrard<br/>
    Psychologue clinicien<br/>
    <a href="https://troisiemechemin.fr" style="color:#2563eb">troisiemechemin.fr</a>
  </p>
</div>`.trim()
}

function signalWelcomeText() {
  return `Bonjour,

Votre abonnement est désormais actif. Merci.

Le chat se fait sur Signal, une application de messagerie chiffrée de bout en bout. Pour commencer :

1. Installez Signal sur votre téléphone si ce n'est pas déjà fait : ${SIGNAL_DOWNLOAD}

2. Ouvrez la conversation avec moi via ce lien : ${SIGNAL_LINK}

Mon nom d'utilisateur Signal : ${SIGNAL_USERNAME}

Écrivez quand vous voulez, de ce que vous voulez. C'est votre espace.

La facturation est gérée par Stripe. Vous pouvez annuler à tout moment depuis l'email de reçu que Stripe vous envoie séparément.

—
Léo Gayrard
Psychologue clinicien
troisiemechemin.fr`
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

    // Service Signal (thérapie / supervision)
    const subService = sub?.metadata?.service
    const sessService = session.metadata?.service
    const service = subService || sessService

    if (service === "signal-chat") {
      if (!email) {
        console.error("signal-chat: no email on session", session.id)
        return NextResponse.json({ ok: true })
      }

      // Email de bienvenue avec lien Signal
      try {
        await resend.emails.send({
          from: FROM,
          to: email,
          subject: "Votre chat est actif — contact Signal à l'intérieur",
          html: signalWelcomeHtml(),
          text: signalWelcomeText(),
        })
      } catch (e) {
        console.error("signal welcome send error:", e)
      }

      // Notification admin
      try {
        const segment = (sub?.metadata?.segment || session.metadata?.segment || "?") as string
        const tier = (sub?.metadata?.tier || session.metadata?.tier || "?") as string
        await resend.emails.send({
          from: FROM,
          to: must("CONTACT_TO"),
          subject: `[NEW SIGNAL] ${segment} · ${tier}`,
          html: `<div style="font-family:Arial">
            <p>Service : <b>signal-chat</b></p>
            <p>Segment : <b>${segment}</b></p>
            <p>Tarif : <b>${tier}</b></p>
            <p>Email : ${email}</p>
            <p>Sub : ${sub?.id ?? "n/a"}</p>
          </div>`,
        })
      } catch (e) {
        console.error("admin notify error:", e)
      }

      return NextResponse.json({ ok: true })
    }

    // E-books : aucun email ici (téléchargement direct géré ailleurs)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("Webhook handler error:", e)
    return NextResponse.json({ error: "handler_error" }, { status: 200 })
  }
}