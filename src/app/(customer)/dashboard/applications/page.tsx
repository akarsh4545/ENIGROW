import type { Metadata } from "next";

import { auth } from "@/auth";
import { ApplicationCreateForm } from "@/components/dashboard/application-create-form";
import { listApplicationsForUser } from "@/services/applications";

export const metadata: Metadata = {
  title: "Applications",
};

export default async function ApplicationsPage() {
  const session = await auth();
  const applications = session?.user?.id
    ? await listApplicationsForUser(session.user.id)
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Applications
        </h1>
        <p className="text-muted-foreground mt-2">
          Submit and track service applications with reference codes.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <ApplicationCreateForm />

        <div className="border-border/70 bg-card rounded-2xl border p-5">
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Your applications
          </h2>
          {applications.length === 0 ? (
            <p className="text-muted-foreground mt-4 text-sm">
              No applications yet. Submit your first one to get started.
            </p>
          ) : (
            <ul className="divide-border/70 mt-4 divide-y">
              {applications.map((item) => (
                <li key={String(item._id)} className="py-4">
                  <p className="font-medium">{item.serviceName}</p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {item.referenceCode} · {item.status.replaceAll("_", " ")}
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
