import { schemesContent, type SchemeDetail } from "@/data/schemes";

export type SchemeRecommendation = {
  slug: string;
  title: string;
  summary: string;
  amount?: string;
  benefit?: string;
  reason: string;
  href: string;
};

/** Parse amounts like "12L", "₹25 lakh", "1.5cr", "500000" into rupees. */
export function parseFundsToRupees(input: string): number | null {
  const raw = input.trim().toLowerCase().replace(/,/g, "");
  if (!raw) return null;

  const crore = raw.match(/(\d+(?:\.\d+)?)\s*(cr|crore)s?\b/);
  if (crore) return Math.round(Number(crore[1]) * 1_00_00_000);

  const lakh = raw.match(/(\d+(?:\.\d+)?)\s*(l|lac|lakh)s?\b/);
  if (lakh) return Math.round(Number(lakh[1]) * 1_00_000);

  const thousand = raw.match(/(\d+(?:\.\d+)?)\s*(k|thousand)s?\b/);
  if (thousand) return Math.round(Number(thousand[1]) * 1_000);

  const plain = raw.match(/₹?\s*(\d+(?:\.\d+)?)/);
  if (plain) {
    const n = Number(plain[1]);
    if (!Number.isFinite(n)) return null;
    // Bare numbers under 1000 are treated as lakhs (common shorthand).
    if (n > 0 && n < 1000) return Math.round(n * 1_00_000);
    return Math.round(n);
  }

  return null;
}

function amountFits(scheme: SchemeDetail, funds: number | null): boolean {
  if (funds == null) return true;
  const text = `${scheme.amount ?? ""} ${scheme.summary}`.toLowerCase();

  if (
    text.includes("recognition") ||
    text.includes("n/a") ||
    text.includes("equity")
  ) {
    return funds >= 0;
  }

  // Soft ranges by scheme slug for better matching.
  const ranges: Record<string, [number, number]> = {
    "pm-svanidhi": [10_000, 50_000],
    "mudra-loan-support": [50_000, 10_00_000],
    pmegp: [5_00_000, 50_00_000],
    "standup-india": [10_00_000, 1_00_00_000],
    pmfme: [5_00_000, 50_00_000],
    cgtmse: [5_00_000, 5_00_00_000],
    clcss: [5_00_000, 1_00_00_000],
    cgss: [10_00_000, 10_00_00_000],
    cgssd: [5_00_000, 2_00_00_000],
    tufs: [10_00_000, 20_00_00_000],
  };

  const range = ranges[scheme.slug];
  if (!range) return true;
  const [min, max] = range;
  // Allow slight stretch outside range so chat still returns options.
  return funds >= min * 0.5 && funds <= max * 1.25;
}

