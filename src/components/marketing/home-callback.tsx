"use client";

import { useState } from "react";
import { toast } from "sonner";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { HomeBackdrop } from "@/components/marketing/home-backdrop";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { siteConfig } from "@/config/site";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";

function FloatingField({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  const active = value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        required={required}
        className="peer border-border/80 bg-background focus:border-primary focus:ring-primary/20 h-12 w-full rounded-xl border px-3.5 pt-4 pb-1.5 text-sm transition duration-300 outline-none focus:ring-3"
      />
      <label
        htmlFor={id}
        className={cn(
          "text-muted-foreground pointer-events-none absolute left-3.5 transition-all duration-300",
          active
            ? "text-primary top-1.5 text-[11px] tracking-wide"
            : "peer-focus:text-primary top-1.5 text-[11px] tracking-wide peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:tracking-wide",
        )}
      >
        {label}
      </label>
    </div>
  );
}

export function HomeCallback() {
  const reduceMotion = useReducedMotion();
  const { callback } = homeContent;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState<string>(
    callback.interests[0] ?? "Not sure yet",
  );
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || phone.trim().length < 8) {
      toast.error("Please enter your name and a valid phone number.");
      return;
    }

    setLoading(true);
    try {
      await apiFetch("/api/v1/leads", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          email: siteConfig.supportEmail || "leads@enigrow.local",
          phone: phone.trim(),
          subject: "Callback request",
          serviceInterest: interest,
          message: `Homepage callback request. Interest: ${interest}. Phone: ${phone.trim()}.`,
        }),
      });
      setDone(true);
      setName("");
      setPhone("");
      toast.success("Callback requested. We’ll reach out shortly.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send request.";
      const friendly = /database|mongo|timed out|SSL|ECONNREFUSED/i.test(
        message,
      )
        ? "Couldn’t save your request right now. Please try again in a moment, or use Contact."
        : message;
      toast.error(friendly);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-border/70 relative overflow-hidden border-b">
      <HomeBackdrop variant="callback" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="border-border/70 bg-secondary/40 grid overflow-hidden rounded-[1.75rem] border lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            className="p-6 sm:p-10"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: homeEase }}
          >
            <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
              {callback.eyebrow}
            </p>
            <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {callback.title}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md text-base leading-relaxed">
              {callback.support}
            </p>
            <ul className="text-muted-foreground mt-8 space-y-2 text-sm">
              <li>No obligation consultation</li>
              <li>Scheme and registration guidance</li>
              <li>Clear next-step recommendation</li>
            </ul>
          </motion.div>

          <motion.div
            className="border-border/60 bg-card/80 border-t p-6 sm:p-10 lg:border-t-0 lg:border-l"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, delay: 0.06, ease: homeEase }}
          >
            {done ? (
              <div>
                <h3 className="font-heading text-2xl font-semibold tracking-tight">
                  Request received
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  An advisor will review your interest area and call you back.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className={cn("mt-6", homeCtaClass)}
                  onClick={() => setDone(false)}
                >
                  Request another callback
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <FloatingField
                  id="callback-name"
                  label="Full name"
                  value={name}
                  onChange={setName}
                  required
                />
                <FloatingField
                  id="callback-phone"
                  label="Mobile number"
                  value={phone}
                  onChange={setPhone}
                  required
                />
                <div className="relative">
                  <select
                    id="callback-interest"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="border-border/80 bg-background focus:border-primary focus:ring-primary/20 h-12 w-full appearance-none rounded-xl border px-3.5 pt-4 pb-1.5 text-sm transition duration-300 outline-none focus:ring-3"
                  >
                    {callback.interests.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span className="text-primary pointer-events-none absolute top-1.5 left-3.5 text-[11px] tracking-wide">
                    Interest
                  </span>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className={cn("w-full", homeCtaClass)}
                  disabled={loading}
                >
                  {loading ? "Sending…" : "Confirm callback request"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
