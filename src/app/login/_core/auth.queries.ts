import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authSdk } from "@/app/login/_core/auth.sdk";

export const authKeys = {
  me: ["auth", "me"] as const,
};

export const useMeQuery = () =>
  useQuery({ queryKey: authKeys.me, queryFn: authSdk.me });

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authSdk.login,
    onSuccess: (user) => queryClient.setQueryData(authKeys.me, user),
  });
};
