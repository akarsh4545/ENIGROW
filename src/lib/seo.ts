import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

/** Canonical production origin for indexing, sitemap, and absolute SEO URLs. */
export const SITE_ORIGIN = "https://enigrow.co.in";

export function absoluteUrl(path = "/"): string {
  const normalized =
    path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  ogTitle,
  type = "website",
  publishedTime,
  authors,
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const resolvedOgTitle = ogTitle ?? `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : { index: true, follow: true },
    openGraph: {
      title: resolvedOgTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_IN",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedOgTitle,
      description,
    },
  };
}
