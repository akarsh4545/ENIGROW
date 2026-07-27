import { z } from "zod";

import { connectToDatabase } from "@/lib/db";
import { User, type UserRole } from "@/models/user";

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  phone: z.string().min(7).max(20).optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * Create a local credentials user (password stored as bcrypt hash).
 * Role defaults to customer; elevated roles should only be set by admins later.
 */
export async function registerUser(input: RegisterInput) {
  const data = registerSchema.parse(input);

  await connectToDatabase();

  const existing = await User.findOne({ email: data.email }).exec();
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const passwordHash = await User.hashPassword(data.password);

  // Public registration is always customer; admins assign elevated roles later.
  const user = await User.create({
    name: data.name,
    email: data.email,
    passwordHash,
    phone: data.phone ?? null,
    role: "customer" satisfies UserRole,
  });

  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role as UserRole,
  };
}
