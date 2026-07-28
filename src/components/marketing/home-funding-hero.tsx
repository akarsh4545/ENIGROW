"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { Check } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const trust = [
  "Free Assessment",
  "Get Answers Instantly",
  "No Documents Required",
  "Instant Results",
] as const;

const previewTiles = [
  { label: "Overall eligibility", value: "0–100 score" },
  { label: "Estimated funding range", value: "₹10K–₹5 Cr" },
  { label: "Eligible programs", value: "Matched list" },
  { label: "Time required", value: "Instant" },
] as const;

type Props = {
  onStart: () => void;
};

export function HomeFundingHero({ onStart }: Props) {
  const reduceMotion = useReducedMotion();
  const glowY = useMotionValue(0);
  const smoothGlow = useSpring(glowY, { stiffness: 40, damping: 20 });
  const glowTransform = useTransform(
    smoothGlow,
    (v) => `translate3d(0, ${v}px, 0)`,
  );

  useEffect(() => {
    if (reduceMotion) return;
    const onScroll = () => {
      glowY.set(Math.min(28, window.scrollY * 0.06));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [glowY, reduceMotion]);

  return (
    <section className="border-border/70 relative isolate overflow-hidden border-b bg-[linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_55%,white),transparent)]">
      <motion.div
        aria-hidden
        style={{ transform: glowTransform }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,color-mix(in_oklch,var(--accent)_18%,transparent),transparent_38%),radial-gradient(circle_at_92%_12%,color-mix(in_oklch,var(--primary)_12%,transparent),transparent_36%)] will-change-transform"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:py-28">
        <div className="max-w-xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: homeEase }}
            className="border-border/70 bg-background/80 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm shadow-sm"
          >
            <span
              aria-hidden
              className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_color-mix(in_oklch,var(--color-emerald-500)_25%,transparent)]"
            />
            <span className="text-foreground font-medium">
              Free · Results instantly
            </span>
          </motion.div>

          <motion.h1
            className="font-heading mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-[3.35rem] md:leading-[1.08]"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: homeEase }}
          >
            Check Your Funding Eligibility Instantly
          </motion.h1>

          <motion.p
            className="text-muted-foreground mt-5 text-base leading-relaxed sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: homeEase }}
          >
            Answer a few quick questions to instantly discover which government
            grants, MSME loans, startup schemes, and business funding options
            your business may qualify for. No paperwork. No commitment.
            Completely free.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: homeEase }}
          >
            <motion.button
              type="button"
              onClick={onStart}
              className={cn(
                buttonVariants({ size: "lg" }),
                homeCtaClass,
                "min-w-[13.5rem] shadow-[0_12px_30px_color-mix(in_oklch,var(--primary)_22%,transparent)]",
              )}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      boxShadow: [
                        "0 12px 30px color-mix(in oklch, var(--primary) 22%, transparent)",
                        "0 14px 36px color-mix(in oklch, var(--primary) 34%, transparent)",
                        "0 12px 30px color-mix(in oklch, var(--primary) 22%, transparent)",
                      ],
                    }
              }
              transition={{ duration: 1.8, times: [0, 0.5, 1] }}
            >
              Check Eligibility Free
            </motion.button>
            <Link
              href={ROUTES.contact}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                homeCtaClass,
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
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2 + index * 0.07,
                  duration: 0.4,
                  ease: homeEase,
                }}
              >
                <motion.span
                  className="grid size-5 place-items-center rounded-full bg-emerald-500/12 text-emerald-700 dark:text-emerald-400"
                  initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.24 + index * 0.07,
                    duration: 0.35,
                    ease: homeEase,
                  }}
                >
                  <Check className="size-3" strokeWidth={3} />
                </motion.span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.aside
          className="border-border/60 bg-card relative overflow-hidden rounded-[1.5rem] border p-6 shadow-[0_24px_60px_color-mix(in_oklch,var(--primary)_8%,transparent)] sm:p-7"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={
            reduceMotion
              ? { opacity: 1, y: 0 }
              : {
                  opacity: 1,
                  y: 0,
                  boxShadow: [
                    "0 24px 60px color-mix(in oklch, var(--primary) 8%, transparent)",
                    "0 28px 70px color-mix(in oklch, var(--primary) 16%, transparent)",
                    "0 24px 60px color-mix(in oklch, var(--primary) 8%, transparent)",
                  ],
                }
          }
          transition={
            reduceMotion
              ? { duration: 0.55, delay: 0.12, ease: homeEase }
              : {
                  opacity: { duration: 0.55, delay: 0.12, ease: homeEase },
                  y: { duration: 0.55, delay: 0.12, ease: homeEase },
                  boxShadow: {
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                  },
                }
          }
          aria-label="Funding eligibility preview"
        >
          {/* Soft decorative illustration — keep card structure */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-6 -bottom-8 size-44 rounded-[2rem] bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklch,var(--accent)_35%,transparent),transparent_70%)] opacity-80"
            animate={
              reduceMotion
                ? undefined
                : { scale: [1, 1.03, 1], opacity: [0.7, 0.9, 0.7] }
            }
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="border-border/50 pointer-events-none absolute top-16 -right-2 h-28 w-36 rounded-2xl border bg-[linear-gradient(160deg,color-mix(in_oklch,var(--secondary)_80%,white),color-mix(in_oklch,var(--primary)_8%,transparent))] opacity-60"
            animate={reduceMotion ? undefined : { scale: [1, 1.025, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex items-start justify-between gap-3">
            <div>
              <p className="text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase">
                Funding eligibility preview
              </p>
              <p className="font-heading mt-1.5 text-xl font-semibold tracking-tight">
                What you’ll see instantly
              </p>
            </div>
            <motion.span
              className="rounded-full bg-emerald-500/12 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400"
              animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Free
            </motion.span>
          </div>

          <div className="relative mt-6 grid grid-cols-2 gap-3">
            {previewTiles.map((item, index) => (
              <motion.div
                key={item.label}
                className="border-border/70 bg-background/90 rounded-2xl border p-4"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={
                  reduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 1, y: [0, index % 2 === 0 ? -3 : 3, 0] }
                }
                transition={
                  reduceMotion
                    ? { delay: 0.2 + index * 0.05, duration: 0.4 }
                    : {
                        opacity: { delay: 0.22 + index * 0.06, duration: 0.4 },
                        y: {
                          delay: 1 + index * 0.15,
                          duration: 4.2 + index * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }
                }
              >
                <p className="text-muted-foreground text-[11px] leading-snug tracking-[0.12em] uppercase">
                  {item.label}
                </p>
                <p className="font-heading mt-2 text-lg font-semibold tracking-tight sm:text-xl">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="border-border/70 bg-background/90 relative mt-3 flex items-center justify-between rounded-2xl border px-4 py-3.5">
            <div>
              <p className="text-muted-foreground text-[11px] tracking-[0.12em] uppercase">
                Cost
              </p>
              <p className="font-heading mt-1 text-lg font-semibold tracking-tight">
                Completely free
              </p>
            </div>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              ₹0
            </p>
          </div>

          <button
            type="button"
            onClick={onStart}
            className={cn(
              buttonVariants({ size: "lg" }),
              homeCtaClass,
              "relative mt-6 w-full",
            )}
          >
            Check Eligibility Free
          </button>
          <p className="text-muted-foreground mt-3 text-center text-xs">
            No paperwork. No commitment. Results on the spot.
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
