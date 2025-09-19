import { useQuery } from "@tanstack/react-query";  
import { getOrGenerateInsights } from "@/services/ai-insights";
import { InsightsPayload } from "@/types/ai";

export const useAiInsightQuery = (userId?: string, payload?: InsightsPayload, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: ["aiinsights", userId],
    queryFn: () => getOrGenerateInsights(userId!, payload!),
    enabled: options?.enabled ?? (!!userId && !!payload),
    staleTime: 1000 * 60 * 60,
  });

