"use client";

import { useEffect, useState } from "react";

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

const SESSION_KEY = "enigrow-funding-eligibility-modal-seen";
const OPEN_DELAY_MS = 500;

export function HomePageClient() {
  const [wizardOpen, setWizardOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {
      /* ignore */
    }

    const timeout = window.setTimeout(() => {
      setWizardOpen(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
    }, OPEN_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      <HomeFundingHero />
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
