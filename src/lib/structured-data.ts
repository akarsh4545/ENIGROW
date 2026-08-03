import { siteConfig } from "@/config/site";
import { absoluteUrl, SITE_ORIGIN } from "@/lib/seo";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
    "@id": `${SITE_ORIGIN}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: SITE_ORIGIN,
    logo: absoluteUrl("/brand/enigrow-logo.png"),
    image: absoluteUrl("/brand/enigrow-logo.png"),
    description: siteConfig.description,
    email: siteConfig.supportEmail,
    telephone: siteConfig.supportPhone,
    taxID: siteConfig.cin,
    address: {
      "@type": "PostalAddress",
      streetAddress: "B-128, 1st Floor, Sector-2",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201301",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    sameAs: [],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.supportPhone,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: {
      "@id": `${SITE_ORIGIN}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.publishedAt,
    dateModified: input.publishedAt,
    author: {
      "@type": "Organization",
      name: input.author,
    },
    publisher: {
      "@id": `${SITE_ORIGIN}/#organization`,
    },
    mainEntityOfPage: absoluteUrl(input.path),
  };
}
