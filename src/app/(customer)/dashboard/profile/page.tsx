import type { Metadata } from "next";

import { auth } from "@/auth";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { getUserProfile } from "@/services/profile";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await auth();
  const profile = session?.user?.id
    ? await getUserProfile(session.user.id)
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Profile
        </h1>
        <p className="text-muted-foreground mt-2">
          Keep your contact details up to date for advisor follow-ups.
        </p>
      </div>

      {profile ? (
        <ProfileForm
          defaultValues={{
            name: profile.name,
            email: profile.email,
            phone: profile.phone || "",
          }}
        />
      ) : (
        <p className="text-muted-foreground text-sm">Profile unavailable.</p>
      )}
    </div>
  );
}
