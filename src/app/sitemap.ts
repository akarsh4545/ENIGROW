import type { MetadataRoute } from "next";

const baseUrl = "https://enigrow.co.in";

/** Public static marketing routes (App Router). Auth/admin/dashboard excluded. */
const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/schemes", changeFrequency: "weekly", priority: 0.9 },
  { path: "/funding", changeFrequency: "weekly", priority: 0.9 },
  { path: "/loans", changeFrequency: "monthly", priority: 0.8 },
  { path: "/startup-support", changeFrequency: "monthly", priority: 0.8 },
  { path: "/company-registration", changeFrequency: "monthly", priority: 0.8 },
  { path: "/gst-registration", changeFrequency: "monthly", priority: 0.8 },
  { path: "/msme-registration", changeFrequency: "monthly", priority: 0.8 },
  { path: "/trademark", changeFrequency: "monthly", priority: 0.8 },
  { path: "/iso-certification", changeFrequency: "monthly", priority: 0.7 },
  { path: "/import-export-code", changeFrequency: "monthly", priority: 0.7 },
  { path: "/fssai", changeFrequency: "monthly", priority: 0.7 },
  { path: "/accounting", changeFrequency: "monthly", priority: 0.7 },
  { path: "/taxation", changeFrequency: "monthly", priority: 0.7 },
  { path: "/website-development", changeFrequency: "monthly", priority: 0.7 },
  { path: "/digital-marketing", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "/testimonials", changeFrequency: "monthly", priority: 0.6 },
  { path: "/case-studies", changeFrequency: "monthly", priority: 0.6 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.5 },
  { path: "/events", changeFrequency: "weekly", priority: 0.6 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.5 },
  { path: "/team", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/calculators", changeFrequency: "monthly", priority: 0.6 },
  { path: "/tools/eligibility", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/refund-policy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
