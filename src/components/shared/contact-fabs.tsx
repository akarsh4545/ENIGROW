"use client";

import { MessageCircle, Phone } from "lucide-react";

import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";

function phoneHref() {
  const digits = siteConfig.supportPhone?.replace(/\D/g, "");
  if (!digits) return null;
  return `tel:+${digits}`;
}

export function ContactFabs() {
  const whatsappHref = getWhatsAppUrl(
    `Hi ${siteConfig.name}, I would like help with my business formalities.`,
  );
  const callHref = phoneHref();

  if (!whatsappHref && !callHref) return null;

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-center gap-3 sm:right-6 sm:bottom-6">
      {whatsappHref ? (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="WhatsApp"
          className="inline-flex size-14 items-center justify-center rounded-full bg-[#1FAF38] text-white shadow-lg transition hover:scale-105 hover:bg-[#189a30] focus-visible:ring-2 focus-visible:ring-[#1FAF38]/50 focus-visible:outline-none"
        >
          <MessageCircle className="size-6" />
        </a>
      ) : null}
      {callHref ? (
        <a
          href={callHref}
          aria-label="Call Enigrow"
          title="Call"
          className="bg-foreground text-background hover:bg-foreground/90 focus-visible:ring-foreground/40 inline-flex size-14 items-center justify-center rounded-full shadow-lg transition hover:scale-105 focus-visible:ring-2 focus-visible:outline-none"
        >
          <Phone className="size-6" />
        </a>
      ) : null}
    </div>
  );
}
