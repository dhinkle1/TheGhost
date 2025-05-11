import { useQuery } from "@tanstack/react-query";
import TheGhost from "#/api/open-hands";

const fetchAiConfigOptions = async () => ({
  models: await TheGhost.getModels(),
  agents: await TheGhost.getAgents(),
  securityAnalyzers: await TheGhost.getSecurityAnalyzers(),
});

export const useAIConfigOptions = () =>
  useQuery({
    queryKey: ["ai-config-options"],
    queryFn: fetchAiConfigOptions,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
  });
