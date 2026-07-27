import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  subject: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please share a bit more detail.")
    .max(2000),
  serviceInterest: z.string().trim().max(120).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
