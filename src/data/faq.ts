export const faqContent = {
  title: "FAQ",
  headline: "Everything founders ask before they start paperwork.",
  support:
    "Clear answers on Enigrow services, funding process, eligibility, and timelines. Can’t find what you need? Contact us — we’ll point you to the next step.",
  groups: [
    {
      id: "general",
      title: "General",
      items: [
        {
          question: "What does Enigrow help with?",
          answer:
            "Enigrow Startup Advisory Pvt Ltd supports business registrations, government scheme pathways, funding readiness, compliance formalities, certifications, and selected growth services — with clear documentation and advisor ownership.",
        },
        {
          question: "Who is Enigrow for?",
          answer:
            "Founders, MSMEs, women entrepreneurs, and growing companies that want a structured way to handle formalities instead of piecing everything together alone.",
        },
        {
          question: "Do you provide pan-India support?",
          answer:
            "Yes. Most registrations and scheme-readiness work can be handled remotely with clear document exchange and advisor follow-up across India.",
        },
        {
          question: "What makes Enigrow different?",
          answer:
            "We focus on stage-aware sequencing, documentation accuracy, and transparent ownership — without overpromising bank or government approvals.",
        },
      ],
    },
    {
      id: "process",
      title: "Process & timelines",
      items: [
        {
          question: "How long does approval usually take?",
          answer:
            "It depends on the scheme, lender, and how complete your documents are. Many pathways move in roughly 7–45 days once the file is ready; some take longer. We share realistic ranges after reviewing your case.",
        },
        {
          question: "What documents are typically required?",
          answer:
            "KYC, business proofs, bank statements, and a clear use-of-funds or project note are common. Exact lists vary by service and scheme — we share a checklist after the first consultation.",
        },
        {
          question: "How does an engagement usually start?",
          answer:
            "Share your goal through Contact or request a callback. An advisor reviews your stage, confirms the pathway, and outlines documents, expected steps, and next actions.",
        },
        {
          question: "Can you handle multiple services together?",
          answer:
            "Yes. We often sequence company setup, GST, MSME, and related pathways so you avoid rework and wasted effort.",
        },
        {
          question: "What is the process of company registration in India?",
          answer:
            "Typically: choose the right entity, prepare KYC and incorporation documents, file with MCA, then complete post-incorporation steps such as PAN/TAN, bank account, and GST where needed. Enigrow guides each stage.",
        },
      ],
    },
    {
      id: "schemes-funding",
      title: "Schemes & funding",
      items: [
        {
          question: "Which scheme is best for me?",
          answer:
            "There isn’t one answer. We shortlist based on your stage, category, capital need, and documentation readiness — covering pathways such as MUDRA, PMEGP, CGTMSE, Stand-Up India, and Startup India where relevant.",
        },
        {
          question: "Do you sanction loans or disburse funds?",
          answer:
            "No. Banks, NBFCs, and designated authorities take those decisions. We help with readiness, documentation, and process guidance so you approach them with a stronger file.",
        },
        {
          question: "Is MSME registration enough to get subsidies?",
          answer:
            "Not by itself. Udyam recognition can unlock pathways, but each benefit has its own criteria, documents, and process.",
        },
        {
          question: "Do you guarantee funding approval?",
          answer:
            "No. Approvals depend on scheme rules, lender policy, and file quality. We improve readiness and follow-through — we do not guarantee outcomes.",
        },
      ],
    },
    {
      id: "pricing-support",
      title: "Pricing & support",
      items: [
        {
          question: "How is pricing decided?",
          answer:
            "Pricing depends on service scope, entity complexity, and whether you need end-to-end support. We confirm fees before work begins. Pay only through Enigrow’s official channels.",
        },
        {
          question: "Will I have a single point of contact?",
          answer:
            "Yes. Engagements are handled with clear ownership so you are not left chasing updates across multiple people.",
        },
        {
          question: "What if I am unsure where to start?",
          answer:
            "Start with Contact or the eligibility tool. Tell us your goal — registration, scheme support, or funding — and we will recommend the shortest reliable path.",
        },
      ],
    },
  ],
  cta: {
    title: "Still have a question?",
    support:
      "Send us your situation and we will respond with practical next steps.",
    primary: { label: "Contact us", href: "/contact" },
    secondary: { label: "Check eligibility", href: "/tools/eligibility" },
  },
} as const;
