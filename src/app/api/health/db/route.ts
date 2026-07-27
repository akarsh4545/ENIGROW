import { NextResponse } from "next/server";

import { connectToDatabase, getConnectionState } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Lightweight DB health check.
 * GET /api/health/db
 */
export async function GET() {
  try {
    await connectToDatabase();
    const state = getConnectionState();

    return NextResponse.json({
      ok: true,
      database: "connected",
      readyState: state,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";

    return NextResponse.json(
      {
        ok: false,
        database: "disconnected",
        error: message,
      },
      { status: 503 },
    );
  }
}
