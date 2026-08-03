import { permanentRedirect } from "next/navigation";

import { getAllServiceSlugs, getServiceDetail } from "@/data/service-details";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

/** Canonical service URLs live at /{slug}. Keep /services/{slug} as a permanent redirect. */
export default async function ServiceSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!getServiceDetail(slug)) {
    permanentRedirect("/services");
  }
  permanentRedirect(`/${slug}`);
}
