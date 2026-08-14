"use client";

import { useState } from "react";
import { toast } from "sonner";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { homeEase } from "@/components/marketing/home-motion";
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
        className="peer h-12 w-full rounded-xl border border-[#0B1F33]/15 bg-white px-3.5 pt-4 pb-1.5 text-sm text-[#0B1F33] transition duration-300 outline-none focus:border-[#18B878] focus:ring-3 focus:ring-[#18B878]/20"
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-3.5 text-[#5A6B7A] transition-all duration-300",
          active
            ? "top-1.5 text-[11px] tracking-wide text-[#18B878]"
            : "top-1.5 text-[11px] tracking-wide peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:tracking-wide peer-focus:text-[#18B878]",
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
    <section className="relative overflow-hidden border-b border-[#0B1F33]/[0.06] bg-[#F7F9F6]">
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="grid overflow-hidden rounded-[1.75rem] border border-[#0B1F33]/[0.08] bg-white shadow-[0_24px_60px_-40px_rgba(11,31,51,0.35)] lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            className="bg-[#E7F7EF]/60 p-6 sm:p-10"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: homeEase }}
          >
            <p className="text-sm font-semibold tracking-[0.18em] text-[#18B878] uppercase">
              {callback.eyebrow}
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-[#0B1F33] sm:text-4xl">
              {callback.title}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#5A6B7A]">
              {callback.support}
            </p>
            <ul className="mt-8 space-y-2 text-sm text-[#0B1F33]/80">
              <li>No obligation consultation</li>
              <li>Scheme and registration guidance</li>
              <li>Clear next-step recommendation</li>
            </ul>
          </motion.div>

          <motion.div
            className="border-t border-[#0B1F33]/[0.08] p-6 sm:p-10 lg:border-t-0 lg:border-l"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, delay: 0.06, ease: homeEase }}
          >
            {done ? (
              <div>
                <h3 className="font-heading text-2xl font-bold tracking-tight text-[#0B1F33]">
                  Request received
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5A6B7A]">
                  An advisor will review your interest area and call you back.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="home-v2-outline mt-6 rounded-full font-semibold"
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
                    className="h-12 w-full appearance-none rounded-xl border border-[#0B1F33]/15 bg-white px-3.5 pt-4 pb-1.5 text-sm text-[#0B1F33] transition duration-300 outline-none focus:border-[#18B878] focus:ring-3 focus:ring-[#18B878]/20"
                  >
                    {callback.interests.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute top-1.5 left-3.5 text-[11px] tracking-wide text-[#18B878]">
                    Interest
                  </span>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="home-v2-cta w-full rounded-full font-semibold"
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
