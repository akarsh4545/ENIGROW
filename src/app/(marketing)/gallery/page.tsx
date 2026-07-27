import type { Metadata } from "next";

import { GalleryPageContent } from "@/components/marketing/gallery-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `${siteConfig.name} gallery of workshops, sessions, and fieldwork.`,
};

export default function GalleryPage() {
  return <GalleryPageContent />;
}
