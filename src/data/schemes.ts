export type SchemeCategory =
  | "loans"
  | "subsidies"
  | "startups"
  | "women"
  | "manufacturing"
  | "rural"
  | "msme"
  | "certification";

export type SchemeItem = {
  slug: string;
  title: string;
  summary: string;
  category: SchemeCategory;
  ministry: string;
  amount?: string;
  benefit?: string;
  timeline?: string;
};

export type SchemeDetail = SchemeItem & {
  headline: string;
  overview: string;
  benefits: string[];
  eligibility: string[];
  documents: string[];
  steps: { title: string; copy: string }[];
  faqs: { question: string; answer: string }[];
};

const defaultSteps = [
  {
    title: "Assess fit",
    copy: "We check your business stage, category, and capital need against the scheme intent.",
  },
  {
    title: "Close documentation gaps",
    copy: "KYC, entity proofs, bank statements, and project notes are organized before filing.",
  },
  {
    title: "Prepare the application pack",
    copy: "Forms, annexures, and lender/portal inputs are structured for submission.",
  },
  {
    title: "Support follow-up",
    copy: "Queries from banks or departments are tracked with clear next actions.",
  },
] as const;

const defaultFaqs = [
  {
    question: "Can Enigrow sanction this facility?",
    answer:
      "No. Banks, NBFCs, or designated authorities take final decisions. We support readiness, documentation, and process guidance.",
  },
  {
    question: "Are the amounts and timelines guaranteed?",
    answer:
      "No. Figures on this page are typical ranges for orientation. Actual outcomes depend on scheme rules, lender policy, and file quality.",
  },
] as const;

function createScheme(
  base: Omit<SchemeDetail, "steps" | "faqs"> &
    Partial<Pick<SchemeDetail, "steps" | "faqs">>,
): SchemeDetail {
  return {
    ...base,
    steps: base.steps ?? [...defaultSteps],
    faqs: base.faqs ?? [...defaultFaqs],
  };
}

