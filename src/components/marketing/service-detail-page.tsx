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
import type { ServiceDetail } from "@/data/service-details";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

type ServiceDetailPageProps = {
  service: ServiceDetail;
};

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
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
              {service.category}
            </p>
            <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              {service.title}
            </h1>
            <p className="text-foreground/90 mt-5 text-xl font-medium tracking-tight sm:text-2xl">
              {service.headline}
            </p>
            <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
              {service.overview}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`${ROUTES.contact}?service=${encodeURIComponent(service.title)}`}
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Start this service
              </Link>
              <Link
                href={ROUTES.services}
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                )}
              >
                All services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-border/70 border-b">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            What you get
          </h2>
          <ul className="space-y-4">
            {service.outcomes.map((item) => (
              <li
                key={item}
                className="border-primary/35 text-muted-foreground border-l-2 pl-4 text-sm leading-relaxed sm:text-base"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-border/70 border-b bg-[linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_40%,transparent),transparent)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            How it works
          </h2>
          <ol className="divide-border/80 border-border/80 mt-10 divide-y border-y">
            {service.process.map((step, index) => (
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
              {service.documents.map((doc) => (
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
              {service.faqs.map((faq, index) => (
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
              Ready to begin {service.title.toLowerCase()}?
            </h2>
            <p className="text-primary-foreground/80 mt-4 text-base leading-relaxed sm:text-lg">
              Share your current stage and we will outline requirements,
              timeline expectations, and next actions.
            </p>
          </div>
          <Link
            href={`${ROUTES.contact}?service=${encodeURIComponent(service.title)}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-accent text-accent-foreground hover:bg-accent/90",
            )}
          >
            Talk to an advisor
          </Link>
        </div>
      </section>
    </>
  );
}
