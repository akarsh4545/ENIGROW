import type {
  EligibilityTier,
  FundingAction,
  FundingAssessmentInput,
  FundingInsight,
  FundingProgramMatch,
  FundingReport,
  FundingReportScores,
} from "@/validations/funding-assessment";

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function yearsScore(band: FundingAssessmentInput["yearsInBusiness"]) {
  switch (band) {
    case "0":
      return 10;
    case "under_1":
      return 25;
    case "1_2":
      return 45;
    case "2_5":
      return 70;
    case "5_plus":
      return 88;
  }
}

function turnoverScore(band: FundingAssessmentInput["annualTurnover"]) {
  switch (band) {
    case "under_10l":
      return 28;
    case "10l_50l":
      return 48;
    case "50l_1cr":
      return 68;
    case "1cr_5cr":
      return 82;
    case "5cr_plus":
      return 92;
  }
}

function fundingAskLakhs(band: FundingAssessmentInput["fundingRequired"]) {
  switch (band) {
    case "under_5l":
      return 4;
    case "5l_10l":
      return 8;
    case "10l_25l":
      return 18;
    case "25l_50l":
      return 38;
    case "50l_1cr":
      return 75;
    case "1cr_plus":
      return 150;
  }
}

function formatMaxFunding(lakhs: number) {
  if (lakhs >= 100)
    return `₹${(lakhs / 100).toFixed(lakhs % 100 === 0 ? 0 : 1)} Cr`;
  return `₹${Math.round(lakhs)}L`;
}

function tierFromProb(p: number): EligibilityTier {
  if (p >= 72) return "eligible";
  if (p >= 55) return "likely";
  if (p >= 38) return "needs_improvement";
  return "not_eligible";
}

function computeScores(input: FundingAssessmentInput): FundingReportScores {
  const age = yearsScore(input.yearsInBusiness);
  const turnover = turnoverScore(input.annualTurnover);
  const monthly = turnoverScore(input.monthlyRevenue);

  let documentation = 35;
  if (input.gstRegistered === "yes") documentation += 18;
  if (input.udyamRegistered === "yes") documentation += 14;
  if (input.dpiitStartup === "yes") documentation += 8;
  if (input.businessType !== "others") documentation += 6;
  if (input.businessStage !== "idea") documentation += 8;

  let financialHealth = (turnover * 0.55 + monthly * 0.45) / 1;
  if (input.existingLoan === "yes") financialHealth -= 12;
  if (input.creditScore && input.creditScore >= 750) financialHealth += 14;
  else if (input.creditScore && input.creditScore >= 700) financialHealth += 8;
  else if (input.creditScore && input.creditScore < 650) financialHealth -= 15;

  let businessStrength = age * 0.45 + turnover * 0.35;
  if (input.businessStage === "established") businessStrength += 12;
  if (input.businessStage === "growing") businessStrength += 8;
  if (input.businessStage === "idea") businessStrength -= 10;
  if (input.employees === "50_plus" || input.employees === "21_50") {
    businessStrength += 6;
  }

  let growthPotential = 45;
  if (
    input.businessStage === "growing" ||
    input.businessStage === "early_revenue"
  ) {
    growthPotential += 18;
  }
  if (input.exportBusiness === "yes") growthPotential += 8;
  if (
    input.fundingPurpose === "expansion" ||
    input.fundingPurpose === "machinery"
  ) {
    growthPotential += 10;
  }
  if (input.dpiitStartup === "yes") growthPotential += 8;

  let readiness =
    documentation * 0.35 + financialHealth * 0.3 + businessStrength * 0.35;
  if (input.existingLoan === "yes") readiness -= 8;

  let approvalProbability =
    readiness * 0.4 + financialHealth * 0.35 + documentation * 0.25;
  if (input.creditScore && input.creditScore >= 750) approvalProbability += 6;
  if (input.gstRegistered !== "yes" && input.businessStage !== "idea") {
    approvalProbability -= 10;
  }

  const overall = overallBlend({
    readiness,
    approvalProbability,
    businessStrength,
    documentation,
    financialHealth,
    growthPotential,
  });

  return {
    overall: clamp(overall),
    readiness: clamp(readiness),
    approvalProbability: clamp(approvalProbability),
    businessStrength: clamp(businessStrength),
    documentation: clamp(documentation),
    financialHealth: clamp(financialHealth),
    growthPotential: clamp(growthPotential),
  };
}

