import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventDetailContent } from "@/components/marketing/event-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllEventSlugs, getEvent } from "@/data/gallery-events";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllEventSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "Event" };

  return buildPageMetadata({
    title: event.title,
    description: event.summary,
    path: `/events/${slug}`,
  });
}

export default async function EventSlugPage({ params }: Props) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Events", path: "/events" },
          { name: event.title, path: `/events/${slug}` },
        ])}
      />
      <EventDetailContent event={event} />
    </>
  );
}
