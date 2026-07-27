import type { Metadata } from "next";

import { BlogIndexContent } from "@/components/marketing/blog-index";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `${siteConfig.name} insights on registrations, schemes, funding, and compliance.`,
};

export default function BlogPage() {
  return <BlogIndexContent />;
}
