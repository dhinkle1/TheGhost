import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import posthog from "posthog-js";
import TheGhost from "#/api/open-hands";
import { useConfig } from "../query/use-config";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { data: config } = useConfig();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => TheGhost.logout(config?.APP_MODE ?? "oss"),
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ["tasks"] });
      queryClient.removeQueries({ queryKey: ["settings"] });
      queryClient.removeQueries({ queryKey: ["user"] });

      posthog.reset();
      await navigate("/");
    },
  });
};
