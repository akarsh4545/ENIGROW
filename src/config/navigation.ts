import { ROUTES } from "@/constants/routes";

export type NavItem = {
  title: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export const primaryNav: NavItem[] = [
  { title: "Services", href: ROUTES.services },
  { title: "Schemes", href: ROUTES.schemes },
  { title: "Funding", href: ROUTES.funding },
  { title: "About", href: ROUTES.about },
  { title: "Blog", href: ROUTES.blog },
  { title: "Contact", href: ROUTES.contact },
];

export const serviceLinks: NavItem[] = [
  {
    title: "Company Registration",
    href: "/company-registration",
    description: "Incorporate with clear filings and compliance guidance.",
  },
  {
    title: "GST Registration",
    href: "/gst-registration",
    description: "Get GST-ready with documentation support end to end.",
  },
  {
    title: "MSME Registration",
    href: "/msme-registration",
    description: "Unlock MSME benefits and scheme eligibility pathways.",
  },
  {
    title: "Trademark",
    href: "/trademark",
    description: "Protect your brand identity with filing assistance.",
  },
  {
    title: "ISO Certification",
    href: "/iso-certification",
    description: "Prepare for certification with structured readiness.",
  },
  {
    title: "Import Export Code",
    href: "/import-export-code",
    description: "Start cross-border trade with IEC support.",
  },
];

export const footerNav: NavGroup[] = [
  {
    title: "Explore",
    items: [
      { title: "Services", href: ROUTES.services },
      { title: "Government Schemes", href: ROUTES.schemes },
      { title: "Business Funding", href: ROUTES.funding },
      { title: "Loan Services", href: ROUTES.loans },
      { title: "Calculators", href: ROUTES.calculators },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "About", href: ROUTES.about },
      { title: "Team", href: ROUTES.team },
      { title: "Careers", href: ROUTES.careers },
      { title: "Case Studies", href: ROUTES.caseStudies },
      { title: "Events", href: ROUTES.events },
    ],
  },
  {
    title: "Support",
    items: [
      { title: "Contact", href: ROUTES.contact },
      { title: "FAQ", href: ROUTES.faq },
      { title: "Testimonials", href: ROUTES.testimonials },
      { title: "Privacy Policy", href: ROUTES.privacy },
      { title: "Terms", href: ROUTES.terms },
    ],
  },
];
