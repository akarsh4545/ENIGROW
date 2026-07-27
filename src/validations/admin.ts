import { z } from "zod";

import { LEAD_STATUSES } from "@/constants/leads";

export const leadStatusUpdateSchema = z.object({
  status: z.enum(LEAD_STATUSES),
});

export type LeadStatusUpdateValues = z.infer<typeof leadStatusUpdateSchema>;
