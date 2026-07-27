import { NextResponse } from "next/server";

import { LEADS_ACCESS_ROLES } from "@/config/admin-nav";
import { apiSuccess, handleApiError } from "@/lib/api";
import { requireRole } from "@/lib/auth/session";
import { listLeads, updateLeadStatus } from "@/services/admin";
import { leadStatusUpdateSchema } from "@/validations/admin";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requireRole([...LEADS_ACCESS_ROLES]);
    const leads = await listLeads();
    return apiSuccess(leads);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    await requireRole([...LEADS_ACCESS_ROLES]);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Lead id is required." },
        { status: 400 },
      );
    }

    const body = leadStatusUpdateSchema.parse(await request.json());
    const lead = await updateLeadStatus(id, body.status);
    return apiSuccess(lead);
  } catch (error) {
    return handleApiError(error);
  }
}
