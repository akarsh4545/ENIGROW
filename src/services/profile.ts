import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/user";
import type { ProfileUpdateValues } from "@/validations/dashboard";

export async function getUserProfile(userId: string) {
  await connectToDatabase();
  return User.findById(userId).lean().exec();
}

export async function updateUserProfile(
  userId: string,
  input: ProfileUpdateValues,
) {
  await connectToDatabase();

  const user = await User.findByIdAndUpdate(
    userId,
    {
      name: input.name,
      phone: input.phone || null,
    },
    { new: true },
  )
    .lean()
    .exec();

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
}
