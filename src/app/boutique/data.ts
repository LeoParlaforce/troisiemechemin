export type FAQItem = {
  question: string
  answer: string
}

export type Product = {
  slug: string
  title: string
  priceEUR: string
  priceUSD: string
  image: string
  summary: string
  chapters: string[]
  faq: FAQItem[]
}

export const products: Product[] = [
  {
    slug: "introduction-aux-guides",
    title: "Introduction aux guides psychologiques",
    priceEUR: "0€",
    priceUSD: "$0",
    image: "/introduction.jpg",
    summary: "Les fondements de l'approche : la thérapie comme un entraînement pour devenir le guérisseur de son propre monde.",
    chapters: ["Avant-propos", "Introduction", "La pratique de la thérapie", "Qu'est-ce que le sujet", "La thérapie dont vous êtes le héros", "La limite fondamentale"],
    faq: [
      { question: "Pourquoi ce guide est-il gratuit ?", answer: "Cette introduction établit le cadre conceptuel nécessaire pour naviguer efficacement dans tous les autres protocoles." },
      { question: "Est-ce pour les professionnels ou les patients ?", answer: "Il est conçu pour toute personne souhaitant jouer un rôle actif dans sa propre restructuration psychologique." }
    ]
  },
  {
    slug: "estime-de-soi",
    title: "Estime de soi",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/estime.jpg",
    summary: "Quitter le narcissisme pour retrouver la tension du désir et les pratiques de décentrement.",
    chapters: ["Introduction", "Le mirage du soi", "Narcissisme et fausse autonomie", "Retrouver la tension du désir", "Pratiques qui décentrent", "Conclusion"],
    faq: [
      { question: "En quoi cela diffère-t-il de la pensée positive ?", answer: "Au lieu de répéter des affirmations, ce guide se concentre sur les actions extérieures et la tension du désir pour construire une valeur personnelle authentique." },
      { question: "Puis-je utiliser ces pratiques quotidiennement ?", answer: "Oui, le guide propose des exercices de décentrement spécifiques conçus pour être intégrés à votre routine quotidienne." }
    ]
  },
  {
    slug: "depression",
    title: "Dépression",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/depression.jpg",
    summary: "Lire la dépression comme un retrait protecteur. Rouvrir le chemin par de minuscules commencements et des appuis.",
    chapters: ["Introduction", "Le corps ralenti", "La pensée qui se ferme", "Isolement et connexion", "Le désir obscur et la vie qui persiste", "Petits mouvements, minuscules départs", "Supports et compagnonnage", "Conclusion"],
    faq: [
      { question: "Qu'est-ce qu'un « minuscule commencement » ?", answer: "C'est une micro-action qui demande un minimum d'énergie mais qui sert à briser le cycle du retrait total." },
      { question: "Cela remplace-t-il un traitement médical ?", answer: "Non, il s'agit d'un protocole psychologique conçu pour fonctionner aux côtés d'un soutien médical ou thérapeutique." }
    ]
  },
  {
    slug: "anxiete",
    title: "Anxiété",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/anxiete.jpg",
    summary: "Du signal corporel aux boucles de pensée : recevoir la vague et retrouver une marge d'action.",
    chapters: ["Introduction", "Quand le corps parle", "Le cercle des pensées", "Donner une place à l'inquiétude", "Rencontrer les autres", "Désir, choix, imprévu", "Pistes concrètes", "Conclusion"],
    faq: [
      { question: "Comment arrêter de trop réfléchir ?", answer: "Le guide se concentre sur le fait de « donner une place à l'inquiétude » plutôt que de la combattre, ce qui aide à briser les boucles infinies de l'anxiété." },
      { question: "Des techniques immédiates sont-elles incluses ?", answer: "Oui, il fournit des pistes concrètes pour gérer les signaux corporels et regagner une marge de manœuvre." }
    ]
  },
  {
    slug: "relations-amoureuses",
    title: "Relations amoureuses",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/relations.jpg",
    summary: "Le désir comme écart vivant : parole, séduction quotidienne, jeux de positions et liberté dans le lien.",
    chapters: ["Désir et rencontre", "L'art de la parole", "La séduction au quotidien", "L'équilibre au-delà du 50/50", "Jeux de positions", "Liberté et lien", "Les pièges de l'attente", "Une histoire en mouvement"],
    faq: [
      { question: "Que signifie la « séduction » dans un lien à long terme ?", answer: "Il s'agit de maintenir « l'écart » et la tension du désir pour que la relation ne s'effondre pas dans une habitude morne." },
      { question: "Comment fonctionnent les jeux de positions ?", answer: "Le guide explore comment changer de rôle et maintenir sa liberté au sein du lien peut revitaliser une relation." }
    ]
  },
  {
    slug: "solitude",
    title: "Solitude",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/solitude.jpg",
    summary: "Comprendre la solitude comme une tension entre se fondre et transformer. Rouvrir la rencontre.",
    chapters: ["Introduction", "Le malentendu du manque", "Se fondre ou transformer", "Façonner le monde à son image", "Rencontrer l'altérité", "Créativité et nouvelles connexions", "Étapes concrètes", "Conclusion"],
    faq: [
      { question: "La solitude est-elle la même chose que l'isolement ?", answer: "Non. Ce guide enseigne comment transformer le « manque » de l'isolement en un état de solitude créatif et productif." },
      { question: "Comment recommencer à rencontrer des gens ?", answer: "Il se concentre d'abord sur la construction de votre propre monde, ce qui rouvre naturellement la possibilité de rencontres authentiques." }
    ]
  },
  {
    slug: "tdah",
    title: "TDAH",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/tdah.jpg",
    summary: "Une manière singulière de désirer et de vivre le temps. Transformer la tension en élan créateur.",
    chapters: ["Introduction", "Un fonctionnement singulier", "Quand le quotidien parle", "Repères pour se situer", "Trouver son propre rythme", "Transformer la tension en moteur", "Relations et désir", "Prochaines étapes", "Conclusion ?"],
    faq: [
      { question: "Ce guide propose-t-il des astuces de productivité ?", answer: "Il va plus loin, explorant la relation unique au temps et au désir qui caractérise l'expérience du TDAH." },
      { question: "Comment trouver mon propre rythme ?", answer: "Le protocole fournit des repères pour vous aider à arrêter de lutter contre votre nature et commencer à utiliser votre tension comme un moteur." }
    ]
  },
  {
    slug: "tsa",
    title: "Troubles du spectre autistique",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/tsa.jpg",
    summary: "Regagner une prise sur la vie : repères, dialogue et invention de formes de lien et d'environnement.",
    chapters: ["Reprendre prise sur la vie", "Percevoir différemment", "Créer ses repères", "Apprendre à dialoguer", "Transformer les relations", "S'ouvrir au monde", "Faire évoluer son environnement", "Un chemin singulier et créatif"],
    faq: [
      { question: "Comment cela aide-t-il pour les interactions sociales ?", answer: "Il met l'accent sur « l'apprentissage du dialogue » à travers vos propres repères uniques plutôt que sur le simple camouflage (masking)." },
      { question: "Puis-je adapter mon environnement grâce à cela ?", answer: "Oui, un chapitre entier est dédié à l'évolution de votre entourage pour qu'il corresponde à vos besoins sensoriels et psychologiques." }
    ]
  },
  {
    slug: "tca",
    title: "Troubles du comportement alimentaire",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/tca.jpg",
    summary: "Au-delà de la nourriture : lutte avec le vide, le corps et le désir. Retrouver le mouvement vital.",
    chapters: ["Introduction", "Manger le vide ou le trop-plein du vide", "Retrait et désinvestissement du monde", "Refus du corps sexué et peur du désir", "Du tout à la partie : la fixation sans fin", "Le pouvoir illusoire du « rien »", "Retrouver le mouvement du désir", "Pistes de soutien et conclusion"],
    faq: [
      { question: "Pourquoi cela ne se concentre-t-il pas uniquement sur le régime ?", answer: "Les troubles alimentaires sont souvent liés à une lutte avec le vide et le désir ; ce guide aborde ces tensions psychologiques profondes." },
      { question: "Comment retrouver le « mouvement vital » ?", answer: "Le protocole travaille sur le réinvestissement du monde et du corps pour dépasser la fixation sur le néant." }
    ]
  },
  {
    slug: "sommeil",
    title: "Troubles du sommeil",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/sommeil.jpg",
    summary: "Rythmes, stress, émotions et environnement : des pistes concrètes vers une nuit apaisée.",
    chapters: ["Introduction", "Corps, esprit et rythmes biologiques", "Stress, anxiété et rumination", "Habitudes et environnement", "Sommeil et émotions profondes", "Moyens de retrouver son rythme", "Quand le sommeil parle", "Vers une relation paisible avec la nuit"],
    faq: [
      { question: "J'ai tout essayé pour dormir, pourquoi est-ce différent ?", answer: "Ce guide examine comment le « sommeil parle » de nos émotions profondes et de nos rythmes de stress plutôt que de simples conseils d'hygiène." },
      { question: "Comment arrêter de ruminer la nuit ?", answer: "Il propose des chemins psychologiques spécifiques pour gérer le stress et les émotions qui maintiennent l'esprit en éveil." }
    ]
  },
  {
    slug: "procrastination-creativite",
    title: "Procrastination et créativité",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/procrastination.jpg",
    summary: "De l'évitement à l'invention : commencer comme acte créateur, valoriser l'ennui et les commencements multiples.",
    chapters: ["Introduction", "La fausse excuse de la certitude", "Commencer, c'est déjà créer", "L'ennui comme passage", "Trouver le désir dans le but", "De l'évitement à l'invention", "Pistes concrètes", "Conclusion"],
    faq: [
      { question: "Pourquoi est-ce que j'évite les tâches importantes ?", answer: "Le guide explore « la fausse excuse de la certitude » et la peur des commencements comme racines de l'évitement." },
      { question: "Comment l'ennui peut-il aider ma créativité ?", answer: "Il enseigne comment utiliser l'ennui comme un passage nécessaire vers l'invention plutôt que comme quelque chose à fuir." }
    ]
  },
  {
    slug: "hauts-potentiels",
    title: "Hauts potentiels",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/hpi.jpg",
    summary: "Au-delà du QI : forces, vulnérabilités, mode de vie et relations pour inventer un chemin singulier.",
    chapters: ["Ce que signifie HPI aujourd'hui", "Un esprit rapide et singulier", "Vivre la différence au quotidien", "Forces du HPI", "Vulnérabilités fréquentes", "Grandir et s'épanouir avec le HPI", "Trouver son mode de vie et ses relations", "Inventer son propre chemin"],
    faq: [
      { question: "Est-ce juste une question d'intelligence ?", answer: "Non, il traite de « l'esprit rapide et singulier » et des vulnérabilités émotionnelles spécifiques qui l'accompagnent." },
      { question: "Comment trouver un mode de vie qui me correspond ?", answer: "Le protocole offre une feuille de route pour inventer un chemin qui respecte votre intensité et vos besoins uniques." }
    ]
  },
  {
    slug: "pack-integral",
    title: "Pack Intégral",
    priceEUR: "54.50€",
    priceUSD: "$59.50",
    image: "/pack.jpg",
    summary: "Les 11 guides + l'Introduction à prix réduit. Un accès complet pour travailler chaque thématique.",
    chapters: ["Contenu du pack :", "Introduction aux guides", "Estime de soi", "Dépression", "Anxiété", "Relations amoureuses", "Solitude", "TDAH", "Troubles du spectre autistique", "Troubles du comportement alimentaire", "Troubles du sommeil", "Procrastination et créativité", "Hauts potentiels"],
    faq: [
      { question: "Quel est le format des guides ?", answer: "Tous les guides sont livrés sous forme de fichiers PDF de haute qualité, optimisés pour la lecture sur tous les appareils." },
      { question: "Y a-t-il une réduction pour l'achat du pack ?", answer: "Oui, le pack complet offre une réduction significative par rapport à l'achat individuel des 12 guides." }
    ]
  },
]

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}