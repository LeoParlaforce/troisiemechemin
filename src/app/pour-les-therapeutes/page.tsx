import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pour les Thérapeutes — Troisième Chemin | Séances quotidiennes & Supervision",
  description: "Troisième Chemin donne aux thérapeutes un canal de séances quotidiennes avec leurs patients, une supervision clinique par chat, et un moyen de trouver de nouveaux patients. 50€/mois.",
  alternates: { canonical: "https://troisiemechemin.fr/pour-les-therapeutes" },
  openGraph: {
    title: "Pour les Thérapeutes — Troisième Chemin",
    description: "Séances thérapeutiques quotidiennes, supervision clinique, acquisition de patients. Un outil, un abonnement.",
    url: "https://troisiemechemin.fr/pour-les-therapeutes",
    type: "website",
    images: [{ url: "https://troisiemechemin.fr/og-image.jpg", width: 1200, height: 630 }],
  },
}

const problems = [
  {
    stat: "1×/semaine",
    label: "Le standard actuel",
    detail: "Une séance par semaine, c'est ce que la plupart des patients peuvent se permettre. Mais historiquement, une thérapie efficace nécessitait un contact quotidien. L'écart entre le besoin clinique et la réalité économique n'a jamais été aussi grand."
  },
  {
    stat: "68%",
    label: "Taux d'abandon",
    detail: "La majorité des patients arrêtent la thérapie avant la 8e séance — non pas parce qu'ils sont guéris, mais parce que les intervalles hebdomadaires érodent l'élan, la confiance et la motivation."
  },
  {
    stat: "0",
    label: "Infrastructure entre les séances",
    detail: "Il n'existe pas d'outil clinique standard pour l'espace entre les séances. L'email est non professionnel. WhatsApp n'est pas sécurisé. La relation thérapeutique s'éteint 6 jours sur 7."
  },
]

const useCases = [
  {
    number: "01",
    title: "Séances thérapeutiques quotidiennes",
    description: "Historiquement, une thérapie efficace nécessitait un contact quotidien. Aujourd'hui, les contraintes économiques ont réduit cela à une heure par semaine — cliniquement insuffisant. Troisième Chemin restaure le travail thérapeutique quotidien à un prix accessible. Chaque échange est une vraie séance, pas un supplément.",
    tag: "Pour tous les praticiens"
  },
  {
    number: "02",
    title: "Supervision clinique par chat",
    description: "Supervision directe avec Léo Gayrard, psychologue diplômé d'État — entièrement par chat. Discutez de cas complexes, affinez votre cadre théorique, développez votre identité clinique à votre rythme, de manière asynchrone.",
    tag: "Pour les praticiens diplômés et en formation"
  },
  {
    number: "03",
    title: "Acquisition de patients — et revenus",
    description: "Des patients en recherche de thérapie découvrent des praticiens via le réseau Troisième Chemin. Votre profil devient une introduction clinique — votre approche, vos spécialisations, votre disponibilité. Chaque patient que vous invitez ou trouvez via l'app génère des revenus directs pour vous.",
    tag: "Pour les cabinets libéraux"
  },
]

const profiles = [
  {
    title: "Thérapeute en libéral",
    pain: "Limité à une séance par semaine par patient. Cliniquement insuffisant, économiquement contraignant des deux côtés.",
    gain: "Séances quotidiennes via l'app. Chaque patient que vous apportez ou trouvez génère des revenus. Plus d'impact, plus de revenus."
  },
  {
    title: "Thérapeute en formation",
    pain: "Besoin d'une supervision régulière. Les cadres universitaires sont rigides, coûteux ou inaccessibles.",
    gain: "Supervision directe par un psychologue diplômé. Flexible, abordable, clinique — entièrement par chat."
  },
  {
    title: "Praticien moderne",
    pain: "Veut intégrer des outils numériques sans perdre la profondeur clinique ni les standards professionnels.",
    gain: "Une plateforme cliniquement fondée — pas une app bien-être, pas un chatbot. Une vraie infrastructure thérapeutique."
  },
  {
    title: "Étudiant en psychologie",
    pain: "En cours de formation. Pas encore d'accès à la supervision ni aux cadres cliniques réels.",
    gain: "Commencez à construire votre identité clinique maintenant. Supervision avant votre premier patient."
  },
]

