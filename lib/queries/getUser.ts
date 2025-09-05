 import { TypedSupabaseClient } from '@/utils/supabase.types';

export async function getUser(supabase: TypedSupabaseClient) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('User not found or not authenticated');
  }

  return user;
}