function overallBlend(s: Omit<FundingReportScores, "overall">) {
  return (
    s.readiness * 0.2 +
    s.approvalProbability * 0.22 +
    s.businessStrength * 0.18 +
    s.documentation * 0.15 +
    s.financialHealth * 0.15 +
    s.growthPotential * 0.1
  );
}

function matchPrograms(
  input: FundingAssessmentInput,
  scores: FundingReportScores,
): FundingProgramMatch[] {
  const ask = fundingAskLakhs(input.fundingRequired);
  const ageOk = ["2_5", "5_plus", "1_2"].includes(input.yearsInBusiness);
  const turnoverOk = !["under_10l"].includes(input.annualTurnover);
  const programs: FundingProgramMatch[] = [];

  // MUDRA
  {
    let p = 40;
    const why: string[] = [];
    if (ask <= 10) {
      p += 22;
      why.push("Requested amount fits the typical MUDRA range (up to ₹10L).");
    } else {
      p -= 18;
      why.push(
        "Ask is above typical MUDRA ceilings — consider a term loan path.",
      );
    }
    if (input.businessStage !== "idea") {
      p += 8;
      why.push(
        "Operating or early-revenue stage supports micro-loan conversations.",
      );
    }
    if (input.udyamRegistered === "yes") {
      p += 6;
      why.push("Udyam recognition strengthens MSME lender files.");
    }
    if (input.existingLoan === "yes") p -= 8;
    p = clamp(p + (scores.financialHealth - 50) * 0.2);
    programs.push({
      id: "mudra",
      name: "MUDRA Loan",
      category: "Business Loan",
      tier: tierFromProb(p),
      amountRange: "₹50K–₹10L",
      approvalProbability: p,
      whyMatches: why,
      conditions: [
        "Non-farm income generating micro unit",
        "Viable use of funds narrative",
        "KYC and banking trail available",
      ],
      documents: [
        "KYC of proprietor/partners",
        "Business proof / Udyam if available",
        "Bank statements (6–12 months)",
        "Quotations where relevant",
      ],
      nextSteps: [
        "Confirm Shishu / Kishore / Tarun band",
        "Prepare purpose note and bank pack",
        "Approach preferred bank / NBFC channel",
      ],
      timeline: "7–30 days (lender dependent)",
      href: "/schemes/mudra-loan-support",
    });
  }

  // CGTMSE / bank term loan
  {
    let p = 32;
    const why: string[] = [];
    if (ageOk && turnoverOk && input.gstRegistered === "yes") {
      p += 28;
      why.push(
        "Business age, turnover band, and GST registration support bank-loan eligibility.",
      );
    }
    if (ask > 10 && ask <= 500) {
      p += 10;
      why.push(
        "Funding ask aligns with collateral-light / CGTMSE-style conversations.",
      );
    }
    if (input.creditScore && input.creditScore >= 750) {
      p += 12;
      why.push("Credit score above 750 improves lender confidence.");
    }
    if (input.existingLoan === "yes") {
      p -= 14;
      why.push(
        "Existing loan burden may reduce incremental sanction capacity.",
      );
    }
    if (input.gstRegistered !== "yes") p -= 12;
    p = clamp(p + (scores.approvalProbability - 50) * 0.25);
    programs.push({
      id: "cgtmse",
      name: "CGTMSE / Collateral-light Term Loan",
      category: "Business Loan",
      tier: tierFromProb(p),
      amountRange: "Up to ₹5 Cr (lender / cover dependent)",
      approvalProbability: p,
      whyMatches: why.length
        ? why
        : ["General MSME credit pathway worth reviewing with an advisor."],
      conditions: [
        "Eligible MSE borrower via member lending institution",
        "Viable project / WC assessment",
        "Satisfactory banking and compliance hygiene",
      ],
      documents: [
        "Financials / ITR",
        "GST returns",
        "Bank statements",
        "Project / use-of-funds note",
        "KYC & entity proofs",
      ],
      nextSteps: [
        "Close documentation gaps",
        "Structure repayment narrative",
        "Target suitable MLI for CGTMSE cover",
      ],
      timeline: "30–60 days typical",
      href: "/schemes/cgtmse",
    });
  }

  // PMEGP
  {
    let p = 28;
    const why: string[] = [];
    if (
      input.businessStage === "idea" ||
      input.yearsInBusiness === "0" ||
      input.yearsInBusiness === "under_1"
    ) {
      p += 18;
      why.push("New / early unit profile can fit PMEGP greenfield intent.");
    } else {
      p -= 8;
      why.push(
        "PMEGP prefers new units — existing mature businesses may fit less cleanly.",
      );
    }
    if (
      input.manufacturingUnit === "yes" ||
      input.industry === "manufacturing" ||
      input.industry === "food_agro"
    ) {
      p += 14;
      why.push(
        "Manufacturing / food-agro activity maps well to PMEGP project types.",
      );
    }
    if (ask <= 50) {
      p += 10;
      why.push("Ask is within common PMEGP project cost bands.");
    }
    if (input.womanFounder === "yes" || input.scStFounder === "yes") {
      p += 8;
      why.push(
        "Category benefits may improve subsidy outcomes where eligible.",
      );
    }
    p = clamp(p);
    programs.push({
      id: "pmegp",
      name: "PMEGP",
      category: "Subsidy-linked Loan",
      tier: tierFromProb(p),
      amountRange: "Up to ₹50L (mfg) / ₹20L (service) typical",
      approvalProbability: p,
      whyMatches: why,
      conditions: [
        "Generally new unit focus",
        "Eligible promoter categories",
        "Project report and margin norms",
      ],
      documents: [
        "Project report",
        "KYC",
        "Quotations",
        "Education / category certificates if applicable",
      ],
      nextSteps: [
        "Validate new-unit fit",
        "Prepare DPR-style project note",
        "Route via KVIC / DIC / bank channel",
      ],
      timeline: "45–90 days typical",
      href: "/schemes/pmegp",
    });
  }

  // Stand-Up India
  {
    let p = 22;
    const why: string[] = [];
    if (input.womanFounder === "yes" || input.scStFounder === "yes") {
      p += 30;
      why.push("Woman / SC-ST founder category is central to Stand-Up India.");
    } else {
      p -= 20;
      why.push("Stand-Up India is category-specific (SC/ST / women).");
    }
    if (ask >= 10 && ask <= 100) {
      p += 12;
      why.push("Ask sits inside the ₹10L–₹1 Cr Stand-Up band.");
    }
    if (
      input.businessStage === "idea" ||
      input.yearsInBusiness === "0" ||
      input.yearsInBusiness === "under_1"
    ) {
      p += 10;
      why.push("Greenfield / new enterprise intent supports scheme fit.");
    }
    p = clamp(p);
    programs.push({
      id: "standup-india",
      name: "Stand-Up India",
      category: "Women / SC-ST Funding",
      tier: tierFromProb(p),
      amountRange: "₹10L–₹1 Cr",
      approvalProbability: p,
      whyMatches: why,
      conditions: [
        "SC/ST and/or woman entrepreneur",
        "Greenfield enterprise in manufacturing, services, or trading",
        "Bank appraisal and documentation",
      ],
      documents: [
        "Category proof",
        "Project cost details",
        "KYC & banking",
        "Business plan",
      ],
      nextSteps: [
        "Confirm greenfield eligibility",
        "Build bank discussion pack",
        "Schedule lender meeting",
      ],
      timeline: "30–60 days typical",
      href: "/schemes/standup-india",
    });
  }

  // Startup India / DPIIT
  {
    let p = 25;
    const why: string[] = [];
    if (input.dpiitStartup === "yes" || input.businessType === "startup") {
      p += 28;
      why.push("Startup / DPIIT orientation unlocks Startup India pathways.");
    }
    if (input.industry === "technology") {
      p += 8;
      why.push("Tech ventures often align with recognition-led benefits.");
    }
    if (
      input.businessStage === "idea" ||
      input.businessStage === "early_revenue"
    ) {
      p += 8;
      why.push(
        "Early-stage profile matches recognition and seed conversations.",
      );
    }
    if (input.dpiitStartup !== "yes") {
      why.push(
        "DPIIT recognition is recommended before claiming startup benefits.",
      );
    }
    p = clamp(p);
    programs.push({
      id: "startup-india",
      name: "Startup India / DPIIT Pathways",
      category: "Startup Funding",
      tier: tierFromProb(p),
      amountRange: "Recognition-led + ecosystem funding",
      approvalProbability: p,
      whyMatches: why,
      conditions: [
        "Eligible startup entity norms",
        "DPIIT recognition for many benefits",
        "Innovation / scalability narrative",
      ],
      documents: [
        "Incorporation proofs",
        "Pitch / product brief",
        "Founder KYC",
        "DPIIT application inputs",
      ],
      nextSteps: [
        "Complete / apply DPIIT recognition",
        "Map tax and IP benefits",
        "Explore FoF / CGSS readiness if relevant",
      ],
      timeline: "15–45 days for recognition track",
      href: "/schemes/startup-india",
    });
  }

  // PMFME for food
  {
    let p = 20;
    const why: string[] = [];
    if (
      input.industry === "food_agro" ||
      input.businessCategory.toLowerCase().includes("food")
    ) {
      p += 28;
      why.push("Food / agro processing profile matches PMFME intent.");
    }
    if (input.manufacturingUnit === "yes") p += 8;
    if (ask <= 50) p += 8;
    p = clamp(p);
    programs.push({
      id: "pmfme",
      name: "PMFME",
      category: "Food Subsidy / Loan",
      tier: tierFromProb(p),
      amountRange: "₹10L–₹50L typical project support",
      approvalProbability: p,
      whyMatches: why.length
        ? why
        : ["Primarily relevant for food processing units."],
      conditions: [
        "Food processing eligible activity",
        "Scheme norms for capital support",
      ],
      documents: [
        "Project details",
        "KYC",
        "Udyam / registrations",
        "Quotations",
      ],
      nextSteps: [
        "Confirm food-processing eligibility",
        "Prepare capital subsidy file",
      ],
      timeline: "30–90 days",
      href: "/schemes/pmfme",
    });
  }

  // CLCSS / manufacturing subsidy
  {
    let p = 18;
    const why: string[] = [];
    if (
      input.manufacturingUnit === "yes" ||
      input.industry === "manufacturing"
    ) {
      p += 26;
      why.push(
        "Manufacturing unit profile supports technology upgradation subsidy paths.",
      );
    }
    if (input.fundingPurpose === "machinery") {
      p += 14;
      why.push("Machinery purpose aligns with capital subsidy schemes.");
    }
    if (ask >= 10) p += 6;
    p = clamp(p);
    programs.push({
      id: "clcss",
      name: "CLCSS / Manufacturing Capex Support",
      category: "Manufacturing Subsidy",
      tier: tierFromProb(p),
      amountRange: "Up to ₹1 Cr capital subsidy band (scheme rules)",
      approvalProbability: p,
      whyMatches: why.length
        ? why
        : ["Best suited to manufacturing capex needs."],
      conditions: [
        "Eligible manufacturing activity",
        "Approved machinery / technology norms",
      ],
      documents: ["Machinery quotations", "Udyam", "Financials", "Banking"],
      nextSteps: [
        "Validate machine eligibility list",
        "Coordinate with lending bank",
      ],
      timeline: "45–120 days",
      href: "/schemes/clcss",
    });
  }

  // Udyam as gateway
  {
    const p = input.udyamRegistered === "yes" ? 88 : 70;
    const why =
      input.udyamRegistered === "yes"
        ? ["Already Udyam registered — use it to unlock linked benefits."]
        : [
            "Not yet registered — Udyam is a high-leverage first step for MSME pathways.",
          ];
    programs.push({
      id: "udyam",
      name: "Udyam / MSME Recognition",
      category: "Registration Gateway",
      tier: input.udyamRegistered === "yes" ? "eligible" : "likely",
      amountRange: "Recognition (enables benefits)",
      approvalProbability: p,
      whyMatches: why,
      conditions: [
        "Micro / small / medium enterprise norms",
        "Aadhaar-linked filing",
      ],
      documents: [
        "Aadhaar",
        "PAN",
        "Business activity details",
        "Bank account",
      ],
      nextSteps:
        input.udyamRegistered === "yes"
          ? ["Download certificate", "Attach to lender / scheme files"]
          : [
              "Complete Udyam registration",
              "Update activity & investment details carefully",
            ],
      timeline: "Same day to a few days",
      href: "/schemes/udyam-msme",
    });
  }

  return programs.sort((a, b) => b.approvalProbability - a.approvalProbability);
}