const faqs = [
  {
    q: "Les échanges par chat sont-ils de vraies séances ?",
    a: "Oui. Chaque échange sur Troisième Chemin est une séance thérapeutique à part entière — pas un supplément, pas un chatbot, pas des devoirs. Historiquement, une thérapie efficace nécessitait un contact quotidien. Troisième Chemin le rend à nouveau possible cliniquement et économiquement."
  },
  {
    q: "La plateforme est-elle cliniquement sécurisée ?",
    a: "Tous les échanges sont chiffrés. La plateforme est conçue pour un usage clinique — pas une app de chat grand public. Aucune donnée n'est vendue ou partagée."
  },
  {
    q: "Comment se déroule la supervision en pratique ?",
    a: "La supervision avec Léo Gayrard se fait entièrement par chat — échanges écrits asynchrones via l'app. Vous présentez des cas, discutez de cadres théoriques et recevez un retour clinique structuré à votre rythme."
  },
  {
    q: "Comment sont générés les revenus pour le thérapeute ?",
    a: "Pour chaque patient que vous invitez sur l'app ou que vous trouvez via le réseau Troisième Chemin, vous recevez une rémunération directe. Plus vous développez votre patientèle sur l'app, plus vos revenus augmentent."
  },
  {
    q: "Est-ce que 50€/mois est le même prix pour les thérapeutes et les patients ?",
    a: "Oui. L'abonnement est identique. Pour un thérapeute, il couvre le canal de séances avec ses patients, l'accès à la supervision et la visibilité sur le réseau. Pour un patient, il couvre l'accès thérapeutique direct."
  },
]

