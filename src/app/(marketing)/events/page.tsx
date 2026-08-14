import type { Metadata } from "next";

import { EventsIndexContent } from "@/components/marketing/events-index";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Events | Clinics and Briefings",
  description: `${siteConfig.name} clinics and briefings on registrations, schemes, and funding.`,
};

export default function EventsPage() {
  return <EventsIndexContent />;
}
