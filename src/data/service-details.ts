import { servicesContent, type ServiceItem } from "@/data/services";

export type ServiceDetail = ServiceItem & {
  headline: string;
  overview: string;
  outcomes: string[];
  process: { title: string; copy: string }[];
  documents: string[];
  faqs: { question: string; answer: string }[];
};

const detailsBySlug: Record<string, Omit<ServiceDetail, keyof ServiceItem>> = {
  "company-registration": {
    headline: "Incorporate with a clean foundation for growth.",
    overview:
      "We guide private limited, LLP, and related company setups through documentation, filings, and post-incorporation essentials so you start on solid ground.",
    outcomes: [
      "Clear entity recommendation for your goals",
      "Prepared incorporation documentation",
      "Filing support through approval",
      "Post-incorporation compliance checklist",
    ],
    process: [
      {
        title: "Scope the right structure",
        copy: "We review your ownership, funding plans, and operations to recommend the right entity type.",
      },
      {
        title: "Prepare filings",
        copy: "Name checks, KYC, and incorporation forms are prepared with careful review.",
      },
      {
        title: "Submit and track",
        copy: "Applications are filed and tracked until incorporation is complete.",
      },
      {
        title: "Handover essentials",
        copy: "You receive next-step guidance for bank, tax, and compliance setup.",
      },
    ],
    documents: [
      "Identity and address proofs of directors/partners",
      "Passport-size photographs",
      "Registered office address proof",
      "Digital signatures where required",
    ],
    faqs: [
      {
        question: "How long does company registration take?",
        answer:
          "Timelines vary by entity type and documentation readiness. Once papers are complete, most straightforward incorporations move within a few working days to a couple of weeks.",
      },
      {
        question: "Can you help after incorporation?",
        answer:
          "Yes. We can continue with GST, MSME, banking readiness, and other launch formalities.",
      },
    ],
  },
  "gst-registration": {
    headline: "Get GST-ready without the paperwork maze.",
    overview:
      "From eligibility checks to portal filings, we help you complete GST registration with accurate documentation and practical guidance for what comes next.",
    outcomes: [
      "Eligibility and registration type clarity",
      "Document checklist tailored to your business",
      "Application preparation and filing support",
      "Post-registration compliance orientation",
    ],
    process: [
      {
        title: "Assess requirements",
        copy: "We confirm whether registration is required and which category applies.",
      },
      {
        title: "Collect documents",
        copy: "You receive a precise checklist for your business type and locations.",
      },
      {
        title: "File the application",
        copy: "Forms are prepared carefully to reduce avoidable queries or delays.",
      },
      {
        title: "Activate next steps",
        copy: "We outline invoicing, returns, and record-keeping basics after approval.",
      },
    ],
    documents: [
      "PAN of business / proprietor / directors",
      "Identity and address proofs",
      "Business address proof",
      "Bank account details and cancelled cheque",
      "Photographs and authorization letters as applicable",
    ],
    faqs: [
      {
        question: "Is GST mandatory for every business?",
        answer:
          "Not always. It depends on turnover, business type, and specific activities. We confirm this before filing.",
      },
      {
        question: "Do you help with GST returns too?",
        answer:
          "Yes. Accounting and taxation support can continue after registration if you need ongoing help.",
      },
    ],
  },
  "msme-registration": {
    headline: "Unlock MSME recognition and scheme pathways.",
    overview:
      "MSME registration can open doors to subsidies, priority schemes, and financing advantages. We help you complete Udyam registration correctly and identify what to pursue next.",
    outcomes: [
      "Udyam registration support",
      "Category and classification clarity",
      "Scheme opportunity mapping",
      "Guidance on documents for related benefits",
    ],
    process: [
      {
        title: "Confirm eligibility",
        copy: "We verify business details and classification before filing.",
      },
      {
        title: "Prepare application",
        copy: "Aadhaar, PAN, and business information are aligned for Udyam submission.",
      },
      {
        title: "Complete registration",
        copy: "Filing is completed and confirmation details are shared with you.",
      },
      {
        title: "Map next benefits",
        copy: "We highlight relevant schemes, banking advantages, and follow-up actions.",
      },
    ],
    documents: [
      "Aadhaar of proprietor / authorized person",
      "PAN of business or applicant",
      "Business activity details",
      "Bank account information",
    ],
    faqs: [
      {
        question: "Is MSME registration free?",
        answer:
          "Government Udyam registration itself has no government fee. Our advisory covers preparation, accuracy, and next-step scheme guidance.",
      },
      {
        question: "What benefits can MSME recognition unlock?",
        answer:
          "Depending on your profile: easier access to certain schemes, subsidies, and financing pathways. We map what fits your stage.",
      },
    ],
  },
  trademark: {
    headline: "Protect the name and identity your customers recognize.",
    overview:
      "We help you search, prepare, and file trademark applications so your brand identity is protected with a clear process and follow-through.",
    outcomes: [
      "Brand protectability guidance",
      "Search and class recommendations",
      "Application drafting and filing support",
      "Status tracking orientation",
    ],
    process: [
      {
        title: "Review the mark",
        copy: "We assess your brand name/logo and intended goods or services.",
      },
      {
        title: "Recommend classes",
        copy: "Filing classes are selected to match how you actually operate and plan to grow.",
      },
      {
        title: "File the application",
        copy: "Documents and forms are prepared for submission with careful review.",
      },
      {
        title: "Monitor next actions",
        copy: "You receive guidance on examination responses and maintenance timelines.",
      },
    ],
    documents: [
      "Brand name / logo artwork",
      "Applicant identity and address proof",
      "Business details and goods/services description",
      "Power of attorney where required",
    ],
    faqs: [
      {
        question: "Can I file before launching my business?",
        answer:
          "Often yes. Many applicants file early to secure brand rights. We advise based on your use plans and risk profile.",
      },
      {
        question: "What if a similar mark already exists?",
        answer:
          "We discuss options such as refining the mark, adjusting classes, or choosing an alternate brand direction.",
      },
    ],
  },
  "iso-certification": {
    headline: "Get certification-ready with a structured path.",
    overview:
      "ISO readiness is about systems, evidence, and preparation. We help you understand requirements, organize documentation, and move toward certification with fewer surprises.",
    outcomes: [
      "Standard and scope clarity",
      "Gap-oriented readiness plan",
      "Documentation support framework",
      "Audit preparation guidance",
    ],
    process: [
      {
        title: "Define the goal",
        copy: "We identify the ISO standard and scope relevant to your operations.",
      },
      {
        title: "Assess readiness",
        copy: "Current processes and evidence are reviewed against expected requirements.",
      },
      {
        title: "Build the system",
        copy: "Policies, records, and operating practices are organized for audit readiness.",
      },
      {
        title: "Prepare for certification",
        copy: "You get practical guidance for internal checks and certification engagement.",
      },
    ],
    documents: [
      "Business profile and process overview",
      "Existing quality/operations documents",
      "Organization structure details",
      "Customer/process records as applicable",
    ],
    faqs: [
      {
        question: "Which ISO standard do I need?",
        answer:
          "It depends on your industry and buyer requirements. Common starting points include quality management standards; we help you choose intentionally.",
      },
      {
        question: "Do you issue the certificate?",
        answer:
          "Certification is issued by accredited bodies. We help you become ready and navigate the process confidently.",
      },
    ],
  },
  "import-export-code": {
    headline: "Open cross-border trade with IEC support.",
    overview:
      "An Import Export Code is a foundational step for international trade. We help you prepare and file with the right business details and documents.",
    outcomes: [
      "IEC eligibility and readiness check",
      "Document preparation support",
      "Application filing guidance",
      "Post-approval next-step orientation",
    ],
    process: [
      {
        title: "Confirm business details",
        copy: "PAN, bank, and entity information are verified before filing.",
      },
      {
        title: "Assemble documents",
        copy: "You receive a concise checklist and review before submission.",
      },
      {
        title: "File the IEC application",
        copy: "Application details are prepared carefully to reduce rework.",
      },
      {
        title: "Plan trade next steps",
        copy: "We outline related registrations and operational considerations after IEC.",
      },
    ],
    documents: [
      "PAN of the business entity",
      "Bank account details / cancelled cheque",
      "Business address proof",
      "Digital signature / authorization as applicable",
    ],
    faqs: [
      {
        question: "Is IEC required for every international shipment?",
        answer:
          "For most import/export businesses, yes. Some limited exceptions exist; we confirm based on your use case.",
      },
      {
        question: "Can startups apply?",
        answer:
          "Yes, once the business entity and required documents are in place.",
      },
    ],
  },
  fssai: {
    headline: "Food licensing guidance matched to your operations.",
    overview:
      "Whether you are a cloud kitchen, manufacturer, trader, or retailer, we help identify the right FSSAI pathway and complete documentation with clarity.",
    outcomes: [
      "License/registration type recommendation",
      "Document checklist for your food business",
      "Application preparation support",
      "Compliance basics after approval",
    ],
    process: [
      {
        title: "Map your food business",
        copy: "We review products, premises, and scale to identify the correct category.",
      },
      {
        title: "Prepare the file",
        copy: "Forms and supporting documents are assembled with practical review.",
      },
      {
        title: "Submit application",
        copy: "Filing is completed and tracked through expected next actions.",
      },
      {
        title: "Operate with confidence",
        copy: "You receive guidance on display, renewals, and basic hygiene documentation.",
      },
    ],
    documents: [
      "Identity and address proofs",
      "Business premises details",
      "Food product / activity details",
      "Photographs and supporting declarations as required",
    ],
    faqs: [
      {
        question: "Do I need basic registration or a license?",
        answer:
          "It depends on turnover and business type. We recommend the correct route before you file.",
      },
      {
        question: "Can you help with renewals?",
        answer:
          "Yes. We can support renewal planning and documentation when your validity approaches expiry.",
      },
    ],
  },
  accounting: {
    headline: "Financial hygiene that keeps decisions clear.",
    overview:
      "Clean books are not just compliance — they support funding, tax filings, and operational clarity. We help set up and maintain practical accounting systems.",
    outcomes: [
      "Bookkeeping structure suited to your stage",
      "Monthly or periodic accounting support options",
      "Report clarity for owners and advisors",
      "Smoother tax and compliance handoffs",
    ],
    process: [
      {
        title: "Understand your flows",
        copy: "Sales, expenses, payroll, and tools are reviewed for a workable setup.",
      },
      {
        title: "Design the system",
        copy: "Chart of accounts, documentation habits, and reporting cadence are defined.",
      },
      {
        title: "Operate consistently",
        copy: "Books are maintained with clear ownership and review points.",
      },
      {
        title: "Inform decisions",
        copy: "You get readable summaries that support planning, tax, and funding conversations.",
      },
    ],
    documents: [
      "Bank statements",
      "Sales and purchase invoices",
      "Expense records",
      "Payroll / contractor details as applicable",
    ],
    faqs: [
      {
        question: "Do I need accounting software first?",
        answer:
          "Not necessarily. We can recommend a lightweight setup based on your volume and team.",
      },
      {
        question: "Can accounting support connect with taxation?",
        answer:
          "Yes. Our accounting and taxation tracks are designed to work together.",
      },
    ],
  },
  taxation: {
    headline: "Tax support aligned to your business structure.",
    overview:
      "From planning to filings, we help you stay compliant with a clear calendar and documentation discipline — without unnecessary complexity.",
    outcomes: [
      "Tax calendar and obligation clarity",
      "Filing preparation support",
      "Coordination with accounting records",
      "Practical planning for growth stages",
    ],
    process: [
      {
        title: "Map obligations",
        copy: "We identify returns, payments, and deadlines relevant to your entity.",
      },
      {
        title: "Organize inputs",
        copy: "Books, invoices, and statements are aligned before filing windows.",
      },
      {
        title: "Prepare and file",
        copy: "Returns and related filings are prepared with review checkpoints.",
      },
      {
        title: "Plan ahead",
        copy: "You receive guidance for upcoming periods and structural changes.",
      },
    ],
    documents: [
      "Financial statements / books",
      "GST and TDS details as applicable",
      "Investment and deduction proofs where relevant",
      "Prior return acknowledgements",
    ],
    faqs: [
      {
        question: "Do you handle both GST and income tax?",
        answer:
          "Yes. We can support GST-linked compliance and income-tax related filings based on your needs.",
      },
      {
        question: "Can you help before year-end?",
        answer:
          "Absolutely. Advance planning usually reduces last-minute pressure and missed opportunities.",
      },
    ],
  },
  funding: {
    headline:
      "Business funding readiness — schemes, loans, and capital pathways.",
    overview:
      "Enigrow helps MSMEs and startups map viable capital options — from government schemes (PMEGP, CGTMSE, MUDRA, Stand-Up India, Startup India) to lender conversations — with eligibility checks, documentation, and follow-through. We facilitate readiness; banks and authorities decide approvals and disbursement.",
    outcomes: [
      "Stage-aware shortlist of schemes and funding routes",
      "Eligibility and documentation gap assessment",
      "Project / use-of-funds narrative support",
      "Application pack prep and chase guidance",
      "Clear next steps after submission — without outcome guarantees",
    ],
    process: [
      {
        title: "Assess the need",
        copy: "We clarify capital purpose, amount range, urgency, business stage, and category fit (including women / SC-ST / manufacturing where relevant).",
      },
      {
        title: "Match pathways",
        copy: "Scheme-linked loans, credit guarantees, and related programs are filtered against your eligibility and paperwork readiness.",
      },
      {
        title: "Prepare the file",
        copy: "KYC, registrations, bank statements, financials, quotations, and project notes are organized for lender or nodal scrutiny.",
      },
      {
        title: "Submit and follow up",
        copy: "Applications move with named ownership, query handling, and status updates until a decision is recorded.",
      },
    ],
    documents: [
      "Business registration proofs (company / firm / Udyam as applicable)",
      "KYC of promoters / directors",
      "Bank statements (typically 6–12 months)",
      "Financials / ITR / GST returns as applicable",
      "Project report or use-of-funds summary",
      "Quotations for machinery / setup where relevant",
    ],
    faqs: [
      {
        question: "Can you guarantee funding approval?",
        answer:
          "No. Enigrow improves readiness and process quality. Approvals and disbursements depend on banks, NBFCs, and scheme authorities.",
      },
      {
        question: "Which schemes do you commonly support?",
        answer:
          "Pathways such as PMEGP, CGTMSE, MUDRA, Stand-Up India, Startup India recognition routes, and related MSME programs — shortlisted only when they fit your case.",
      },
      {
        question: "How long does the process usually take?",
        answer:
          "Many pathways move in roughly 7–45 days once documents are complete; some take longer. Timelines are scheme- and bank-dependent.",
      },
      {
        question: "Do startups without revenue qualify?",
        answer:
          "Sometimes, through specific programs or structures. We assess realistically before you invest time in a pathway that does not fit.",
      },
    ],
  },
  loans: {
    headline: "Loan services focused on readiness, not empty promises.",
    overview:
      "Enigrow supports business loan preparation — working capital, term loans, and scheme-linked borrowing — with clearer paperwork, stronger narratives, and a practical view of what lenders usually examine. Sanction and interest rates remain lender decisions.",
    outcomes: [
      "Loan-type recommendation matched to purpose",
      "Document gap analysis before you approach a bank",
      "Application pack and narrative support",
      "Query handling and process tracking guidance",
      "Honest view of collateral / CGTMSE-style options where relevant",
    ],
    process: [
      {
        title: "Profile the requirement",
        copy: "Working capital, machinery, greenfield, or scheme-linked needs are clarified with amount and tenure expectations.",
      },
      {
        title: "Assess readiness",
        copy: "Credit signals, cashflow story, registrations, and document gaps are identified early — before wasted bank visits.",
      },
      {
        title: "Build the pack",
        copy: "Forms, statements, KYC, GST/ITR evidence, and business explanations are organized for submission.",
      },
      {
        title: "Follow through",
        copy: "Lender queries and next steps are managed with clear communication until a decision is recorded.",
      },
    ],
    documents: [
      "KYC and business proofs",
      "Bank statements",
      "ITR / financial statements",
      "GST returns where applicable",
      "Collateral details if relevant",
      "Project cost / quotations for term loans",
    ],
    faqs: [
      {
        question: "What loan amount can I get?",
        answer:
          "It depends on business performance, credit profile, scheme rules, and product criteria. We estimate realistically after review — not with inflated promises.",
      },
      {
        question: "Is collateral always required?",
        answer:
          "Not always. Some pathways aim for collateral-free cover under structures like CGTMSE (subject to lender and scheme rules). We clarify what usually applies to your case.",
      },
      {
        question: "Do you sanction or disburse loans?",
        answer:
          "No. Banks and NBFCs take those decisions. Enigrow prepares and supports the application journey.",
      },
      {
        question: "Do you work with multiple lenders?",
        answer:
          "We focus on fit and readiness first, then guide applications through suitable channels based on your profile and pathway.",
      },
    ],
  },
  "startup-support": {
    headline: "Launch-stage advisory without the noise.",
    overview:
      "From entity choices to scheme fit and early compliance, we help startups sequence the right moves instead of doing everything at once.",
    outcomes: [
      "Launch checklist for your model",
      "Registration and compliance sequencing",
      "Scheme and recognition guidance",
      "Funding-readiness orientation",
    ],
    process: [
      {
        title: "Understand the venture",
        copy: "Model, founders, timeline, and constraints are mapped in one working session.",
      },
      {
        title: "Sequence priorities",
        copy: "We separate must-do launch steps from later optimizations.",
      },
      {
        title: "Execute foundations",
        copy: "Registrations and filings are handled with clear ownership.",
      },
      {
        title: "Prepare for growth",
        copy: "Scheme, brand, and funding pathways are introduced when timing is right.",
      },
    ],
    documents: [
      "Founder KYC",
      "Business concept summary",
      "Proposed ownership structure",
      "Any existing registrations",
    ],
    faqs: [
      {
        question: "Do I need a private limited company on day one?",
        answer:
          "Not always. We recommend structure based on fundraising plans, risk, and operational reality.",
      },
      {
        question: "Can you help with startup India recognition?",
        answer:
          "Yes, when eligibility and documentation are in place, we can guide that pathway.",
      },
    ],
  },
  "digital-marketing": {
    headline: "Growth campaigns tied to real business outcomes.",
    overview:
      "We help you plan and execute digital marketing that supports enquiries, trust, and conversion — not vanity metrics alone.",
    outcomes: [
      "Channel strategy matched to your audience",
      "Campaign and content direction",
      "Landing experience recommendations",
      "Measurement basics for decisions",
    ],
    process: [
      {
        title: "Define the outcome",
        copy: "Leads, calls, or brand visibility goals are made explicit.",
      },
      {
        title: "Choose channels",
        copy: "We focus on a practical mix instead of spreading effort too thin.",
      },
      {
        title: "Launch and learn",
        copy: "Creative, targeting, and offers are tested with clear feedback loops.",
      },
      {
        title: "Optimize",
        copy: "Budget and messaging shift toward what actually converts.",
      },
    ],
    documents: [
      "Brand assets and offer details",
      "Target customer profile",
      "Website / landing page access",
      "Past campaign data if available",
    ],
    faqs: [
      {
        question: "Do you run ads only?",
        answer:
          "No. Ads can be part of the plan, but messaging, landing pages, and tracking matter just as much.",
      },
      {
        question: "How soon will I see results?",
        answer:
          "Some channels move quickly; durable growth usually needs iteration. We set expectations by channel.",
      },
    ],
  },
  "website-development": {
    headline: "Websites designed to turn interest into conversations.",
    overview:
      "We build modern, fast websites that communicate trust and make it easy for customers to enquire — especially for service-led businesses.",
    outcomes: [
      "Clear information architecture",
      "Premium responsive design",
      "Enquiry-focused page structure",
      "Performance and SEO foundations",
    ],
    process: [
      {
        title: "Discover",
        copy: "Goals, audiences, offers, and must-have pages are defined upfront.",
      },
      {
        title: "Design",
        copy: "Layout and visual direction are crafted for clarity and conversion.",
      },
      {
        title: "Build",
        copy: "Pages are implemented with responsive behavior and clean structure.",
      },
      {
        title: "Launch",
        copy: "Forms, analytics, and final QA are completed before go-live.",
      },
    ],
    documents: [
      "Brand guidelines / logo",
      "Service and company copy inputs",
      "Contact and location details",
      "Reference sites you admire",
    ],
    faqs: [
      {
        question: "Do you rebuild existing sites?",
        answer:
          "Yes. Redesigns and rebuilds are common when your current site no longer reflects the business.",
      },
      {
        question: "Will the site work on mobile?",
        answer:
          "Yes. Responsive design is a baseline requirement for every project.",
      },
    ],
  },
};

export function getAllServiceSlugs(): string[] {
  return servicesContent.items.map((item) => item.slug);
}

export function getServiceDetail(slug: string): ServiceDetail | null {
  const base = servicesContent.items.find((item) => item.slug === slug);
  const detail = detailsBySlug[slug];
  if (!base || !detail) return null;
  return { ...base, ...detail };
}
