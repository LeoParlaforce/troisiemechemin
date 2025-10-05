import { Resend } from "resend"

// remplace par ta vraie clé Resend commençant par re_...
const resend = new Resend("re_JmfzChnp_LTncPg737gXwZiC1jmqAPJJm")

await resend.emails.send({
  from: "contact@troisiemechemin.fr",
  to: "leo.gayrard@gmail.com", // ← ton adresse réelle
  subject: "Test Resend — Troisième Chemin",
  html: `
    <div style="font-family:Arial,sans-serif;line-height:1.6">
      <p>Test d’envoi d’email depuis Resend avec Node.</p>
      <p>Si tu lis ceci, la clé fonctionne.</p>
    </div>
  `,
})

console.log("Email test envoyé.")
