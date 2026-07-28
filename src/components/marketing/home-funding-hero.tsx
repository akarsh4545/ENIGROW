"use client";

import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

const floatingChips = [
  {
    label: "PMEGP",
    className: "left-[1.5%] top-[10%]",
    duration: 22,
    delay: 0,
  },
  {
    label: "CGTMSE",
    className: "right-[2%] top-[12%]",
    duration: 26,
    delay: 1.2,
  },
  {
    label: "MUDRA",
    className: "left-[2%] bottom-[14%]",
    duration: 24,
    delay: 0.6,
  },
  {
    label: "MSME",
    className: "right-[3%] bottom-[18%]",
    duration: 28,
    delay: 1.8,
  },
  {
    label: "₹10L–₹5Cr",
    className: "right-[38%] top-[6%]",
    duration: 25,
    delay: 0.4,
  },
  {
    label: "Government Schemes",
    className: "right-[8%] bottom-[8%]",
    duration: 27,
    delay: 2.1,
  },
  {
    label: "Business Registration",
    className: "left-[3%] top-[48%]",
    duration: 23,
    delay: 1.4,
  },
  {
    label: "Subsidy",
    className: "right-[4%] top-[46%]",
    duration: 21,
    delay: 0.9,
  },
] as const;

type Props = {
  onStart: () => void;
};

function useHeroCount(end: number, delayMs = 400) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setValue(end);
      return;
    }

    let frame = 0;
    const timeout = window.setTimeout(() => {
      const start = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * end));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [delayMs, end, reduceMotion]);

  return value;
}

