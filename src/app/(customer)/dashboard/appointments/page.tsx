import type { Metadata } from "next";

import { auth } from "@/auth";
import { AppointmentCreateForm } from "@/components/dashboard/appointment-create-form";
import { listAppointmentsForUser } from "@/services/appointments";

export const metadata: Metadata = {
  title: "Appointments",
};

export default async function AppointmentsPage() {
  const session = await auth();
  const appointments = session?.user?.id
    ? await listAppointmentsForUser(session.user.id)
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Appointments
        </h1>
        <p className="text-muted-foreground mt-2">
          Request consultation slots and track confirmation status.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <AppointmentCreateForm />

        <div className="border-border/70 bg-card rounded-2xl border p-5">
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Your appointments
          </h2>
          {appointments.length === 0 ? (
            <p className="text-muted-foreground mt-4 text-sm">
              No appointments yet.
            </p>
          ) : (
            <ul className="divide-border/70 mt-4 divide-y">
              {appointments.map((item) => (
                <li key={String(item._id)} className="py-4">
                  <p className="font-medium">{item.topic}</p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {new Date(item.preferredAt).toLocaleString("en-IN")} ·{" "}
                    {item.status}
                  </p>
                  {item.notes ? (
                    <p className="text-muted-foreground mt-2 text-sm">
                      {item.notes}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
