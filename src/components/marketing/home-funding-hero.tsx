"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const trust = [
  "Free Assessment",
  "Get Answers Instantly",
  "No Documents Required",
  "Instant Results",
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  onStart: () => void;
};

export function HomeFundingHero({ onStart }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-border/70 relative isolate overflow-hidden border-b bg-[linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_55%,white),transparent)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,color-mix(in_oklch,var(--accent)_18%,transparent),transparent_38%),radial-gradient(circle_at_92%_12%,color-mix(in_oklch,var(--primary)_12%,transparent),transparent_36%)]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:py-28">
        <div className="max-w-xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className="border-border/70 bg-background/80 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm shadow-sm backdrop-blur"
          >
            <span
              aria-hidden
              className="size-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_0_3px_color-mix(in_oklch,var(--color-emerald-500)_25%,transparent)]"
            />
            <span className="text-foreground font-medium">
              Free · Results instantly
            </span>
          </motion.div>

          <motion.h1
            className="font-heading mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-[3.35rem] md:leading-[1.08]"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease }}
          >
            Check Your Funding Eligibility Instantly
          </motion.h1>

          <motion.p
            className="text-muted-foreground mt-5 text-base leading-relaxed sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            Answer a few quick questions to instantly discover which government
            grants, MSME loans, startup schemes, and business funding options
            your business may qualify for. No paperwork. No commitment.
            Completely free.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14, ease }}
          >
            <button
              type="button"
              onClick={onStart}
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-w-[13.5rem] shadow-[0_12px_30px_color-mix(in_oklch,var(--primary)_22%,transparent)]",
              )}
            >
              Check Eligibility Free
            </button>
            <Link
              href={ROUTES.contact}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "bg-background/70 min-w-[11rem]",
              )}
            >
              Talk to an Expert
            </Link>
          </motion.div>

          <ul className="mt-9 grid gap-2.5 sm:grid-cols-2">
            {trust.map((item, index) => (
              <motion.li
                key={item}
                className="text-foreground/80 flex items-center gap-2.5 text-sm"
                initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + index * 0.04, ease }}
              >
                <span className="grid size-5 place-items-center rounded-full bg-emerald-500/12 text-emerald-700 dark:text-emerald-400">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          className="relative"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
        >
          {/* Photo plane */}
          <div className="relative overflow-hidden rounded-[1.6rem] shadow-[0_28px_70px_-28px_color-mix(in_oklch,var(--primary)_45%,transparent)]">
            <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80"
                alt="Business advisors reviewing funding plans with an entrepreneur"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-[center_20%]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_28%,color-mix(in_oklch,var(--primary)_72%,black)_100%)]"
              />
            </div>

            {/* Floating score chip */}
            <motion.div
              className="border-border/40 bg-background/95 absolute top-4 right-4 flex items-center gap-2.5 rounded-2xl border px-3.5 py-2.5 shadow-lg backdrop-blur sm:top-5 sm:right-5"
              initial={
                reduceMotion ? false : { opacity: 0, y: -10, scale: 0.92 }
              }
              animate={
                reduceMotion
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 1, scale: 1, y: [0, -6, 0] }
              }
              transition={
                reduceMotion
                  ? { delay: 0.35, duration: 0.5, ease }
                  : {
                      opacity: { delay: 0.35, duration: 0.5, ease },
                      scale: { delay: 0.35, duration: 0.5, ease },
                      y: {
                        delay: 0.9,
                        duration: 5.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
              }
            >
              <span className="bg-primary/10 text-primary grid size-9 place-items-center rounded-xl">
                <Sparkles className="size-4" />
              </span>
              <div>
                <p className="text-muted-foreground text-[10px] tracking-[0.14em] uppercase">
                  Sample score
                </p>
                <motion.p
                  className="font-heading text-lg font-semibold tracking-tight"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                >
                  86 / 100
                </motion.p>
              </div>
            </motion.div>

            {/* Overlaid preview panel */}
            <motion.aside
              className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.55, ease }}
              aria-label="Funding eligibility preview"
            >
              <div className="border-border/50 bg-background/95 rounded-[1.25rem] border p-4 shadow-xl backdrop-blur-md sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-muted-foreground text-[10px] font-medium tracking-[0.16em] uppercase">
                      Funding eligibility preview
                    </p>
                    <p className="font-heading mt-1 text-base font-semibold tracking-tight sm:text-lg">
                      What you’ll see instantly
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/12 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    Free
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  {[
                    { label: "Eligibility", value: "0–100 score" },
                    { label: "Funding range", value: "₹10K–₹5 Cr" },
                    { label: "Programs", value: "Matched list" },
                    { label: "Time", value: "Instant" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="border-border/70 bg-background rounded-xl border p-3"
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.06, ease }}
                    >
                      <p className="text-muted-foreground text-[10px] tracking-[0.12em] uppercase">
                        {item.label}
                      </p>
                      <p className="font-heading mt-1 text-sm font-semibold tracking-tight sm:text-base">
                        {item.value}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onStart}
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "mt-4 w-full",
                  )}
                >
                  Check Eligibility Free
                </button>
              </div>
            </motion.aside>
          </div>

          {/* Decorative floating badge */}
          <motion.div
            className="border-border/60 bg-card absolute top-1/3 -left-2 z-10 hidden items-center gap-2 rounded-2xl border px-3 py-2.5 shadow-lg sm:flex lg:-left-4"
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            animate={
              reduceMotion
                ? { opacity: 1, x: 0 }
                : { opacity: 1, x: 0, y: [0, -8, 0] }
            }
            transition={
              reduceMotion
                ? { delay: 0.45, duration: 0.45 }
                : {
                    opacity: { delay: 0.45, duration: 0.45 },
                    x: { delay: 0.45, duration: 0.45 },
                    y: {
                      delay: 0.9,
                      duration: 4.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
            }
          >
            <span className="bg-accent/30 text-accent-foreground grid size-8 place-items-center rounded-xl text-xs font-bold">
              ₹
            </span>
            <div>
              <p className="text-muted-foreground text-[10px] tracking-[0.12em] uppercase">
                Typical range
              </p>
              <p className="text-sm font-semibold">₹10L – ₹5 Cr</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
