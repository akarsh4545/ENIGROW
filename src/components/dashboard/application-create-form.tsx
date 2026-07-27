"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { servicesContent } from "@/data/services";
import { apiFetch } from "@/lib/api";
import {
  applicationCreateSchema,
  type ApplicationCreateValues,
} from "@/validations/dashboard";

export function ApplicationCreateForm() {
  const router = useRouter();
  const form = useForm<ApplicationCreateValues>({
    resolver: zodResolver(applicationCreateSchema),
    defaultValues: {
      serviceSlug: servicesContent.items[0]?.slug ?? "",
      serviceName: servicesContent.items[0]?.title ?? "",
      notes: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const selected = servicesContent.items.find(
        (item) => item.slug === values.serviceSlug,
      );
      await apiFetch("/api/v1/applications", {
        method: "POST",
        body: JSON.stringify({
          serviceSlug: values.serviceSlug,
          serviceName: selected?.title ?? values.serviceName,
          notes: values.notes,
        }),
      });
      toast.success("Application submitted.");
      form.reset({
        serviceSlug: values.serviceSlug,
        serviceName: selected?.title ?? values.serviceName,
        notes: "",
      });
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to submit application.",
      );
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="border-border/70 bg-card space-y-4 rounded-2xl border p-5"
      noValidate
    >
      <h2 className="font-heading text-xl font-semibold tracking-tight">
        Start an application
      </h2>
      <div className="space-y-2">
        <Label htmlFor="service">Service</Label>
        <select
          id="service"
          className="border-input bg-background h-9 w-full rounded-lg border px-3 text-sm"
          {...form.register("serviceSlug")}
        >
          {servicesContent.items.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea id="notes" rows={4} {...form.register("notes")} />
      </div>
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Submitting…" : "Submit application"}
      </Button>
    </form>
  );
}
