import { NextResponse } from "next/server"
import { Resend } from "resend"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const welcomeHtml = (siteUrl: string, email: string) => `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a">
  <div style="background:#0a0a0a;color:#f2f2f0;font-family:Georgia,'Times New Roman',serif;max-width:580px;margin:0 auto;padding:48px 32px">
    <p style="font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:#4b5563;font-family:Arial,Helvetica,sans-serif;margin:0 0 40px">Troisième Chemin</p>
    <h1 style="font-size:36px;font-style:italic;font-weight:400;color:#f2f2f0;margin:0 0 20px;line-height:1.2">Bienvenue.</h1>
    <p style="font-size:17px;color:#c9c9c4;line-height:1.7;margin:0 0 16px">
      Vous êtes abonné(e) à la newsletter de Troisième Chemin.
    </p>
    <p style="font-size:15px;color:#8a8a82;line-height:1.8;margin:0 0 40px">
      Chaque nouvel article vous sera envoyé directement. Pas de spam, pas de marketing — juste des réflexions cliniques sur la psychologie et l'expérience humaine.
    </p>
    <div style="border-top:1px solid #1f2937;padding-top:32px;margin-top:8px">
      <a href="${siteUrl}/articles" style="display:inline-block;background:#f2f2f0;color:#0a0a0a;padding:13px 28px;border-radius:100px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;text-decoration:none;letter-spacing:0.08em">Lire les articles →</a>
    </div>
    <p style="margin:40px 0 0;font-size:11px;color:#374151;font-family:Arial,Helvetica,sans-serif;line-height:1.6">
      troisiemechemin.fr · Léo Gayrard, Psychologue Clinicien<br>
      <a href="${siteUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}" style="color:#4b5563;text-decoration:underline">Se désabonner</a>
    </p>
  </div>
</body>
</html>
`

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "email_invalide" }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY!)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://troisiemechemin.fr"
    const from = process.env.RESEND_FROM!
    const adminEmail = process.env.CONTACT_TO || "leo.gayrard@gmail.com"

    // Add to Resend audience if configured
    if (process.env.RESEND_AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
        unsubscribed: false,
      })
    }

    // Welcome email to subscriber
    await resend.emails.send({
      from,
      to: email,
      subject: "Bienvenue dans la newsletter — Troisième Chemin",
      html: welcomeHtml(siteUrl, email),
    })

    // Admin notification
    await resend.emails.send({
      from,
      to: adminEmail,
      subject: `Nouvel abonné newsletter : ${email}`,
      html: `<div style="font-family:Arial,sans-serif"><p>Nouvel abonné à la newsletter :</p><p><strong>${email}</strong></p></div>`,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 })
  }
}
