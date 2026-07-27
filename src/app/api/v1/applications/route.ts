import { apiCreated, apiSuccess, handleApiError } from "@/lib/api";
import { requireUser } from "@/lib/auth/session";
import {
  createApplicationForUser,
  listApplicationsForUser,
} from "@/services/applications";
import { applicationCreateSchema } from "@/validations/dashboard";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await requireUser();
    const applications = await listApplicationsForUser(user.id);
    return apiSuccess(applications);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = applicationCreateSchema.parse(await request.json());
    const application = await createApplicationForUser(user.id, body);
    return apiCreated({
      id: String(application._id),
      referenceCode: application.referenceCode,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
