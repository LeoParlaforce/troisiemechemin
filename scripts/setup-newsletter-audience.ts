/**
 * Run once to create the Resend audience and write RESEND_AUDIENCE_ID to .env.local
 * Usage: npx ts-node --skip-project scripts/setup-newsletter-audience.ts
 */

// Windows TLS workaround for local dev scripts only
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

import * as fs from "fs"
import * as path from "path"
import { Resend } from "resend"

const envPath = path.resolve(process.cwd(), ".env.local")

// Parse .env.local manually (no dotenv dependency needed)
function loadEnvFile(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) return {}
  return fs.readFileSync(filePath, "utf-8")
    .split("\n")
    .reduce<Record<string, string>>((acc, line) => {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("#")) return acc
      const idx = trimmed.indexOf("=")
      if (idx === -1) return acc
      acc[trimmed.slice(0, idx)] = trimmed.slice(idx + 1)
      return acc
    }, {})
}

const env = loadEnvFile(envPath)
const RESEND_API_KEY = env.RESEND_API_KEY || process.env.RESEND_API_KEY
if (!RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY manquant dans .env.local")
  process.exit(1)
}

const resend = new Resend(RESEND_API_KEY)

async function main() {
  let audienceId: string

  // Try to create a new audience; if plan limit reached, reuse an existing one
  const createResult = await resend.audiences.create({ name: "Troisième Chemin Newsletter" })

  if (createResult.error) {
    const isLimitError =
      createResult.error.name === "validation_error" &&
      typeof (createResult.error as any).message === "string" &&
      (createResult.error as any).message.includes("segments")

    if (!isLimitError) {
      console.error("❌ Erreur Resend :", createResult.error)
      process.exit(1)
    }

    console.log("⚠️  Limite d'audiences atteinte sur ton plan Resend. Récupération des audiences existantes…")

    const listResult = await resend.audiences.list()
    if (listResult.error || !listResult.data?.data?.length) {
      console.error("❌ Impossible de lister les audiences :", listResult.error)
      process.exit(1)
    }

    const audiences = listResult.data.data
    console.log("\nAudiences existantes :")
    audiences.forEach((a: { id: string; name: string }, i: number) => {
      console.log(`  [${i + 1}] ${a.name} — ${a.id}`)
    })

    // Pick the most relevant one (prefer "Newsletter" in the name, else first)
    const match = audiences.find((a: { id: string; name: string }) =>
      a.name.toLowerCase().includes("newsletter")
    ) || audiences[0]

    audienceId = match.id
    console.log(`\n→ Réutilisation de l'audience : "${match.name}" (${audienceId})`)
  } else {
    audienceId = createResult.data!.id
    console.log(`✅ Audience créée : Troisième Chemin Newsletter (${audienceId})`)
  }

  // Write to .env.local
  let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf-8") : ""

  if (envContent.includes("RESEND_AUDIENCE_ID=")) {
    envContent = envContent.replace(/RESEND_AUDIENCE_ID=.*/g, `RESEND_AUDIENCE_ID=${audienceId}`)
  } else {
    envContent = envContent.trimEnd() + `\nRESEND_AUDIENCE_ID=${audienceId}\n`
  }

  fs.writeFileSync(envPath, envContent, "utf-8")
  console.log(`✅ RESEND_AUDIENCE_ID écrit dans .env.local`)
  console.log(`\n→ Ajoutez aussi RESEND_AUDIENCE_ID=${audienceId} dans vos secrets GitHub.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
