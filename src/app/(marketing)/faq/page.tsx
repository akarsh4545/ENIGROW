import type { Metadata } from "next";

import { FaqPageContent } from "@/components/marketing/faq-page";
import { JsonLd } from "@/components/seo/json-ld";
import { faqContent } from "@/data/faq";
import { buildPageMetadata } from "@/lib/seo";
import { faqPageJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ | Business Funding & Government Schemes",
  description:
    "Frequently asked questions about ENIGROW services, government schemes, business funding support, registrations, and advisory process.",
  path: "/faq",
});

export default function FaqPage() {
  const faqs: { question: string; answer: string }[] =
    faqContent.groups.flatMap((group) =>
      group.items.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
    );

  return (
    <>
      <JsonLd data={faqPageJsonLd(faqs)} />
      <FaqPageContent />
    </>
  );
}
