import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventDetailContent } from "@/components/marketing/event-detail";
import { getAllEventSlugs, getEvent } from "@/data/gallery-events";
import { siteConfig } from "@/config/site";

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
  return {
    title: event.title,
    description: event.summary,
    openGraph: {
      title: `${event.title} | ${siteConfig.name}`,
      description: event.summary,
    },
  };
}

export default async function EventSlugPage({ params }: Props) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();
  return <EventDetailContent event={event} />;
}
