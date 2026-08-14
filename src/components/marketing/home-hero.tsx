"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeEase } from "@/components/marketing/home-motion";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const proofItems = [
  "Business Registration",
  "Government Schemes",
  "Funding Assistance",
  "Compliance Support",
] as const;

function GrowthVisual({ animate }: { animate: boolean }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[28rem] lg:max-w-none">
      <div
        aria-hidden
        className="absolute inset-[8%] rounded-[2rem] bg-[#E7F7EF]"
      />
      <div
        aria-hidden
        className="absolute inset-[14%] rounded-[1.75rem] border border-[#0B1F33]/[0.06] bg-white shadow-[0_28px_60px_-36px_rgba(11,31,51,0.45)]"
      />

      <svg
        viewBox="0 0 420 420"
        className="relative z-[1] h-full w-full"
        role="img"
        aria-label="Illustration of business growth across registration, schemes, funding, and compliance"
      >
        <defs>
          <linearGradient id="growthLine" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#18B878" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#18B878" />
          </linearGradient>
          <linearGradient id="barFill" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#18B878" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#18B878" />
          </linearGradient>
        </defs>

        {/* Soft grid */}
        {[80, 140, 200, 260, 320].map((y) => (
          <line
            key={y}
            x1="56"
            x2="364"
            y1={y}
            y2={y}
            stroke="#0B1F33"
            strokeOpacity="0.05"
          />
        ))}

        {/* Rising bars */}
        <rect
          x="78"
          y="248"
          width="36"
          height="72"
          rx="10"
          fill="url(#barFill)"
        />
        <rect
          x="132"
          y="208"
          width="36"
          height="112"
          rx="10"
          fill="url(#barFill)"
        />
        <rect
          x="186"
          y="168"
          width="36"
          height="152"
          rx="10"
          fill="url(#barFill)"
        />
        <rect
          x="240"
          y="128"
          width="36"
          height="192"
          rx="10"
          fill="url(#barFill)"
        />
        <rect x="294" y="96" width="36" height="224" rx="10" fill="#0B1F33" />

        {/* Growth curve */}
        <path
          d="M70 270 C130 250, 170 210, 210 170 S300 90, 350 70"
          fill="none"
          stroke="url(#growthLine)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="350" cy="70" r="8" fill="#18B878" />
        <circle cx="350" cy="70" r="14" fill="#18B878" fillOpacity="0.18" />

        {/* Orbit nodes */}
        <g>
          <circle cx="96" cy="112" r="28" fill="#FFFFFF" stroke="#D5E2D9" />
          <text
            x="96"
            y="108"
            textAnchor="middle"
            fill="#0B1F33"
            fontSize="9"
            fontWeight="700"
          >
            Register
          </text>
          <text x="96" y="121" textAnchor="middle" fill="#5A6B7A" fontSize="8">
            Entity
          </text>
        </g>
        <g>
          <circle cx="330" cy="168" r="28" fill="#FFFFFF" stroke="#D5E2D9" />
          <text
            x="330"
            y="164"
            textAnchor="middle"
            fill="#0B1F33"
            fontSize="9"
            fontWeight="700"
          >
            Schemes
          </text>
          <text x="330" y="177" textAnchor="middle" fill="#5A6B7A" fontSize="8">
            Support
          </text>
        </g>
        <g>
          <circle cx="118" cy="318" r="28" fill="#0B1F33" />
          <text
            x="118"
            y="314"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="9"
            fontWeight="700"
          >
            Fund
          </text>
          <text x="118" y="327" textAnchor="middle" fill="#E7F7EF" fontSize="8">
            Ready
          </text>
        </g>
        <g>
          <circle cx="312" cy="292" r="28" fill="#18B878" />
          <text
            x="312"
            y="288"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="9"
            fontWeight="700"
          >
            Grow
          </text>
          <text x="312" y="301" textAnchor="middle" fill="#E7F7EF" fontSize="8">
            Scale
          </text>
        </g>
      </svg>

      <motion.div
        aria-hidden
        className={cn(
          "absolute top-[12%] right-[2%] rounded-2xl border border-[#0B1F33]/[0.08] bg-white px-3.5 py-2.5 shadow-[0_16px_40px_-28px_rgba(11,31,51,0.55)]",
          animate && "home-v2-float",
        )}
        style={
          animate
            ? { animation: "home-v2-float 5.5s ease-in-out infinite" }
            : undefined
        }
      >
        <p className="text-[10px] font-semibold tracking-[0.14em] text-[#18B878] uppercase">
          Momentum
        </p>
        <p className="mt-0.5 text-sm font-semibold text-[#0B1F33]">
          Clear next steps
        </p>
      </motion.div>

      <motion.div
        aria-hidden
        className={cn(
          "absolute bottom-[10%] left-[0%] rounded-2xl border border-[#0B1F33]/[0.08] bg-white px-3.5 py-2.5 shadow-[0_16px_40px_-28px_rgba(11,31,51,0.55)]",
          animate && "home-v2-float",
        )}
        style={
          animate
            ? { animation: "home-v2-float 6.5s ease-in-out infinite 0.6s" }
            : undefined
        }
      >
        <p className="text-[10px] font-semibold tracking-[0.14em] text-[#5A6B7A] uppercase">
          India-wide
        </p>
        <p className="mt-0.5 text-sm font-semibold text-[#0B1F33]">
          Advisor support
        </p>
      </motion.div>
    </div>
  );
}

