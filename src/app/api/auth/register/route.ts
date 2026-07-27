import { NextResponse } from "next/server";
import { z } from "zod";

import { registerUser } from "@/lib/auth/register";

export const runtime = "nodejs";

const bodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = bodySchema.parse(json);
    const user = await registerUser(body);

    return NextResponse.json({ ok: true, user }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "Invalid registration payload." },
        { status: 400 },
      );
    }

    const message =
      error instanceof Error ? error.message : "Registration failed.";

    const status = message.includes("already exists") ? 409 : 500;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
