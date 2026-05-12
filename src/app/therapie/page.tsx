import { Metadata } from "next"
import TherapieClient from "./TherapieClient"

export const metadata: Metadata = {
  title: "Thérapie par messagerie avec un psychologue | Troisième Chemin",
  description: "Une thérapie avec un psychologue clinicien diplômé d'État, par messagerie individuelle. Écrivez quand quelque chose vous traverse, à votre rythme, sans rendez-vous figé.",
  alternates: { canonical: "https://troisiemechemin.fr/therapie" },
  openGraph: {
    title: "Thérapie par messagerie avec un psychologue | Troisième Chemin",
    description: "Une thérapie avec un psychologue clinicien, par messagerie individuelle. À votre rythme, sans rendez-vous.",
    url: "https://troisiemechemin.fr/therapie",
    type: "website",
    images: [{ url: "https://troisiemechemin.fr/humanist-approach.jpg", width: 1200, height: 630 }],
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Thérapie par messagerie individuelle",
  "serviceType": "Psychothérapie",
  "description": "Une thérapie avec un psychologue clinicien diplômé d'État, par messagerie individuelle. À votre rythme, sans rendez-vous figé.",
  "provider": { "@type": "Person", "name": "Léo Gayrard", "@id": "https://troisiemechemin.fr/#author" },
  "areaServed": "FR",
  "inLanguage": "fr-FR",
  "url": "https://troisiemechemin.fr/therapie",
  "offers": [
    { "@type": "Offer", "name": "Tarif réduit", "price": "80", "priceCurrency": "EUR", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "80", "priceCurrency": "EUR", "unitCode": "MON" } },
    { "@type": "Offer", "name": "Tarif plein", "price": "150", "priceCurrency": "EUR", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "150", "priceCurrency": "EUR", "unitCode": "MON" } },
  ],
}

export default function TherapiePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <TherapieClient />
    </>
  )
}
