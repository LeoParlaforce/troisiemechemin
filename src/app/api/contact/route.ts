import { NextResponse } from "next/server"
import { Resend } from "resend"

type Body = {
  name: string
  email: string
  message: string
  track?: string
  website?: string // honeypot
}

export async function POST(req: Request) {
  try {
    const { name, email, message, track, website } = (await req.json()) as Body
    if (website) return NextResponse.json({ ok: true }) // honeypot
    if (!name || !email || !message) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY!)
    const to = process.env.CONTACT_TO || "you@example.com"
    const subject = `Demande d’info — ${track || "groupe"}`
    const html =
      `<div style="font-family:Arial,Helvetica,sans-serif">
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Groupe:</strong> ${track || "-"}</p>
        <p style="white-space:pre-wrap">${message}</p>
      </div>`

    const r = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to,
      replyTo: email, // correction
      subject,
      html,
      text: `Nom: ${name}\nEmail: ${email}\nGroupe: ${track || "-"}\n\n${message}`,
    })

    if (r.error) {
      return NextResponse.json({ error: "send_failed" }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "contact_error" }, { status: 500 })
  }
}
