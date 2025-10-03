import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type TrackId = "t1-fr" | "t2-fr" | "t1-en" | "t2-en"

function mustGet(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

const resend = new Resend(mustGet("RESEND_API_KEY"))
const FROM = mustGet("RESEND_FROM")

// Utilise tes URLs Jitsi (ou Zoom) depuis .env.local
const SESSION_LINK: Record<TrackId, string | undefined> = {
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

function welcomeHtml(track: TrackId, link: string) {
  const when = FIRST_DATE_TEXT[track]
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

export async function POST(req: Request) {
  const { email, track } = (await req.json()) as { email?: string; track?: TrackId }
  if (!email || !track) return NextResponse.json({ error: "missing_fields" }, { status: 400 })

  const link = SESSION_LINK[track] || process.env.ZOOM_DEFAULT_LINK || "#"

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: `Bienvenue — ${track}`,
      html: welcomeHtml(track, link),
    })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("welcome send error:", e)
    return NextResponse.json({ error: "send_failed" }, { status: 500 })
  }
}
