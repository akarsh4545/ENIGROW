export const siteConfig = {
  /** Public-facing brand name (search / UI entity). */
  name: "ENIGROW",
  /** Verified registered legal entity — do not invent alternatives. */
  legalName: "Enigrow Startup Advisory Pvt Ltd",
  cin: "U82990UW2026PTC255445",
  registeredOffice:
    "B-128, 1st Floor, Sector-2, Noida, Gautam Buddha Nagar, U.P. - 201301",
  description:
    "ENIGROW helps Indian businesses with business funding, government schemes, registrations, compliance, and funding readiness — with practical advisory support.",
  url:
    process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.NODE_ENV === "production"
      ? "https://www.enigrow.co.in"
      : "http://localhost:3000"),
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@example.com",
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? "+918796894519",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918796894519",
  locale: "en-IN",
  currency: "INR",
  /** Business hours (IST) — keep consistent across footer, contact, and schema. */
  hours: {
    display: "Mon–Sat · 09:30 AM – 06:00 PM",
    opens: "09:30",
    closes: "18:00",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ] as const,
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** True when support email is a real configured address (not a placeholder). */
export function hasVerifiedSupportEmail(email = siteConfig.supportEmail) {
  return Boolean(email) && !/example\.com$/i.test(email);
}
