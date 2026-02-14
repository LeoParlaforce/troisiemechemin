import { createClient } from "https://esm.sh/@base44/sdk";

/**
 * ⚠️ IMPORTANT
 * appBaseUrl DOIT être l’URL Base44 (.base44.app)
 * PAS ton domaine custom
 */
const appParams = {
  appId: "6980d6f2512dd3c466c8d616",
  functionsVersion: "v1",
  appBaseUrl: "https://troisiemechemin.base44.app"
};

// Client Base44 sans auth (webhook / serveur)
const base44 = createClient({
  appId: appParams.appId,
  token: null,
  functionsVersion: appParams.functionsVersion,
  requiresAuth: false,
  appBaseUrl: appParams.appBaseUrl
});

/**
 * Création d’abonnement via Base44
 * appelée directement par le webhook Stripe
 */
export async function createSubscription(email, plan) {
  if (!email || !plan) {
    throw new Error("Missing email or plan");
  }

  return await base44.functions.invoke("createSubscription", {
    userEmail: email,
    plan
  });
}
