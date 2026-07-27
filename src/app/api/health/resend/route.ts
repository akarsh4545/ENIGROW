import { NextResponse } from "next/server";

import { getDefaultFromEmail, getResend } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Resend config health check (does not send email).
 * GET /api/health/resend
 */
export async function GET() {
  try {
    getResend();

    return NextResponse.json({
      ok: true,
      resend: "configured",
      from: getDefaultFromEmail(),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Resend is not configured.";

    return NextResponse.json(
      {
        ok: false,
        resend: "not_configured",
        error: message,
      },
      { status: 503 },
    );
  }
}
