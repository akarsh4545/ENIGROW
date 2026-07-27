export type LegalPage = {
  title: string;
  headline: string;
  updatedAt: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const privacyContent: LegalPage = {
  title: "Privacy Policy",
  headline: "How Enigrow Startup Advisory Pvt Ltd handles your information",
  updatedAt: "2026-07-01",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        "This policy applies to Enigrow Startup Advisory Pvt Ltd (“Enigrow”, “we”, “us”) and the websites, forms, and tools we operate.",
        "It explains what we collect, why we use it, and the choices available to you.",
      ],
    },
    {
      heading: "Information we collect",
      paragraphs: [
        "We collect information you submit through forms, account registration, applications, and appointment requests — such as name, email, phone, business details, and service interest.",
        "We may also collect basic technical data needed to operate the website securely, including IP address, browser/device information, and usage/session data.",
      ],
    },
    {
      heading: "How we use information",
      paragraphs: [
        "We use your information to respond to enquiries, deliver advisory services, manage accounts, improve the platform, communicate updates, and meet legal obligations.",
        "We do not sell personal information. Access is limited to team members and processors who need it to support your request.",
      ],
    },
    {
      heading: "Cookies & analytics",
      paragraphs: [
        "We may use cookies or similar technologies for essential site functions, preference storage, and aggregate analytics to improve experience.",
        "You can control cookies through your browser settings; some features may not work if essential cookies are disabled.",
      ],
    },
    {
      heading: "Data retention & security",
      paragraphs: [
        "We retain information for as long as needed to provide services, meet legal obligations, and resolve disputes.",
        "We apply reasonable administrative and technical safeguards, but no online system can be guaranteed fully secure.",
      ],
    },
    {
      heading: "Your rights & choices",
      paragraphs: [
        "Subject to applicable law, you may request access, correction, or deletion/restriction of personal data, or withdraw consent where processing is consent-based.",
        "Contact us through the website contact channels to make a request. We may need to verify your identity before acting.",
      ],
    },
    {
      heading: "Payments & third parties",
      paragraphs: [
        "Payments for Enigrow services must be made only through official Enigrow channels (authorized bank transfer or payment gateway).",
        "Our site may link to third-party websites or portals. Their privacy practices are governed by their own policies.",
      ],
    },
    {
      heading: "Jurisdiction & updates",
      paragraphs: [
        "This policy is governed by the laws of India. We may update it from time to time; the “updated” date above reflects the latest revision.",
        "For privacy questions, contact Enigrow Startup Advisory Pvt Ltd through the Contact page.",
      ],
    },
  ],
};

export const termsContent: LegalPage = {
  title: "Terms of Service",
  headline: "Terms that govern use of Enigrow services and website",
  updatedAt: "2026-07-01",
  sections: [
    {
      heading: "About these terms",
      paragraphs: [
        "These terms apply when you use the Enigrow website or engage Enigrow Startup Advisory Pvt Ltd for advisory and facilitation services.",
        "By using the site or starting an engagement, you agree to these terms and any engagement-specific proposal or agreement issued by Enigrow.",
      ],
    },
    {
      heading: "Nature of services",
      paragraphs: [
        "Enigrow provides consulting, documentation support, and process facilitation for business registrations, schemes, funding readiness, certifications, and related services.",
        "Services are delivered on a best-effort basis and depend on accurate client inputs, third-party systems, banks, and government authorities.",
        "We do not guarantee government approvals, lender sanctions, disbursements, marketing results, or any specific commercial outcome.",
      ],
    },
    {
      heading: "Accounts & acceptable use",
      paragraphs: [
        "You are responsible for maintaining accurate account information and safeguarding login credentials.",
        "You agree not to misuse the website, attempt unauthorized access, or submit unlawful or misleading materials. We may suspend accounts that do so.",
      ],
    },
    {
      heading: "Fees & payments",
      paragraphs: [
        "Fees are customized to scope and confirmed before work begins.",
        "All payments must be made exclusively in the name of Enigrow Startup Advisory Pvt Ltd through official channels such as bank transfer (NEFT/IMPS/RTGS) or authorized digital payment gateways.",
        "Do not make cash payments or transfer funds to personal accounts claiming to represent Enigrow.",
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, Enigrow is not liable for indirect or consequential losses arising from delays, third-party decisions, portal downtime, or reliance on general website content.",
        "Engagement-specific terms in a signed proposal may apply in addition to these website terms.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of India. Disputes shall first be attempted to be resolved amicably; failing that, they may be referred to arbitration under the Arbitration and Conciliation Act, 1996, or pursued in competent courts as applicable.",
        "For grievances, contact Enigrow through the Contact page with your name, service, and query details.",
      ],
    },
  ],
};

export const refundContent: LegalPage = {
  title: "Refund Policy",
  headline: "When refunds may apply for Enigrow services",
  updatedAt: "2026-07-01",
  sections: [
    {
      heading: "Advisory & service fees",
      paragraphs: [
        "Fees charged by Enigrow Startup Advisory Pvt Ltd cover professional effort, documentation support, coordination, and process management.",
        "Because much of this work begins soon after kickoff, refunds are limited and evaluated case by case.",
      ],
    },
    {
      heading: "When a service is considered commenced",
      paragraphs: [
        "A service is generally considered commenced once onboarding is complete, documents are received for processing, resources are allocated, or a draft deliverable / filing pack has been started.",
        "Once commenced, fees are typically non-refundable except as stated below.",
      ],
    },
    {
      heading: "When refunds may be considered",
      paragraphs: [
        "A partial or full refund may be considered if work has not substantially started, if a service was charged in duplicate/error, or if Enigrow is unable to begin the agreed scope for reasons under our control.",
        "Where work is milestone-based, completed stages are generally non-refundable; unused future stages may be reviewed.",
      ],
    },
    {
      heading: "Non-refundable situations",
      paragraphs: [
        "Refunds are generally not available for consultations already rendered, customized deliverables prepared, completed filings, government fees, third-party charges, or taxes already remitted.",
        "No refund is due solely because a bank, NBFC, or government authority declines an application, delays a decision, or changes scheme criteria.",
        "Delays caused by incomplete client documents, unavailability, or third-party processing times are not grounds for refund.",
      ],
    },
    {
      heading: "Cancellations & processing",
      paragraphs: [
        "If you cancel before work starts, notify us as early as possible (preferably at least 48 hours before the planned kickoff).",
        "Approved refunds, if any, are typically processed within 15–30 business days to the original payment method where feasible.",
        "Chargebacks without prior written notice to Enigrow may be contested. A signed proposal or engagement letter overrides this policy where stated.",
      ],
    },
  ],
};
