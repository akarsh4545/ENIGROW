import type { Metadata } from "next";

import { TestimonialsPageContent } from "@/components/marketing/testimonials-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Testimonials | Client Experiences",
  description: `Client experiences with ${siteConfig.name}.`,
};

export default function TestimonialsPage() {
  return <TestimonialsPageContent />;
}
