import { WishmaxLanding } from "@/components/WishmaxLanding"

export const dynamic = "force-dynamic"

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Wishmax",
    description:
      "Wishmax turns your own face into profile-ready dating photos without a photoshoot.",
    applicationCategory: "PhotographyApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      description: "Join the waitlist for early access",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WishmaxLanding />
    </>
  )
}