function buildInsights(
  input: FundingAssessmentInput,
  scores: FundingReportScores,
): FundingInsight[] {
  const insights: FundingInsight[] = [];

  if (input.gstRegistered === "yes") {
    insights.push({
      id: "gst-yes",
      text: `Your GST registration strengthens lender confidence and lifts documentation score to ${scores.documentation}/100.`,
    });
  } else {
    insights.push({
      id: "gst-no",
      text: "Without GST registration, many bank and MSME credit files face avoidable friction — prioritise this if you invoice regularly.",
    });
  }

  if (input.udyamRegistered === "yes") {
    insights.push({
      id: "udyam-yes",
      text: "Udyam recognition is already in place, which improves MSME scheme and priority-sector conversations.",
    });
  } else {
    insights.push({
      id: "udyam-no",
      text: "Registering under Udyam can unlock additional government and lender benefits with relatively low effort.",
    });
  }

  if (["50l_1cr", "1cr_5cr", "5cr_plus"].includes(input.annualTurnover)) {
    insights.push({
      id: "turnover-strong",
      text: "Your turnover band supports MSME working-capital and term-loan discussions beyond micro-ticket products.",
    });
  } else if (input.annualTurnover === "under_10l") {
    insights.push({
      id: "turnover-micro",
      text: "Current turnover points toward micro pathways (e.g. MUDRA) before larger bank limits.",
    });
  }

  if (["2_5", "5_plus"].includes(input.yearsInBusiness)) {
    insights.push({
      id: "age-strong",
      text: "Business age above two years generally strengthens lender underwriting confidence.",
    });
  } else if (input.businessStage === "idea") {
    insights.push({
      id: "idea-stage",
      text: "Idea-stage ventures fit subsidy / greenfield schemes better than pure working-capital bank products.",
    });
  }

  const ask = fundingAskLakhs(input.fundingRequired);
  const capacity = turnoverScore(input.annualTurnover);
  if (ask <= 10 && capacity >= 28) {
    insights.push({
      id: "ask-aligned-micro",
      text: "The requested funding amount aligns reasonably with a micro-to-small financial profile.",
    });
  } else if (ask >= 75 && capacity < 68) {
    insights.push({
      id: "ask-stretch",
      text: "Requested funding appears high relative to stated turnover — expect lenders to seek stronger cash-flow evidence.",
    });
  } else {
    insights.push({
      id: "ask-moderate",
      text: "Your funding ask is within a discussable range for the stated financial profile, subject to file quality.",
    });
  }

  if (input.womanFounder === "yes") {
    insights.push({
      id: "women",
      text: "Woman-founder status opens Stand-Up India and selected women-entrepreneur preferential pathways.",
    });
  }
  if (input.scStFounder === "yes") {
    insights.push({
      id: "scst",
      text: "SC/ST founder category can improve fit for Stand-Up India and certain subsidy preferences.",
    });
  }
  if (input.dpiitStartup === "yes") {
    insights.push({
      id: "dpiit",
      text: "DPIIT startup recognition supports Startup India benefits and ecosystem funding conversations.",
    });
  }
  if (input.existingLoan === "yes") {
    insights.push({
      id: "debt",
      text: "Existing loan obligations reduce incremental approval probability until leverage and repayment track are clarified.",
    });
  }
  if (input.creditScore && input.creditScore >= 750) {
    insights.push({
      id: "bureau-strong",
      text: `Credit score of ${input.creditScore} is a clear positive for approval probability.`,
    });
  } else if (input.creditScore && input.creditScore < 650) {
    insights.push({
      id: "bureau-weak",
      text: `Credit score of ${input.creditScore} may constrain bank appetite until bureau health improves.`,
    });
  }
  if (input.manufacturingUnit === "yes") {
    insights.push({
      id: "mfg",
      text: "Manufacturing operations unlock machinery-linked subsidies and CGTMSE-style term finance more readily than pure trading.",
    });
  }
  if (input.exportBusiness === "yes") {
    insights.push({
      id: "export",
      text: "Export orientation can support IEC-linked and trade-finance conversations after core registrations are stable.",
    });
  }

  return insights.slice(0, 8);
}

