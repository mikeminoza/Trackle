import { useMutation, useQueryClient } from '@tanstack/react-query';  
import { createBudgetService, updateBudgetService, deleteBudgetService } from '@/services/budget';
import { BudgetUpdate } from '@/types/db';
import { toast } from 'sonner';
 

export function useBudget() {
  const queryClient = useQueryClient();

  // Create
  const createBudget = useMutation({ 
    mutationFn: createBudgetService, 
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['activeBudgets', data.user_id],
      });
      toast.success("Budget added successfully.");
    },
    onError: (error) => {
      toast.error(`Error deleting transaction: ${(error as Error).message}`);
    },
  });

  // Update
  const updateBudget = useMutation({ 
    mutationFn: ({ id, updates }: { id: string; updates: BudgetUpdate }) =>
      updateBudgetService(id, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['activeBudgets', data.user_id],
      });
      toast.success("Budget updated successfully.");
    },
    onError: (error) => {
      toast.error(`Error deleting transaction: ${(error as Error).message}`);
    },
  });
  
  // Delete
  const deleteBudget = useMutation({
    mutationFn: deleteBudgetService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["activeBudgets", data.user_id],
      });
      toast.success("Budget deleted successfully.");
    },
    onError: (error) => {
      toast.error(`Error deleting transaction: ${(error as Error).message}`);
    },
  });


  return { createBudget, updateBudget, deleteBudget };
}
