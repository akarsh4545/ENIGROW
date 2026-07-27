import { apiCreated, handleApiError } from "@/lib/api";
import { createFundingAssessment } from "@/services/funding-assessment";
import { fundingAssessmentSchema } from "@/validations/funding-assessment";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = fundingAssessmentSchema.parse(json);
    const result = await createFundingAssessment(body);
    return apiCreated(result);
  } catch (error) {
    return handleApiError(error);
  }
}
