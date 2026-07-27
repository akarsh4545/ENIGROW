import { z } from "zod";

export const applicationCreateSchema = z.object({
  serviceSlug: z.string().min(1),
  serviceName: z.string().min(1),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type ApplicationCreateValues = z.infer<typeof applicationCreateSchema>;

export const appointmentCreateSchema = z.object({
  topic: z.string().trim().min(3).max(120),
  preferredAt: z.string().trim().min(1, "Choose a preferred date and time."),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type AppointmentCreateValues = z.infer<typeof appointmentCreateSchema>;

export const profileUpdateSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
});

export type ProfileUpdateValues = z.infer<typeof profileUpdateSchema>;
