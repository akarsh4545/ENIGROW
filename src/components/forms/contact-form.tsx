"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactContent } from "@/data/contact";
import { apiFetch } from "@/lib/api";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/validations/contact";

export function ContactForm() {
  const searchParams = useSearchParams();
  const serviceFromQuery = searchParams.get("service") ?? "";

  const defaultValues = useMemo<ContactFormValues>(
    () => ({
      name: "",
      email: "",
      phone: "",
      subject: serviceFromQuery
        ? "General enquiry"
        : contactContent.subjects[0],
      message: "",
      serviceInterest: serviceFromQuery,
    }),
    [serviceFromQuery],
  );

  const [submitted, setSubmitted] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (serviceFromQuery) {
      form.setValue("serviceInterest", serviceFromQuery);
    }
  }, [form, serviceFromQuery]);

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await apiFetch("/api/v1/leads", {
        method: "POST",
        body: JSON.stringify(values),
      });
      setSubmitted(true);
      form.reset(defaultValues);
      toast.success("Message sent. We’ll get back to you shortly.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send message.";
      toast.error(message);
    }
  });

  if (submitted) {
    return (
      <div className="border-border/80 bg-card rounded-2xl border p-6 sm:p-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Thank you
        </h2>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
          Your enquiry is in. An advisor will review the details and follow up
          soon.
        </p>
        <Button
          type="button"
          className="mt-6"
          variant="outline"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border-border/80 bg-card space-y-5 rounded-2xl border p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Your name"
            {...form.register("name")}
          />
          {form.formState.errors.name ? (
            <p className="text-destructive text-xs">
              {form.formState.errors.name.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            {...form.register("email")}
          />
          {form.formState.errors.email ? (
            <p className="text-destructive text-xs">
              {form.formState.errors.email.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91…"
            {...form.register("phone")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <select
            id="subject"
            className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-lg border px-3 text-sm outline-none focus-visible:ring-3"
            {...form.register("subject")}
          >
            {contactContent.subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="serviceInterest">Service interest (optional)</Label>
        <Input
          id="serviceInterest"
          placeholder="e.g. GST registration, MSME, funding"
          {...form.register("serviceInterest")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea
          id="message"
          rows={6}
          placeholder="Share your business stage and what you need help with."
          {...form.register("message")}
        />
        {form.formState.errors.message ? (
          <p className="text-destructive text-xs">
            {form.formState.errors.message.message}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
