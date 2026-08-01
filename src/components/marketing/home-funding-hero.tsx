"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="text-primary">{children}</span>;
}

export function HomeFundingHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[calc(100dvh-5.5rem)] overflow-hidden sm:min-h-[calc(100dvh-6.25rem)] lg:min-h-[calc(100dvh-6.75rem)]">
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

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
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
            <Highlight>Grow With Confidence</Highlight>.
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

          <motion.p
            className="text-muted-foreground mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24, ease: homeEase }}
          >
            <span className="text-accent-foreground/90 font-medium tracking-wide">
              ★★★★★
            </span>
            <span>Trusted by 720+ businesses</span>
          </motion.p>
        </div>

        <motion.div
          className="relative"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: homeEase }}
        >
          <div className="border-border/40 relative overflow-hidden rounded-[2rem] border shadow-[0_32px_70px_-30px_color-mix(in_oklch,var(--primary)_40%,transparent)]">
            <motion.div
              className="relative aspect-[4/5] sm:aspect-[5/6]"
              animate={reduceMotion ? undefined : { scale: [1, 1.04, 1] }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80"
                alt="Entrepreneur planning business growth on a laptop"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover object-center"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(145deg,color-mix(in_oklch,var(--primary)_18%,transparent)_0%,transparent_45%,color-mix(in_oklch,var(--primary)_55%,black)_100%)]"
              />
            </motion.div>

            <motion.div
              className="absolute inset-x-0 bottom-0 p-6 sm:p-7"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.45, ease: homeEase }}
            >
              <p className="font-heading text-primary-foreground text-2xl font-semibold tracking-tight">
                Built for Indian founders
              </p>
              <p className="text-primary-foreground/80 mt-2 max-w-sm text-sm leading-relaxed">
                Clear guidance from registration to schemes and funding
                readiness.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="border-border/50 bg-card absolute top-[14%] -left-2 hidden rounded-2xl border px-3.5 py-2.5 shadow-lg sm:block lg:-left-4"
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{
              duration: 5.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <p className="text-muted-foreground text-[10px] tracking-[0.14em] uppercase">
              Pan-India
            </p>
            <p className="text-sm font-semibold">Advisor support</p>
          </motion.div>

          <motion.div
            className="border-border/50 bg-card absolute right-2 bottom-[28%] hidden rounded-2xl border px-3.5 py-2.5 shadow-lg sm:block lg:-right-3"
            animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={{
              duration: 6.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.35,
            }}
          >
            <p className="text-muted-foreground text-[10px] tracking-[0.14em] uppercase">
              Free consult
            </p>
            <p className="text-sm font-semibold">Book in minutes</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
