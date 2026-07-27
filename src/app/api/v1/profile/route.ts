import { apiSuccess, handleApiError } from "@/lib/api";
import { requireUser } from "@/lib/auth/session";
import { getUserProfile, updateUserProfile } from "@/services/profile";
import { profileUpdateSchema } from "@/validations/dashboard";

export const runtime = "nodejs";

export async function GET() {
  try {
    const sessionUser = await requireUser();
    const profile = await getUserProfile(sessionUser.id);
    if (!profile) {
      throw new Error("User not found.");
    }
    return apiSuccess({
      id: String(profile._id),
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      role: profile.role,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const sessionUser = await requireUser();
    const body = profileUpdateSchema.parse(await request.json());
    const profile = await updateUserProfile(sessionUser.id, body);
    return apiSuccess({
      id: String(profile._id),
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      role: profile.role,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
