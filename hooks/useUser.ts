import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export const useUser = (): UseQueryResult<User | null, Error> => {
  const supabase = createClient();

  return useQuery<User | null, Error>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