type HomeHeroProps = {
  onCheckEligibility: () => void;
};

export function HomeHero({ onCheckEligibility }: HomeHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#F7F9F6]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(11,31,51,0.05) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at 30% 20%, black 20%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] size-[28rem] rounded-full bg-[#E7F7EF] blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-20">
        <div className="max-w-xl">
          <motion.p
            className="text-sm font-semibold tracking-[0.2em] text-[#18B878] uppercase"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: homeEase }}
          >
            Enigrow Startup Advisory
          </motion.p>

          <motion.h1
            className="font-heading mt-4 text-[2.75rem] leading-[1.05] font-bold tracking-tight text-[#0B1F33] sm:text-6xl lg:text-[4.25rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: homeEase }}
          >
            Build. Fund. Grow.
          </motion.h1>

          <motion.p
            className="mt-5 text-xl font-semibold tracking-tight text-[#0B1F33]/90 sm:text-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: homeEase }}
          >
            Everything your business needs to move forward.
          </motion.p>

          <motion.p
            className="mt-4 max-w-lg text-base leading-relaxed text-[#5A6B7A] sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: homeEase }}
          >
            From business registration and government schemes to funding and
            compliance, Enigrow helps Indian businesses navigate the process and
            unlock the opportunities behind it.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: homeEase }}
          >
            <button
              type="button"
              onClick={onCheckEligibility}
              className={cn(
                buttonVariants({ size: "lg" }),
                "home-v2-cta h-12 rounded-full px-6 text-base font-semibold",
              )}
            >
              Check My Eligibility
              <ArrowRight className="size-4" />
            </button>
            <Link
              href={ROUTES.services}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "home-v2-outline h-12 rounded-full px-6 text-base font-semibold",
              )}
            >
              Explore Services
            </Link>
          </motion.div>

          <motion.ul
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24, ease: homeEase }}
          >
            {proofItems.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-[#0B1F33]/[0.07] bg-white px-3 py-3 text-center shadow-[0_10px_30px_-24px_rgba(11,31,51,0.35)]"
              >
                <p className="text-[0.72rem] font-semibold tracking-tight text-[#0B1F33] sm:text-xs">
                  {item}
                </p>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: homeEase }}
        >
          <GrowthVisual animate={!reduceMotion} />
        </motion.div>
      </div>
    </section>
  );
}
