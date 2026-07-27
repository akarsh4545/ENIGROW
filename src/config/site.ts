export const siteConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "Enigrow",
  legalName: "Enigrow Startup Advisory Pvt Ltd",
  cin: "U82990UW2026PTC255445",
  registeredOffice:
    "B-128, 1st Floor, Sector-2, Noida, Gautam Buddha Nagar, U.P. - 201301",
  description:
    "Startup advisory, business consulting, and government services for registrations, funding, compliance, and growth across India.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@example.com",
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? "+918796894519",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918796894519",
  locale: "en-IN",
  currency: "INR",
} as const;

export type SiteConfig = typeof siteConfig;
