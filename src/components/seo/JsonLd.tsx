interface JsonLdPackage {
  name: string
  description: string
  price: number
  currency?: string
  image?: string
  duration?: string
}

interface JsonLdProps {
  type: "Organization" | "TravelPackage"
  pkg?: JsonLdPackage
}

export function JsonLd({ type, pkg }: JsonLdProps) {
  const data =
    type === "Organization"
      ? {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "SI VIAJES",
          url: "https://siviajes.onrender.com",
          logo: "https://siviajes.onrender.com/logo.jpeg",
          description: "Paquetes turísticos, vuelos y hoteles al mejor precio",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+54-11-2261-8116",
            contactType: "customer service",
            availableLanguage: ["Spanish"],
          },
          address: {
            "@type": "PostalAddress",
            addressCountry: "AR",
          },
          sameAs: [
            "https://instagram.com/siviajes",
            "https://facebook.com/siviajes",
            "https://wa.me/5491122618116",
          ],
        }
      : {
          "@context": "https://schema.org",
          "@type": "Product",
          name: pkg?.name,
          description: pkg?.description,
          image: pkg?.image,
          offers: {
            "@type": "Offer",
            price: pkg?.price,
            priceCurrency: pkg?.currency ?? "ARS",
            availability: "https://schema.org/InStock",
          },
        }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
