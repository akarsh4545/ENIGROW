export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  publishedAt: string;
  author: string;
  content: string[];
};

export const blogContent = {
  title: "Blog",
  headline: "Practical guidance for registrations, schemes, and growth.",
  support:
    "Short, useful articles to help you make clearer decisions before you file, apply, or raise capital.",
  posts: [
    {
      slug: "msme-registration-checklist",
      title: "MSME registration checklist for first-time founders",
      excerpt:
        "What to prepare before Udyam registration, and which details usually slow people down.",
      category: "MSME",
      readingMinutes: 4,
      publishedAt: "2026-06-12",
      author: "Enigrow Advisors",
      content: [
        "MSME recognition is often treated as a quick formality, but inaccurate declarations create friction later when you apply for schemes or financing.",
        "Start with clarity on ownership, business activity, and whether your enterprise is already operating or still pre-revenue. Those details shape how you fill the registration.",
        "Keep Aadhaar, PAN, bank account information, and a simple description of your activity ready before you begin. Most delays come from incomplete inputs, not the portal itself.",
        "After registration, treat Udyam as a foundation — not the finish line. The real value usually comes from mapping which schemes or lender conversations become more practical next.",
      ],
    },
    {
      slug: "gst-when-to-register",
      title: "When should a new business register for GST?",
      excerpt:
        "A practical way to think about timing, thresholds, and operational readiness.",
      category: "Compliance",
      readingMinutes: 5,
      publishedAt: "2026-05-28",
      author: "Enigrow Advisors",
      content: [
        "GST registration is not always urgent on day one, but waiting too long can create invoice and compliance issues once sales accelerate.",
        "The right timing depends on your business model, customer expectations, and whether counterparties require GST invoices early.",
        "Before filing, confirm your entity details, place of business, bank information, and who will handle returns. Registration is only useful if the operating process around it is clear.",
        "If you are unsure, a short readiness review usually saves more time than guessing based on generic checklists.",
      ],
    },
    {
      slug: "funding-readiness-basics",
      title: "Funding readiness basics before you approach a lender",
      excerpt:
        "The documents and narrative that make capital conversations more productive.",
      category: "Funding",
      readingMinutes: 6,
      publishedAt: "2026-05-10",
      author: "Enigrow Advisors",
      content: [
        "Lenders and programs assess both paperwork and business clarity. A strong file usually includes clean KYC, banking history, and a simple explanation of why the capital is needed.",
        "Founders often jump to product names — MUDRA, term loan, scheme X — before confirming fit. Start with purpose, amount, and repayment logic.",
        "If your registrations are incomplete or financial records are scattered, fix that first. Capital conversations improve quickly when the basics are in order.",
        "Readiness does not guarantee approval, but it does reduce avoidable rejection and repeated follow-ups.",
      ],
    },
    {
      slug: "trademark-before-brand-spend",
      title: "Why trademark planning should come before heavy brand spend",
      excerpt:
        "Protect identity early so marketing investment does not outrun legal readiness.",
      category: "Brand",
      readingMinutes: 4,
      publishedAt: "2026-04-22",
      author: "Enigrow Advisors",
      content: [
        "Brand campaigns create recognition fast. If the name or logo is unprotected or conflicted, that momentum becomes expensive to reverse.",
        "A basic trademark plan starts with searching for conflicts, choosing the right classes, and deciding whether the wordmark, logo, or both should be filed.",
        "You do not need a massive budget to begin. You need an intentional filing strategy aligned to how customers actually identify your business.",
        "If you are about to print packaging, launch ads, or expand marketplaces, trademark readiness deserves a place on the same checklist.",
      ],
    },
  ] satisfies BlogPost[],
} as const;

export function getAllBlogSlugs() {
  return blogContent.posts.map((post) => post.slug);
}

export function getBlogPost(slug: string) {
  return blogContent.posts.find((post) => post.slug === slug) ?? null;
}
