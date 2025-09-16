import { useQuery } from "@tanstack/react-query"; 
import { getAvailableYears } from "@/services/dashboard";
import { AvailableYear } from "@/types/dashboard";

export const useAvailableYearQuery = (userId?: string) =>
  useQuery<AvailableYear[], Error>({
    queryKey: ["years", userId], 
    queryFn: () => getAvailableYears(userId!),
    enabled: !!userId,  
  });