export default function PourLesThérapeutes() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://troisiemechemin.fr/pour-les-therapeutes",
        "name": "Pour les Thérapeutes — Troisième Chemin",
        "url": "https://troisiemechemin.fr/pour-les-therapeutes",
        "description": "Troisième Chemin donne aux thérapeutes un canal de séances quotidiennes, une supervision clinique, et une acquisition de patients.",
        "publisher": { "@id": "https://troisiemechemin.fr/#organization" },
        "author": { "@id": "https://troisiemechemin.fr/#author" }
      },
      {
        "@type": "Service",
        "@id": "https://troisiemechemin.fr/#service-therapeutes",
        "name": "Troisième Chemin — Abonnement Thérapeute",
        "provider": { "@id": "https://troisiemechemin.fr/#organization" },
        "description": "Outil de séances thérapeutiques quotidiennes, supervision clinique et acquisition de patients pour les thérapeutes.",
        "serviceType": "Supervision Clinique & Infrastructure Thérapeutique",
        "areaServed": "Worldwide",
        "offers": {
          "@type": "Offer",
          "price": "50",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "billingIncrement": "P1M",
          "description": "Abonnement mensuel. Résiliation à tout moment."
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      }
    ]
  }

  return (
    <main className="font-serif text-slate-900 bg-transparent">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 md:pt-24">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/60 border border-blue-200 text-blue-700 text-xs font-sans font-bold uppercase tracking-widest">
            <span className="text-blue-500">✦</span> Pour les Thérapeutes & Supervisés
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold italic tracking-tighter leading-none mb-8 max-w-4xl">
          Vos patients ont besoin de vous{" "}
          <span className="text-blue-600">chaque jour.</span>{" "}
          Pas une fois par semaine.
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 italic font-light leading-relaxed max-w-2xl mb-12">
          Historiquement, une thérapie efficace nécessitait un contact quotidien. Troisième Chemin le rend à nouveau possible — de vraies séances, tous les jours, à un prix accessible.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://chat.troisiemechemin.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-sm font-sans hover:bg-blue-600 transition hover:-translate-y-0.5 transform-gpu shadow-sm"
          >
            Commencer pour 50€/mois →
          </a>
          <a
            href="mailto:leo.gayrard@gmail.com?subject=Troisième Chemin — Question praticien"
            className="inline-flex items-center justify-center px-10 py-4 border border-slate-300 text-slate-600 rounded-full font-bold text-sm font-sans hover:border-blue-400 hover:text-blue-600 transition italic"
          >
            Poser une question d'abord
          </a>
        </div>

        <p className="mt-4 text-slate-400 text-xs font-sans uppercase tracking-widest">
          Résiliation à tout moment · Chiffré · 100% humain — sans IA
        </p>
      </section>

      {/* PROBLÈME */}
      <section className="border-y border-slate-200 bg-white/60 backdrop-blur-sm py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-10">
            La réalité clinique
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {problems.map((p, i) => (
              <div key={i} className="space-y-4">
                <div className="text-5xl font-bold italic text-slate-900 tracking-tighter">{p.stat}</div>
                <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">{p.label}</div>
                <p className="text-slate-600 italic text-sm leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USAGES */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-4">
          Ce que Troisième Chemin vous apporte
        </p>
        <h2 className="text-4xl md:text-5xl font-bold italic tracking-tighter mb-16 max-w-2xl leading-tight">
          Trois outils. Un abonnement.
        </h2>

        <div className="space-y-6">
          {useCases.map((u, i) => (
            <div
              key={i}
              className="group border border-slate-200 rounded-2xl p-8 md:p-10 bg-white/70 backdrop-blur-sm hover:border-blue-300 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                <div className="shrink-0">
                  <span className="text-5xl font-bold italic text-slate-200 group-hover:text-blue-100 transition-colors">
                    {u.number}
                  </span>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <h3 className="text-2xl font-bold italic text-slate-900">{u.title}</h3>
                    <span className="inline-block text-[10px] font-sans font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full w-fit">
                      {u.tag}
                    </span>
                  </div>
                  <p className="text-slate-600 italic leading-relaxed">{u.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROFILS */}
      <section className="border-y border-slate-200 bg-white/60 backdrop-blur-sm py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-4">
            Pour qui
          </p>
          <h2 className="text-4xl font-bold italic tracking-tighter mb-12">
            Vous reconnaissez-vous ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profiles.map((p, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl p-8 bg-white/80 space-y-4">
                <h3 className="text-xl font-bold italic text-slate-900">{p.title}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-slate-300 font-bold text-lg mt-0.5 shrink-0">—</span>
                    <p className="text-slate-500 italic text-sm leading-relaxed">{p.pain}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold text-lg mt-0.5 shrink-0">→</span>
                    <p className="text-slate-700 italic text-sm leading-relaxed font-medium">{p.gain}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARIF */}
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-4">
          Tarif
        </p>
        <h2 className="text-4xl md:text-5xl font-bold italic tracking-tighter mb-6">
          Un prix. Tout inclus.
        </h2>
        <p className="text-slate-500 italic mb-12 text-lg leading-relaxed">
          Le même abonnement vous donne accès aux séances patients, à la supervision et à la visibilité réseau. Pas de niveaux, pas de frais cachés.
        </p>

        <div className="border-2 border-slate-900 rounded-3xl p-10 md:p-14 bg-white/80 space-y-8">
          <div>
            <div className="text-7xl font-bold italic tracking-tighter text-slate-900">50€</div>
            <div className="text-slate-400 font-sans text-sm uppercase tracking-widest mt-2">par mois · résiliation à tout moment</div>
          </div>

          <ul className="space-y-3 text-left max-w-sm mx-auto">
            {[
              "Séances patients quotidiennes (chat chiffré)",
              "Revenus pour chaque patient apporté ou trouvé",
              "Supervision clinique avec Léo Gayrard (chat)",
              "Acquisition de patients via le réseau",
              "Sans IA — échanges 100% humains",
              "Résiliation à tout moment, sans engagement",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700 italic text-sm">
                <span className="text-blue-500 font-bold shrink-0 font-sans">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href="https://chat.troisiemechemin.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 bg-slate-900 text-white rounded-full font-bold text-sm font-sans hover:bg-blue-600 transition text-center"
          >
            Ouvrir l'App →
          </a>

          <p className="text-slate-400 text-xs font-sans italic">
            Une question avant de vous abonner ?{" "}
            <a href="mailto:leo.gayrard@gmail.com" className="text-blue-600 hover:underline">
              Écrivez directement à Léo
            </a>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-white/60 backdrop-blur-sm py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-sans font-bold uppercase tracking-widest text-blue-500 mb-4">
            Questions fréquentes
          </p>
          <h2 className="text-3xl font-bold italic tracking-tighter mb-10">
            Avant de décider.
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="group border border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold italic text-slate-800 hover:text-blue-600 transition-colors">
                  <span className="pr-4">{f.q}</span>
                  <span className="text-blue-400 group-open:rotate-180 transition-transform shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 italic text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
        <h2 className="text-4xl md:text-6xl font-bold italic tracking-tighter mb-6 leading-tight">
          La thérapie a toujours été faite pour être{" "}
          <span className="text-blue-600">quotidienne.</span>
        </h2>
        <p className="text-slate-500 italic text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Troisième Chemin restaure ce que la thérapie était censée être — fréquente, accessible, humaine. Construit par un psychologue, pour les psychologues.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://chat.troisiemechemin.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-sm font-sans hover:bg-blue-600 transition hover:-translate-y-0.5 transform-gpu shadow-sm"
          >
            Commencer pour 50€/mois →
          </a>
          <Link
            href="/articles"
            className="inline-flex items-center justify-center px-10 py-4 border border-slate-300 text-slate-600 rounded-full font-bold text-sm font-sans hover:border-blue-400 hover:text-blue-600 transition italic"
          >
            Lire les articles d'abord
          </Link>
        </div>
      </section>
    </main>
  )
}
