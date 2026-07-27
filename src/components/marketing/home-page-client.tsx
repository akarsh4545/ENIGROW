"use client";

import { useState } from "react";

import { HomeCallback } from "@/components/marketing/home-callback";
import { HomeCta } from "@/components/marketing/home-cta";
import { HomeFundingHero } from "@/components/marketing/home-funding-hero";
import { HomeImpact } from "@/components/marketing/home-impact";
import { HomeProcess } from "@/components/marketing/home-process";
import { HomeSchemeSupport } from "@/components/marketing/home-scheme-support";
import { HomeSchemes } from "@/components/marketing/home-schemes";
import { HomeServices } from "@/components/marketing/home-services";
import { HomeSuccessStories } from "@/components/marketing/home-success-stories";
import { FundingAssessmentWizard } from "@/components/funding/funding-assessment-wizard";

export function HomePageClient() {
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <>
      <HomeFundingHero onStart={() => setWizardOpen(true)} />
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
    </>
  );
}
