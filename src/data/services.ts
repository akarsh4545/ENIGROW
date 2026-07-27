export type ServiceItem = {
  slug: string;
  title: string;
  summary: string;
  href: string;
  category: "registration" | "compliance" | "growth" | "finance";
};

export const servicesContent = {
  title: "Services",
  headline: "End-to-end advisory from registration to funding readiness.",
  support:
    "Enigrow Startup Advisory Pvt Ltd supports registrations, compliance, certifications, government scheme pathways, and capital-file readiness — with clear requirements, guided documentation, and named ownership through completion.",
  categories: [
    { id: "registration", label: "Registration" },
    { id: "compliance", label: "Compliance" },
    { id: "finance", label: "Finance" },
    { id: "growth", label: "Growth" },
  ] as const,
  items: [
    {
      slug: "company-registration",
      title: "Company Registration",
      summary:
        "Incorporate with structured filings and a clean compliance foundation.",
      href: "/company-registration",
      category: "registration",
    },
    {
      slug: "gst-registration",
      title: "GST Registration",
      summary:
        "Get GST-ready with documentation support and practical next steps.",
      href: "/gst-registration",
      category: "compliance",
    },
    {
      slug: "msme-registration",
      title: "MSME Registration",
      summary:
        "Unlock MSME recognition and related scheme eligibility pathways.",
      href: "/msme-registration",
      category: "registration",
    },
    {
      slug: "trademark",
      title: "Trademark",
      summary:
        "Protect your brand identity with filing and follow-through support.",
      href: "/trademark",
      category: "growth",
    },
    {
      slug: "iso-certification",
      title: "ISO Certification",
      summary:
        "Prepare for certification with readiness planning and documentation.",
      href: "/iso-certification",
      category: "growth",
    },
    {
      slug: "import-export-code",
      title: "Import Export Code",
      summary: "Enable cross-border trade with IEC application support.",
      href: "/import-export-code",
      category: "registration",
    },
    {
      slug: "fssai",
      title: "FSSAI",
      summary: "Food business licensing guidance matched to your operations.",
      href: "/fssai",
      category: "compliance",
    },
    {
      slug: "accounting",
      title: "Accounting",
      summary: "Bookkeeping and financial hygiene for growing businesses.",
      href: "/accounting",
      category: "finance",
    },
    {
      slug: "taxation",
      title: "Taxation",
      summary: "Tax planning and filing support aligned to your structure.",
      href: "/taxation",
      category: "finance",
    },
    {
      slug: "funding",
      title: "Business Funding",
      summary: "Capital pathways mapped to eligibility, paperwork, and timing.",
      href: "/funding",
      category: "finance",
    },
    {
      slug: "loans",
      title: "Loan Services",
      summary: "Loan readiness, documentation, and application assistance.",
      href: "/loans",
      category: "finance",
    },
    {
      slug: "startup-support",
      title: "Startup Support",
      summary:
        "Recognition, scheme fit, and launch-stage advisory in one track.",
      href: "/startup-support",
      category: "growth",
    },
    {
      slug: "digital-marketing",
      title: "Digital Marketing",
      summary: "Practical growth campaigns that support real business goals.",
      href: "/digital-marketing",
      category: "growth",
    },
    {
      slug: "website-development",
      title: "Website Development",
      summary: "Modern websites built to convert enquiries into conversations.",
      href: "/website-development",
      category: "growth",
    },
  ] satisfies ServiceItem[],
  cta: {
    title: "Not sure which service you need?",
    support:
      "Tell us your goal and we will recommend the shortest reliable pathway.",
    primary: { label: "Book a consultation", href: "/contact" },
    secondary: { label: "Check eligibility", href: "/tools/eligibility" },
  },
} as const;
