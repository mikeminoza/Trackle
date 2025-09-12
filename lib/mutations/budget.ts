import { useMutation, useQueryClient } from '@tanstack/react-query';  
import { createBudgetService, updateBudgetService, deleteBudgetService } from '@/services/budget';
import { BudgetUpdate } from '@/types/db';
import { toast } from 'sonner';
 

export function useBudget() {
  const queryClient = useQueryClient();

  const handleSuccess = (userId: string, message: string) => {
    queryClient.invalidateQueries({ queryKey: ["budgets", userId] });
    queryClient.invalidateQueries({ queryKey: ["budgetsummary", userId] });
    toast.success(message);
  };

  const handleError = (error: unknown, action: string) => {
    toast.error(`Error ${action}: ${(error as Error).message}`);
  };

  // Create
  const createBudget = useMutation({
    mutationFn: createBudgetService,
    onSuccess: (data) => handleSuccess(data.user_id, "Budget added successfully."),
    onError: (error) => handleError(error, "creating budget"),
  });

  // Update
  const updateBudget = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: BudgetUpdate }) =>
      updateBudgetService(id, updates),
    onSuccess: (data) => handleSuccess(data.user_id, "Budget updated successfully."),
    onError: (error) => handleError(error, "updating budget"),
  });

  // Delete
  const deleteBudget = useMutation({
    mutationFn: deleteBudgetService,
    onSuccess: (data) => handleSuccess(data.user_id, "Budget deleted successfully."),
    onError: (error) => handleError(error, "deleting budget"),
  });

  return { createBudget, updateBudget, deleteBudget };
}
