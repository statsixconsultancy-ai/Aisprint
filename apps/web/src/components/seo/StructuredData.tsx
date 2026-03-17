export default function StructuredData() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'AIsprint',
    url: 'https://www.goaisprint.in',
    logo: 'https://www.goaisprint.in/logo.png',
    description: 'AI & ML Education Platform with 1:1 Live Mentorship',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'Tamil Nadu',
      addressLocality: 'Chennai',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-XXXXXXXXXX',
      contactType: 'Customer Service',
      areaServed: 'IN',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://www.linkedin.com/company/aisprint',
      'https://twitter.com/aisprint',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
    />
  )
}