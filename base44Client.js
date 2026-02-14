import { createClient } from "https://esm.sh/@base44/sdk";

const appParams = {
  appId: "6980d6f2512dd3c466c8d616",
  functionsVersion: "v1",
  appBaseUrl: "https://chat.troisiemechemin.fr"
};

// client Base44 sans auth
const base44 = createClient({
  appId: appParams.appId,
  token: null,
  functionsVersion: appParams.functionsVersion,
  requiresAuth: false,
  appBaseUrl: appParams.appBaseUrl
});

export async function createSubscription(email, plan) {
  return await base44.functions.invoke("createSubscription", {
    userEmail: email,
    plan
  });
}
