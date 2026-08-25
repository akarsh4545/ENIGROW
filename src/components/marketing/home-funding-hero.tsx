"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Headset, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const HERO_PHOTO = {
  src: "/images/hero-entrepreneur.jpg",
  alt: "Indian entrepreneur in a navy blazer working on a laptop in a modern office",
} as const;

const ROTATING_FOCUS = [
  "Government schemes",
  "Business funding",
  "MSME registration",
  "Compliance & growth",
] as const;

export function HomeFundingHero({
  onCheckEligibility: _onCheckEligibility,
}: {
  /** Kept for API compatibility; eligibility stays in navbar / visit popup — not in hero CTAs. */
  onCheckEligibility?: () => void;
}) {
  void _onCheckEligibility;
  const reduceMotion = useReducedMotion();
  const [focusIndex, setFocusIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setFocusIndex((i) => (i + 1) % ROTATING_FOCUS.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <section className="relative isolate overflow-hidden border-b border-[#e2e6ef] bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, #ffffff 0%, #f8f9fc 48%, #eef0fa 100%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[-12%] right-[-4%] size-[28rem] rounded-full bg-[#6366f1]/[0.09] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 18, 0], y: [0, 12, 0], opacity: [0.7, 1, 0.7] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[-18%] left-[-8%] size-[22rem] rounded-full bg-[#c08418]/[0.08] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -14, 0], y: [0, -10, 0], opacity: [0.55, 0.9, 0.55] }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[40%] opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.5) 1px, transparent 1.2px)",
          backgroundSize: "18px 18px",
          maskImage:
            "linear-gradient(to right, black 0%, black 30%, transparent 85%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 30%, transparent 85%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[90rem] px-4 pt-10 pb-12 sm:px-6 sm:pt-12 sm:pb-14 lg:px-10 lg:pt-14 lg:pb-16 xl:px-12">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-4 xl:gap-6">
          <div className="relative z-[2] max-w-xl lg:col-span-5 lg:max-w-none lg:translate-x-10 xl:col-span-4 xl:translate-x-16">
            <motion.p
              className="inline-flex items-center gap-2 rounded-full border border-[#001848]/10 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-[#001848] shadow-[0_1px_2px_rgba(0,24,72,0.04)] backdrop-blur-sm"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: homeEase }}
            >
              <Star
                className="size-3.5 fill-[#c08418] text-[#c08418]"
                aria-hidden
              />
              Trusted by 5000+ Businesses Across India
            </motion.p>

            <motion.h1
              className="font-heading mt-5 text-[2.35rem] leading-[1.12] font-bold tracking-tight text-[#001848] sm:text-[2.75rem] lg:text-[3rem] lg:leading-[1.1] xl:text-[3.25rem]"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: homeEase }}
            >
              <span className="whitespace-nowrap">Turn Your Business</span>{" "}
              Ambition Into
              <br />
              <span className="bg-gradient-to-r from-[#c08418] via-[#d4a017] to-[#7c3aed] bg-clip-text text-transparent">
                Funded Growth.
              </span>
            </motion.h1>

            <motion.div
              className="mt-4 flex h-7 items-center gap-2 text-sm font-semibold text-[#001848]/70 sm:text-base"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.12 }}
            >
              <span className="text-[#5b6577]">Focused on</span>
              <span className="relative inline-flex min-w-[11.5rem] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_FOCUS[focusIndex]}
                    className="absolute inset-0 text-[#001848]"
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: 10, filter: "blur(4px)" }
                    }
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={
                      reduceMotion
                        ? undefined
                        : { opacity: 0, y: -10, filter: "blur(4px)" }
                    }
                    transition={{ duration: 0.35, ease: homeEase }}
                  >
                    {ROTATING_FOCUS[focusIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="invisible" aria-hidden>
                  {ROTATING_FOCUS[0]}
                </span>
              </span>
            </motion.div>

            <motion.p
              className="mt-5 max-w-md text-base leading-relaxed text-[#5b6577] sm:text-lg"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: homeEase }}
            >
              ENIGROW helps Indian businesses unlock the right opportunities,
              registrations, and funding to grow faster and stronger.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: homeEase }}
            >
              <Link
                href={ROUTES.funding}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  homeCtaClass,
                  "group/button h-12 rounded-full bg-[#001848] px-7 text-base text-white hover:bg-[#0a2a6e]",
                )}
              >
                Explore Funding Options
                <span className="ml-1 grid size-6 place-items-center rounded-full bg-white/15">
                  <ArrowRight className="size-3.5 transition duration-200 group-hover/button:translate-x-0.5" />
                </span>
              </Link>
              <Link
                href={ROUTES.contact}
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  homeCtaClass,
                  "h-12 rounded-full border-[#001848]/25 bg-white/90 px-6 text-base text-[#001848] backdrop-blur-sm hover:border-[#001848]/40 hover:bg-white",
                )}
              >
                <Headset className="size-4 text-[#001848]" aria-hidden />
                Talk to an Expert
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="relative z-[1] w-full lg:col-span-7 xl:col-span-8"
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: homeEase }}
          >
            <div className="relative mx-auto aspect-[4/3] w-full sm:aspect-[5/4] lg:aspect-auto lg:min-h-[500px] xl:min-h-[560px]">
              <motion.div
                className="absolute inset-0 overflow-hidden"
                animate={reduceMotion ? undefined : { scale: [1, 1.02, 1] }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={HERO_PHOTO.src}
                  alt={HERO_PHOTO.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 68vw"
                  className="scale-[1.1] object-cover object-[64%_30%]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-[#f8f9fc]/85 via-[#f8f9fc]/30 to-transparent"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, black 0%, black 45%, transparent 78%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 0%, black 45%, transparent 78%)",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#eef0fa]/45 to-transparent"
                />
              </motion.div>

              <motion.div
                className="absolute right-[4%] bottom-[4%] z-[4] flex w-[min(92%,250px)] items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#001848] to-[#1e3a6e] p-3 text-white shadow-[0_16px_40px_-18px_rgba(0,24,72,0.45)]"
                animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="relative size-8 shrink-0 overflow-hidden rounded-lg bg-white/10 p-0.5">
                  <Image
                    src="/brand/enigrow-logo.png"
                    alt=""
                    width={32}
                    height={32}
                    className="size-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold">Your Growth Partner</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-white/70">
                    From Registration to Funding, We&apos;ve Got You Covered!
                  </p>
                </div>
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/15">
                  <ArrowUpRight className="size-3" aria-hidden />
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
