"use client";

import ContentHeader from "@/components/sidebar/content-header";
import ProfileSection from "@/components/settings/ProfileSection";
import PasswordSection from "@/components/settings/PasswordSection";
import AccountControls from "@/components/settings/AccountControls";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import SettingsSkeleton from "@/components/skeletons/SettingsSkeleton";
import ErrorMessage from "@/components/ErrorMessage";

export default function Page() {
  const { data: user, isLoading, isError, error } = useUserContext();

  return (
    <>
      <ContentHeader title="Settings" breadcrumbs={[]} />
      <div className="flex-1 overflow-y-auto px-6 my-3 flex flex-col gap-4 outline-none focus:outline-none">
        <p className="text-muted-foreground text-pretty">
          Manage your profile, security, and account controls
        </p>

        {isLoading && <SettingsSkeleton />}

        {isError && <ErrorMessage message={error?.message ?? "Failed to load user data"} />}

        {!isLoading && !isError && user && (
          <>
            <ProfileSection user={user} />
            <PasswordSection />
            <AccountControls user={user} />
          </>
        )}

        <div className="text-center text-sm text-muted-foreground mt-5 mb-3">
          Need help?{" "}
          <Button variant="link" className="p-0 h-auto text-sm">
            Contact Support
          </Button>
        </div>
      </div>
    </>
  );
}
