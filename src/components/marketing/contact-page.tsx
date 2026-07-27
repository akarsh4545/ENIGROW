"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Suspense } from "react";

import { ContactForm } from "@/components/forms/contact-form";
import { contactContent } from "@/data/contact";
import { siteConfig } from "@/config/site";

function detailValue(key: "email" | "phone" | "whatsapp") {
  if (key === "email") return siteConfig.supportEmail;
  if (key === "phone") return siteConfig.supportPhone;
  const number = siteConfig.whatsappNumber?.replace(/\D/g, "");
  return number ? `+${number}` : "";
}

function detailHref(key: "email" | "phone" | "whatsapp", value: string) {
  if (!value) return null;
  if (key === "email") return `mailto:${value}`;
  if (key === "phone") return `tel:${value}`;
  const number = value.replace(/\D/g, "");
  return `https://wa.me/${number}`;
}

export function ContactPageContent() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="border-border/70 relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,color-mix(in_oklch,var(--accent)_24%,transparent),transparent_40%),linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_65%,transparent),transparent)]"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <motion.div
            className="max-w-3xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
              {contactContent.title}
            </p>
            <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              {contactContent.headline}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              {contactContent.support}
            </p>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.aside
            className="space-y-8"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <h2 className="font-heading text-2xl font-semibold tracking-tight">
                Reach us directly
              </h2>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Prefer a quick call or WhatsApp? Use the details below while we
                review your form submission.
              </p>
            </div>

            <div className="border-border/70 border-primary/35 space-y-2 border-l-2 pl-4">
              <p className="text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase">
                Hours
              </p>
              <p className="text-sm leading-relaxed">{contactContent.hours}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {contactContent.coverage}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase">
                {contactContent.office.label}
              </p>
              <div className="mt-2 space-y-0.5 text-sm leading-relaxed">
                {contactContent.office.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>

            <ul className="space-y-5">
              {contactContent.details.map((detail) => {
                const value = detailValue(detail.valueKey);
                const href = detailHref(detail.valueKey, value);
                if (!value) return null;
                return (
                  <li key={detail.label}>
                    <p className="text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase">
                      {detail.label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="hover:text-primary mt-1 inline-block text-base font-medium transition"
                        target={
                          detail.valueKey === "whatsapp" ? "_blank" : undefined
                        }
                        rel={
                          detail.valueKey === "whatsapp"
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-base font-medium">{value}</p>
                    )}
                  </li>
                );
              })}
            </ul>

            <div>
              <h3 className="font-heading text-lg font-semibold tracking-tight">
                Why contact Enigrow
              </h3>
              <ul className="mt-4 space-y-2.5">
                {contactContent.whyContact.map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground text-sm leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Suspense
              fallback={
                <div className="border-border/80 bg-card text-muted-foreground rounded-2xl border p-6 text-sm sm:p-8">
                  Loading form…
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </motion.div>
        </div>
      </section>
    </>
  );
}
