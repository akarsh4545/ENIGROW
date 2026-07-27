"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function currency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function LoanEmiCalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [annualRate, setAnnualRate] = useState(12);
  const [months, setMonths] = useState(36);

  const result = useMemo(() => {
    const r = annualRate / 12 / 100;
    if (principal <= 0 || months <= 0) {
      return { emi: 0, total: 0, interest: 0 };
    }
    if (r === 0) {
      const emi = principal / months;
      return { emi, total: principal, interest: 0 };
    }
    const emi =
      (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    const total = emi * months;
    return { emi, total, interest: total - principal };
  }, [principal, annualRate, months]);

  return (
    <div className="border-border/70 bg-card space-y-5 rounded-2xl border p-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Loan / EMI calculator
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Estimate monthly EMI for planning conversations. Not a sanction offer.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="principal">Loan amount (₹)</Label>
          <Input
            id="principal"
            type="number"
            min={0}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rate">Interest % p.a.</Label>
          <Input
            id="rate"
            type="number"
            min={0}
            step={0.1}
            value={annualRate}
            onChange={(e) => setAnnualRate(Number(e.target.value) || 0)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tenure">Tenure (months)</Label>
          <Input
            id="tenure"
            type="number"
            min={1}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="border-border/70 grid gap-3 border-t pt-5 sm:grid-cols-3">
        <div>
          <p className="text-muted-foreground text-xs tracking-wide uppercase">
            EMI
          </p>
          <p className="font-heading mt-1 text-2xl font-semibold">
            {currency(result.emi)}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs tracking-wide uppercase">
            Total payment
          </p>
          <p className="font-heading mt-1 text-2xl font-semibold">
            {currency(result.total)}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs tracking-wide uppercase">
            Total interest
          </p>
          <p className="font-heading mt-1 text-2xl font-semibold">
            {currency(result.interest)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function GstCalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");

  const result = useMemo(() => {
    const taxRate = rate / 100;
    if (mode === "exclusive") {
      const gst = amount * taxRate;
      return { base: amount, gst, total: amount + gst };
    }
    const base = amount / (1 + taxRate);
    const gst = amount - base;
    return { base, gst, total: amount };
  }, [amount, rate, mode]);

  return (
    <div className="border-border/70 bg-card space-y-5 rounded-2xl border p-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          GST calculator
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Quick GST split for estimates. Confirm with your tax advisor for
          filings.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="gst-amount">Amount (₹)</Label>
          <Input
            id="gst-amount"
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gst-rate">GST %</Label>
          <Input
            id="gst-rate"
            type="number"
            min={0}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value) || 0)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gst-mode">Amount type</Label>
          <select
            id="gst-mode"
            className="border-input bg-background h-9 w-full rounded-lg border px-3 text-sm"
            value={mode}
            onChange={(e) =>
              setMode(e.target.value as "exclusive" | "inclusive")
            }
          >
            <option value="exclusive">GST exclusive</option>
            <option value="inclusive">GST inclusive</option>
          </select>
        </div>
      </div>

      <div className="border-border/70 grid gap-3 border-t pt-5 sm:grid-cols-3">
        <div>
          <p className="text-muted-foreground text-xs tracking-wide uppercase">
            Taxable value
          </p>
          <p className="font-heading mt-1 text-2xl font-semibold">
            {currency(result.base)}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs tracking-wide uppercase">
            GST amount
          </p>
          <p className="font-heading mt-1 text-2xl font-semibold">
            {currency(result.gst)}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs tracking-wide uppercase">
            Invoice total
          </p>
          <p className="font-heading mt-1 text-2xl font-semibold">
            {currency(result.total)}
          </p>
        </div>
      </div>
    </div>
  );
}
