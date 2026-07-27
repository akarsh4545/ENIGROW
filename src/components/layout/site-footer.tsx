import Link from "next/link";

import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";

function whatsappHref() {
  const number = siteConfig.whatsappNumber?.replace(/\D/g, "");
  if (!number) return null;
  return `https://wa.me/${number}`;
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const wa = whatsappHref();

  return (
    <footer className="border-border/70 border-t bg-[linear-gradient(180deg,transparent,color-mix(in_oklch,var(--primary)_6%,transparent))]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_2fr]">
        <div className="space-y-4">
          <Link href={ROUTES.home} className="inline-flex items-center gap-2.5">
            <span className="bg-primary text-primary-foreground grid size-9 place-items-center rounded-xl text-sm font-semibold">
              EG
            </span>
            <span className="font-heading text-lg font-semibold tracking-tight">
              {siteConfig.name}
            </span>
          </Link>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            {siteConfig.legalName}. {siteConfig.description}
          </p>
          <div className="text-muted-foreground space-y-1 text-sm">
            <p className="text-foreground/90 text-xs leading-relaxed">
              CIN: {siteConfig.cin}
            </p>
            <p className="text-xs leading-relaxed">
              Reg. Office: {siteConfig.registeredOffice}
            </p>
            {siteConfig.supportEmail ? (
              <p>
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="hover:text-foreground transition"
                >
                  {siteConfig.supportEmail}
                </a>
              </p>
            ) : null}
            {siteConfig.supportPhone ? (
              <p>
                <a
                  href={`tel:${siteConfig.supportPhone}`}
                  className="hover:text-foreground transition"
                >
                  {siteConfig.supportPhone}
                </a>
              </p>
            ) : null}
            {wa ? (
              <p>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition"
                >
                  Chat on WhatsApp
                </a>
              </p>
            ) : null}
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
            {siteConfig.legalName} (CIN: {siteConfig.cin}) is the only official
            entity under the Enigrow brand. Registered office:{" "}
            {siteConfig.registeredOffice}. We have no association with similarly
            named companies. Always verify authenticity and pay only through
            official Enigrow channels. Scheme and loan outcomes depend on banks
            and government authorities — Enigrow provides advisory and
            facilitation, not guarantees.
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