function scoreScheme(
  scheme: SchemeDetail,
  need: string,
  funds: number | null,
): { score: number; reason: string } {
  const n = need.toLowerCase();
  let score = 0;
  const reasons: string[] = [];

  const bump = (pts: number, reason: string) => {
    score += pts;
    if (reason && !reasons.includes(reason)) reasons.push(reason);
  };

  if (/(women|woman|female|mahila)/.test(n) && scheme.category === "women") {
    bump(6, "Matches women-entrepreneur pathways");
  }
  if (
    /(manufactur|factory|machinery|machine|plant)/.test(n) &&
    (scheme.category === "manufacturing" ||
      ["pmegp", "cgtmse", "clcss", "tufs"].includes(scheme.slug))
  ) {
    bump(5, "Fits manufacturing / equipment needs");
  }
  if (
    /(food|fssai|agro|processing|organic)/.test(n) &&
    (scheme.slug === "pmfme" || scheme.slug === "pmegp")
  ) {
    bump(6, "Relevant for food / agro processing");
  }
  if (
    /(startup|dpiit|seed|angel|venture|equity)/.test(n) &&
    (scheme.category === "startups" ||
      ["startup-india", "fund-of-funds", "cgss"].includes(scheme.slug))
  ) {
    bump(6, "Aligned with startup pathways");
  }
  if (
    /(working capital|mudra|micro|shop|trading|kirana)/.test(n) &&
    scheme.slug === "mudra-loan-support"
  ) {
    bump(7, "Strong fit for smaller working-capital needs");
  }
  if (
    /(street vendor|hawker|vending)/.test(n) &&
    scheme.slug === "pm-svanidhi"
  ) {
    bump(8, "Built for street vendors");
  }
  if (
    /(subsidy|grant|non.?refund)/.test(n) &&
    (scheme.category === "subsidies" ||
      ["pmegp", "clcss", "pmfme"].includes(scheme.slug))
  ) {
    bump(5, "Includes subsidy-oriented options");
  }
  if (
    /(loan|fund|funding|capital|credit|collateral)/.test(n) &&
    (scheme.category === "loans" || scheme.category === "msme")
  ) {
    bump(3, "Loan / credit oriented");
  }
  if (
    /(certif|iso|zed|quality)/.test(n) &&
    (scheme.category === "certification" || scheme.slug === "zed-certification")
  ) {
    bump(6, "Certification / quality pathway");
  }
  if (/(msme|udyam|registration)/.test(n) && scheme.slug === "udyam-msme") {
    bump(7, "MSME recognition first step");
  }
  if (/(textile|garment)/.test(n) && scheme.slug === "tufs") {
    bump(7, "Textile upgrade focused");
  }
  if (/(stress|restructur|npa)/.test(n) && scheme.slug === "cgssd") {
    bump(7, "For stressed MSME situations");
  }
  if (/(rural|village|kvic)/.test(n) && scheme.category === "rural") {
    bump(4, "Rural / KVIC-linked pathways");
  }
  if (
    /(sc\/?st|stand.?up|greenfield)/.test(n) &&
    scheme.slug === "standup-india"
  ) {
    bump(6, "Stand-Up India category fit");
  }

  if (amountFits(scheme, funds)) {
    bump(2, funds != null ? "Amount roughly fits typical scheme range" : "");
  } else {
    score -= 4;
  }

  // Prefer practical starter schemes when need is vague.
  if (
    score <= 2 &&
    ["mudra-loan-support", "cgtmse", "pmegp", "udyam-msme"].includes(
      scheme.slug,
    )
  ) {
    bump(2, "Common starting pathway for MSMEs");
  }

  const reason =
    reasons.filter(Boolean).slice(0, 2).join(" · ") ||
    "May be worth reviewing for your stage";

  return { score, reason };
}

export function recommendSchemes(
  need: string,
  fundsInput: string,
  limit = 3,
): SchemeRecommendation[] {
  const funds = parseFundsToRupees(fundsInput);
  const scored = schemesContent.items
    .map((scheme) => {
      const { score, reason } = scoreScheme(scheme, need, funds);
      return { scheme, score, reason };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  // Fallback if filters were too strict.
  const rows =
    scored.length > 0
      ? scored
      : schemesContent.items
          .filter((s) =>
            ["mudra-loan-support", "cgtmse", "pmegp"].includes(s.slug),
          )
          .map((scheme) => ({
            scheme,
            score: 1,
            reason: "General MSME starting options to review with an advisor",
          }));

  return rows.map(({ scheme, reason }) => ({
    slug: scheme.slug,
    title: scheme.title,
    summary: scheme.summary,
    amount: scheme.amount,
    benefit: scheme.benefit,
    reason,
    href: `/schemes/${scheme.slug}`,
  }));
}

export function formatFundsLabel(fundsInput: string): string {
  const n = parseFundsToRupees(fundsInput);
  if (n == null) return fundsInput.trim() || "not specified";
  if (n >= 1_00_00_000)
    return `₹${(n / 1_00_00_000).toFixed(n % 1_00_00_000 === 0 ? 0 : 1)} Cr`;
  if (n >= 1_00_000)
    return `₹${(n / 1_00_000).toFixed(n % 1_00_000 === 0 ? 0 : 1)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
}
