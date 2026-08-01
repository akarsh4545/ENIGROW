"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const highlights = [
  "Government schemes & MSME funding",
  "Company registration & compliance",
  "Advisor-led support across India",
] as const;

type Props = {
  onStart: () => void;
};

export function HomeFundingHero({ onStart }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-border/70 relative isolate overflow-hidden border-b">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(120deg,color-mix(in_oklch,var(--secondary)_75%,white)_0%,var(--background)_48%,color-mix(in_oklch,var(--accent)_8%,var(--background))_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-16 size-[28rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_68%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 size-[26rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--accent)_22%,transparent),transparent_70%)] blur-2xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24">
        <div className="max-w-xl">
          <motion.p
            className="text-primary text-sm font-semibold tracking-[0.2em] uppercase"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: homeEase }}
          >
            {siteConfig.name}
          </motion.p>

          <motion.h1
            className="font-heading text-foreground mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-[3.4rem] md:leading-[1.12]"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: homeEase }}
          >
            <span className="block">सफलता की सही शुरुआत</span>
            <span className="text-primary mt-2 block text-[0.58em] font-semibold tracking-tight sm:mt-3">
              The right start to success
            </span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground mt-5 text-base leading-relaxed sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: homeEase }}
          >
            Registrations, government schemes, MSME funding, and compliance —
            guided by Enigrow advisors so your business moves forward with
            clarity.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: homeEase }}
          >
            <button
              type="button"
              onClick={onStart}
              className={cn(
                buttonVariants({ size: "lg" }),
                homeCtaClass,
                "min-w-[12.5rem] shadow-[0_14px_34px_-16px_color-mix(in_oklch,var(--primary)_40%,transparent)]",
              )}
            >
              Check eligibility
              <ArrowRight className="size-4" />
            </button>
            <Link
              href={ROUTES.contact}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                homeCtaClass,
                "bg-background/80 min-w-[11rem]",
              )}
            >
              Talk to an advisor
            </Link>
          </motion.div>

          <ul className="mt-9 space-y-2.5">
            {highlights.map((item, index) => (
              <motion.li
                key={item}
                className="text-foreground/85 flex items-center gap-2.5 text-sm"
                initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.24 + index * 0.07,
                  duration: 0.4,
                  ease: homeEase,
                }}
              >
                <CheckCircle2 className="text-primary size-4 shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          className="relative"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: homeEase }}
        >
          <div className="border-border/50 relative overflow-hidden rounded-[1.75rem] border shadow-[0_30px_70px_-34px_color-mix(in_oklch,var(--primary)_45%,transparent)]">
            <motion.div
              className="relative aspect-[4/5] sm:aspect-[5/6]"
              animate={reduceMotion ? undefined : { scale: [1, 1.03, 1] }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80"
                alt="Business advisors reviewing growth plans with an entrepreneur"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover object-[center_18%]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,color-mix(in_oklch,var(--primary)_78%,black)_100%)]"
              />
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <p className="font-heading text-primary-foreground text-xl font-semibold tracking-tight sm:text-2xl">
                Build with confidence.
              </p>
              <p className="text-primary-foreground/80 mt-1.5 text-sm leading-relaxed">
                From paperwork to funding readiness — one clear path with
                Enigrow.
              </p>
            </div>
          </div>

          <motion.div
            className="border-border/60 bg-card absolute top-[18%] -left-2 hidden rounded-2xl border px-3.5 py-2.5 shadow-lg sm:block lg:-left-5"
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <p className="text-muted-foreground text-[10px] tracking-[0.14em] uppercase">
              Funding range
            </p>
            <p className="text-sm font-semibold">₹10L – ₹5 Cr</p>
          </motion.div>

          <motion.div
            className="border-border/60 bg-card absolute -right-1 bottom-[22%] hidden rounded-2xl border px-3.5 py-2.5 shadow-lg sm:block lg:-right-4"
            animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={{
              duration: 6.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          >
            <p className="text-muted-foreground text-[10px] tracking-[0.14em] uppercase">
              Support
            </p>
            <p className="text-sm font-semibold">Mon – Sat</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
