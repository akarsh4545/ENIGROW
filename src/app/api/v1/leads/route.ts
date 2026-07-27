import { apiCreated, handleApiError } from "@/lib/api";
import { createContactLead } from "@/services/leads";
import { contactFormSchema } from "@/validations/contact";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = contactFormSchema.parse(json);
    const lead = await createContactLead(body);
    return apiCreated(lead);
  } catch (error) {
    return handleApiError(error);
  }
}
