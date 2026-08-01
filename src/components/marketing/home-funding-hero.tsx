"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Building2,
  FileCheck2,
  Landmark,
  Rocket,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const chips = [
  { label: "Company Registration", icon: Building2 },
  { label: "GST & Compliance", icon: FileCheck2 },
  { label: "MSME", icon: BadgeCheck },
  { label: "Startup India", icon: Rocket },
  { label: "Government Schemes", icon: Landmark },
] as const;

const journey = [
  { label: "Business Idea", icon: Rocket },
  { label: "Company Registration", icon: Building2 },
  { label: "GST Registration", icon: FileCheck2 },
  { label: "MSME Certification", icon: BadgeCheck },
  { label: "Government Schemes", icon: Landmark },
  { label: "Funding Readiness", icon: ShieldCheck },
  { label: "Business Growth", icon: TrendingUp },
] as const;

const trusts = [
  { label: "Trusted by 5,000+ Entrepreneurs" },
  { label: "98% Successful Registrations" },
  { label: "₹120Cr+ Funding Assistance" },
] as const;

function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="text-primary">{children}</span>;
}

function JourneyIllustration({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_65%)]"
      />

      <motion.div
        className="relative space-y-3"
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {journey.map((step, index) => {
          const Icon = step.icon;
          const offset =
            index % 2 === 0 ? "sm:translate-x-0" : "sm:translate-x-8";

          return (
            <div key={step.label} className="relative">
              <motion.div
                className={cn(
                  "border-border/60 bg-card/90 relative flex items-center gap-3 rounded-[1.35rem] border px-4 py-3.5 shadow-[0_14px_36px_-22px_color-mix(in_oklch,var(--primary)_35%,transparent)] backdrop-blur-sm",
                  offset,
                )}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2 + index * 0.07,
                  duration: 0.45,
                  ease: homeEase,
                }}
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
              >
                <span className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-2xl">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-muted-foreground text-[10px] font-medium tracking-[0.14em] uppercase">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="font-heading text-sm font-semibold tracking-tight sm:text-base">
                    {step.label}
                  </p>
                </div>
                {index === journey.length - 1 ? (
                  <span className="bg-accent/25 text-accent-foreground ml-auto rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase">
                    Goal
                  </span>
                ) : null}
              </motion.div>

              {index < journey.length - 1 ? (
                <div className="text-primary/50 flex justify-center py-1 sm:justify-start sm:pl-8">
                  <ArrowDown className="size-4" />
                </div>
              ) : null}
            </div>
          );
        })}
      </motion.div>

      <motion.div
        aria-hidden
        className="border-border/50 bg-background/80 absolute -top-3 -right-2 hidden rounded-2xl border px-3 py-2 text-xs font-medium shadow-md sm:block"
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Approval-ready
      </motion.div>
      <motion.div
        aria-hidden
        className="border-border/50 bg-background/80 absolute -bottom-2 -left-2 hidden rounded-2xl border px-3 py-2 text-xs font-medium shadow-md sm:block"
        animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={{
          duration: 6.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      >
        Growth path
      </motion.div>
    </div>
  );
}

export function HomeFundingHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[calc(100dvh-5.5rem)] overflow-hidden sm:min-h-[calc(100dvh-6.25rem)] lg:min-h-[calc(100dvh-6.75rem)]">
      {/* Soft off-white + mint/cream mesh */}
      <div
        aria-hidden
        className="dark:bg-background absolute inset-0 bg-[#FAFAF7]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-[-10%] size-[34rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_70%)] blur-2xl"
        animate={reduceMotion ? undefined : { x: [0, 24, 0], y: [0, 12, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-8%] bottom-[-10%] size-[32rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--accent)_18%,transparent),transparent_72%)] blur-2xl"
        animate={reduceMotion ? undefined : { x: [0, -18, 0], y: [0, -14, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in oklch, var(--primary) 70%, transparent) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-20">
        <div className="max-w-xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: homeEase }}
            className="border-border/60 bg-background/80 text-foreground inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm shadow-sm"
          >
            <span aria-hidden>🇮🇳</span>
            <span className="font-medium">
              Trusted by Growing Indian Businesses
            </span>
          </motion.div>

          <motion.h1
            className="font-heading text-foreground mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-[3.25rem] md:leading-[1.12]"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06, ease: homeEase }}
          >
            Start Your <Highlight>Business</Highlight>. Access{" "}
            <Highlight>Government Benefits</Highlight>.{" "}
            <Highlight>Grow</Highlight> With Confidence.
          </motion.h1>

          <motion.p
            className="text-muted-foreground mt-5 max-w-lg text-base leading-relaxed sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12, ease: homeEase }}
          >
            Register your business, unlock government schemes, stay compliant,
            and become funding-ready with expert guidance from Enigrow—all in
            one place.
          </motion.p>

          <motion.div
            className="mt-8"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18, ease: homeEase }}
          >
            <Link
              href={ROUTES.contact}
              className={cn(
                buttonVariants({ size: "lg" }),
                homeCtaClass,
                "h-12 rounded-[1.1rem] px-6 text-base shadow-[0_16px_36px_-16px_color-mix(in_oklch,var(--primary)_45%,transparent)]",
              )}
            >
              Book Free Consultation
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>

          <motion.div
            className="text-foreground/85 mt-8 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24, ease: homeEase }}
          >
            <p className="text-accent-foreground/90 font-medium tracking-wide">
              ★★★★★
            </p>
            {trusts.map((item) => (
              <p key={item.label} className="text-muted-foreground">
                {item.label}
              </p>
            ))}
          </motion.div>

          <motion.ul
            className="mt-8 flex flex-wrap gap-2"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: homeEase }}
          >
            {chips.map((chip) => {
              const Icon = chip.icon;
              return (
                <li key={chip.label}>
                  <span className="border-border/70 bg-background/80 text-foreground/90 hover:border-primary/30 hover:shadow-primary/10 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <Icon className="text-primary size-3.5" />
                    {chip.label}
                  </span>
                </li>
              );
            })}
          </motion.ul>
        </div>

        <motion.div
          className="relative"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: homeEase }}
        >
          <div className="border-border/50 from-background/40 to-secondary/30 rounded-[2rem] border bg-gradient-to-b p-4 sm:p-6">
            <JourneyIllustration reduceMotion={reduceMotion} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
