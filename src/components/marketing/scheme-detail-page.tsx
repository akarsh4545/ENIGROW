"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import type { SchemeDetail } from "@/data/schemes";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function SchemeDetailPage({ scheme }: { scheme: SchemeDetail }) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="border-border/70 relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,color-mix(in_oklch,var(--accent)_22%,transparent),transparent_42%),linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_65%,transparent),transparent)]"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <motion.div
            className="max-w-3xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
              {scheme.category} · {scheme.ministry}
            </p>
            <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              {scheme.title}
            </h1>
            <p className="text-foreground/90 mt-5 text-xl font-medium tracking-tight sm:text-2xl">
              {scheme.headline}
            </p>
            <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
              {scheme.overview}
            </p>
            {(scheme.amount || scheme.benefit || scheme.timeline) && (
              <dl className="mt-6 grid max-w-xl grid-cols-3 gap-3">
                {scheme.amount ? (
                  <div className="border-border/70 bg-card/70 rounded-xl border p-3">
                    <dt className="text-muted-foreground text-[11px] tracking-wide uppercase">
                      Amount
                    </dt>
                    <dd className="mt-1 text-sm font-semibold tracking-tight">
                      {scheme.amount}
                    </dd>
                  </div>
                ) : null}
                {scheme.benefit ? (
                  <div className="border-border/70 bg-card/70 rounded-xl border p-3">
                    <dt className="text-muted-foreground text-[11px] tracking-wide uppercase">
                      Benefit
                    </dt>
                    <dd className="mt-1 text-sm font-semibold tracking-tight">
                      {scheme.benefit}
                    </dd>
                  </div>
                ) : null}
                {scheme.timeline ? (
                  <div className="border-border/70 bg-card/70 rounded-xl border p-3">
                    <dt className="text-muted-foreground text-[11px] tracking-wide uppercase">
                      Timeline
                    </dt>
                    <dd className="mt-1 text-sm font-semibold tracking-tight">
                      {scheme.timeline}
                    </dd>
                  </div>
                ) : null}
              </dl>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`${ROUTES.contact}?service=${encodeURIComponent(scheme.title)}`}
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Get scheme support
              </Link>
              <Link
                href={ROUTES.schemes}
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                )}
              >
                All schemes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-border/70 border-b">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              Key benefits
            </h2>
            <ul className="mt-6 space-y-4">
              {scheme.benefits.map((item) => (
                <li
                  key={item}
                  className="border-primary/35 text-muted-foreground border-l-2 pl-4 text-sm leading-relaxed sm:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              Eligibility snapshot
            </h2>
            <ul className="mt-6 space-y-4">
              {scheme.eligibility.map((item) => (
                <li
                  key={item}
                  className="text-muted-foreground text-sm leading-relaxed sm:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-border/70 border-b bg-[linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_40%,transparent),transparent)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            How we help you apply
          </h2>
          <ol className="divide-border/80 border-border/80 mt-10 divide-y border-y">
            {scheme.steps.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-3 py-7 sm:grid-cols-[4rem_1fr] sm:gap-8"
              >
                <span className="font-heading text-accent-foreground/90 text-2xl font-semibold">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-heading text-2xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed sm:text-base">
                    {step.copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-border/70 border-b">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              Documents commonly needed
            </h2>
            <ul className="mt-6 space-y-3">
              {scheme.documents.map((doc) => (
                <li
                  key={doc}
                  className="text-muted-foreground text-sm leading-relaxed sm:text-base"
                >
                  {doc}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              FAQs
            </h2>
            <Accordion type="single" collapsible className="mt-6">
              {scheme.faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_oklch,var(--primary)_92%,black),color-mix(in_oklch,var(--primary)_70%,oklch(0.35_0.04_210)))]"
        />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 sm:py-24 md:flex-row md:items-end md:justify-between">
          <div className="text-primary-foreground max-w-xl">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Want help with {scheme.title}?
            </h2>
            <p className="text-primary-foreground/80 mt-4 text-base leading-relaxed sm:text-lg">
              Share your business profile and we will confirm fit, documents,
              and the practical next steps.
            </p>
          </div>
          <Link
            href={`${ROUTES.contact}?service=${encodeURIComponent(scheme.title)}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-accent text-accent-foreground hover:bg-accent/90",
            )}
          >
            Request guidance
          </Link>
        </div>
      </section>
    </>
  );
}
