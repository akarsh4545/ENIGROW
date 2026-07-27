import type {
  EligibilityFormValues,
  EligibilityRecommendation,
} from "@/validations/eligibility";

function uniqueById(items: EligibilityRecommendation[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function getEligibilityRecommendations(
  input: EligibilityFormValues,
): EligibilityRecommendation[] {
  const results: EligibilityRecommendation[] = [];

  if (input.hasEntity === "no" || input.stage === "idea") {
    results.push({
      id: "company-registration",
      title: "Company Registration",
      reason:
        "You do not have a formal entity yet (or are at idea stage). Incorporation is usually the first foundation step.",
      href: "/company-registration",
      priority: "high",
      kind: "service",
    });
  }

  if (
    input.hasGst !== "yes" &&
    (input.goal === "gst_compliance" || input.stage !== "idea")
  ) {
    results.push({
      id: "gst-registration",
      title: "GST Registration",
      reason:
        "GST readiness is commonly needed once operations or invoicing begin. Confirming registration early avoids downstream delays.",
      href: "/gst-registration",
      priority: input.goal === "gst_compliance" ? "high" : "medium",
      kind: "service",
    });
  }

  if (input.hasMsme !== "yes" || input.goal === "msme_schemes") {
    results.push({
      id: "udyam-msme",
      title: "Udyam / MSME Recognition",
      reason:
        "MSME recognition can unlock scheme and financing pathways relevant to growing Indian businesses.",
      href: "/schemes/udyam-msme",
      priority: input.goal === "msme_schemes" ? "high" : "medium",
      kind: "scheme",
    });
  }

  if (input.needsFunding !== "no" || input.goal === "funding") {
    results.push({
      id: "funding",
      title: "Business Funding Support",
      reason:
        "You indicated capital may be needed. Start with readiness and pathway matching before approaching lenders.",
      href: "/funding",
      priority: "high",
      kind: "service",
    });
    results.push({
      id: "mudra-loan-support",
      title: "MUDRA Loan Support",
      reason:
        "For micro business capital needs, MUDRA-oriented readiness is a practical pathway to explore.",
      href: "/schemes/mudra-loan-support",
      priority: "medium",
      kind: "scheme",
    });
  }

  if (input.goal === "brand_protection" || input.stage === "scaling") {
    results.push({
      id: "trademark",
      title: "Trademark Protection",
      reason:
        "Protecting brand identity becomes important as customer recognition and distribution grow.",
      href: "/trademark",
      priority: input.goal === "brand_protection" ? "high" : "medium",
      kind: "service",
    });
  }

  if (input.businessType === "export" || input.goal === "export_setup") {
    results.push({
      id: "export-readiness",
      title: "Export Readiness Pathway",
      reason:
        "Cross-border trade usually starts with IEC and cleaner foundational documentation.",
      href: "/schemes/export-readiness",
      priority: "high",
      kind: "scheme",
    });
    results.push({
      id: "import-export-code",
      title: "Import Export Code",
      reason: "IEC is a core formality for most import/export operations.",
      href: "/import-export-code",
      priority: "high",
      kind: "service",
    });
  }

  if (input.businessType === "food") {
    results.push({
      id: "fssai",
      title: "FSSAI Licensing Support",
      reason:
        "Food businesses typically need the correct FSSAI registration or license before scaling operations.",
      href: "/fssai",
      priority: "high",
      kind: "service",
    });
  }

  if (input.businessType === "manufacturing") {
    results.push({
      id: "phe-manufacturing-support",
      title: "Manufacturing Setup Support",
      reason:
        "Manufacturing units often need sequenced registrations, permissions, and funding readiness.",
      href: "/schemes/phe-manufacturing-support",
      priority: "high",
      kind: "scheme",
    });
  }

  if (input.stage === "idea" || input.stage === "early") {
    results.push({
      id: "startup-support",
      title: "Startup Support",
      reason:
        "Early-stage ventures benefit from sequenced setup rather than doing every formality at once.",
      href: "/startup-support",
      priority: "medium",
      kind: "service",
    });
  }

  if (input.goal === "registration" && input.hasEntity === "yes") {
    results.push({
      id: "msme-registration",
      title: "MSME Registration Service",
      reason:
        "With an entity in place, MSME registration is a high-leverage next formality for many businesses.",
      href: "/msme-registration",
      priority: "medium",
      kind: "service",
    });
  }

  const deduped = uniqueById(results);
  const high = deduped.filter((item) => item.priority === "high");
  const medium = deduped.filter((item) => item.priority === "medium");
  return [...high, ...medium].slice(0, 6);
}
