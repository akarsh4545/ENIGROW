import { z } from "zod";

export const BUSINESS_STAGES = [
  "idea",
  "early",
  "operating",
  "scaling",
] as const;

export const BUSINESS_TYPES = [
  "services",
  "trading",
  "manufacturing",
  "food",
  "export",
  "other",
] as const;

export const PRIMARY_GOALS = [
  "registration",
  "gst_compliance",
  "msme_schemes",
  "funding",
  "brand_protection",
  "export_setup",
] as const;

export const eligibilityFormSchema = z.object({
  stage: z.enum(BUSINESS_STAGES),
  businessType: z.enum(BUSINESS_TYPES),
  hasEntity: z.enum(["yes", "no"]),
  hasGst: z.enum(["yes", "no", "unsure"]),
  hasMsme: z.enum(["yes", "no", "unsure"]),
  needsFunding: z.enum(["yes", "no", "maybe"]),
  goal: z.enum(PRIMARY_GOALS),
  name: z.string().trim().max(100).optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
});

export type EligibilityFormValues = z.infer<typeof eligibilityFormSchema>;

export type EligibilityRecommendation = {
  id: string;
  title: string;
  reason: string;
  href: string;
  priority: "high" | "medium";
  kind: "service" | "scheme" | "tool";
};
