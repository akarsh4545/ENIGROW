import { NextResponse } from "next/server";
import { z } from "zod";

import { LEADS_ACCESS_ROLES } from "@/config/admin-nav";
import { apiSuccess, handleApiError } from "@/lib/api";
import { requireRole } from "@/lib/auth/session";
import {
  listFundingAssessments,
  updateFundingAssessmentStatus,
} from "@/services/funding-assessment";
import { ASSESSMENT_STATUSES } from "@/models/funding-assessment";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requireRole([...LEADS_ACCESS_ROLES]);
    const rows = await listFundingAssessments();
    return apiSuccess(rows);
  } catch (error) {
    return handleApiError(error);
  }
}

const patchSchema = z.object({
  status: z.enum(ASSESSMENT_STATUSES),
  notes: z.string().trim().max(2000).optional(),
});

export async function PATCH(request: Request) {
  try {
    await requireRole([...LEADS_ACCESS_ROLES]);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Assessment id is required." },
        { status: 400 },
      );
    }
    const body = patchSchema.parse(await request.json());
    const row = await updateFundingAssessmentStatus(
      id,
      body.status,
      body.notes,
    );
    return apiSuccess(row);
  } catch (error) {
    return handleApiError(error);
  }
}
