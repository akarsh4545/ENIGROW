export const careersContent = {
  title: "Careers",
  headline: "Help Indian founders move from intent to execution.",
  support:
    "Enigrow Startup Advisory Pvt Ltd is growing a team that values clarity, ownership, and careful execution across advisory, operations, and growth.",
  culture: [
    "Clear ownership over messy handoffs",
    "Client communication without jargon overload",
    "Documentation discipline on every file",
    "Respect for timelines and follow-through",
    "Honest guidance — no false approval promises",
  ],
  roles: [
    {
      id: "advisory-associate",
      title: "Advisory Associate",
      type: "Full-time",
      location: "Remote / Hybrid (India)",
      summary:
        "Support registrations, scheme documentation, and client readiness reviews with high attention to detail.",
    },
    {
      id: "schemes-analyst",
      title: "Schemes Analyst",
      type: "Full-time",
      location: "Remote / Hybrid (India)",
      summary:
        "Map MSME and startup pathways (PMEGP, CGTMSE, MUDRA, Stand-Up India, and more) and prepare shortlists grounded in eligibility.",
    },
    {
      id: "operations-coordinator",
      title: "Operations Coordinator",
      type: "Full-time",
      location: "Remote / Hybrid (India)",
      summary:
        "Track applications, manage follow-ups, and keep delivery status transparent for advisors and clients.",
    },
    {
      id: "growth-marketer",
      title: "Growth Marketer",
      type: "Contract / Full-time",
      location: "Remote (India)",
      summary:
        "Plan content and campaigns that attract serious business enquiries — not vanity traffic.",
    },
  ],
  cta: {
    title: "Don’t see the right role?",
    support:
      "Send a short note about your experience and what you want to work on at Enigrow.",
    href: "/contact?service=Careers",
  },
} as const;

export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  outcome: string;
  summary: string;
  challenge: string;
  approach: readonly string[];
  results: readonly string[];
};

export const caseStudiesContent = {
  title: "Case Studies",
  headline: "Real businesses. Clearer process. Better files.",
  support:
    "Selected Enigrow examples of how sequencing, documentation, and scheme clarity helped businesses move faster with fewer surprises. Outcomes depend on banks and authorities — we show the process, not guarantees.",
  items: [
    {
      slug: "retail-launch-stack",
      title: "Retail launch stack in six weeks",
      industry: "Retail",
      outcome: "Entity + GST + MSME readiness completed in sequence",
      summary:
        "A first-time founder needed a clean launch stack before vendor onboarding and marketplace listings.",
      challenge:
        "The founder was trying to handle company registration, GST, and MSME in parallel without a clear order, creating repeated document rework.",
      approach: [
        "Mapped launch-critical vs later formalities",
        "Completed entity setup before tax registration",
        "Prepared MSME filing once ownership and activity details were stable",
        "Handed over a simple operating checklist for next 30 days",
      ],
      results: [
        "Avoided duplicate KYC cycles",
        "Marketplace onboarding unblocked",
        "Clearer next steps for banking and invoicing",
      ],
    },
    {
      slug: "manufacturing-funding-file",
      title: "Stronger funding file for a manufacturing unit",
      industry: "Manufacturing",
      outcome: "Lender-ready documentation pack for CGTMSE-style conversations",
      summary:
        "An operating unit needed capital for machinery but had scattered records and an unclear use-of-funds narrative.",
      challenge:
        "Bank conversations were stalling because purpose, quotations, and financial trail were incomplete.",
      approach: [
        "Clarified capital purpose and repayment logic",
        "Organized banking, GST, and KYC evidence",
        "Structured quotations and project notes",
        "Prepared a concise pack for lender follow-up",
      ],
      results: [
        "Fewer repeated document queries",
        "Clearer lender conversations",
        "Internal confidence on funding pathway options",
      ],
    },
    {
      slug: "food-brand-compliance",
      title: "Food brand compliance before distribution",
      industry: "Food",
      outcome: "FSSAI pathway + brand protection plan",
      summary:
        "A growing food brand wanted to expand distribution without compliance and trademark gaps.",
      challenge:
        "Packaging and channel talks were ahead of licensing and brand protection decisions.",
      approach: [
        "Identified the correct FSSAI category",
        "Aligned product/activity documentation",
        "Reviewed trademark timing before packaging scale-up",
        "Set a practical compliance calendar",
      ],
      results: [
        "Distribution prep continued with fewer legal unknowns",
        "Brand filing plan started before major creative spend",
        "Clearer roles between operations and compliance",
      ],
    },
    {
      slug: "women-entrepreneur-standup",
      title: "Stand-Up India readiness for a greenfield service venture",
      industry: "Services",
      outcome: "Category fit validated + bank discussion pack prepared",
      summary:
        "A women entrepreneur needed clarity on Stand-Up India fit before approaching a bank for a greenfield service unit.",
      challenge:
        "Scheme eligibility, project cost framing, and documentation order were unclear, delaying the first bank meeting.",
      approach: [
        "Validated greenfield and category requirements",
        "Structured project cost and promoter narrative",
        "Prepared KYC and banking evidence list",
        "Coached the first lender conversation agenda",
      ],
      results: [
        "Clear yes/no on scheme relevance",
        "Bank meeting held with a complete starter pack",
        "Next-step checklist for follow-up queries",
      ],
    },
  ],
} as const;

export function getCaseStudy(slug: string) {
  return caseStudiesContent.items.find((item) => item.slug === slug) ?? null;
}

export function getAllCaseStudySlugs() {
  return caseStudiesContent.items.map((item) => item.slug);
}
