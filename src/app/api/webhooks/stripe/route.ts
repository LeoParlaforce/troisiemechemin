import Stripe from "stripe";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function mustGet(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

const stripe = new Stripe(mustGet("STRIPE_SECRET_KEY"));

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("No signature", { status: 400 });

  const raw = await req.text(); // important: corps brut
  try {
    stripe.webhooks.constructEvent(raw, sig, mustGet("STRIPE_WEBHOOK_SECRET"));
  } catch (err: any) {
    return new Response(`Webhook error: ${err.message}`, { status: 400 });
  }

  return new Response("ok", { status: 200 });
}