export function HomeFundingHero({ onStart }: Props) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 35, damping: 22, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 35, damping: 22, mass: 0.6 });
  const meshTransform = useMotionTemplate`translate3d(${springX}px, ${springY}px, 0)`;

  const scoreMax = useHeroCount(100, 550);
  const sampleScore = useHeroCount(86, 900);
  const rangeHigh = useHeroCount(5, 1100);

  useEffect(() => {
    if (reduceMotion) return;
    const node = sectionRef.current;
    if (!node) return;

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
      mouseX.set(x);
      mouseY.set(y);
    };
    const onLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [mouseX, mouseY, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="border-border/70 relative isolate overflow-hidden border-b"
    >
      {/* Base wash */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_70%,white)_0%,color-mix(in_oklch,var(--background)_88%,white)_55%,var(--background)_100%)]"
      />

      {/* Animated mesh */}
      <motion.div
        aria-hidden
        style={{ transform: reduceMotion ? undefined : meshTransform }}
        className="hero-mesh pointer-events-none absolute -inset-[12%] will-change-transform"
      >
        <div className="hero-mesh-blob hero-mesh-blob-a" />
        <div className="hero-mesh-blob hero-mesh-blob-b" />
        <div className="hero-mesh-blob hero-mesh-blob-c" />
        <div className="hero-mesh-blob hero-mesh-blob-d" />
      </motion.div>

      {/* Soft radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklch,var(--accent)_14%,transparent),transparent_42%),radial-gradient(circle_at_88%_30%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_40%)]"
      />

      {/* Faint grid / topographic drift */}
      <div
        aria-hidden
        className="hero-topo pointer-events-none absolute inset-0 opacity-[0.07] dark:opacity-[0.09]"
      />

      {/* Floating scheme chips — desktop only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        {floatingChips.map((chip) => (
          <motion.span
            key={chip.label}
            className={cn(
              "border-primary/15 bg-primary/[0.04] text-primary/80 absolute rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide blur-[0.2px] select-none",
              chip.className,
            )}
            style={{ opacity: 0.1 }}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={
              reduceMotion
                ? { opacity: 0.1 }
                : {
                    opacity: 0.1,
                    y: [0, -10, 4, 0],
                    x: [0, 6, -4, 0],
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0.4 }
                : {
                    opacity: { duration: 0.8, delay: chip.delay * 0.15 },
                    y: {
                      duration: chip.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: chip.delay,
                    },
                    x: {
                      duration: chip.duration * 1.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: chip.delay + 0.4,
                    },
                  }
            }
          >
            {chip.label}
          </motion.span>
        ))}
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:py-28">
        <div className="max-w-xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: homeEase }}
            className="border-border/70 bg-background/85 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm shadow-sm"
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
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: homeEase }}
          >
            Check Your Funding Eligibility Instantly
          </motion.h1>

          <motion.p
            className="text-muted-foreground mt-5 text-base leading-relaxed sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: homeEase }}
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
            transition={{ duration: 0.5, delay: 0.18, ease: homeEase }}
          >
            <button
              type="button"
              onClick={onStart}
              className={cn(
                buttonVariants({ size: "lg" }),
                homeCtaClass,
                "min-w-[13.5rem] shadow-[0_12px_30px_color-mix(in_oklch,var(--primary)_22%,transparent)]",
              )}
            >
              Check Eligibility Free
            </button>
            <Link
              href={ROUTES.contact}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                homeCtaClass,
                "bg-background/80 min-w-[11rem]",
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
                  delay: 0.24 + index * 0.07,
                  duration: 0.4,
                  ease: homeEase,
                }}
              >
                <motion.span
                  className="grid size-5 place-items-center rounded-full bg-emerald-500/12 text-emerald-700 dark:text-emerald-400"
                  initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.28 + index * 0.07,
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
          className="border-border/60 bg-card/95 group relative overflow-hidden rounded-[1.5rem] border p-6 sm:p-7"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={
            reduceMotion
              ? { opacity: 1, y: 0 }
              : {
                  opacity: 1,
                  y: 0,
                  boxShadow: [
                    "0 22px 50px color-mix(in oklch, var(--primary) 10%, transparent)",
                    "0 28px 64px color-mix(in oklch, var(--primary) 18%, transparent)",
                    "0 22px 50px color-mix(in oklch, var(--primary) 10%, transparent)",
                  ],
                }
          }
          whileHover={
            reduceMotion
              ? undefined
              : {
                  y: -6,
                  borderColor:
                    "color-mix(in oklch, var(--primary) 35%, transparent)",
                }
          }
          transition={
            reduceMotion
              ? { duration: 0.55, delay: 0.14, ease: homeEase }
              : {
                  opacity: { duration: 0.55, delay: 0.14, ease: homeEase },
                  y: { duration: 0.35, ease: homeEase },
                  borderColor: { duration: 0.35 },
                  boxShadow: {
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  },
                }
          }
          aria-label="Funding eligibility preview"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--accent)_55%,transparent),transparent)] opacity-70 transition group-hover:opacity-100"
          />

          <motion.div
            className="relative flex items-start justify-between gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.4, ease: homeEase }}
          >
            <div>
              <p className="text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase">
                Funding eligibility preview
              </p>
              <p className="font-heading mt-1.5 text-xl font-semibold tracking-tight">
                What you’ll see instantly
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/12 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Free
            </span>
          </motion.div>

          <div className="relative mt-6 grid grid-cols-2 gap-3">
            <motion.div
              className="border-border/70 bg-background/95 group-hover:border-primary/25 rounded-2xl border p-4 transition"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: homeEase }}
            >
              <p className="text-muted-foreground text-[11px] leading-snug tracking-[0.12em] uppercase">
                Overall eligibility
              </p>
              <p className="font-heading mt-2 text-lg font-semibold tracking-tight sm:text-xl">
                0–{scoreMax} score
              </p>
              <p className="text-primary mt-1 text-xs font-medium">
                Sample: {sampleScore}/100
              </p>
            </motion.div>

            <motion.div
              className="border-border/70 bg-background/95 group-hover:border-primary/25 rounded-2xl border p-4 transition"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.4, ease: homeEase }}
            >
              <p className="text-muted-foreground text-[11px] leading-snug tracking-[0.12em] uppercase">
                Estimated funding range
              </p>
              <p className="font-heading mt-2 text-lg font-semibold tracking-tight sm:text-xl">
                ₹10K–₹{rangeHigh} Cr
              </p>
            </motion.div>

            <motion.div
              className="border-border/70 bg-background/95 group-hover:border-primary/25 rounded-2xl border p-4 transition"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.46, duration: 0.4, ease: homeEase }}
            >
              <p className="text-muted-foreground text-[11px] leading-snug tracking-[0.12em] uppercase">
                Eligible programs
              </p>
              <p className="font-heading mt-2 text-lg font-semibold tracking-tight sm:text-xl">
                Matched list
              </p>
            </motion.div>

            <motion.div
              className="border-border/70 bg-background/95 group-hover:border-primary/25 rounded-2xl border p-4 transition"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.54, duration: 0.4, ease: homeEase }}
            >
              <p className="text-muted-foreground text-[11px] leading-snug tracking-[0.12em] uppercase">
                Time required
              </p>
              <p className="font-heading mt-2 text-lg font-semibold tracking-tight sm:text-xl">
                Instant
              </p>
            </motion.div>
          </div>

          <motion.div
            className="border-border/70 bg-background/95 group-hover:border-primary/25 relative mt-3 flex items-center justify-between rounded-2xl border px-4 py-3.5 transition"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.4, ease: homeEase }}
          >
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
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4, ease: homeEase }}
          >
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
          </motion.div>
        </motion.aside>
      </div>
    </section>
  );
}
