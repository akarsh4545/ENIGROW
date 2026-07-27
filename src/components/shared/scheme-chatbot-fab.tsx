"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bot, SendHorizontal, Sparkles, X } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/config/site";
import {
  formatFundsLabel,
  recommendSchemes,
  type SchemeRecommendation,
} from "@/lib/schemes/recommend";
import { cn } from "@/lib/utils";

type ChatStep = "need" | "funds" | "done";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
  recommendations?: SchemeRecommendation[];
};

const QUICK_NEEDS = [
  "Working capital for trading",
  "Machinery for manufacturing",
  "Food processing unit",
  "Women entrepreneur greenfield",
  "Startup recognition & funding",
] as const;

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function SchemeChatbotFab() {
  const hasContactFabs = Boolean(
    siteConfig.whatsappNumber?.replace(/\D/g, "") ||
    siteConfig.supportPhone?.replace(/\D/g, ""),
  );
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<ChatStep>("need");
  const [need, setNeed] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hi — I’m Enigrow’s scheme guide. Tell me what you need help with (loan, subsidy, startup, manufacturing, etc.), and I’ll shortlist fitting government schemes.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const reset = () => {
    setStep("need");
    setNeed("");
    setInput("");
    setMessages([
      {
        id: uid(),
        role: "bot",
        text: "Happy to help again. What do you need — funding type, sector, or goal?",
      },
    ]);
  };

  const pushUser = (text: string) => {
    setMessages((prev) => [...prev, { id: uid(), role: "user", text }]);
  };

  const pushBot = (text: string, recommendations?: SchemeRecommendation[]) => {
    setMessages((prev) => [
      ...prev,
      { id: uid(), role: "bot", text, recommendations },
    ]);
  };

  const submitNeed = (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length < 3) return;
    pushUser(trimmed);
    setNeed(trimmed);
    setInput("");
    setStep("funds");
    window.setTimeout(() => {
      pushBot(
        "Got it. Roughly how much funding do you need? (e.g. 10L, 25 lakh, 1 Cr)",
      );
    }, 280);
  };

  const submitFunds = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    pushUser(trimmed);
    setInput("");
    const recommendations = recommendSchemes(need, trimmed, 3);
    window.setTimeout(() => {
      pushBot(
        `Based on “${need}” and about ${formatFundsLabel(trimmed)}, here are schemes worth reviewing. Approvals still depend on banks and authorities — Enigrow can help with readiness next.`,
        recommendations,
      );
      setStep("done");
    }, 320);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "need") submitNeed(input);
    else if (step === "funds") submitFunds(input);
  };

  return (
    <>
      {open ? (
        <div
          className={cn(
            "border-border/80 bg-background fixed right-4 z-50 flex h-[min(34rem,calc(100dvh-7.5rem))] w-[min(22.5rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border shadow-2xl sm:right-6",
            hasContactFabs
              ? "bottom-52 sm:bottom-56"
              : "bottom-20 sm:bottom-24",
          )}
          role="dialog"
          aria-label="Scheme recommendation chatbot"
        >
          <header className="bg-primary text-primary-foreground flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="bg-primary-foreground/15 grid size-9 place-items-center rounded-full">
                <Sparkles className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">Scheme guide</p>
                <p className="text-primary-foreground/75 text-xs">
                  Needs + funds → scheme shortlist
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="hover:bg-primary-foreground/10 rounded-full p-1.5 transition"
              aria-label="Close chatbot"
            >
              <X className="size-4" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md",
                  )}
                >
                  <p>{message.text}</p>
                  {message.recommendations?.length ? (
                    <ul className="mt-3 space-y-2">
                      {message.recommendations.map((item) => (
                        <li
                          key={item.slug}
                          className="border-border/70 bg-background text-foreground rounded-xl border p-3"
                        >
                          <p className="font-heading text-sm font-semibold">
                            {item.title}
                          </p>
                          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                            {item.reason}
                          </p>
                          <p className="text-muted-foreground mt-1 text-xs">
                            {item.amount ? `${item.amount}` : null}
                            {item.amount && item.benefit ? " · " : null}
                            {item.benefit ?? null}
                          </p>
                          <Link
                            href={item.href}
                            className="text-primary mt-2 inline-block text-xs font-medium hover:underline"
                          >
                            View scheme →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {step === "need" ? (
            <div className="border-border/70 flex flex-wrap gap-1.5 border-t px-3 py-2">
              {QUICK_NEEDS.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => submitNeed(label)}
                  className="border-border/80 text-muted-foreground hover:border-primary/40 hover:text-foreground rounded-full border px-2.5 py-1 text-[11px] transition"
                >
                  {label}
                </button>
              ))}
            </div>
          ) : null}

          {step === "done" ? (
            <div className="border-border/70 flex gap-2 border-t p-3">
              <button
                type="button"
                onClick={reset}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "flex-1",
                )}
              >
                Ask again
              </button>
              <Link
                href="/contact?service=Government%20schemes"
                className={cn(buttonVariants({ size: "sm" }), "flex-1")}
              >
                Talk to advisor
              </Link>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="border-border/70 flex items-center gap-2 border-t p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  step === "need"
                    ? "Describe your need…"
                    : "e.g. 15L or 25 lakh"
                }
                className="border-border/80 bg-background focus:border-primary h-10 flex-1 rounded-xl border px-3 text-sm outline-none"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 grid size-10 place-items-center rounded-xl transition"
                aria-label="Send message"
              >
                <SendHorizontal className="size-4" />
              </button>
            </form>
          )}
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close scheme guide" : "Open scheme guide chatbot"}
        aria-expanded={open}
        className={cn(
          "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/40 fixed right-4 z-50 inline-flex size-14 items-center justify-center rounded-full shadow-lg transition hover:scale-105 focus-visible:ring-2 focus-visible:outline-none sm:right-6",
          hasContactFabs
            ? "bottom-[9.5rem] sm:bottom-40"
            : "bottom-4 sm:bottom-6",
        )}
      >
        {open ? <X className="size-6" /> : <Bot className="size-6" />}
      </button>
    </>
  );
}
