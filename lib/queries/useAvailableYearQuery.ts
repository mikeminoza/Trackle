import { useQuery } from "@tanstack/react-query";
import { getAvailableYears } from "@/services/dashboard";
import { AvailableYear } from "@/types/dashboard";

export const useAvailableYearQuery = (userId?: string) =>
  useQuery<AvailableYear[], Error>({
    queryKey: ["years", userId],
    queryFn: () => getAvailableYears(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
  });
