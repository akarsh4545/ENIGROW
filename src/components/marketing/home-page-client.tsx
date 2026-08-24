"use client";

import { useEffect, useState } from "react";

import { HomeCallback } from "@/components/marketing/home-callback";
import { HomeCta } from "@/components/marketing/home-cta";
import {
  FundingFinderPopup,
  wasFundingFinderDismissed,
} from "@/components/marketing/funding-finder-popup";
import { HomeFundingHero } from "@/components/marketing/home-funding-hero";
import { HomeImpact } from "@/components/marketing/home-impact";
import { HomeProcess } from "@/components/marketing/home-process";
import { HomeSchemeSupport } from "@/components/marketing/home-scheme-support";
import { HomeSchemes } from "@/components/marketing/home-schemes";
import { HomeServices } from "@/components/marketing/home-services";
import { HomeSuccessStories } from "@/components/marketing/home-success-stories";
import { FundingAssessmentWizard } from "@/components/funding/funding-assessment-wizard";

export function HomePageClient() {
  const [finderOpen, setFinderOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);

  useEffect(() => {
    if (wasFundingFinderDismissed()) return;
    const timer = window.setTimeout(() => setFinderOpen(true), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  const openFinder = () => setFinderOpen(true);
  const openWizard = () => setWizardOpen(true);

  return (
    <>
      <HomeFundingHero onCheckEligibility={openFinder} />
      <HomeSchemeSupport />
      <HomeServices />
      <HomeSchemes />
      <HomeProcess />
      <HomeSuccessStories />
      <HomeImpact />
      <HomeCallback />
      <HomeCta />
      <FundingFinderPopup
        open={finderOpen}
        onClose={() => setFinderOpen(false)}
        onCheckEligibility={openWizard}
      />
      <FundingAssessmentWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
      />
    </>
  );
}
