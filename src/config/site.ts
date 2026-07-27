export const siteConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "Enigrow",
  legalName: "Enigrow Startup Advisory Pvt Ltd",
  description:
    "Startup advisory, business consulting, and government services for registrations, funding, compliance, and growth across India.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@example.com",
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? "",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  locale: "en-IN",
  currency: "INR",
} as const;

export type SiteConfig = typeof siteConfig;
