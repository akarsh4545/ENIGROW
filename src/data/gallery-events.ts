export type GalleryItem = {
  id: string;
  title: string;
  category: "workspace" | "workshops" | "field" | "team";
  image: string;
  alt: string;
};

export type EventItem = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  location: string;
  format: "In-person" | "Online" | "Hybrid";
  status: "upcoming" | "past";
  agenda: string[];
  takeaways: string[];
};

export const galleryContent = {
  title: "Gallery",
  headline: "Moments from advisory sessions, workshops, and fieldwork.",
  support:
    "A visual look at how Enigrow shows up — client working sessions, founder workshops, and on-ground support.",
  items: [
    {
      id: "g1",
      title: "Strategy working session",
      category: "workspace",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80",
      alt: "Team collaborating around a table during a working session",
    },
    {
      id: "g2",
      title: "Founder workshop",
      category: "workshops",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
      alt: "Workshop presentation in a bright meeting room",
    },
    {
      id: "g3",
      title: "Documentation review",
      category: "workspace",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
      alt: "Advisor reviewing documents with a client",
    },
    {
      id: "g4",
      title: "Field visit notes",
      category: "field",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
      alt: "Professionals in discussion during a business meeting",
    },
    {
      id: "g5",
      title: "Team planning board",
      category: "team",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
      alt: "Team collaborating at laptops",
    },
    {
      id: "g6",
      title: "Scheme readiness clinic",
      category: "workshops",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
      alt: "Group learning session in a modern office",
    },
  ] satisfies GalleryItem[],
} as const;

export const eventsContent = {
  title: "Events",
  headline: "Clinics and briefings that make formalities clearer.",
  support:
    "Enigrow sessions on registrations, government schemes, and funding readiness — practical agendas, not sales theatre.",
  items: [
    {
      slug: "msme-readiness-clinic-aug",
      title: "MSME Readiness Clinic",
      summary:
        "A practical session on Udyam prep, common filing mistakes, and what to pursue after registration.",
      date: "2026-08-14",
      location: "Online",
      format: "Online",
      status: "upcoming",
      agenda: [
        "Who should register and when",
        "Documents to keep ready",
        "Common declaration errors",
        "What to pursue after Udyam",
      ],
      takeaways: [
        "A simple readiness checklist",
        "Clarity on next scheme conversations",
        "Q&A with Enigrow advisors",
      ],
    },
    {
      slug: "funding-file-workshop-sep",
      title: "Funding File Workshop",
      summary:
        "How to structure purpose, documents, and narrative before lender conversations for PMEGP, CGTMSE, MUDRA, and related pathways.",
      date: "2026-09-05",
      location: "Hybrid (India)",
      format: "Hybrid",
      status: "upcoming",
      agenda: [
        "Capital purpose framing",
        "Document pack essentials",
        "Red flags lenders notice",
        "Scheme fit vs generic loan applications",
      ],
      takeaways: [
        "A funding readiness outline",
        "Examples of stronger narratives",
        "Follow-up advisory options",
      ],
    },
    {
      slug: "women-entrepreneur-standup-oct",
      title: "Stand-Up India Briefing for Women Entrepreneurs",
      summary:
        "Greenfield requirements, category fit, and first bank-meeting prep for women-led ventures.",
      date: "2026-10-10",
      location: "Online",
      format: "Online",
      status: "upcoming",
      agenda: [
        "Eligibility and greenfield rules",
        "Project cost framing",
        "Documents for first lender conversation",
        "Open Q&A",
      ],
      takeaways: [
        "Clear yes/no on scheme relevance",
        "Starter pack checklist",
        "Next-step options with Enigrow",
      ],
    },
    {
      slug: "gst-basics-briefing-may",
      title: "GST Basics Briefing",
      summary:
        "A past briefing for early-stage businesses deciding when and how to register.",
      date: "2026-05-16",
      location: "Online",
      format: "Online",
      status: "past",
      agenda: [
        "Registration timing",
        "Input readiness",
        "Invoice basics",
        "Open Q&A",
      ],
      takeaways: [
        "Clearer timing decisions",
        "Document checklist",
        "Pointers for ongoing compliance support",
      ],
    },
  ] satisfies EventItem[],
} as const;

export function getAllEventSlugs() {
  return eventsContent.items.map((item) => item.slug);
}

export function getEvent(slug: string) {
  return eventsContent.items.find((item) => item.slug === slug) ?? null;
}
