import { NextResponse } from "next/server";

import { getRazorpay, getRazorpayPublicKey } from "@/lib/payments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Razorpay config health check (does not create a charge).
 * GET /api/health/razorpay
 */
export async function GET() {
  try {
    getRazorpay();
    const keyId = getRazorpayPublicKey();

    return NextResponse.json({
      ok: true,
      razorpay: "configured",
      keyIdPrefix: keyId.slice(0, 8),
      mode: keyId.startsWith("rzp_live") ? "live" : "test",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Razorpay is not configured.";

    return NextResponse.json(
      {
        ok: false,
        razorpay: "not_configured",
        error: message,
      },
      { status: 503 },
    );
  }
}
