import { NextResponse } from "next/server"

// Ancrages de départ et jours (Europe/Paris)
const cfg: Record<string, { dtstart: string; byday: "WE"|"SA"; summary: string }> = {
  "t1-fr": { dtstart: "20260107T170000", byday: "WE", summary: "Groupe FR — Thème 1" },
  "t2-fr": { dtstart: "20260114T170000", byday: "WE", summary: "Groupe FR — Thème 2" },
  "t1-en": { dtstart: "20260110T190000", byday: "SA", summary: "Group ENG — Theme 1" },
  "t2-en": { dtstart: "20260117T190000", byday: "SA", summary: "Group ENG — Theme 2" },
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const track = url.searchParams.get("track") as keyof typeof cfg | null
  if (!track || !cfg[track]) return NextResponse.json({ error: "bad_track" }, { status: 400 })

  const { dtstart, byday, summary } = cfg[track]
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

  const ics =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//troisiemechemin.fr//Groupes//FR
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${track}-${dtstart}@troisiemechemin.fr
DTSTAMP:${now}
DTSTART;TZID=Europe/Paris:${dtstart}
DURATION:PT90M
RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=${byday}
SUMMARY:${summary}
DESCRIPTION:Session bimensuelle en visio.
END:VEVENT
END:VCALENDAR`

  return new Response(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="group-${track}.ics"`,
    },
  })
}
