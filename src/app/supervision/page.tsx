import { Metadata } from "next"
import SupervisionClient from "./SupervisionClient"

export const metadata: Metadata = {
  title: "Supervision clinique par messagerie | Troisième Chemin",
  description: "Un cadre de supervision pour psychologues, médecins, coachs et tous les professionnels en contact avec des humains. Par messagerie individuelle, dans la foulée d'une séance.",
  alternates: { canonical: "https://troisiemechemin.fr/supervision" },
  openGraph: {
    title: "Supervision clinique par messagerie | Troisième Chemin",
    description: "Supervision pour tous les professionnels en contact avec des humains. Par messagerie individuelle, en continu.",
    url: "https://troisiemechemin.fr/supervision",
    type: "website",
    images: [{ url: "https://troisiemechemin.fr/group.jpg", width: 1200, height: 630 }],
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Supervision clinique par messagerie individuelle",
  "serviceType": "Supervision clinique",
  "description": "Un cadre de supervision pour tous les professionnels en contact avec des humains : psychologues, médecins, coachs, infirmiers, travailleurs sociaux. Par messagerie individuelle, en continu.",
  "provider": { "@type": "Person", "name": "Léo Gayrard", "@id": "https://troisiemechemin.fr/#author" },
  "areaServed": "FR",
  "inLanguage": "fr-FR",
  "url": "https://troisiemechemin.fr/supervision",
  "offers": [
    { "@type": "Offer", "name": "Tarif réduit", "price": "80", "priceCurrency": "EUR", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "80", "priceCurrency": "EUR", "unitCode": "MON" } },
    { "@type": "Offer", "name": "Tarif plein", "price": "150", "priceCurrency": "EUR", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "150", "priceCurrency": "EUR", "unitCode": "MON" } },
  ],
}

export default function SupervisionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SupervisionClient />
    </>
  )
}
