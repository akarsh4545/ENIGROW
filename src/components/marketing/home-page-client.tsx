"use client";

import { useState } from "react";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";

import { HomeCallback } from "@/components/marketing/home-callback";
import { HomeCta } from "@/components/marketing/home-cta";
import { HomeHeader } from "@/components/marketing/home-header";
import { HomeHero } from "@/components/marketing/home-hero";
import { HomeImpact } from "@/components/marketing/home-impact";
import { HomeProcess } from "@/components/marketing/home-process";
import { HomeSchemeSupport } from "@/components/marketing/home-scheme-support";
import { HomeSchemes } from "@/components/marketing/home-schemes";
import { HomeServices } from "@/components/marketing/home-services";
import { HomeSuccessStories } from "@/components/marketing/home-success-stories";
import { FundingAssessmentWizard } from "@/components/funding/funding-assessment-wizard";
import { cn } from "@/lib/utils";

const homeSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-home-sans",
  display: "swap",
});

const homeDisplay = Sora({
  subsets: ["latin"],
  variable: "--font-home-display",
  display: "swap",
});

export function HomePageClient() {
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <div className={cn("home-v2", homeSans.variable, homeDisplay.variable)}>
      <HomeHeader />
      <HomeHero onCheckEligibility={() => setWizardOpen(true)} />
      <HomeServices />
      <HomeSchemeSupport />
      <HomeSchemes />
      <HomeProcess />
      <HomeSuccessStories />
      <HomeImpact />
      <HomeCallback />
      <HomeCta />
      <FundingAssessmentWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
      />
    </div>
  );
}