function buildActions(input: FundingAssessmentInput): FundingAction[] {
  const actions: FundingAction[] = [];

  if (input.udyamRegistered !== "yes") {
    actions.push({
      id: "act-udyam",
      title: "Complete Udyam Registration",
      detail: "Unlock MSME recognition before major lender or scheme filings.",
      priority: "high",
    });
  }
  if (input.gstRegistered !== "yes" && input.businessStage !== "idea") {
    actions.push({
      id: "act-gst",
      title: "Maintain / Complete GST Registration",
      detail:
        "Consistent GST filing improves bank approval odds and file credibility.",
      priority: "high",
    });
  }
  if (!input.creditScore || input.creditScore < 700) {
    actions.push({
      id: "act-credit",
      title: "Improve Credit Score",
      detail:
        "Clear delinquencies and keep utilisation healthy before large term-loan asks.",
      priority:
        input.creditScore && input.creditScore < 650 ? "high" : "medium",
    });
  }
  if (input.existingLoan === "yes") {
    actions.push({
      id: "act-debt",
      title: "Reduce / Clarify Existing Debt",
      detail:
        "Document repayment track and residual capacity for incremental borrowing.",
      priority: "medium",
    });
  }
  actions.push({
    id: "act-financials",
    title: "Prepare Updated Financial Statements",
    detail:
      "Keep ITR, P&L, and bank statements organised for the last 1–2 years.",
    priority: "high",
  });
  actions.push({
    id: "act-cashflow",
    title: "Strengthen Cash Flow Documentation",
    detail:
      "Show stable credits, GST trail, and purpose-linked quotations for the ask.",
    priority: "medium",
  });
  if (
    input.dpiitStartup !== "yes" &&
    (input.businessType === "startup" || input.industry === "technology")
  ) {
    actions.push({
      id: "act-dpiit",
      title: "Apply for DPIIT Startup Recognition",
      detail:
        "Required for many Startup India benefits and investor conversations.",
      priority: "medium",
    });
  }
  if (input.womanFounder === "yes" || input.scStFounder === "yes") {
    actions.push({
      id: "act-standup",
      title: "Prepare Stand-Up India Pack",
      detail:
        "Validate greenfield fit and assemble category + project documents.",
      priority: "medium",
    });
  }

  const order = { high: 0, medium: 1, low: 2 };
  return actions
    .sort((a, b) => order[a.priority] - order[b.priority])
    .slice(0, 7);
}

