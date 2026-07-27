"use client";

import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFab() {
  const href = getWhatsAppUrl(
    `Hi ${siteConfig.name}, I would like help with my business formalities.`,
  );
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-4 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#1FAF38] text-white shadow-lg transition hover:scale-105 hover:bg-[#189a30] focus-visible:ring-2 focus-visible:ring-[#1FAF38]/50 focus-visible:outline-none sm:right-6 sm:bottom-6"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
