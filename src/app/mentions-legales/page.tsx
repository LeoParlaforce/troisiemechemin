export const metadata = {
  title: "Mentions Légales — Troisième Chemin",
  description: "Informations légales de Troisième Chemin : adresse, contact et cadre réglementaire.",
}

export default function LegalNotice() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 prose prose-slate">
      <h1>Mentions Légales</h1>

      <h2>Exploitant du site</h2>
      <p><strong>Troisième Chemin</strong></p>
      <p>1184 route de la Maurette, 83520 Roquebrune-sur-Argens, France</p>

      <h2>Contact</h2>
      <p>Email : <a href="mailto:leo.gayrard@gmail.com">leo.gayrard@gmail.com</a></p>

      <h2>Objet du site</h2>
      <p>Ce site propose des ressources éducatives et des guides psychologiques basés sur des preuves. Il est destiné à des fins informatives uniquement et ne remplace en aucun cas une consultation professionnelle auprès d'un thérapeute.</p>

      <h2>Propriété Intellectuelle</h2>
      <p>L'ensemble des contenus, guides, images et textes sont la propriété de © Troisième Chemin. Toute reproduction non autorisée est interdite conformément au Code de la propriété intellectuelle.</p>

      <h2>Hébergement</h2>
      <p>Le site est hébergé par Vercel Inc. (ou l'hébergeur que vous utilisez).</p>

      <h2>Conformité</h2>
      <p>Ce site est régi par le droit français et respecte les directives européennes sur la protection des données et les droits des consommateurs.</p>
    </main>
  )
}