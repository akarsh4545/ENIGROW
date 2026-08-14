import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { BrandLogo } from "@/components/shared/brand-logo";
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
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_2fr] lg:gap-16">
        <div className="space-y-5">
          <div className="inline-flex rounded-2xl bg-white px-3 py-2">
            <BrandLogo className="h-11 w-auto" />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            Advisory for registrations, government schemes, funding readiness,
            and compliance — so Indian businesses can move forward with clarity.
          </p>

          <div className="space-y-3 pt-2 text-sm text-white/75">
            <div className="flex gap-3">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-[var(--brand-gold)]"
                aria-hidden
              />
              <p className="max-w-sm leading-relaxed">
                {siteConfig.registeredOffice}
              </p>
            </div>
            {siteConfig.supportEmail ? (
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="hover:text-accent inline-flex items-center gap-3 transition"
              >
                <Mail
                  className="size-4 shrink-0 text-[var(--brand-gold)]"
                  aria-hidden
                />
                {siteConfig.supportEmail}
              </a>
            ) : null}
            {phoneDisplay && siteConfig.supportPhone ? (
              <a
                href={`tel:${siteConfig.supportPhone}`}
                className="hover:text-accent inline-flex items-center gap-3 transition"
              >
                <Phone
                  className="size-4 shrink-0 text-[var(--brand-gold)]"
                  aria-hidden
                />
                {phoneDisplay}
              </a>
            ) : null}
            <p className="text-white/55">Mon–Sat · 09:30 AM – 06:00 PM</p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="mb-4 text-xs font-semibold tracking-[0.16em] text-[var(--brand-gold)] uppercase">
                {group.title}
              </h2>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 transition hover:text-white"
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

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-white/55 sm:px-6">
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
              <Link href={ROUTES.privacy} className="hover:text-white">
                Privacy
              </Link>
              <Link href={ROUTES.terms} className="hover:text-white">
                Terms
              </Link>
              <Link href={ROUTES.refund} className="hover:text-white">
                Refunds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
