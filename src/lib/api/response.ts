import { NextResponse } from "next/server";
import { ZodError } from "zod";

export type ApiSuccess<T> = {
  ok: true;
  data: T;
  meta?: Record<string, unknown>;
};

export type ApiFailure = {
  ok: false;
  error: string;
  details?: unknown;
};

export function apiSuccess<T>(
  data: T,
  init?: ResponseInit & { meta?: Record<string, unknown> },
) {
  const { meta, ...responseInit } = init ?? {};
  const body: ApiSuccess<T> = { ok: true, data, ...(meta ? { meta } : {}) };
  return NextResponse.json(body, { status: 200, ...responseInit });
}

export function apiCreated<T>(data: T, meta?: Record<string, unknown>) {
  const body: ApiSuccess<T> = { ok: true, data, ...(meta ? { meta } : {}) };
  return NextResponse.json(body, { status: 201 });
}

export function apiError(error: string, status = 400, details?: unknown) {
  const body: ApiFailure = {
    ok: false,
    error,
    ...(details !== undefined ? { details } : {}),
  };
  return NextResponse.json(body, { status });
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return apiError("Validation failed", 400, error.flatten());
  }

  if (error instanceof Error) {
    if (error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    if (error.message === "Forbidden") {
      return apiError("Forbidden", 403);
    }
    if (
      /Unable to reach the database|Mongo|ECONNREFUSED|SSL|server selection/i.test(
        error.message,
      )
    ) {
      console.error("Database/API error:", error.message);
      return apiError(
        "Unable to save right now — database is unreachable. Please try again shortly.",
        503,
      );
    }
    return apiError(error.message, 500);
  }

  return apiError("Internal server error", 500);
}
