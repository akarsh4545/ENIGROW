"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

import { EligibilityChecker } from "@/components/calculators/eligibility-checker";
import { homeEase } from "@/components/marketing/home-motion";

const SESSION_KEY = "enigrow-eligibility-modal-seen";
const OPEN_DELAY_MS = 500;

export function EligibilityCheckerModal() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {
      /* ignore */
    }

    const timeout = window.setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
    }, OPEN_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <motion.button
            type="button"
            aria-label="Close eligibility checker"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="eligibility-modal-title"
            className="border-border/70 bg-background relative z-10 flex max-h-[min(92dvh,52rem)] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border shadow-[0_28px_80px_-28px_rgba(0,0,0,0.45)] sm:rounded-2xl"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 10 }
            }
            transition={{ duration: 0.3, ease: homeEase }}
          >
            <header className="border-border/60 relative shrink-0 border-b px-5 pt-5 pb-4 sm:px-7 sm:pt-6 sm:pb-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:bg-muted hover:text-foreground absolute top-3 right-3 rounded-full p-2 transition sm:top-4 sm:right-4"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>

              <p className="text-primary inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.16em] uppercase">
                <span aria-hidden>💬</span>
                Check eligibility
              </p>
              <h2
                id="eligibility-modal-title"
                className="font-heading mt-2 pr-10 text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Check Your Business Eligibility
              </h2>
              <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed sm:text-base">
                Answer a few quick questions to find the right certification for
                your business.
              </p>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
              {/* Flatten nested card chrome so the checker sits cleanly in the modal */}
              <div className="[&>div]:border-0 [&>div]:bg-transparent [&>div]:p-0 [&>div]:shadow-none">
                <EligibilityChecker />
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
