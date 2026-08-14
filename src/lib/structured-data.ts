import { hasVerifiedSupportEmail, siteConfig } from "@/config/site";
import { absoluteUrl, SITE_ORIGIN } from "@/lib/seo";

const organizationId = `${SITE_ORIGIN}/#organization`;
const websiteId = `${SITE_ORIGIN}/#website`;
const logoUrl = absoluteUrl("/brand/enigrow-logo.png");

export function organizationJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": organizationId,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: [
      "Enigrow",
      "Enigrow Startup Advisory",
      siteConfig.legalName,
    ],
    url: `${SITE_ORIGIN}/`,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      contentUrl: logoUrl,
    },
    image: logoUrl,
    description: siteConfig.description,
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
    // Only include verified official profiles — none configured yet.
    sameAs: [],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...siteConfig.hours.days],
        opens: siteConfig.hours.opens,
        closes: siteConfig.hours.closes,
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

  if (hasVerifiedSupportEmail()) {
    data.email = siteConfig.supportEmail;
  }

  return data;
}

/** LocalBusiness signals for the verified Noida registered office. */
export function localBusinessJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_ORIGIN}/#localbusiness`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: `${SITE_ORIGIN}/`,
    image: logoUrl,
    telephone: siteConfig.supportPhone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "B-128, 1st Floor, Sector-2",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201301",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      // Approximate Noida Sector-2 — omit if not verified coordinates
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...siteConfig.hours.days],
        opens: siteConfig.hours.opens,
        closes: siteConfig.hours.closes,
      },
    ],
    parentOrganization: {
      "@id": organizationId,
    },
  };

  // Remove empty geo if we don't have verified coordinates
  delete data.geo;

  if (hasVerifiedSupportEmail()) {
    data.email = siteConfig.supportEmail;
  }

  return data;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    alternateName: ["Enigrow", "Enigrow Startup Advisory"],
    url: `${SITE_ORIGIN}/`,
    description: siteConfig.description,
    inLanguage: "en-IN",
    publisher: {
      "@id": organizationId,
    },
  };
}

/** Homepage-only additions (Organization is already in marketing layout). */
export function homeAdditionalJsonLd() {
  const { ["@context"]: _w, ...website } = websiteJsonLd();
  const { ["@context"]: _l, ...local } = localBusinessJsonLd();

  return {
    "@context": "https://schema.org",
    "@graph": [website, local],
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
      "@id": organizationId,
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
      "@id": organizationId,
    },
    mainEntityOfPage: absoluteUrl(input.path),
  };
}
