import type { Metadata } from "next";

import { HomeCallback } from "@/components/marketing/home-callback";
import { HomeCta } from "@/components/marketing/home-cta";
import { HomeHero } from "@/components/marketing/home-hero";
import { HomeImpact } from "@/components/marketing/home-impact";
import { HomeProcess } from "@/components/marketing/home-process";
import { HomeSchemeSupport } from "@/components/marketing/home-scheme-support";
import { HomeSchemes } from "@/components/marketing/home-schemes";
import { HomeServices } from "@/components/marketing/home-services";
import { HomeSuccessStories } from "@/components/marketing/home-success-stories";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Business consulting & government services",
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeServices />
      <HomeSchemeSupport />
      <HomeSchemes />
      <HomeProcess />
      <HomeSuccessStories />
      <HomeImpact />
      <HomeCallback />
      <HomeCta />
    </>
  );
}
