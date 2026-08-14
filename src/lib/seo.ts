import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

/** Canonical production origin for indexing, sitemap, and absolute SEO URLs. */
export const SITE_ORIGIN = "https://www.enigrow.co.in";

export const DEFAULT_OG_IMAGE = {
  url: "/brand/enigrow-logo.png",
  width: 748,
  height: 496,
  alt: "ENIGROW logo",
} as const;

export function absoluteUrl(path = "/"): string {
  const normalized =
    path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${normalized}`;
}

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  /** When true, title is used as-is (e.g. homepage brand-first title). */
  absoluteTitle?: boolean;
  ogTitle?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  noIndex?: boolean;
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
};

function withBrandTitle(title: string, absoluteTitle?: boolean): string {
  if (absoluteTitle) return title;
  const brand = siteConfig.name;
  if (title.includes(brand) || /enigrow/i.test(title)) return title;
  return `${title} | ${brand}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  ogTitle,
  type = "website",
  publishedTime,
  authors,
  noIndex = false,
  image = DEFAULT_OG_IMAGE,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const resolvedTitle = withBrandTitle(title, absoluteTitle);
  const resolvedOgTitle = ogTitle ?? resolvedTitle;
  const imageUrl = image.url.startsWith("http")
    ? image.url
    : absoluteUrl(image.url);

  return {
    title: {
      absolute: resolvedTitle,
    },
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
      images: [
        {
          url: imageUrl,
          width: image.width ?? DEFAULT_OG_IMAGE.width,
          height: image.height ?? DEFAULT_OG_IMAGE.height,
          alt: image.alt ?? DEFAULT_OG_IMAGE.alt,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedOgTitle,
      description,
      images: [imageUrl],
    },
  };
}
