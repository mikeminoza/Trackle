"use client";

import { createContext, useContext, useEffect } from "react";
import { UseQueryResult, useQueryClient } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";

type UserContextType = UseQueryResult<User | null, Error>;

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const userQuery = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase, queryClient]);

  return <UserContext.Provider value={userQuery}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUserContext must be used inside <UserProvider>");
  }
  return ctx;
}
