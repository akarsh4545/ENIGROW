import { NextResponse } from "next/server";

import { getCloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Cloudinary config health check (does not upload).
 * GET /api/health/cloudinary
 */
export async function GET() {
  try {
    const client = getCloudinary();
    const cloudName = client.config().cloud_name;

    return NextResponse.json({
      ok: true,
      cloudinary: "configured",
      cloudName,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Cloudinary is not configured.";

    return NextResponse.json(
      {
        ok: false,
        cloudinary: "not_configured",
        error: message,
      },
      { status: 503 },
    );
  }
}
