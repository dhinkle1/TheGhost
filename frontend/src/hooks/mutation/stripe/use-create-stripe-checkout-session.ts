import { useMutation } from "@tanstack/react-query";
import TheGhost from "#/api/open-hands";

export const useCreateStripeCheckoutSession = () =>
  useMutation({
    mutationFn: async (variables: { amount: number }) => {
      const redirectUrl = await TheGhost.createCheckoutSession(
        variables.amount,
      );
      window.location.href = redirectUrl;
    },
  });
