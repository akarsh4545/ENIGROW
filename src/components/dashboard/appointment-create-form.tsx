"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiFetch } from "@/lib/api";
import {
  appointmentCreateSchema,
  type AppointmentCreateValues,
} from "@/validations/dashboard";

export function AppointmentCreateForm() {
  const router = useRouter();
  const form = useForm<AppointmentCreateValues>({
    resolver: zodResolver(appointmentCreateSchema),
    defaultValues: {
      topic: "Business consultation",
      preferredAt: "",
      notes: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const preferredAt = new Date(values.preferredAt).toISOString();
      await apiFetch("/api/v1/appointments", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          preferredAt,
        }),
      });
      toast.success("Appointment requested.");
      form.reset({
        topic: "Business consultation",
        preferredAt: "",
        notes: "",
      });
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to book appointment.",
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
        Request an appointment
      </h2>
      <div className="space-y-2">
        <Label htmlFor="topic">Topic</Label>
        <Input id="topic" {...form.register("topic")} />
        {form.formState.errors.topic ? (
          <p className="text-destructive text-xs">
            {form.formState.errors.topic.message}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="preferredAt">Preferred date & time</Label>
        <Input
          id="preferredAt"
          type="datetime-local"
          {...form.register("preferredAt")}
        />
        {form.formState.errors.preferredAt ? (
          <p className="text-destructive text-xs">
            {form.formState.errors.preferredAt.message}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="appointment-notes">Notes (optional)</Label>
        <Textarea id="appointment-notes" rows={4} {...form.register("notes")} />
      </div>
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Booking…" : "Request appointment"}
      </Button>
    </form>
  );
}
