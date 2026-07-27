import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";

function formatPhoneDisplay(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return phone;
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const phoneDisplay = siteConfig.supportPhone
    ? formatPhoneDisplay(siteConfig.supportPhone)
    : null;

  return (
    <footer className="border-border/70 border-t bg-[linear-gradient(180deg,transparent,color-mix(in_oklch,var(--primary)_6%,transparent))]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_2fr]">
        <div className="space-y-6">
          <div>
            <h2 className="font-heading text-foreground text-2xl font-semibold tracking-tight">
              Contact Us
            </h2>
          </div>

          <div className="space-y-5">
            <div className="flex gap-3">
              <MapPin
                className="text-primary mt-0.5 size-5 shrink-0"
                aria-hidden
              />
              <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                {siteConfig.registeredOffice}
              </p>
            </div>

            {siteConfig.supportEmail ? (
              <div className="flex items-start gap-3">
                <Mail
                  className="text-primary mt-0.5 size-5 shrink-0"
                  aria-hidden
                />
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="text-muted-foreground hover:text-foreground text-sm transition"
                >
                  {siteConfig.supportEmail}
                </a>
              </div>
            ) : null}

            {phoneDisplay && siteConfig.supportPhone ? (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="text-foreground text-sm font-semibold">
                  Talk with our Expert
                </p>
                <a
                  href={`tel:${siteConfig.supportPhone}`}
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition"
                >
                  <Phone className="size-4 shrink-0" aria-hidden />
                  {phoneDisplay}
                </a>
              </div>
            ) : null}

            <div className="flex flex-wrap items-start gap-x-4 gap-y-1">
              <p className="text-foreground text-sm font-semibold">
                Office Time
              </p>
              <div className="text-muted-foreground text-sm leading-relaxed">
                <p>Monday – Saturday</p>
                <p>09:30 AM – 06:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="mb-3 text-sm font-semibold tracking-wide">
                {group.title}
              </h2>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-border/60 border-t">
        <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-5 text-xs sm:px-6">
          <p className="max-w-4xl leading-relaxed">
            {siteConfig.legalName} is the only official entity under the Enigrow
            brand. Always verify authenticity and pay only through official
            Enigrow channels. Scheme and loan outcomes depend on banks and
            government authorities — Enigrow provides advisory and facilitation,
            not guarantees.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {siteConfig.legalName}. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href={ROUTES.privacy} className="hover:text-foreground">
                Privacy
              </Link>
              <Link href={ROUTES.terms} className="hover:text-foreground">
                Terms
              </Link>
              <Link href={ROUTES.refund} className="hover:text-foreground">
                Refunds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
