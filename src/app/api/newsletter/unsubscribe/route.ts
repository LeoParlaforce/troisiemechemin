import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url)
  const email = searchParams.get("email")

  if (!email) {
    return NextResponse.redirect(new URL("/", origin))
  }

  try {
    if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.contacts.remove({
        audienceId: process.env.RESEND_AUDIENCE_ID,
        id: email,
      })
    }
  } catch {
    // fail silently — redirect anyway
  }

  return NextResponse.redirect(new URL(`/?desabonne=1`, origin))
}
