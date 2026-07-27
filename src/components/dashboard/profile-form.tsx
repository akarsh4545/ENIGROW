"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiFetch } from "@/lib/api";
import {
  profileUpdateSchema,
  type ProfileUpdateValues,
} from "@/validations/dashboard";

type ProfileFormProps = {
  defaultValues: ProfileUpdateValues & { email: string };
};

export function ProfileForm({ defaultValues }: ProfileFormProps) {
  const router = useRouter();
  const form = useForm<ProfileUpdateValues>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: defaultValues.name,
      phone: defaultValues.phone || "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await apiFetch("/api/v1/profile", {
        method: "PATCH",
        body: JSON.stringify(values),
      });
      toast.success("Profile updated.");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to update profile.",
      );
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="border-border/70 bg-card max-w-xl space-y-5 rounded-2xl border p-6"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="profile-name">Full name</Label>
        <Input id="profile-name" {...form.register("name")} />
        {form.formState.errors.name ? (
          <p className="text-destructive text-xs">
            {form.formState.errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="profile-email">Email</Label>
        <Input id="profile-email" value={defaultValues.email} disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="profile-phone">Phone</Label>
        <Input id="profile-phone" {...form.register("phone")} />
      </div>

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
