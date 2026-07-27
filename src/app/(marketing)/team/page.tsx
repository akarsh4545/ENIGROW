import type { Metadata } from "next";

import { TeamPageContent } from "@/components/marketing/team-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Team",
  description: `Meet the ${siteConfig.name} advisory team.`,
};

export default function TeamPage() {
  return <TeamPageContent />;
}
