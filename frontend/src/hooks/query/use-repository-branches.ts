import { useQuery } from "@tanstack/react-query";
import TheGhost from "#/api/open-hands";
import { Branch } from "#/types/git";

export const useRepositoryBranches = (repository: string | null) =>
  useQuery<Branch[]>({
    queryKey: ["repository", repository, "branches"],
    queryFn: async () => {
      if (!repository) return [];
      return TheGhost.getRepositoryBranches(repository);
    },
    enabled: !!repository,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