function bestCategory(programs: FundingProgramMatch[]) {
  const top = programs.filter(
    (p) => p.tier === "eligible" || p.tier === "likely",
  )[0];
  return top?.category ?? programs[0]?.category ?? "MSME Financing";
}

function estimatedMax(
  input: FundingAssessmentInput,
  scores: FundingReportScores,
) {
  const ask = fundingAskLakhs(input.fundingRequired);
  const factor = scores.overall / 100;
  const capacity =
    input.annualTurnover === "5cr_plus"
      ? 200
      : input.annualTurnover === "1cr_5cr"
        ? 120
        : input.annualTurnover === "50l_1cr"
          ? 70
          : input.annualTurnover === "10l_50l"
            ? 35
            : 12;
  const estimate = Math.min(
    ask * (0.85 + factor * 0.4),
    capacity * (0.7 + factor * 0.5),
  );
  return formatMaxFunding(Math.max(estimate, ask * 0.6));
}

export function generateFundingReport(
  input: FundingAssessmentInput,
): FundingReport {
  const scores = computeScores(input);
  const programs = matchPrograms(input, scores);
  return {
    scores,
    estimatedMaxFunding: estimatedMax(input, scores),
    bestCategory: bestCategory(programs),
    programs,
    insights: buildInsights(input, scores),
    actions: buildActions(input),
    generatedAt: new Date().toISOString(),
  };
}
