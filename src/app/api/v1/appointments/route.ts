import { apiCreated, apiSuccess, handleApiError } from "@/lib/api";
import { requireUser } from "@/lib/auth/session";
import {
  createAppointmentForUser,
  listAppointmentsForUser,
} from "@/services/appointments";
import { appointmentCreateSchema } from "@/validations/dashboard";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await requireUser();
    const appointments = await listAppointmentsForUser(user.id);
    return apiSuccess(appointments);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = appointmentCreateSchema.parse(await request.json());
    const appointment = await createAppointmentForUser(user.id, body);
    return apiCreated({ id: String(appointment._id) });
  } catch (error) {
    return handleApiError(error);
  }
}