export const schemesContent = {
  title: "Government Schemes",
  headline: "MSME schemes across loans, subsidies, startups, and more.",
  support:
    "Explore PMEGP, CGTMSE, MUDRA, Startup India, Stand-Up India, and other active pathways — then apply with structured advisory support.",
  categories: [
    { id: "loans", label: "Loans" },
    { id: "subsidies", label: "Subsidies" },
    { id: "startups", label: "Startups" },
    { id: "women", label: "Women" },
    { id: "manufacturing", label: "Manufacturing" },
    { id: "rural", label: "Rural" },
    { id: "msme", label: "MSME" },
    { id: "certification", label: "Certification" },
  ] as const,
  items: [
    createScheme({
      slug: "pmegp",
      title: "PMEGP",
      summary:
        "Prime Minister Employment Generation Programme — subsidy-linked support for new micro enterprises.",
      category: "subsidies",
      ministry: "Ministry of MSME / KVIC",
      amount: "₹10L–₹50L",
      benefit: "15–35% subsidy",
      timeline: "45–60 days",
      headline: "Subsidy-linked employment generation for new units.",
      overview:
        "PMEGP supports new micro enterprises in manufacturing and services with margin money subsidy. We help assess category fit, prepare the project narrative, and organize documents for bank and nodal agency review.",
      benefits: [
        "Margin money subsidy typically in the 15–35% range by category",
        "Support for manufacturing and service micro units",
        "Structured project and cost estimation guidance",
        "Bank-facing documentation readiness",
      ],
      eligibility: [
        "New micro enterprise intent under applicable PMEGP norms",
        "Age and educational criteria as per current guidelines",
        "Viable project with employment generation potential",
      ],
      documents: [
        "KYC of applicant(s)",
        "Project report / cost estimates",
        "Quotations for machinery or setup where relevant",
        "Caste / special category certificates if claiming higher subsidy",
        "Bank account and related proofs",
      ],
    }),
    createScheme({
      slug: "cgtmse",
      title: "CGTMSE",
      summary:
        "Credit Guarantee Fund Trust for Micro and Small Enterprises — collateral-light credit cover.",
      category: "loans",
      ministry: "CGTMSE / Member lending institutions",
      amount: "Up to ₹5 Cr",
      benefit: "Guarantee cover",
      timeline: "30–45 days",
      headline: "Collateral-light credit backed by guarantee cover.",
      overview:
        "CGTMSE enables banks and NBFCs to extend credit to MSEs with guarantee cover, reducing collateral pressure. We help prepare a cleaner credit file and frame the request for participating lenders.",
      benefits: [
        "Collateral-light borrowing conversations",
        "Guarantee cover for eligible MSE credit",
        "Useful for term loans and working capital",
        "Stronger lender packaging support",
      ],
      eligibility: [
        "Micro or small enterprise as applicable",
        "Viable business and repayment capacity",
        "Lender-specific credit assessment clearance",
      ],
      documents: [
        "Entity KYC and registrations",
        "Bank statements",
        "Financials / GST records where available",
        "Use-of-funds note and quotations",
      ],
    }),
    createScheme({
      slug: "mudra-loan-support",
      title: "MUDRA Loan",
      summary:
        "Pradhan Mantri MUDRA Yojana — micro credit across Shishu, Kishore, and Tarun categories.",
      category: "loans",
      ministry: "PMMY / Partner banks & NBFCs",
      amount: "₹50K–₹10L",
      benefit: "Typically collateral-free",
      timeline: "7–21 days",
      headline: "Micro business capital with clearer category framing.",
      overview:
        "MUDRA supports non-farm micro enterprises through Shishu, Kishore, and Tarun bands. Sanctioning remains with banks/NBFCs. We help define purpose, category fit, and a lender-ready document pack.",
      benefits: [
        "Shishu, Kishore, and Tarun category framing",
        "Working capital and micro expansion support",
        "Documentation readiness for lender review",
        "Practical process follow-up",
      ],
      eligibility: [
        "Non-farm micro enterprise use cases typically considered",
        "Viable activity and repayment capacity",
        "KYC and banking history available",
      ],
      documents: [
        "Identity and address proofs",
        "Business proof / registrations",
        "Bank statements",
        "Quotations or use-of-funds details",
      ],
    }),
    createScheme({
      slug: "startup-india",
      title: "Startup India Recognition",
      summary:
        "DPIIT recognition and related startup-stage advantages, including selected tax pathways.",
      category: "startups",
      ministry: "DPIIT",
      amount: "Recognition-led",
      benefit: "Tax / credibility benefits",
      timeline: "15–30 days",
      headline: "Recognition support for eligible innovative startups.",
      overview:
        "Startup India recognition can strengthen credibility and unlock selected benefits for eligible startups. We help assess fit, prepare documentation, and navigate the recognition pathway.",
      benefits: [
        "DPIIT recognition pathway support",
        "Stronger investor and banking credibility",
        "Guidance on selected tax / compliance advantages",
        "Clearer next-step planning after recognition",
      ],
      eligibility: [
        "Entity incorporated as per applicable startup norms",
        "Innovation / scalability narrative aligned to guidelines",
        "Required incorporation and founder documents ready",
      ],
      documents: [
        "Certificate of incorporation",
        "Founder KYC",
        "Pitch / product brief",
        "Board or authorization documents as needed",
      ],
    }),
    createScheme({
      slug: "standup-india",
      title: "Stand-Up India",
      summary:
        "Bank-led financing for SC/ST and women entrepreneurs starting greenfield enterprises.",
      category: "women",
      ministry: "Stand-Up India",
      amount: "₹10L–₹1 Cr",
      benefit: "Special category pathway",
      timeline: "30–60 days",
      headline: "Greenfield financing for eligible entrepreneur categories.",
      overview:
        "Stand-Up India focuses on SC/ST and women entrepreneurs setting up greenfield manufacturing, services, or trading enterprises. We help validate fit and prepare the bank application narrative.",
      benefits: [
        "Category-focused financing pathway",
        "Greenfield project packaging support",
        "Bank application readiness",
        "Process navigation assistance",
      ],
      eligibility: [
        "Eligible borrower category as per scheme norms",
        "Greenfield enterprise intent",
        "Project and promoter details ready for assessment",
      ],
      documents: [
        "KYC of applicant(s)",
        "Category certificates where applicable",
        "Project report and cost estimates",
        "Banking and financial documents as required",
      ],
    }),
    createScheme({
      slug: "clcss",
      title: "CLCSS",
      summary:
        "Credit Linked Capital Subsidy Scheme — capital subsidy support for technology upgradation.",
      category: "manufacturing",
      ministry: "Ministry of MSME",
      amount: "Up to ₹1 Cr",
      benefit: "About 15% capital subsidy",
      timeline: "45–90 days",
      headline: "Capital subsidy for technology upgradation.",
      overview:
        "CLCSS-oriented pathways support MSMEs upgrading plant and machinery. We help prepare the investment case, quotations, and documentation needed for subsidy-linked credit conversations.",
      benefits: [
        "Capital subsidy support for eligible machinery",
        "Technology upgradation framing",
        "Stronger project cost documentation",
        "Lender and portal readiness guidance",
      ],
      eligibility: [
        "Eligible MSME manufacturing activity",
        "Qualifying machinery / technology upgrade intent",
        "Bank credit linkage as applicable",
      ],
      documents: [
        "Udyam / MSME proof",
        "Machinery quotations and technical specs",
        "Project cost sheet",
        "KYC and banking documents",
      ],
    }),
    createScheme({
      slug: "pmfme",
      title: "PMFME",
      summary:
        "PM Formalisation of Micro Food Processing Enterprises — capital subsidy and formalisation support.",
      category: "subsidies",
      ministry: "MoFPI / State nodal agencies",
      amount: "₹10L–₹50L",
      benefit: "Up to ~35% capital subsidy",
      timeline: "30–60 days",
      headline: "Formalise and fund micro food processing units.",
      overview:
        "PMFME supports micro food processing enterprises with capital subsidy and formalisation pathways. We help map eligibility, prepare the project file, and align FSSAI / compliance prerequisites.",
      benefits: [
        "Capital subsidy support for eligible units",
        "Formalisation and branding readiness guidance",
        "Training / capacity-building pathway awareness",
        "Document pack for nodal agency and bank review",
      ],
      eligibility: [
        "Micro food processing enterprise fit",
        "Individual / group / SHG models as applicable",
        "State and scheme-specific criteria",
      ],
      documents: [
        "KYC and business proofs",
        "FSSAI / food compliance details where relevant",
        "Project cost and quotations",
        "Bank account documents",
      ],
    }),
    createScheme({
      slug: "zed-certification",
      title: "ZED Certification",
      summary:
        "Zero Defect Zero Effect certification — quality and sustainability recognition for MSMEs.",
      category: "certification",
      ministry: "Ministry of MSME",
      amount: "N/A",
      benefit: "Up to ~80% fee support*",
      timeline: "60–90 days",
      headline:
        "Quality certification that strengthens manufacturing credibility.",
      overview:
        "ZED certification helps manufacturing MSMEs demonstrate quality and environmental discipline. We guide readiness assessment, documentation, and the certification journey.",
      benefits: [
        "Quality and process credibility",
        "Potential subsidy support on certification fees",
        "Stronger buyer and tender positioning",
        "Structured readiness checklist",
      ],
      eligibility: [
        "Manufacturing MSME typically considered",
        "Willingness to improve process and quality systems",
        "Basic compliance and entity readiness",
      ],
      documents: [
        "Udyam registration",
        "Process / quality documentation",
        "Plant and product details",
        "KYC and authorization proofs",
      ],
    }),
    createScheme({
      slug: "nsic-schemes",
      title: "NSIC Schemes",
      summary:
        "National Small Industries Corporation support — raw material, marketing, and tech assistance pathways.",
      category: "msme",
      ministry: "NSIC",
      amount: "Varies",
      benefit: "Multiple MSME supports",
      timeline: "30–60 days",
      headline: "Practical MSME enablement beyond a single loan product.",
      overview:
        "NSIC pathways can support raw material assistance, marketing, and technology needs for MSMEs. We help identify relevant NSIC options and prepare the supporting file.",
      benefits: [
        "Raw material assistance pathways",
        "Marketing and tender participation support awareness",
        "Technology / capability linkages",
        "Documentation and process guidance",
      ],
      eligibility: [
        "Eligible MSME profile as per NSIC product norms",
        "Business activity suited to selected assistance",
        "Required registrations and financial proofs",
      ],
      documents: [
        "Udyam / MSME proof",
        "Financial and banking documents",
        "Purchase / supply details where relevant",
        "KYC of authorized persons",
      ],
    }),
    createScheme({
      slug: "cgss",
      title: "CGSS",
      summary:
        "Credit Guarantee Scheme for Startups — guarantee support for eligible startup debt.",
      category: "startups",
      ministry: "DPIIT / NCGTC framework",
      amount: "Up to ₹10 Cr",
      benefit: "Collateral-light guarantee",
      timeline: "45–90 days",
      headline: "Guarantee-backed debt pathways for eligible startups.",
      overview:
        "CGSS supports credit guarantee cover for eligible startups seeking debt. We help prepare investor/lender-ready narratives and documentation for participating institutions.",
      benefits: [
        "Guarantee cover for eligible startup credit",
        "Collateral-light debt conversations",
        "Stronger financial packaging",
        "Process guidance with lenders",
      ],
      eligibility: [
        "DPIIT-recognized or otherwise eligible startup profile",
        "Viable business model and repayment plan",
        "Lender assessment clearance",
      ],
      documents: [
        "Incorporation and recognition proofs",
        "Financial model / projections",
        "Banking and KYC documents",
        "Use-of-funds plan",
      ],
    }),
    createScheme({
      slug: "msme-champions",
      title: "MSME Champions",
      summary:
        "MSME Champions scheme — technology, lean, design, and innovation support pathways.",
      category: "msme",
      ministry: "Ministry of MSME",
      amount: "N/A",
      benefit: "Multiple supports",
      timeline: "Ongoing",
      headline: "Capability-building support for competitive MSMEs.",
      overview:
        "MSME Champions-oriented supports focus on technology upgradation, lean manufacturing, design, and innovation. We help identify the right sub-path and prepare applications.",
      benefits: [
        "Technology and lean manufacturing pathways",
        "Design and innovation support awareness",
        "Competitive capability building",
        "Application readiness guidance",
      ],
      eligibility: [
        "Eligible MSME as per selected sub-scheme",
        "Clear improvement or innovation objective",
        "Basic compliance readiness",
      ],
      documents: [
        "Udyam registration",
        "Project / intervention note",
        "Quotations or consultant proposals where needed",
        "KYC and authorization documents",
      ],
    }),
    createScheme({
      slug: "tufs",
      title: "TUFS",
      summary:
        "Technology Upgradation Fund Scheme — textile-sector machinery and capital subsidy pathway.",
      category: "manufacturing",
      ministry: "Ministry of Textiles",
      amount: "Up to ₹20 Cr*",
      benefit: "Capital / interest support",
      timeline: "60–90 days",
      headline: "Technology upgradation support for textile enterprises.",
      overview:
        "TUFS-oriented pathways support textile units upgrading machinery and technology. We help structure the investment case and documentation for subsidy-linked conversations.",
      benefits: [
        "Textile-focused technology upgradation",
        "Capital subsidy / interest support awareness",
        "Machinery investment packaging",
        "Lender and scheme documentation guidance",
      ],
      eligibility: [
        "Eligible textile / apparel manufacturing activity",
        "Qualifying technology upgrade plan",
        "Scheme-version specific criteria",
      ],
      documents: [
        "Business and sector proofs",
        "Machinery quotations",
        "Project cost sheet",
        "Banking and KYC documents",
      ],
    }),
    createScheme({
      slug: "fund-of-funds",
      title: "Fund of Funds for Startups",
      summary:
        "Equity-oriented Fund of Funds pathway connecting startups with VC/PE participation.",
      category: "startups",
      ministry: "SIDBI / DPIIT ecosystem",
      amount: "Equity funding",
      benefit: "VC / PE participation",
      timeline: "90–180 days",
      headline: "Equity pathways through the startup funding ecosystem.",
      overview:
        "Fund of Funds supports the broader startup equity ecosystem rather than direct retail loans. We help startups prepare for investor-ready conversations and related formalities.",
      benefits: [
        "Equity fundraising readiness",
        "Stronger pitch and data-room hygiene",
        "Governance and compliance preparation",
        "Intro-path awareness within the ecosystem",
      ],
      eligibility: [
        "Innovative / scalable startup profile",
        "Clear growth narrative and traction signals",
        "Investor-ready documentation baseline",
      ],
      documents: [
        "Pitch deck and financial model",
        "Incorporation documents",
        "Cap table and founder KYC",
        "Traction / product evidence",
      ],
    }),
    createScheme({
      slug: "cgssd",
      title: "CGSSD",
      summary:
        "Credit Guarantee Scheme for Subordinate Debt — revival support for stressed MSMEs.",
      category: "loans",
      ministry: "CGTMSE / Member lending institutions",
      amount: "Up to ₹2 Cr",
      benefit: "Stressed MSME support",
      timeline: "60–90 days",
      headline: "Subordinate debt pathways for stressed but viable MSMEs.",
      overview:
        "CGSSD-oriented support aims to help stressed MSMEs with promoter infusion backed by guarantee structures. We help assess whether this path is relevant and prepare lender discussions carefully.",
      benefits: [
        "Revival-oriented subordinate debt framing",
        "Promoter contribution structuring support",
        "Lender conversation readiness",
        "Documentation for stressed-unit assessment",
      ],
      eligibility: [
        "Stressed but viable MSME profile as per norms",
        "Promoter willingness to infuse capital",
        "Lender evaluation clearance",
      ],
      documents: [
        "Financial stress and revival note",
        "Banking history and lender correspondence",
        "Promoter KYC and contribution proofs",
        "Business continuity plan",
      ],
    }),
    createScheme({
      slug: "pm-svanidhi",
      title: "PM SVANidhi",
      summary:
        "PM Street Vendor AtmaNirbhar Nidhi — working capital for street vendors with interest subsidy.",
      category: "rural",
      ministry: "MoHUA",
      amount: "₹10K–₹50K",
      benefit: "Interest subsidy / progressive loans",
      timeline: "7–15 days",
      headline: "Working capital support for street vendors.",
      overview:
        "PM SVANidhi supports street vendors with small working-capital loans and progressive limits. We help with readiness, documentation, and process clarity where advisory support is needed.",
      benefits: [
        "Small-ticket working capital access",
        "Interest subsidy awareness",
        "Progressive loan pathway understanding",
        "Digital onboarding readiness",
      ],
      eligibility: [
        "Street vendor identity / vending certificate as applicable",
        "Urban local body linked eligibility norms",
        "Basic KYC readiness",
      ],
      documents: [
        "Vendor certificate / LOI where applicable",
        "Aadhaar and KYC",
        "Bank account details",
        "Passport photo and local proofs",
      ],
    }),
    createScheme({
      slug: "udyam-msme",
      title: "Udyam / MSME Recognition",
      summary:
        "Official MSME registration that unlocks scheme access and stronger banking conversations.",
      category: "msme",
      ministry: "Ministry of MSME",
      amount: "Recognition",
      benefit: "Scheme access gateway",
      timeline: "1–7 days",
      headline: "The recognition step most MSME pathways start with.",
      overview:
        "Udyam registration is often the first unlock for MSME benefits, subsidies, and credit conversations. We help complete it accurately and map what to pursue next.",
      benefits: [
        "Official MSME recognition",
        "Improved access to selected schemes",
        "Stronger banking / credit positioning",
        "Clearer follow-on compliance planning",
      ],
      eligibility: [
        "Micro, small, or medium enterprise as per norms",
        "Valid Aadhaar and PAN details",
        "Business activity details ready for declaration",
      ],
      documents: [
        "Aadhaar of proprietor / authorized person",
        "PAN of business or applicant",
        "Bank account details",
        "Investment / turnover information",
      ],
    }),
  ] satisfies SchemeDetail[],
  cta: {
    title: "Need help choosing a scheme?",
    support:
      "Tell us your business type and goal — we will shortlist realistic pathways and required documents.",
    primary: { label: "Talk to an advisor", href: "/contact" },
    secondary: { label: "Check eligibility", href: "/tools/eligibility" },
  },
} as const;

export function getAllSchemeSlugs(): string[] {
  return schemesContent.items.map((item) => item.slug);
}

export function getSchemeDetail(slug: string): SchemeDetail | null {
  return schemesContent.items.find((item) => item.slug === slug) ?? null;
}
