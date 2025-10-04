import { Suspense } from "react"
import SuccessClient from "./SuccessClient"
export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-2xl px-6 py-16">Chargement…</main>}>
      <SuccessClient />
    </Suspense>
  )
}
