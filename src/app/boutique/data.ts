export type Product = {
  slug: string
  title: string
  price: string
  image: string
  summary: string
  chapters: string[]
  group: "t1" | "t2"   // mapping groupes
}

export const products: Product[] = [
  { slug: "introduction-aux-guides", title: "Introduction aux guides", price: "9 €", image: "/introduction.jpg",
    summary: "Fondations de la démarche: la thérapie comme formation à devenir le soigneur de son monde.",
    chapters: ["Avant-propos","Introduction","La pratique de la thérapie","Quel est le sujet","Thérapie dont vous êtes le héros","La limite fondamentale"],
    group: "t2" },
  { slug: "estime-de-soi", title: "Estime de soi", price: "9 €", image: "/estime.jpg",
    summary: "Quitter le narcissisme pour retrouver la tension du désir et des pratiques qui décentrent.",
    chapters: ["Introduction","Le mirage du soi","Narcissisme et fausse autonomie","Retrouver la tension du désir","Pratiques qui décentrent","Conclusion"],
    group: "t2" },
  { slug: "depression", title: "Dépression", price: "9 €", image: "/depression.jpg",
    summary: "Lire la dépression comme retrait protecteur et rouvrir la voie par des débuts infimes et des appuis.",
    chapters: ["Introduction","Le corps ralenti","La pensée qui se ferme","Isolement et lien","Désir obscur et vie qui persiste","Petits mouvements, débuts infimes","Soutiens et compagnonnage","Conclusion"],
    group: "t1" },
  { slug: "anxiete", title: "Anxiété", price: "9 €", image: "/anxiete.jpg",
    summary: "Du signal corporel au cercle des pensées: accueillir l’onde et retrouver une marge d’action.",
    chapters: ["Introduction","Quand le corps parle","Le cercle des pensées","Trouver une place à l'inquiétude","La rencontre avec les autres","Désir, choix, imprévu","Pistes concrètes","Conclusion"],
    group: "t1" },
  { slug: "relations-amoureuses", title: "Relations amoureuses", price: "9 €", image: "/relations.jpg",
    summary: "Le désir comme écart vivant: parole, séduction quotidienne, positions et liberté dans le lien.",
    chapters: ["Désir et rencontre","L'art de la parole","Séduction au quotidien","L'équilibre au-delà du 50/50","Jeux de positions","Liberté et lien","Les écueils de l'attente","Une histoire en mouvement"],
    group: "t2" },
  { slug: "solitude", title: "Solitude", price: "9 €", image: "/solitude.jpg",
    summary: "Comprendre la solitude comme tension entre se fondre et transformer. Rouvrir la rencontre.",
    chapters: ["Introduction","Le malentendu du manque","Se fondre ou transformer","Façonner le monde à son image","Rencontrer l'altérité","Créativité et liens nouveaux","Pistes concrètes","Conclusion"],
    group: "t2" },
  { slug: "tdah", title: "TDAH", price: "9 €", image: "/tdah.jpg",
    summary: "Fonctionnement singulier du désir et du temps. Transformer la tension en moteur créatif.",
    chapters: ["Introduction","Un fonctionnement singulier","Quand le quotidien parle","Repères pour se situer","Trouver son propre rythme","Transformer la tension en moteur","Relations et désir","Pistes pour continuer","Conclusion ?"],
    group: "t1" },
  { slug: "tsa", title: "Troubles du spectre autistique", price: "9 €", image: "/tsa.jpg",
    summary: "Retrouver la main sur sa vie: repères, dialogue, et invention de formes de lien et d’environnement.",
    chapters: ["Retrouver la main sur la vie","Percevoir autrement","Créer ses repères","Apprendre à dialoguer","Transformer les relations","S'ouvrir au monde","Faire évoluer son environnement","Un chemin singulier et créatif"],
    group: "t1" },
  { slug: "tca", title: "Troubles du comportement alimentaire", price: "9 €", image: "/tca.jpg",
    summary: "Au-delà de la nourriture: lutte avec le vide, le corps et le désir. Retrouver le mouvement vital.",
    chapters: ["Introduction","Manger du vide ou trop-plein du vide","Repli sur soi et désinvestissement du monde","Refus du corps sexué et peur du désir","Du tout à la partie : la fixation sans fin","Le pouvoir illusoire du « rien »","Retrouver le mouvement du désir","Chemins de soutien et conclusion"],
    group: "t1" },
  { slug: "sommeil", title: "Troubles du sommeil", price: "9 €", image: "/sommeil.jpg",
    summary: "Rythmes, stress, émotions et environnement: pistes concrètes vers un rapport apaisé à la nuit.",
    chapters: ["Introduction","Corps, esprit et rythmes biologiques","Stress, anxiété et ruminations","Habitudes et environnement","Sommeil et émotions profondes","Pistes pour retrouver un rythme","Quand le sommeil parle","Vers un rapport apaisé à la nuit"],
    group: "t1" },
  { slug: "procrastination-creativite", title: "Procrastination et créativité", price: "9 €", image: "/procrastination.jpg",
    summary: "De l’évitement à l’invention: commencer comme acte créatif, valoriser l’ennui et les débuts multiples.",
    chapters: ["Introduction","La fausse excuse de la certitude","Commencer est déjà créer","L'ennui, passage obligé","Retrouver le désir dans le but","De l'évitement à l'invention","Pistes concrètes","Conclusion"],
    group: "t1" },
  { slug: "hauts-potentiels", title: "Hauts potentiels", price: "9 €", image: "/hpi.jpg",
    summary: "Au-delà du QI: forces, fragilités, style de vie et relations pour inventer un chemin singulier.",
    chapters: ["Qu'est-ce que le HPI aujourd'hui","Un fonctionnement mental rapide et singulier","Vivre la différence au quotidien","Les forces du HPI","Les fragilités fréquentes","Grandir et s'épanouir avec son HPI","Trouver son style de vie et ses relations","Inventer son propre chemin"],
    group: "t2" },
  { slug: "pack-integral", title: "Pack intégral", price: "49 €", image: "/pack.jpg",
    summary: "L’ensemble des 11 guides + l’Introduction, à tarif réduit. Accès complet pour travailler chaque thème.",
    chapters: ["Contenu du pack :", "Introduction aux guides","Estime de soi","Dépression","Anxiété","Relations amoureuses","Solitude","TDAH","Troubles du spectre autistique","Troubles du comportement alimentaire","Troubles du sommeil","Procrastination et créativité","Hauts potentiels"],
    group: "t2" },
]

export function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug)
}
