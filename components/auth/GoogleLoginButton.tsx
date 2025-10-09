"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "./google-icon";

export function GoogleLoginButton({ label }: { label: string }) {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Button variant="outline" type="button" onClick={handleGoogleLogin} className="w-full">
      <GoogleIcon />
      <span className="ml-2">{label}</span>
    </Button>
  );
}
