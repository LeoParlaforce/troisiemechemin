export type FAQItem = {
  question: string
  answer: string
}

export type Product = {
  slug: string
  title: string
  price: string
  image: string
  summary: string
  chapters: string[]
  faq: FAQItem[]
}

export const products: Product[] = [
  { 
    slug: "introduction-aux-guides", 
    title: "Introduction aux guides", 
    price: "Gratuit", 
    image: "/introduction.jpg",
    summary: "Fondations de la démarche : la thérapie comme formation à devenir le soigneur de son monde.",
    chapters: ["Avant-propos","Introduction","La pratique de la thérapie","Quel est le sujet","Thérapie dont vous êtes le héros","La limite fondamentale"],
    faq: [
      { question: "Pourquoi ce guide est-il gratuit ?", answer: "L'introduction pose les bases conceptuelles nécessaires pour utiliser tous les autres protocoles. C'est la porte d'entrée de la méthode." },
      { question: "À qui s'adresse cette approche ?", answer: "À toute personne souhaitant passer d'une position passive à une position d'acteur dans son travail thérapeutique." }
    ]
  },
  { 
    slug: "estime-de-soi", 
    title: "Estime de soi", 
    price: "9.50 €", 
    image: "/estime.jpg",
    summary: "Quitter le narcissisme pour retrouver la tension du désir et des pratiques qui décentrent.",
    chapters: ["Introduction","Le mirage du soi","Narcissisme et fausse autonomie","Retrouver la tension du désir","Pratiques qui décentrent","Conclusion"],
    faq: [
      { question: "L'estime de soi est-elle innée ?", answer: "Non, elle se construit et se déconstruit à travers nos actions et notre rapport au désir." },
      { question: "Comment ce guide aide-t-il concrètement ?", answer: "Il propose des exercices de décentrement pour sortir de l'obsession du 'moi'." }
    ]
  },
  { 
    slug: "depression", 
    title: "Dépression", 
    price: "9.50 €", 
    image: "/depression.jpg",
    summary: "Lire la dépression comme retrait protecteur et rouvrir la voie par des débuts infimes et des appuis.",
    chapters: ["Introduction","Le corps ralenti","La pensée qui se ferme","Isolement et lien","Désir obscur et vie qui persiste","Petits mouvements, débuts infimes","Soutiens et compagnonnage","Conclusion"],
    faq: [
      { question: "Peut-on sortir de la dépression seul ?", answer: "Le guide aide à identifier les micro-mouvements possibles, mais souligne l'importance des appuis extérieurs." },
      { question: "Qu'est-ce qu'un début infime ?", answer: "C'est une action si petite qu'elle ne demande presque aucun effort, mais qui suffit à relancer le mouvement vital." }
    ]
  },
  { 
    slug: "anxiete", 
    title: "Anxiété", 
    price: "9.50 €", 
    image: "/anxiete.jpg",
    summary: "Du signal corporel au cercle des pensées : accueillir l’onde et retrouver une marge d’action.",
    chapters: ["Introduction","Quand le corps parle","Le cercle des pensées","Trouver une place à l'inquiétude","La rencontre avec les autres","Désir, choix, imprévu","Pistes concrètes","Conclusion"],
    faq: [
      { question: "L'anxiété peut-elle disparaître ?", answer: "L'objectif n'est pas de la supprimer, mais de changer son rapport à elle pour qu'elle ne paralyse plus l'action." },
      { question: "Comment calmer les boucles de pensées ?", answer: "Le guide propose des techniques pour donner une place à l'inquiétude au lieu de lutter contre elle." }
    ]
  },
  { 
    slug: "relations-amoureuses", 
    title: "Relations amoureuses", 
    price: "9.50 €", 
    image: "/relations.jpg",
    summary: "Le désir comme écart vivant : parole, séduction quotidienne, positions et liberté dans le lien.",
    chapters: ["Désir et rencontre","L'art de la parole","Séduction au quotidien","L'équilibre au-delà du 50/50","Jeux de positions","Liberté et lien","Les écueils de l'attente","Une histoire en mouvement"],
    faq: [
      { question: "Pourquoi la séduction est-elle importante au quotidien ?", answer: "Elle maintient l'écart nécessaire au désir pour éviter que le lien ne s'endorme dans l'habitude." },
      { question: "C'est quoi l'équilibre au-delà du 50/50 ?", answer: "C'est comprendre que la relation n'est pas un calcul comptable mais un mouvement de positions interchangeables." }
    ]
  },
  { 
    slug: "solitude", 
    title: "Solitude", 
    price: "9.50 €", 
    image: "/solitude.jpg",
    summary: "Comprendre la solitude comme tension entre se fondre et transformer. Rouvrir la rencontre.",
    chapters: ["Introduction","Le malentendu du manque","Se fondre ou transformer","Façonner le monde à son image","Rencontrer l'altérité","Créativité et liens nouveaux","Pistes concrets","Conclusion"],
    faq: [
      { question: "La solitude est-elle forcément subie ?", answer: "Non, elle peut être transformée en un espace de création et de rencontre avec sa propre altérité." },
      { question: "Comment sortir de l'isolement ?", answer: "Le guide propose de recommencer à façonner son monde pour attirer de nouvelles formes de liens." }
    ]
  },
  { 
    slug: "tdah", 
    title: "TDAH", 
    price: "9.50 €", 
    image: "/tdah.jpg",
    summary: "Fonctionnement singulier du désir et du temps. Transformer la tension en moteur créatif.",
    chapters: ["Introduction","Un fonctionnement singulier","Quand le quotidien parle","Repères pour se situer","Trouver son propre rythme","Transformer la tension en moteur","Relations et désir","Pistes pour continuer","Conclusion ?"],
    faq: [
      { question: "Le TDAH est-il un handicap ?", answer: "Il est ici traité comme une modalité singulière du fonctionnement mental qui nécessite des repères adaptés." },
      { question: "Peut-on gérer son TDAH sans médicaments ?", answer: "Ce guide propose des outils comportementaux et psychologiques pour mieux habiter son propre rythme." }
    ]
  },
  { 
    slug: "tsa", 
    title: "Troubles du spectre autistique", 
    price: "9.50 €", 
    image: "/tsa.jpg",
    summary: "Retrouver la main sur sa vie : repères, dialogue, et invention de formes de lien et d’environnement.",
    chapters: ["Retrouver la main sur la vie","Percevoir autrement","Créer ses repères","Apprendre à dialoguer","Transformer les relations","S'ouvrir au monde","Faire évoluer son environnement","Un chemin singulier et créatif"],
    faq: [
      { question: "Comment mieux communiquer avec les autres ?", answer: "Le guide explore l'invention de nouvelles formes de dialogue basées sur ses propres repères sensoriels." },
      { question: "Comment adapter son environnement ?", answer: "Il s'agit de reprendre la main sur les stimuli extérieurs pour créer un cadre de vie sécurisant." }
    ]
  },
  { 
    slug: "tca", 
    title: "Troubles du comportement alimentaire", 
    price: "9.50 €", 
    image: "/tca.jpg",
    summary: "Au-delà de la nourriture : lutte avec le vide, le corps et le désir. Retrouver le mouvement vital.",
    chapters: ["Introduction","Manger du vide ou trop-plein du vide","Repli sur soi et désinvestissement du monde","Refus du corps sexué et peur du désir","Du tout à la partie : la fixation sans fin","Le pouvoir illusoire du « rien »","Retrouver le mouvement du désir","Chemins de soutien et conclusion"],
    faq: [
      { question: "Pourquoi se focalise-t-on sur la nourriture ?", answer: "La nourriture devient souvent l'objet qui permet de masquer une lutte plus profonde avec le vide ou le corps." },
      { question: "Comment retrouver le plaisir de manger ?", answer: "Le travail consiste à réinvestir le mouvement du désir global au-delà de la simple ingestion." }
    ]
  },
  { 
    slug: "sommeil", 
    title: "Troubles du sommeil", 
    price: "9.50 €", 
    image: "/sommeil.jpg",
    summary: "Rythmes, stress, émotions et environnement : pistes concrètes vers un rapport apaisé à la nuit.",
    chapters: ["Introduction","Corps, esprit et rythmes biologiques","Stress, anxiété et ruminations","Habitudes et environnement","Sommeil et émotions profondes","Pistes pour retrouver un rythme","Quand le sommeil parle","Vers un rapport apaisé à la nuit"],
    faq: [
      { question: "L'insomnie est-elle psychologique ?", answer: "Elle est souvent au carrefour de rythmes biologiques déréglés et de ruminations émotionnelles." },
      { question: "Comment arrêter les pensées nocturnes ?", answer: "Le guide propose des pistes pour apaiser le rapport à la nuit avant même de chercher à dormir." }
    ]
  },
  { 
    slug: "procrastination-creativite", 
    title: "Procrastination et créativité", 
    price: "9.50 €", 
    image: "/procrastination.jpg",
    summary: "De l’évitement à l’invention : commencer comme acte créatif, valoriser l’ennui et les débuts multiples.",
    chapters: ["Introduction","La fausse excuse de la certitude","Commencer est déjà créer","L'ennui, passage obligé","Retrouver le désir dans le but","De l'évitement à l'invention","Pistes concrètes","Conclusion"],
    faq: [
      { question: "Pourquoi remet-on toujours au lendemain ?", answer: "Souvent par peur de l'imperfection ou par manque de lien direct avec son propre désir dans la tâche." },
      { question: "Comment retrouver sa créativité ?", answer: "En apprenant à valoriser l'ennui et en acceptant de commencer plusieurs fois sans but final immédiat." }
    ]
  },
  { 
    slug: "hauts-potentiels", 
    title: "Hauts potentiels", 
    price: "9.50 €", 
    image: "/hpi.jpg",
    summary: "Au-delà du QI : forces, fragilités, style de vie et relations pour inventer un chemin singulier.",
    chapters: ["Qu'est-ce que le HPI aujourd'hui","Un fonctionnement mental rapide et singulier","Vivre la différence au quotidien","Les forces du HPI","Les fragilités fréquentes","Grandir et s'épanouir avec son HPI","Trouver son style de vie et ses relations","Inventer son propre chemin"],
    faq: [
      { question: "Être HPI est-il un avantage ?", answer: "C'est une singularité qui apporte autant de forces que de vulnérabilités spécifiques dans le rapport aux autres." },
      { question: "Comment gérer le décalage avec les autres ?", answer: "Le guide propose d'inventer son propre style de vie sans chercher à se fondre dans la norme à tout prix." }
    ]
  },
  { 
    slug: "pack-integral", 
    title: "Pack intégral", 
    price: "54.50 €", 
    image: "/pack.jpg",
    summary: "L’ensemble des 11 guides + l’Introduction, à tarif réduit. Accès complet pour travailler chaque thème.",
    chapters: ["Contenu du pack :", "Introduction aux guides","Estime de soi","Dépression","Anxiété","Relations amoureuses","Solitude","TDAH","TSA","TCA","Sommeil","Procrastination et créativité","Hauts potentiels"],
    faq: [
      { question: "Le pack inclut-il les futurs guides ?", answer: "Ce pack contient l'intégralité des 12 guides actuellement publiés sur la plateforme." },
      { question: "Comment reçoit-on les guides ?", answer: "Immédiatement après l'achat, vous recevez un accès pour télécharger l'ensemble des fichiers PDF." }
    ]
  },
]

export function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug)
}