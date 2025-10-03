import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function mustGet(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

const resend = new Resend(mustGet("RESEND_API_KEY"))
const ADMIN_TO = mustGet("CONTACT_TO")
const FROM = mustGet("RESEND_FROM")

type Body = {
  type: "info" | "waitlist"
  name: string
  email: string
  track: "t1-fr" | "t2-fr" | "t1-en" | "t2-en"
  message?: string
}

export async function POST(req: Request) {
  const b = (await req.json()) as Partial<Body>

  if (!b?.type || !b?.name || !b?.email || !b?.track) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 })
  }

  // Mail interne (à toi)
  const tag = b.type === "waitlist" ? "[WAITLIST]" : "[INFO]"
  const adminHtml = `
  <div style="font-family:Arial">
    <p>${tag} ${b.track}</p>
    <p><strong>Nom:</strong> ${b.name}<br/>
    <strong>Email:</strong> ${b.email}</p>
    ${b.message ? `<p><strong>Message:</strong><br/>${b.message.replace(/\n/g,"<br/>")}</p>` : ""}
  </div>`.trim()

  // Accusé réception utilisateur
  const userHtml = `
  <div style="font-family:Arial">
    <p>Bonjour ${b.name.split(" ")[0] || ""},</p>
    ${b.type === "waitlist"
      ? `<p>Vous avez été ajouté·e à la liste d’attente pour <strong>${b.track}</strong>. Nous vous écrirons dès qu’une place se libère.</p>`
      : `<p>Merci pour votre demande d’information. Nous revenons vers vous rapidement.</p>`
    }
  </div>`.trim()

  try {
    await Promise.all([
      resend.emails.send({ from: FROM, to: ADMIN_TO, subject: `${tag} ${b.track}`, html: adminHtml }),
      resend.emails.send({ from: FROM, to: b.email!, subject: "Réception confirmée", html: userHtml }),
    ])
  } catch (e) {
    console.error("waitlist send error:", e)
    // on confirme quand même côté UI
  }

  return NextResponse.json({ ok: true })
}
